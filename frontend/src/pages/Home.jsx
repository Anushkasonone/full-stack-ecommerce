import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-page">

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Shop Smart. Shop Better.</h1>

                    <p>
                        Discover quality products at great prices.
                        Everything you need, all in one place.
                    </p>

                    <Link to="/products" className="shop-button">
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="features-section">
                <h2>Why Shop With Us?</h2>

                <div className="features-grid">

                    <div className="feature-card">
                        <h3>🚚 Fast Delivery</h3>
                        <p>
                            Get your orders delivered quickly
                            and safely.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>🔒 Secure Shopping</h3>
                        <p>
                            Your account and shopping experience
                            are protected.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>⭐ Quality Products</h3>
                        <p>
                            Explore products selected for
                            quality and value.
                        </p>
                    </div>

                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <h2>Ready to start shopping?</h2>

                <Link to="/products" className="shop-button">
                    Explore Products
                </Link>
            </section>

        </div>
    );
}

export default Home;