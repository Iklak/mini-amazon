const express = require("express");

const router = express.Router();
const {
  createOrder,
  getOrder,
  getOrderById,
  cancelOrder,
} = require("../controllers/order.controller");
const protected = require("../middlewares/auth.middleware");

router.post("/", protected, createOrder);

router.get("/", protected, getOrder);
router.get("/:id", protected, getOrderById);
router.put("/:id/cancel", protected, cancelOrder);
module.exports = router;
