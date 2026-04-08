const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrdersByCustomer,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", async (req, res) => {
  await createOrder(req, res);
});

router.get("/customer/:customerId", async (req, res) => {
  await getOrdersByCustomer(req, res);
});

router.get("/:id", async (req, res) => {
  await getOrderById(req, res);
});

router.patch("/:id/status", async (req, res) => {
  await updateOrderStatus(req, res);
});

module.exports = router;
