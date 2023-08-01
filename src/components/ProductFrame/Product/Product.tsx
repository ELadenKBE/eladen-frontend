import { useState } from 'react';
import './Product.scss';

interface ProductProps {
  id: number;
  description: string;
  price: string;
  image: string;
  onAddToCart: () => void;
  isAddedToCart: boolean;
}

const Product = ({
  description,
  price,
  image,
  onAddToCart,
  isAddedToCart,
}: ProductProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

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
          Add to Cart
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
