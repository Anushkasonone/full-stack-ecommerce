import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                E-Commerce Store
            </div>

            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/orders">My Orders</Link>

                {token ? (
                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;