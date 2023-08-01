import { useState } from 'react';
import './Cartpage.scss';

interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}

interface CartpageProps {
  cartProducts: Product[];
  onRemoveFromCart: (id: number) => void;
}

const Cartpage = ({ cartProducts, onRemoveFromCart }: CartpageProps) => {
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

  return (
    <div className="cartpage">
      <div className="cart-product-container">
        <h2 className="cart-headline">
          Warenkorb ({cartProducts.length} Produkte)
        </h2>

        {cartProducts.map((product, index) => (
          <div key={product.id} className="cart-product">
            <img
              className="cart-product-image"
              src={product.image}
              alt={product.description}
            />
            <div className="cart-product-description">
              {product.description}
            </div>
            <div className="cart-product-amount">
              <select
                defaultValue="1"
                onChange={(e) =>
                  handleQuantityChange(index, parseInt(e.target.value))
                }
              >
                {[...Array(10).keys()].map((value) => (
                  <option key={value + 1} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="cart-product-price-remove-container">
              <div className="cart-product-price">
                {(parsePrice(product.price) * quantity[index]).toFixed(2)}
              </div>
              <button
                className="cart-product-remove"
                onClick={() => onRemoveFromCart(product.id)}
              >
                Entfernen
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-checkout">
        <h3>Bestellung</h3>
        <p className="cart-total-text">
          Total: {'\n'}€{totalPrice.toFixed(2)}
        </p>
        <button className="checkout-button">Jetzt bezahlen</button>
      </div>
    </div>
  );
};

export default Cartpage;
