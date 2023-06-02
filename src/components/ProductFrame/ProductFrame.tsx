import Product from './Product/Product';
import './ProductFrame.scss';
import products from './products.json';

interface ProductFrameProps {}

interface Product {
  description: string;
  price: string;
  image: string;
}
const ProductFrame = ({}: ProductFrameProps) => {
  //TODO: We are just importing a mock json right now, we have to fetch the products from the api later

  return (
    <div className="product-container">
      {products.map((product, index) => (
        <Product
          key={index}
          description={product.description}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default ProductFrame;
