import React, { createContext, useContext, useState, useMemo, useCallback } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    // register
    const register = useCallback((userData) => {

        const existingUser = localStorage.getItem("registeredUser");

        if (existingUser) {
            return {
                success: false,
                message: "An account already exists."
            };
        }

        localStorage.setItem(
            "registeredUser",
            JSON.stringify(userData)
        );

        return {
            success: true
        };
    }, []);

    // login
    const login = useCallback((email, password) => {

        const savedUser = localStorage.getItem("registeredUser");

        if (!savedUser) {
            return {
                success: false,
                message: "No account found. Please register first."
            };
        }

        const registeredUser = JSON.parse(savedUser);

        if (
            registeredUser.email !== email ||
            registeredUser.password !== password
        ) {
            return {
                success: false,
                message: "Invalid email or password."
            };
        }

        const loggedInUser = {
            name: registeredUser.name,
            email: registeredUser.email
        };

        localStorage.setItem("user", JSON.stringify(loggedInUser));

        setUser(loggedInUser);

        return {
            success: true
        };
    }, []);

    // logout
    const logout = useCallback(() => {
        localStorage.removeItem("user");
        setUser(null);
    }, []);

    const isAuthenticated = !!user;

    const loading = false;

    const contextValue = useMemo(() => ({
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout
    }), [
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout
    ]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;