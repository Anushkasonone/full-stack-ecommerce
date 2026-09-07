const {
    Order,
    OrderItem,
    Cart,
    CartItem,
    Product
} = require("../models");

// CREATE ORDER FROM CART
const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: {
                userId: req.user.id
            },
            include: {
                model: CartItem,
                include: {
                    model: Product
                }
            }
        });

        // Check if cart exists
        if (!cart) {
            return res.status(400).json({
                success: false,
                message: "Cart not found"
            });
        }

        // Check if cart is empty
        if (cart.CartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;

        // Calculate total and check stock
        for (const item of cart.CartItems) {

            if (item.quantity > item.Product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `Not enough stock for ${item.Product.name}`
                });
            }

            totalAmount +=
                Number(item.Product.price) * item.quantity;
        }

        // Create order
        const order = await Order.create({
            userId: req.user.id,
            totalAmount: totalAmount,
            status: "pending"
        });

        // Create order items
        for (const item of cart.CartItems) {

            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.Product.price
            });

            // Reduce product stock
            await item.Product.update({
                stock: item.Product.stock - item.quantity
            });
        }

        // Empty cart after successful order
        await CartItem.destroy({
            where: {
                cartId: cart.id
            }
        });

        // Success response
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        });

    } catch (error) {

        console.error("CREATE ORDER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET MY ORDERS
const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.findAll({
            where: {
                userId: req.user.id
            },
            include: {
                model: OrderItem,
                include: {
                    model: Product,
                    attributes: [
                        "id",
                        "name",
                        "price",
                        "image"
                    ]
                }
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });

        res.json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {

        console.error("GET ORDERS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createOrder,
    getMyOrders
};