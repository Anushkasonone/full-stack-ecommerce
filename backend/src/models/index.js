const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Category → Products
Category.hasMany(Product, {
    foreignKey: "categoryId",
    onDelete: "CASCADE"
});

Product.belongsTo(Category, {
    foreignKey: "categoryId"
});

// User → Cart
User.hasOne(Cart, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Cart.belongsTo(User, {
    foreignKey: "userId"
});

// Cart → CartItems
Cart.hasMany(CartItem, {
    foreignKey: "cartId",
    onDelete: "CASCADE"
});

CartItem.belongsTo(Cart, {
    foreignKey: "cartId"
});

// Product → CartItems
Product.hasMany(CartItem, {
    foreignKey: "productId",
    onDelete: "CASCADE"
});

CartItem.belongsTo(Product, {
    foreignKey: "productId"
});

// User → Orders
User.hasMany(Order, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Order.belongsTo(User, {
    foreignKey: "userId"
});

// Order → OrderItems
Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    onDelete: "CASCADE"
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId"
});

// Product → OrderItems
Product.hasMany(OrderItem, {
    foreignKey: "productId",
    onDelete: "CASCADE"
});

OrderItem.belongsTo(Product, {
    foreignKey: "productId"
});

module.exports = {
    User,
    Product,
    Category,
    Cart,
    CartItem,
    Order,
    OrderItem
};