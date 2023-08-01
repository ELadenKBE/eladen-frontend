import { useEffect, useState } from 'react';
import Product from './Product/Product';
import './ProductFrame.scss';
import productsJson from './products.json';
interface ProductFrameProps {}

interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}

const ProductFrame = ({}: ProductFrameProps) => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartProducts([...cartProducts, product]);
  };

  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);
  // Mock Data (Replace this with your actual data)

  // Comment out the useEffect block since we're using static data
  // useEffect(() => {
  //   fetch('http://localhost:8000/graphql/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ query: GET_PRODUCTS }),
  //   })
  //     .then((response) => response.json())
  //     .then(({ data, errors }) => {
  //       setLoading(false);
  //       if (errors) {
  //         setError(errors[0].message);
  //         return;
  //       }

  //       const fetchedProducts: Product[] = data.goods.map((product: any) => ({
  //         id: product.id,
  //         description: product.description,
  //         price: product.price,
  //         image: product.url,
  //       }));

  //       setProducts(fetchedProducts);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       setError(error.message);
  //     });
  // }, []);

  // Use the mock data instead of fetched data

  return (
    <div className="product-container">
      {productsJson.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          description={product.description}
          price={product.price}
          image={product.image}
          onAddToCart={() => handleAddToCart(product)}
          isAddedToCart={cartProducts.some((item) => item.id === product.id)}
        />
      ))}
    </div>
  );
};
export default ProductFrame;
