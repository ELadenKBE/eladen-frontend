import React, { useState } from 'react';
import './Product.scss';

interface ProductProps {
  id: number;
  description: string;
  price: string;
  image: string;
  onAddToCart: () => void;
  isAddedToCart: boolean;
}

const Product: React.FC<ProductProps> = ({
  description,
  price,
  image,
  onAddToCart,
  isAddedToCart,
}: ProductProps) => {
  // State to track whether the product is being hovered
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Handles the hover event on the product
   */
  const handleHover = () => {
    setIsHovered(true);
  };

  /**
   * Handles the mouse leave event on the product
   */
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`product ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && !isAddedToCart && (
        <button className="add-to-cart-button" onClick={onAddToCart}>
          Warenkorb
        </button>
      )}
      <div className="product-info">
        <div className="product-description">{description}</div>
        <div className="product-price">{price}</div>
      </div>
      <img className="product-image" src={image} alt="Product" />
    </div>
  );
};

export default Product;
