import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");

        const result = login(email, password);

        if (!result.success) {
            setError(result.message);
            return;
        }

        const redirectPath =
            location.state?.from?.pathname || "/";

        navigate(redirectPath, {
            replace: true
        });
    };

    return (
        <div className="auth-form-box login">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>

                <div className="auth-input-box">
                    <input type="email" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required
                    />

                    <FaUser />
                </div>

                <div className="auth-input-box">
                    <input type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required
                    />

                    <FaLock />
                </div>

                <div className="forgot-link">
                    <a href="#">Forgot Password?</a>
                </div>

                {error && (<p className="auth-error">{error}</p>)}

                <button type="submit" className="auth-btn">Login</button>

            </form>
        </div>
    );
}

export default Login;