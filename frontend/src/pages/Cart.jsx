import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Cart.css";

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const response = await api.get("/cart");
            setCart(response.data.cart);
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return;

        try {
            await api.put(`/cart/${itemId}`, {
                quantity: quantity
            });

            fetchCart();
        } catch (error) {
            console.error("UPDATE CART ERROR:", error);
        }
    };

    const removeItem = async (itemId) => {
        try {
            await api.delete(`/cart/${itemId}`);

            fetchCart();
        } catch (error) {
            console.error("REMOVE CART ERROR:", error);
        }
    };

    const placeOrder = async () => {
        try {
            const response = await api.post("/orders");

            alert(response.data.message);

            fetchCart();
        } catch (error) {
            console.error("PLACE ORDER ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to place order"
            );
        }
    };

    if (loading) {
        return <h2>Loading cart...</h2>;
    }

    if (!cart || cart.CartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="empty-cart">
                    <h1>My Cart</h1>
                    <p>Your cart is empty.</p>
                </div>
            </div>
        );
    }

    let total = 0;

    cart.CartItems.forEach((item) => {
        total += Number(item.Product.price) * item.quantity;
    });

    return (
        <div className="cart-page">
            <h1 className="cart-title">My Cart</h1>

            <div className="cart-container">
                {cart.CartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <h2>{item.Product.name}</h2>

                        <p className="cart-price">
                            ₹{item.Product.price}
                        </p>

                        <div className="quantity-controls">
                            <button
                                className="quantity-button"
                                onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity - 1
                                    )
                                }
                            >
                                −
                            </button>

                            <span className="quantity">
                                {item.quantity}
                            </span>

                            <button
                                className="quantity-button"
                                onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity + 1
                                    )
                                }
                            >
                                +
                            </button>
                        </div>

                        <button
                            className="remove-button"
                            onClick={() => removeItem(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <div className="cart-summary">
                    <h2 className="cart-total">
                        Total: ₹{total}
                    </h2>

                    <button
                        className="order-button"
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;