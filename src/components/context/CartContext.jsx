import React, { createContext, useEffect, useState, useMemo, useCallback } from 'react'
import { useAuth } from './AuthContext';

export const CartContext = createContext()

function CartProvider({ children }) {
    const { user } = useAuth()
    const cartKey = user ? `cartItems_${user.email}` : null
    const favoritesKey = user ? `favoritesItems_${user.email}` : null

    //*     Favorite state management
    const [favorites, setFavorites] = useState([])
    const [favoritesLoadedKey, setFavoritesLoadedKey] = useState(null)

    useEffect(() => {
        if (!favoritesKey) {
            setFavorites([])
            setFavoritesLoadedKey(null)
            return
        }

        const savedFavorites = localStorage.getItem(favoritesKey)
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : [])
        setFavoritesLoadedKey(favoritesKey)
    }, [favoritesKey])

    const addToFavorites = useCallback((item) => {
        if (!user) return false

        setFavorites((prevItems) => {
            if (prevItems.some((i) => i.id === item.id)) return prevItems
            return [...prevItems, item]
        })

        return true
    }, [user])

    useEffect(() => {
        if (!favoritesKey) return
        if (favoritesLoadedKey !== favoritesKey) return

        localStorage.setItem(
            favoritesKey,
            JSON.stringify(favorites)
        )
    }, [favorites, favoritesKey, favoritesLoadedKey])

    const removeFromFavorites = useCallback((id) => {
        setFavorites((prevItems) => prevItems.filter((item) => item.id !== id))
    }, [])

    //*      Cart state management
    const [cartItems, setCartItems] = useState([])
    const [cartLoadedKey, setCartLoadedKey] = useState(null)

    useEffect(() => {
        if (!cartKey) {
            setCartItems([])
            setCartLoadedKey(null)
            return
        }

        const savedCart = localStorage.getItem(cartKey)
        setCartItems(savedCart ? JSON.parse(savedCart) : [])
        setCartLoadedKey(cartKey)
    }, [cartKey])

    // increase quantity of item in cart
    const increaseQuantity = useCallback((id) => {
        if (!user) return

        setCartItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ))
    }, [user])

    //decrease quantity of item in cart
    const decreaseQuantity = useCallback((id) => {
        if (!user) return

        setCartItems(prevItems => prevItems.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ))
    }, [user])

    //remove item from cart
    const removeFromCart = useCallback((id) => {
        if (!user) return

        setCartItems(prevItems =>
            prevItems.filter(item => item.id !== id)
        )
    }, [user])

    const addToCart = useCallback((item) => {
        if (!user) return false

        setCartItems((prevItems) => {
            const itemExists = prevItems.some((i) => i.id === item.id)

            if (itemExists) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }

            return [...prevItems, { ...item, quantity: 1 }]
        })

        return true
    }, [user])

    useEffect(() => {
        if (!cartKey) return
        if (cartLoadedKey !== cartKey) return

        localStorage.setItem(
            cartKey,
            JSON.stringify(cartItems)
        )
    }, [cartItems, cartKey, cartLoadedKey])


    const contextValue = useMemo(() => ({
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        addToFavorites,
        favorites,
        removeFromFavorites
    }), [
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        addToFavorites,
        favorites,
        removeFromFavorites
    ])

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider