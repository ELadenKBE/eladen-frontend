import { useParams } from 'react-router-dom';
import productsJson from '../components/ProductFrame/products.json';
import './Searchpage.scss';
import ProductInfo from '../components/ProductInfo/ProductInfo';
import Sidebar from '../components/Navbar/Sidebar/Sidebar';

interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}

interface SearchpageProps {
  cartProducts: any;
  setCartProducts: any;
  availability: any;
  priceRange: any;
  setPriceRange: any;
  setAvailability: any;
  isSorted: string; // Can be 'ascending' or 'descending'
  setIsSorted: (value: string) => void;
}

const Searchpage = ({
  cartProducts,
  setCartProducts,
  availability,
  priceRange,
  setPriceRange,
  setAvailability,
  isSorted,
  setIsSorted,
}: SearchpageProps) => {
  const handleAddToCart = (product: Product) => {
    setCartProducts([...cartProducts, product]);
  };

  const { query } = useParams();
  const searchTerm = query!.toLowerCase(); // Convert the search term to lowercase for case-insensitive matching.

  // Filter products based on the search term and price range
  const filteredProducts = productsJson.filter((product: Product) => {
    const productPrice = parseFloat(
      product.price.replace(/€/g, '').replace(/,/g, '.'),
    );

    const searchTermMatches = product.description
      .toLowerCase()
      .includes(searchTerm);

    if (priceRange.min === null || priceRange.max === null) {
      // If either min or max is null, do not apply price filtering
      return searchTermMatches;
    }

    const priceInRange =
      productPrice >= priceRange.min && productPrice <= priceRange.max;

    return searchTermMatches && priceInRange;
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
    <div className="searchpage">
      <Sidebar
        availability={availability}
        priceRange={priceRange}
        setAvailability={setAvailability}
        setPriceRange={setPriceRange}
        isSorted={isSorted}
        setIsSorted={setIsSorted}
      />

      <div className="searchpage-products">
        {/* Map through the sorted products and render the ProductInfo component */}
        {sortedProducts.map((product: Product) => (
          <ProductInfo
            key={product.id}
            product={product}
            quantity={1} // Set the initial quantity to 1 (you can change this as needed)
            onQuantityChange={() => {
              // Handle quantity change if needed
            }}
            cartView={false}
            onAddToCart={() => handleAddToCart(product)}
            isAddedToCart={cartProducts.some(
              (item: Product) => item.id === product.id,
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Searchpage;
