import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/order";

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createOrder({
        shippingAddress,
        paymentMethod,
      });

      alert(data.message);

      navigate("/orders");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Shipping Address</label>

          <textarea
            rows="4"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter your full address"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Payment Method</label>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="ONLINE">Online Payment</option>
          </select>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
