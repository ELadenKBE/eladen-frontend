import React, { useEffect, useState } from 'react';
import Product from './Product/Product';
import './ProductFrame.scss';
import { gql, useMutation, useQuery } from '@apollo/client';

interface ProductFrameProps {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  priceRange: { min: number | null; max: number | null };
  availability: boolean;
  isSorted: string; // Can be 'ascending' or 'descending'
  setIsSorted: (value: 'ascending' | 'descending') => void;
}

interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}

const GET_PRODUCTS_QUERY = gql`
  {
    goods {
      id
      title
      description
      category {
        id
      }
      price
      image
      manufacturer
      amount
    }
  }
`;

const ADD_GOOD_TO_CART_MUTATION = gql`
  mutation AddGoodToCart($goodId: Int) {
    addGoodToCart(goodId: $goodId) {
      id
    }
  }
`;

const ProductFrame: React.FC<ProductFrameProps> = ({
  cartProducts,
  setCartProducts,
  priceRange,
  isSorted,
}: ProductFrameProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, error, data } = useQuery(GET_PRODUCTS_QUERY);

  useEffect(() => {
    if (sessionStorage.getItem('products')) {
      setProducts(JSON.parse(sessionStorage.getItem('products') as string));
    } else {
      if (!loading && !error && data) {
        sessionStorage.setItem('products', JSON.stringify(data.goods));
        setProducts(data.goods);
      }
    }
  }, [loading, error, data]);

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

  const filteredProducts = products.filter((product) => {
    const productPrice = parseFloat(
      product.price.replace(/€/g, '').replace(/,/g, '.'),
    );

    if (priceRange.min === null || priceRange.max === null) {
      return true;
    }

    return productPrice >= priceRange.min && productPrice <= priceRange.max;
  });

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
          isAddedToCart={cartProducts.some((item) => item.id === product.id)}
        />
      ))}
    </div>
  );
};

export default ProductFrame;
