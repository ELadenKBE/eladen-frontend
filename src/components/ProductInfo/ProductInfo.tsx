import React from 'react';
import './ProductInfo.scss';

interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}

interface ProductInfoProps {
  product: Product;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onRemoveFromCart?: (productId: number) => void;
  cartView: boolean;
  onAddToCart?: () => void;
  isAddedToCart?: boolean;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  quantity,
  onQuantityChange,
  onRemoveFromCart,
  cartView,
  onAddToCart,
  isAddedToCart,
}: ProductInfoProps) => {
  /**
   * Parses the price string and returns a numeric value
   * @param priceString - The price string to be parsed
   * @returns The numeric value of the price
   */
  const parsePrice = (priceString: string): number => {
    const numericString = priceString.replace(/€/g, '').replace(/,/g, '.');
    return parseFloat(numericString);
  };

  /**
   * Handles the change in quantity for the product
   * @param e - The change event of the quantity select element
   */
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onQuantityChange(parseInt(e.target.value));
  };

  // Calculate the total price for the product based on quantity
  const productPrice = (parsePrice(product.price) * quantity).toFixed(2);

  return (
    <div key={product.id} className="cart-product">
      <img
        className="cart-product-image"
        src={product.image}
        alt={product.description}
      />
      <div className="cart-product-description">{product.description}</div>
      {cartView && (
        <div className="cart-product-amount">
          <select defaultValue="1" onChange={handleQuantityChange}>
            {[...Array(10).keys()].map((value) => (
              <option key={value + 1} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="cart-child-container">
        <div className="cart-product-price">{productPrice}</div>
        {cartView ? (
          <button
            className="cart-product-button"
            onClick={() => onRemoveFromCart?.(product.id)}
          >
            Entfernen
          </button>
        ) : (
          <button
            className={`cart-product-button ${isAddedToCart ? 'hidden' : ''}`}
            onClick={() => onAddToCart?.()}
          >
            Warenkorb
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
