const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productid required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    let cartItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
      return res.status(200).json({
        success: true,
        message: "cart quantity updated",
      });
    }
    cartItem = await Cart.create({
      user: userId,
      product: productId,
      quantity: 1,
    });
    return res.status(201).json({
      success: true,
      message: "product added to cart",
      cartItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      seccess: false,
      message: "internal server error",
    });
  }
};
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.find({
      user: userId,
    }).populate("product");
    return res.status(200).json({
      success: true,
      totalItem: cart.length,
      cart,
    });
  } catch (error) {
    console.error(error);
  }
};
const updateCartQuntity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "quatity must be atleast 1",
      });
    }
    const cartItem = await Cart.findOne({
      user: userId,
      productId: productId,
    });
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        messege: "cart item not found",
      });
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    return res.status(200).json({
      success: true,
      message: "cart updated sucess fully",
      cartItem,
    });
  } catch (error) {
    console.log(error);
  }
};
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cartItem = await Cart.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartQuntity,
  removeFromCart,
};
