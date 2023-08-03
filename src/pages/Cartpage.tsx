import { useState } from 'react';
import './Cartpage.scss';
import ProductInfo from '../components/ProductInfo/ProductInfo';
import { gql, useMutation } from '@apollo/client';
import PaymentStatus from '../components/PaymentStatus/PaymentStatus';

// Define the type for the product
interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}

// Define the type for the CartpageProps
interface CartpageProps {
  cartProducts: Product[];
  onRemoveFromCart: (id: number) => void;
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Cartpage: React.FC<CartpageProps> = ({
  cartProducts,
  onRemoveFromCart,
  setCartProducts,
}: CartpageProps) => {
  // Define the mutation query

  // Function to parse the price from a string
  const parsePrice = (priceString: string): number => {
    const numericString = priceString.replace(/€/g, '').replace(/,/g, '.');
    return parseFloat(numericString);
  };

  // State to manage the quantity of each product in the cart
  const [quantity, setQuantity] = useState<number[]>(cartProducts.map(() => 1));
  const [paid, setPaid] = useState<boolean>(false);

  // Function to handle quantity change for a product
  const handleQuantityChange = (index: number, value: number): void => {
    const newQuantity = [...quantity];
    newQuantity[index] = value;
    setQuantity(newQuantity);
  };

  // Calculate the total price of all products in the cart
  const totalPrice = cartProducts.reduce(
    (total, product, index) =>
      total + parsePrice(product.price) * quantity[index],
    0,
  );

  //Get current timestamp in correct format for the mutation
  const getCurrentTimestamp = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const currentTimestamp = getCurrentTimestamp();
  //Mutation to create the order
  const CREATE_ORDER_MUTATION = gql`
    mutation CreateOrder($timeOfOrder: String, $deliveryAddress: String) {
      createOrder(
        timeOfOrder: $timeOfOrder
        deliveryAddress: $deliveryAddress
      ) {
        id
        paymentStatus
      }
    }
  `;
  const [createOrderMutation] = useMutation(CREATE_ORDER_MUTATION);

  // Function to handle the payment and clear the cart
  const handlePayment = async (): Promise<void> => {
    try {
      // Execute the mutation with the specified variables
      const {} = await createOrderMutation({
        variables: {
          timeOfOrder: currentTimestamp,
          deliveryAddress: 'irgendwohalt',
        },
      });
      // Clear the cart after successful payment
      setCartProducts([]);
      setPaid(true);
    } catch (error) {
      // Handle the error if the mutation fails
      console.error('Failed to create the order:', error);
    }
  };

  return (
    <div className="cartpage">
      <div className="cart-product-container">
        <h2 className="cart-headline">
          Warenkorb ({cartProducts.length} Produkte)
        </h2>

        {cartProducts.map((product, index) => (
          <ProductInfo
            key={product.id}
            product={product}
            quantity={quantity[index]}
            onQuantityChange={(value) => handleQuantityChange(index, value)}
            onRemoveFromCart={onRemoveFromCart}
            cartView={true}
          />
        ))}
      </div>
      <div className="cart-checkout">
        <h3>Bestellung</h3>
        <p className="cart-total-text">
          Total: {'\n'}€{totalPrice.toFixed(2)}
        </p>
        <button className="checkout-button" onClick={handlePayment}>
          Jetzt bezahlen
        </button>
        {paid && <PaymentStatus hasCheckedOut={paid} />}
      </div>
    </div>
  );
};

export default Cartpage;
