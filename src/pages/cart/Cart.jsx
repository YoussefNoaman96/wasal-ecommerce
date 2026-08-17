import React, { useContext, useState } from 'react'
import { CartContext } from '../../components/context/CartContext'
import { FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import './cart.css'
import EmptyCart from './EmptyCart';
import PageTransition from '../../components/PageTransition';

function Cart() {
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext)
    const [removingId, setRemovingId] = useState(null)

    const handleRemove = (id) => {
        setRemovingId(id)

        setTimeout(() => {
            removeFromCart(id)
            setRemovingId(null)
        }, 700)
    }

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    return (
        <PageTransition>
            <div className="cart_page">
                <div className="container">
                    {cartItems.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        <>
                            <div className="cart_header">
                                <div>
                                    <span className="cart_eyebrow">Shopping Bag</span>
                                    <h1>Your Cart</h1>
                                    <p>Review the products you've selected before checkout.</p>
                                </div>

                                <span className="cart_count">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</span>
                            </div>

                            <div className="cart_items">
                                {cartItems.map((item) => (
                                    <div
                                        className={`cart_item ${removingId === item.id ? 'is_removing' : ''}`}
                                        key={item.id}
                                    >
                                        <div className="cart_item_image">
                                            <img src={item.images[0]} alt={item.title} width="100" height="100"
                                                loading="lazy" decoding="async" />
                                        </div>

                                        <div className="cart_item_content">
                                            <div className="cart_item_info">
                                                <h3>{item.title}</h3>
                                                <p className="cart_item_price">$ {item.price}</p>
                                            </div>

                                            <div className="cart_item_bottom">
                                                <div className="quantity_control">
                                                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                                </div>

                                                <p className="cart_item_total">$ {(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <button onClick={() => handleRemove(item.id)} className="delete_item"
                                            aria-label="Remove item" disabled={removingId === item.id}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart_total">
                                <span>Total</span>
                                <strong>$ {total.toFixed(2)}</strong>
                            </div>

                            <div className="cart_footer">
                                <Link to="/" className="continue_shopping">Continue Shopping</Link>
                                <Link to="/checkout" className="checkout_btn">Proceed to Checkout</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </PageTransition>
    )
}

export default Cart