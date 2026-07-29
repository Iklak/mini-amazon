const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartQuntity,
  removeFromCart,
} = require("../controllers/cart.controller");
const protected = require("../middlewares/auth.middleware");

router.post("/", protected, addToCart);
router.get("/", protected, getCart);
router.put("/:id", protected, updateCartQuntity);
router.delete("/:productId", protected, removeFromCart);

module.exports = router;
