const express = require("express");
const router = express.Router();
const {
  getAllOrder,
  updateOrderStatus,
  getDashboardStats,
} = require("../controllers/admin.controller");
const admin = require("../middlewares/admin.middlewares");
const protected = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const { createProduct } = require("../controllers/product.controller");

router.get("/dashboard", protected, admin, getDashboardStats);
router.get("/orders", protected, admin, getAllOrder);
router.put("/orders/:id/status", protected, admin, updateOrderStatus);
router.post(
  "/products",
  protected,
  admin,
  upload.single("image"),
  createProduct,
);
module.exports = router;
