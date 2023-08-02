import { useParams } from 'react-router-dom';
import './Searchpage.scss';
import ProductInfo from '../components/ProductInfo/ProductInfo';
import Sidebar from '../components/Navbar/Sidebar/Sidebar';
import { gql, useMutation } from '@apollo/client';

interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}
type PriceRange = {
  min: number;
  max: number;
};

interface SearchpageProps {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  availability: boolean;
  priceRange: PriceRange;
  setPriceRange: React.Dispatch<React.SetStateAction<PriceRange>>;
  setAvailability: React.Dispatch<React.SetStateAction<boolean>>;
  isSorted: string;
  setIsSorted: React.Dispatch<React.SetStateAction<string>>;
}

const Searchpage: React.FC<SearchpageProps> = ({
  cartProducts,
  setCartProducts,
  availability,
  priceRange,
  setPriceRange,
  setAvailability,
  isSorted,
  setIsSorted,
}: SearchpageProps) => {
  // Function to handle adding a product to the cart

  const ADD_GOOD_TO_CART_MUTATION = gql`
    mutation AddGoodToCart($goodId: Int) {
      addGoodToCart(goodId: $goodId) {
        id
      }
    }
  `;

  // Define the mutation function and its loading, error, and data states
  const [addToCartMutation] = useMutation(ADD_GOOD_TO_CART_MUTATION);

  // Function to handle adding a product to the cart with the mutation invocation
  const handleAddToCart = async (product: Product) => {
    try {
      // Execute the mutation with the product's id
      const { data } = await addToCartMutation({
        variables: {
          goodId: Number(product.id),
        },
      });

      // You can process the response data if needed
      console.log(data);

      // Update the cart products state with the newly added product
      setCartProducts([...cartProducts, product]);
    } catch (error) {
      // Handle the error if the mutation fails
      console.error('Failed to add the product to the cart:', error);
    }
  };

  const { query } = useParams();
  const searchTerm = query?.toLowerCase() || '';

  // Retrieve products from sessionStorage and parse the JSON
  const storedProducts = sessionStorage.getItem('products');
  const products: Product[] = storedProducts ? JSON.parse(storedProducts) : [];

  // Filter products based on the search term and price range
  const filteredProducts = products.filter((product: Product) => {
    const productPrice = parseFloat(
      product.price.replace(/€/g, '').replace(/,/g, '.'),
    );

    const searchTermMatches = product.description
      .toLowerCase()
      .includes(searchTerm);

    if (priceRange.min === null || priceRange.max === null) {
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
      return 0;
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
            quantity={1}
            onQuantityChange={() => {}}
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
