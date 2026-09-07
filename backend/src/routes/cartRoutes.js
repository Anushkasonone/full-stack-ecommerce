const express = require("express");

const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get my cart
router.get("/", protect, getCart);

// Add product to cart
router.post("/", protect, addToCart);

// Update cart item quantity
router.put("/:itemId", protect, updateCartItem);

// Remove product from cart
router.delete("/:itemId", protect, removeFromCart);

module.exports = router;