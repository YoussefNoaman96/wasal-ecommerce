import React from 'react'
import Login from "./Login";
import Register from "./Register";
import "./auth.css";
import { useLocation, useNavigate  } from "react-router-dom";

function AuthLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    const isRegister = location.pathname === "/register";
    return (
        <div className="auth-page">
            <div className={`auth-container ${isRegister ? "active" : ""}`}>
                <Login />
                <Register />
                <div className="toggle-box">
                    <div className="auth-toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Don't have an account?</p>
                        <button className="toggle-btn" onClick={() => navigate("/register")}> Register</button>
                    </div>
                    <div className="auth-toggle-panel toggle-right">
                        <h1>Hello Again!</h1>
                        <p>Already have an account?</p>
                        <button className="toggle-btn" onClick={() => navigate("/login")}> Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;