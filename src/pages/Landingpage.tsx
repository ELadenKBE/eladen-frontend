import LoginForm from '../components/Navbar/LoginForm/LoginForm';
import Sidebar from '../components/Navbar/Sidebar/Sidebar';
import ProductFrame from '../components/ProductFrame/ProductFrame';

interface LandingpageProps {
  isLoginFormRendered: boolean;
  isSidebarRendered: boolean;
  subToken: string;
  cartProducts: any;
  setCartProducts: any;
  availability: any;
  priceRange: any;
  setPriceRange: any;
  setAvailability: any;
  isSorted:any;
  setIsSorted:any;
}

const Landingpage = ({
  isLoginFormRendered,
  cartProducts,
  setCartProducts,
  availability,
  priceRange,
  setPriceRange,
  setAvailability,
  isSorted,
  setIsSorted
}: LandingpageProps) => {
  return (
    <>
      <Sidebar
        setAvailability={setAvailability}
        setPriceRange={setPriceRange}
        availability={availability}
        priceRange={priceRange}
        isSorted={isSorted}
        setIsSorted={setIsSorted}
      />
      {isLoginFormRendered && <LoginForm />}
      <ProductFrame
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
        availability={availability}
        priceRange={priceRange}
        isSorted={isSorted}
        setIsSorted={setIsSorted}
      />
    </>
  );
};

export default Landingpage;
