import { useQuery, gql } from '@apollo/client';
import Product from './Product/Product';
import './ProductFrame.scss';

const GET_PRODUCTS = gql`
  query {
    goods {
      id
      title
      description
      address
      url
      price
      category {
        id
        title
      }
      seller {
        id
        username
        email
      }
      image
    }
  }
`;

interface ProductFrameProps {}

interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}

const ProductFrame = ({}: ProductFrameProps) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  const products: Product[] = data.goods.map((product: any) => ({
    id: product.id,
    description: product.description,
    price: product.price,
    image: product.url,
  }));

  return (
    <div className="product-container">
      {products.map((product) => (
        <Product
          key={product.id}
          description={product.description}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};
export default ProductFrame;
