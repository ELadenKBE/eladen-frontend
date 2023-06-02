import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Landingpage from './pages/Landingpage';
import Searchpage from './pages/Searchpage';
import Cartpage from './pages/Cartpage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { useState } from 'react';

function App() {
  const [isLoginFormRendered, setLoginFormRendered] = useState<boolean>(false);
  const [isSidebarRendered, setIsSidebarRendered] = useState<boolean>(false);

  return (
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
              />
            }
          ></Route>
          <Route path="/search" element={<Searchpage />}></Route>
          <Route path="/cart" element={<Cartpage />}></Route>
        </Routes>
      </div>
      <Footer
        isLoginFormRendered={isLoginFormRendered}
        setIsLoginFormRendered={setLoginFormRendered}
        isSidebarRendered={isSidebarRendered}
        setIsSidebarRendered={setIsSidebarRendered}
      />
    </div>
  );
}

export default App;
