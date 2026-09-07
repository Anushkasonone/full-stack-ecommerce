import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(email, password);

            console.log("LOGIN RESPONSE:", data);

            if (data.success) {
                localStorage.setItem("token", data.token);
                setMessage("Login successful!");

                setTimeout(() => {
                    navigate("/products");
                }, 500);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error("LOGIN ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <h1>Welcome Back</h1>

                <p className="login-subtitle">
                    Login to your account
                </p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>

                </form>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}

                <p className="register-link">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Create Account
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;