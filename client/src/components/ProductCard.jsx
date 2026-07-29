import { Link } from "react-router-dom";
import { addToCart } from "../services/cart";

function ProductCard({ product }) {
  const handleAddTocart = async () => {
    try {
      const data = await addToCart(product._id);
      alert(data.message);
    } catch (error) {
      alert(error.response?.data?.message || "failed to add to cart");
    }
  };
  return (
    <div className="bg-white">
      <img
        src={product.images[0]}
        alt={product.title}
        className="h-56 w-full object-cover rounded-lg"
      />
      <h2 className="text-xl font-bold mt-4">{product.title}</h2>
      <p className="text-gray-500">{product.brand}</p>
      <p className="text-2xl font-bold text-green-600 mt-2">{product.price}</p>
      <div className="flex gap-3 mt-5">
        <Link
          to={`/products/${product._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          View
        </Link>
        <button
          className="bg-yellow-400 px-4 py-2 rounded-lg"
          onClick={handleAddTocart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
