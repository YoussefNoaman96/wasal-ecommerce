import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useAuth } from "../../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    // check password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d).{8,}$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters and contain a number.");
      return;
    }

    // check existing account
    const result = register({
      name,
      email,
      password
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/login");

  };

  return (
    <div className="auth-form-box register">
      <form onSubmit={handleRegister}>
        <h1>Create Account</h1>

        <div className="auth-input-box">
          <input type="text" placeholder="Full Name" value={name}
            onChange={(e) => setName(e.target.value)} required
          />
          <FaUser />
        </div>

        <div className="auth-input-box">
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required
          />

          <MdEmail />
        </div>

        <div className="auth-input-box">
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} minLength="8" required />
          <FaLock />
        </div>

        {error && (<p className="auth-error">{error}</p>)}

        <button type="submit" className="auth-btn">Register</button>
      </form>
    </div>
  );
}

export default Register;