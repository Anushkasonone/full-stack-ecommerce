import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const data = await registerUser(
                name,
                email,
                password
            );

            if (data.success) {
                setMessage("Registration successful!");

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error("REGISTER ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">

                <h1>Create Account</h1>

                <p className="register-subtitle">
                    Create your e-commerce account
                </p>

                <form onSubmit={handleRegister}>

                    <div className="form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your name"
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="register-button"
                    >
                        Create Account
                    </button>

                </form>

                {message && (
                    <p className="register-message">
                        {message}
                    </p>
                )}

                <p className="login-link">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;