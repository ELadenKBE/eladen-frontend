import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Keycloak from 'keycloak-js';
import './App.scss';

// Components
import Landingpage from './pages/Landingpage';
import Searchpage from './pages/Searchpage';
import Cartpage from './pages/Cartpage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';

// Define a type for the initialization options
type KeycloakConfig = {
  url: string;
  realm: string;
  clientId: string;
};

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth/',
  realm: 'eladen-realm',
  clientId: 'eladen-client',
};

function App() {
  const [isLoginFormRendered, setLoginFormRendered] = useState<boolean>(false);
  const [isSidebarRendered, setIsSidebarRendered] = useState<boolean>(false);

  const [keycloak, setKeycloak] = useState<Keycloak.KeycloakInstance | null>(
    null
  );
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [subToken, setSubToken] = useState<string>('');
  const [registrationCompleted, setRegistrationCompleted] =
    useState<boolean>(false); // State for registration completion

  const parseJwt = (token: any) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const kc = new Keycloak(keycloakConfig);
    kc.init({ onLoad: 'login-required' })
      .then((auth: boolean) => {
        setKeycloak(kc);
        setAuthenticated(auth);
        const jwtToken = parseJwt(kc.token);
        setSubToken(jwtToken.sub);
      })
      .catch(() => {
        window.alert('Could not initialize Keycloak');
      });
  }, []);

  const handleRegistrationComplete = () => {
    setRegistrationCompleted(true);
  };

  // Apollo client setup
  const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql/', // GraphQL-Server-Endpunkt
  });

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        AUTHORIZATION: `sub ${subToken}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  if (keycloak && authenticated && !registrationCompleted) {
    return (
      <ApolloProvider client={client}>
        <div className="app-container">
          <Register
            onRegistrationComplete={handleRegistrationComplete}
            subToken={subToken}
          />
        </div>
      </ApolloProvider>
    );
  }

  if (keycloak && authenticated && registrationCompleted) {
    return (
      <ApolloProvider client={client}>
        <div className="app-container">
          <Navbar
            isLoginFormRendered={isLoginFormRendered}
            setIsLoginFormRendered={setLoginFormRendered}
            isSidebarRendered={isSidebarRendered}
            setIsSidebarRendered={setIsSidebarRendered}
          />
          <div className="content-container">
            <Routes>
              <Route
                path="/"
                element={
                  <Landingpage
                    isLoginFormRendered={isLoginFormRendered}
                    isSidebarRendered={isSidebarRendered}
                    subToken={subToken}
                  />
                }
              />
              <Route path="/search/:query" element={<Searchpage />} />
              <Route path="/cart" element={<Cartpage />} />
            </Routes>
          </div>
          <Footer
            isLoginFormRendered={isLoginFormRendered}
            setIsLoginFormRendered={setLoginFormRendered}
            isSidebarRendered={isSidebarRendered}
            setIsSidebarRendered={setIsSidebarRendered}
          />
        </div>
      </ApolloProvider>
    );
  }

  return <p>Initializing Keycloak...</p>;
}

export default App;
