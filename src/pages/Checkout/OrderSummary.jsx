import React, { useContext } from 'react'
import { CartContext } from '../../components/context/CartContext'
import { FaLock } from 'react-icons/fa'

function OrderSummary({ deliveryMethod }) {

    const { cartItems } = useContext(CartContext)

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const shipping = deliveryMethod === 'express' ? 12 : 5
    const total = subtotal + shipping

    return (
        <aside className="order_summary">
            <div className="summary_card">

                <div className="summary_header">
                    <h2>Order Summary</h2>
                    <span>{cartItems.length} Items</span>
                </div>

                <div className="summary_products">

                    {cartItems.map((item) => (
                        <div className="summary_product" key={item.id}>
                            <div className="summary_product_image">
                                <img src={item.images[0]} alt={item.title} width="70" height="70"
                                    loading="lazy" decoding="async"/>
                            </div>

                            <div className="summary_product_info">
                                <h3>{item.title}</h3>
                                <span>Qty: {item.quantity}</span>
                            </div>

                            <strong>$ {(item.price * item.quantity).toFixed(2)}</strong>
                        </div>
                    ))}

                </div>

                <div className="summary_details">
                    <div>
                        <span>Subtotal</span>
                        <strong>$ {subtotal.toFixed(2)}</strong>
                    </div>

                    <div>
                        <span>Shipping</span>
                        <strong>$ {shipping.toFixed(2)}</strong>
                    </div>

                    <div>
                        <span>Discount</span>
                        <strong>$ 0.00</strong>
                    </div>
                </div>

                <div className="summary_total">
                    <span>Total</span>
                    <strong>$ {total.toFixed(2)}</strong>
                </div>

                <button className="place_order_btn">Place Order</button>
                <div className="secure_message">
                    <span><FaLock /></span>
                    <span>Your payment information is secure and encrypted.</span>
                </div>
            </div>
        </aside>
    )
}

export default OrderSummary