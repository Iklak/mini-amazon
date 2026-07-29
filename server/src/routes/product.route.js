const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middlewares");
const upload = require("../middlewares/upload.middleware");

// Public Routes
router.get("/", getProduct);
router.get("/:id", getProductById);

// Admin Routes
router.post("/", protect, admin, upload.single("image"), createProduct);

router.put("/:id", protect, admin, upload.single("image"), updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
