const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") || "*" }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Middleware xác thực JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "Chưa đăng nhập" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

// Health check
app.get("/health", (req, res) => res.json({ status: "ok", gateway: true }));

// Route public: Auth Service (không cần xác thực)
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
  }),
);

// Route public: Products (GET không cần xác thực)
app.use(
  "/api/products",
  createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
  }),
);

// Route protected: Orders (cần xác thực)
app.use(
  "/api/orders",
  authenticate,
  createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL,
    changeOrigin: true,
  }),
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API Gateway running on port ${PORT}`));
