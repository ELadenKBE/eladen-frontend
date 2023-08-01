import LoginForm from '../components/Navbar/LoginForm/LoginForm';
import Sidebar from '../components/Navbar/Sidebar/Sidebar';
import ProductFrame from '../components/ProductFrame/ProductFrame';

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

interface LandingpageProps {
  isLoginFormRendered: boolean;
  isSidebarRendered: boolean;
  subToken: string;
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  availability: boolean;
  priceRange: PriceRange;
  setPriceRange: React.Dispatch<React.SetStateAction<PriceRange>>;
  setAvailability: React.Dispatch<React.SetStateAction<boolean>>;
  isSorted: string;
  setIsSorted: React.Dispatch<React.SetStateAction<string>>;
}

// Landingpage component
const Landingpage: React.FC<LandingpageProps> = ({
  isLoginFormRendered,
  cartProducts,
  setCartProducts,
  availability,
  priceRange,
  setPriceRange,
  setAvailability,
  isSorted,
  setIsSorted,
}: LandingpageProps) => {
  return (
    <>
      {/* Sidebar component */}
      <Sidebar
        setAvailability={setAvailability}
        setPriceRange={setPriceRange}
        availability={availability}
        priceRange={priceRange}
        isSorted={isSorted}
        setIsSorted={setIsSorted}
      />

      {/* Conditionally render the LoginForm */}
      {isLoginFormRendered && <LoginForm />}

      {/* ProductFrame component */}
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
