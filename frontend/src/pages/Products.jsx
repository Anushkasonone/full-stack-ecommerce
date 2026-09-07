import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Products.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products");
                setProducts(response.data.products);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (productId) => {
        try {
            const response = await api.post("/cart", {
                productId: productId,
                quantity: 1
            });

            setMessage(response.data.message);
        } catch (error) {
            console.error("ADD TO CART ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );
        }
    };

    if (loading) {
        return <h2>Loading products...</h2>;
    }

    return (
        <div className="products-page">
            <h1 className="products-title">Our Products</h1>

            {message && (
                <p>{message}</p>
            )}

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>

                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                            )}

                            <h2>{product.name}</h2>

                            <p className="product-description">
                                {product.description}
                            </p>

                            <p className="product-price">
                                ₹{product.price}
                            </p>

                            <p className="product-stock">
                                Stock: {product.stock}
                            </p>

                            <button
                                className="add-cart-button"
                                onClick={() =>
                                    addToCart(product.id)
                                }
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;