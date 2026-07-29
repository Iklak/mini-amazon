import { useEffect, useState } from "react";
import { getCart, updateCart, removeCartItem } from "../services/cart";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      console.log(data);

      setCart(data.cart);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCart(productId, quantity);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async (productId) => {
    try {
      const data = await removeCartItem(productId);

      alert(data.message);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  const total = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <h1 className="text-center text-3xl mt-20">Loading...</h1>;
  }

  if (cart.length === 0) {
    return (
      <h1 className="text-center text-3xl mt-20">Your Cart is Empty 🛒</h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-6 border rounded-xl p-5 mb-5 shadow"
        >
          <img
            src={
              item.product.images?.[0] ||
              "https://placehold.co/150x150?text=No+Image"
            }
            alt={item.product.title}
            className="w-32 h-32 object-cover rounded-lg"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold">{item.product.title}</h2>

            <p className="text-gray-500">{item.product.brand}</p>

            <p className="text-green-600 text-xl font-bold">
              ₹{item.product.price}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() =>
                  handleQuantity(item.product._id, item.quantity - 1)
                }
                className="bg-gray-300 px-3 py-1 rounded"
              >
                -
              </button>

              <span className="font-bold">{item.quantity}</span>

              <button
                onClick={() =>
                  handleQuantity(item.product._id, item.quantity + 1)
                }
                className="bg-gray-300 px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => handleRemove(item.product._id)}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-10 border-t pt-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">
            Total: ₹{total.toLocaleString()}
          </h2>
          <p className="text-gray-500">{cart.length} item(s) in cart</p>
        </div>

        <Link
          to="/checkout"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
