import LoginForm from '../components/Navbar/LoginForm/LoginForm';
import Sidebar from '../components/Navbar/Sidebar/Sidebar';
import ProductFrame from '../components/ProductFrame/ProductFrame';

interface LandingpageProps {
  isLoginFormRendered: boolean;
  isSidebarRendered: boolean;
  subToken: string;
  cartProducts: any;
  setCartProducts: any;
}

const Landingpage = ({
  isLoginFormRendered,
  isSidebarRendered,
  cartProducts,
  setCartProducts,
}: LandingpageProps) => {
  return (
    <>
      {isSidebarRendered && <Sidebar />}
      {isLoginFormRendered && <LoginForm />}
      <ProductFrame
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
      />
    </>
  );
};

export default Landingpage;
