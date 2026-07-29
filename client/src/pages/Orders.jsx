import { useEffect, useState } from "react";
import { getOrders } from "../services/order";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <h1 className="text-center text-3xl mt-20">Loading...</h1>;
  }

  if (orders.length === 0) {
    return <h1 className="text-center text-3xl mt-20">No Orders Found 📦</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="border rounded-xl p-6 shadow mb-6">
          <div className="flex justify-between">
            <h2 className="font-bold">Order ID: {order._id}</h2>

            <span className="font-semibold text-blue-600">
              {order.orderStatus}
            </span>
          </div>

          <p className="mt-2">Total: ₹{order.totalAmount.toLocaleString()}</p>

          <p>Payment: {order.paymentMethod}</p>

          <p>Address: {order.shippingAddress}</p>

          <div className="mt-4">
            {order.products.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-t py-3"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded"
                />

                <div>
                  <h3 className="font-bold">{item.product.title}</h3>

                  <p>₹{item.price}</p>

                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
