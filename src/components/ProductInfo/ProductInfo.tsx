import './ProductInfo.scss';

interface Product {
  id: number;
  description: string;
  price: string;
  image: string;
}

interface ProductInfoProps {
  product: Product;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onRemoveFromCart?: any;
  cartView: boolean;
  onAddToCart?: any;
  isAddedToCart?: any;
}

const ProductInfo = ({
  product,
  quantity,
  onQuantityChange,
  onRemoveFromCart,
  cartView,
  onAddToCart,
  isAddedToCart,
}: ProductInfoProps) => {
  const parsePrice = (priceString: string) => {
    const numericString = priceString.replace(/€/g, '').replace(/,/g, '.');
    return parseFloat(numericString);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onQuantityChange(parseInt(e.target.value));
  };

  const productPrice = (parsePrice(product.price) * quantity).toFixed(2);

  return (
    <div key={product.id} className="cart-product">
      <img
        className="cart-product-image"
        src={product.image}
        alt={product.description}
      />
      <div className="cart-product-description">{product.description}</div>
      {cartView && (
        <div className="cart-product-amount">
          <select defaultValue="1" onChange={handleQuantityChange}>
            {[...Array(10).keys()].map((value) => (
              <option key={value + 1} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="cart-child-container">
        <div className="cart-product-price">{productPrice}</div>
        {cartView ? (
          <button
            className="cart-product-button"
            onClick={() => onRemoveFromCart(product.id)}
          >
            Entfernen
          </button>
        ) : (
          !isAddedToCart && (
            <button
              className="cart-product-button"
              onClick={() => onAddToCart()}
            >
              In den Warenkorb
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
