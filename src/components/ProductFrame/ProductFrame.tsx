import Product from './Product/Product';
import './ProductFrame.scss';
import productsJson from './products.json';

interface ProductFrameProps {
  cartProducts: any;
  setCartProducts: any;
  priceRange: any;
  availability: any;
  isSorted: string; // Can be 'ascending' or 'descending'
  setIsSorted: (value: string) => void;
}

interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}

const ProductFrame = ({
  cartProducts,
  setCartProducts,
  priceRange,
  isSorted,
}: ProductFrameProps) => {
  const handleAddToCart = (product: Product) => {
    setCartProducts([...cartProducts, product]);
  };

  const filteredProducts = productsJson.filter((product) => {
    const productPrice = parseFloat(
      product.price.replace(/€/g, '').replace(/,/g, '.'),
    );

    if (priceRange.min === null || priceRange.max === null) {
      // If either min or max is null, do not apply price filtering
      return true;
    }

    return productPrice >= priceRange.min && productPrice <= priceRange.max;
  });

  // Sort products based on the isSorted state
  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/€/g, '').replace(/,/g, '.'));
    const priceB = parseFloat(b.price.replace(/€/g, '').replace(/,/g, '.'));

    if (isSorted === 'ascending') {
      return priceA - priceB;
    } else if (isSorted === 'descending') {
      return priceB - priceA;
    } else {
      return 0; // If isSorted has an invalid value, do not change the order
    }
  });

  return (
    <div className="product-container">
      {sortedProducts.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          description={product.description}
          price={product.price}
          image={product.image}
          onAddToCart={() => handleAddToCart(product)}
          isAddedToCart={cartProducts.some(
            (item: Product) => item.id === product.id,
          )}
        />
      ))}
    </div>
  );
};

export default ProductFrame;
