import React, { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/orders");
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <h2>Loading orders...</h2>;
    }

    if (orders.length === 0) {
        return (
            <div>
                <h1>My Orders</h1>
                <p>No orders found.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>My Orders</h1>

            {orders.map((order) => (
                <div key={order.id}>
                    <h2>Order #{order.id}</h2>

                    <p>Status: {order.status}</p>

                    <p>
                        Total: ₹{order.totalAmount}
                    </p>

                    <p>
                        Date:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <h3>Items:</h3>

                    {order.OrderItems.map((item) => (
                        <div key={item.id}>
                            <p>
                                {item.Product.name} × {item.quantity}
                            </p>

                            <p>
                                Price: ₹{item.price}
                            </p>
                        </div>
                    ))}

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Orders;