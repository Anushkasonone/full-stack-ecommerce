import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
         <Navbar />
            <Routes>
                <Route path="/" element={<h1>E-Commerce Store</h1>} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;