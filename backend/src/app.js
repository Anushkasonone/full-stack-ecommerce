const express = require("express");
const cors = require("cors");


const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "E-Commerce API is running 🚀"
    });
});

// Auth routes
app.use(
    "/api/auth",
    authRoutes
);

// Product routes
app.use(
    "/api/products",
    productRoutes
);

// Category routes
app.use(
    "/api/categories",
    categoryRoutes
);
app.use(
    "/api/cart",
    cartRoutes
);
app.use(
    "/api/orders",
    orderRoutes
);
module.exports = app;