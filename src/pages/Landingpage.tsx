import { gql, useMutation } from '@apollo/client';
import LoginForm from '../components/Navbar/LoginForm/LoginForm';
import Sidebar from '../components/Navbar/Sidebar/Sidebar';
import ProductFrame from '../components/ProductFrame/ProductFrame';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
  subToken,
}: LandingpageProps) => {
  const CREATE_USER_MUTATION = gql`
    mutation CreateUser(
      $username: String!
      $email: String!
      $role: Int!
      $sub: String!
    ) {
      createUser(username: $username, email: $email, role: $role, sub: $sub) {
        id
        username
        email
      }
    }
  `;
  const [_loading, setLoading] = useState(false);
  const [_error, setError] = useState(null);
  const [_data, setData] = useState(null);

  const [createUserMutation] = useMutation(CREATE_USER_MUTATION);
  useEffect(() => {
    const executeMutation = async () => {
      if (!sessionStorage.getItem('mutationCalled')) {
        try {
          setLoading(true);
          const { data } = await createUserMutation({
            variables: {
              username: uuidv4(),
              email: 'email@gmail.com',
              role: 1,
              sub: subToken,
            },
          });
          setData(data.createUser);
          sessionStorage.setItem('mutationCalled', 'true');
          setLoading(false);
        } catch (error: any) {
          setError(error);
          setLoading(false);
        }
      }
    };

    executeMutation();
  }, [createUserMutation]);

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
