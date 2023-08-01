import { useState } from 'react';
import './Cartpage.scss';
import ProductInfo from '../components/ProductInfo/ProductInfo';

interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}

interface CartpageProps {
  cartProducts: Product[];
  onRemoveFromCart: (id: number) => void;
  setCartProducts: any;
}

const Cartpage = ({
  cartProducts,
  onRemoveFromCart,
  setCartProducts,
}: CartpageProps) => {
  const parsePrice = (priceString: string) => {
    const numericString = priceString.replace(/€/g, '').replace(/,/g, '.');
    return parseFloat(numericString);
  };

  const [quantity, setQuantity] = useState<number[]>(cartProducts.map(() => 1));

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantity = [...quantity];
    newQuantity[index] = value;
    setQuantity(newQuantity);
  };

  const totalPrice = cartProducts.reduce(
    (total, product, index) =>
      total + parsePrice(product.price) * quantity[index],
    0,
  );

  const handlePayment = () => {
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
