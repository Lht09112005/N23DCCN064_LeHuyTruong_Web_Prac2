const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Swagger
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Order Service API",
      version: "1.0.0",
      description: "API quản lý đơn hàng - Lab 2",
    },
    servers: [{ url: "http://localhost:3002", description: "Development" }],
    components: {
      schemas: {
        OrderItem: {
          type: "object",
          properties: {
            productId: { type: "integer", example: 1 },
            productName: { type: "string", example: "iPhone 15 Pro" },
            price: { type: "number", example: 27990000 },
            quantity: { type: "integer", example: 1 },
            subtotal: { type: "number", example: 27990000 },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0d1" },
            orderCode: { type: "string", example: "ORD-20260409-0001" },
            customerId: { type: "integer", example: 1 },
            customerName: { type: "string", example: "Nguyễn Văn A" },
            customerEmail: { type: "string", example: "test@gmail.com" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
            totalAmount: { type: "number", example: 27990000 },
            status: {
              type: "string",
              enum: [
                "pending",
                "confirmed",
                "shipping",
                "delivered",
                "cancelled",
              ],
            },
            shippingAddress: {
              type: "object",
              properties: {
                street: { type: "string" },
                city: { type: "string" },
                district: { type: "string" },
              },
            },
            note: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
});

// Health check
app.get("/health", (req, res) =>
  res.json({
    status: "ok",
    service: process.env.SERVICE_NAME,
    uptime: process.uptime(),
  }),
);

// Routes
app.use("/api/orders", orderRoutes);

// Error Handler
// Error Handler
app.use(function (err, req, res, next) {
  console.error(err);
  return res.status(500).json({
    success: false,
    message: err.message || "Lỗi hệ thống",
  });
});

module.exports = app;
