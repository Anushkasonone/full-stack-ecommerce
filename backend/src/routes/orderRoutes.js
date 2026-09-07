const express = require("express");

const {
    createOrder,
    getMyOrders
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create order from cart
router.post("/", protect, createOrder);

// Get my orders
router.get("/", protect, getMyOrders);

module.exports = router;