import './Product.scss';
interface ProductProps {
  description: string;
  price: string;
  image: string;
}

const Product = ({ description, price, image }: ProductProps) => {
  return (
    <div className="product">
      <div className="product-info">
        <div className="product-description">{description}</div>
        <div className="product-price">{price}</div>
      </div>
      <img className="product-image" src={image}></img>
    </div>
  );
};

export default Product;
