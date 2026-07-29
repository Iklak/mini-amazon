const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/order.route");
const adminRouter = require("./routes/admin.route");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "mini amzon api is running",
  });
});

app.use((err, req, res, next) => {
  console.log("========== EXPRESS ERROR ==========");
  console.error(err);
  console.log("===================================");

  res.status(500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
