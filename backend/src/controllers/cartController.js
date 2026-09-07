const { Cart, CartItem, Product } = require("../models");

// GET MY CART
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            where: { userId: req.user.id },
            include: {
                model: CartItem,
                include: {
                    model: Product,
                    attributes: [
                        "id",
                        "name",
                        "price",
                        "image",
                        "stock"
                    ]
                }
            }
        });

        // Create cart if user doesn't have one
        if (!cart) {
            cart = await Cart.create({
                userId: req.user.id
            });

            cart = await Cart.findByPk(cart.id, {
                include: {
                    model: CartItem,
                    include: {
                        model: Product,
                        attributes: [
                            "id",
                            "name",
                            "price",
                            "image",
                            "stock"
                        ]
                    }
                }
            });
        }

        res.json({
            success: true,
            cart
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch cart"
        });
    }
};


// ADD PRODUCT TO CART
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "productId is required"
            });
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const qty = quantity || 1;

        if (qty <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than 0"
            });
        }

        let cart = await Cart.findOne({
            where: { userId: req.user.id }
        });

        if (!cart) {
            cart = await Cart.create({
                userId: req.user.id
            });
        }

        let cartItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                productId
            }
        });

        if (cartItem) {
            cartItem.quantity += qty;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({
                cartId: cart.id,
                productId,
                quantity: qty
            });
        }

        res.status(201).json({
            success: true,
            message: "Product added to cart",
            cartItem
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to add product to cart"
        });
    }
};


// UPDATE CART ITEM
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than 0"
            });
        }

        const cartItem = await CartItem.findByPk(
            req.params.itemId,
            {
                include: {
                    model: Cart
                }
            }
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        if (cartItem.Cart.userId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You cannot modify this cart item"
            });
        }

        cartItem.quantity = quantity;

        await cartItem.save();

        res.json({
            success: true,
            message: "Cart quantity updated",
            cartItem
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update cart item"
        });
    }
};


// REMOVE CART ITEM
const removeFromCart = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(
            req.params.itemId,
            {
                include: {
                    model: Cart
                }
            }
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        if (cartItem.Cart.userId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You cannot remove this cart item"
            });
        }

        await cartItem.destroy();

        res.json({
            success: true,
            message: "Product removed from cart"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to remove product from cart"
        });
    }
};


module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
};