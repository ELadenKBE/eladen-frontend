import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Keycloak from 'keycloak-js';
import './App.scss';

// Components
import Landingpage from './pages/Landingpage';
import Searchpage from './pages/Searchpage';
import Cartpage from './pages/Cartpage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import Product from './components/ProductFrame/Product/Product';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
}

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth/',
  realm: 'eladen-realm',
  clientId: 'eladen-client',
};

interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}
type PriceRange = {
  min: number;
  max: number;
};

function App(): JSX.Element {
  const [isLoginFormRendered, setLoginFormRendered] = useState<boolean>(false);
  const [isSidebarRendered, setIsSidebarRendered] = useState<boolean>(false);
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [subToken, setSubToken] = useState<string>('');
  const [registrationCompleted, setRegistrationCompleted] =
    useState<boolean>(false);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [availability, setAvailability] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 100000,
  });
  const [isSorted, setIsSorted] = useState<string>('ascending');

  // Function to handle removing a product from the cart
  const handleRemoveFromCart = (productId: number) => {
    setCartProducts(cartProducts.filter((product) => product.id !== productId));
  };

  // Function to parse JWT token
  const parseJwt = (token: string | undefined) => {
    try {
      return token ? JSON.parse(atob(token.split('.')[1])) : null;
    } catch (e) {
      return null;
    }
  };

  //Get token from keycloak
  useEffect(() => {
    const kc = new Keycloak(keycloakConfig);
    kc.init({ onLoad: 'login-required' })
      .then((auth: boolean) => {
        setKeycloak(kc);
        setAuthenticated(auth);
        const jwtToken = parseJwt(kc.token);
        setSubToken(jwtToken?.sub || '');
      })
      .catch(() => {
        console.log('Keycloak konnte nicht initialisiert werden.');
      });
  }, []);

  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  //Create apollo client for the ApolloProvider after we got back the jwt token
  useEffect(() => {
    if (subToken) {
      const authLink = setContext((_, { headers }) => {
        // return the headers to the context so httpLink can read them
        return {
          headers: {
            ...headers,
            AUTHORIZATION: `sub ${subToken}`,
          },
        };
      });

      const httpLink = createHttpLink({
        uri: 'http://localhost:8000/graphql/',
      });

      const newClient = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
          addTypename: false,
        }),
      });

      setClient(newClient);
    }
  }, [subToken]);

  if (!client) {
    return <p>Initialisiere Apollo client...</p>;
  }

  //Check if the registration form was submitted
  const handleRegistrationComplete = () => {
    setRegistrationCompleted(true);
  };

  if (keycloak && authenticated && !registrationCompleted) {
    return (
      <div className="app-container">
        <Register
          onRegistrationComplete={handleRegistrationComplete}
          subToken={subToken}
        />
      </div>
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
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    availability={availability}
                    setAvailability={setAvailability}
                    isSorted={isSorted}
                    setIsSorted={setIsSorted}
                  />
                }
              />
              <Route
                path="/search/:query"
                element={
                  <Searchpage
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                    priceRange={priceRange}
                    availability={availability}
                    setPriceRange={setPriceRange}
                    setAvailability={setAvailability}
                    isSorted={isSorted}
                    setIsSorted={setIsSorted}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <Cartpage
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                    onRemoveFromCart={handleRemoveFromCart}
                  />
                }
              />
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

  return <p>Initialisiere Keycloak...</p>;
}

export default App;
