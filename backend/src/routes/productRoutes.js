const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// CREATE PRODUCT
router.post(
    "/",
    protect,
    upload.single("image"),
    createProduct
);

// GET ALL PRODUCTS
router.get(
    "/",
    getProducts
);

// GET PRODUCT BY ID
router.get(
    "/:id",
    getProductById
);

// UPDATE PRODUCT
router.put(
    "/:id",
    protect,
    updateProduct
);

// DELETE PRODUCT
router.delete(
    "/:id",
    protect,
    deleteProduct
);

module.exports = router;