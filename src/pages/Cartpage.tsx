import { useState } from 'react';
import './Cartpage.scss';
import ProductInfo from '../components/ProductInfo/ProductInfo';

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
  // Function to parse the price from a string
  const parsePrice = (priceString: string): number => {
    const numericString = priceString.replace(/€/g, '').replace(/,/g, '.');
    return parseFloat(numericString);
  };

  // State to manage the quantity of each product in the cart
  const [quantity, setQuantity] = useState<number[]>(cartProducts.map(() => 1));

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

  // Function to handle the payment and clear the cart
  const handlePayment = (): void => {
    setCartProducts([]);
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
      </div>
    </div>
  );
};

export default Cartpage;
