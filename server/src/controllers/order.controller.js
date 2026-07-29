const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod } = req.body;
    const cartItems = await Cart.find({ user: userId }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "cart is emty",
      });
    }
    let totalAmount = 0;
    const products = cartItems.map((item) => {
      totalAmount += item.product.price * item.quantity;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const order = await Order.create({
      user: userId,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await Cart.deleteMany({ user: userId });

    return res.status(201).json({
      success: true,
      message: "order palced successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "internal server errorr",
    });
  }
};
const getOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "inernal server error",
    });
  }
};
const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      user: userId,
    }).populate("products.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const order = await Order.findOne({
      _id: id,
      user: userId,
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found",
      });
    }
    if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "order cant be canceld",
      });
    }
    order.orderStatus = "Cancelled";
    await order.save();
    return res.status(200).json({
      success: true,
      message: "order cancelled successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
module.exports = {
  createOrder,
  getOrder,
  getOrderById,
  cancelOrder,
};
