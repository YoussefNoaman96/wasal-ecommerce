import React, { useContext, useState } from 'react'
import { CartContext } from '../../components/context/CartContext'
import { useAuth } from '../../components/context/AuthContext'
import { FaLock } from 'react-icons/fa'
import toast from 'react-hot-toast'

function OrderSummary({
    formData,
    deliveryMethod,
    paymentMethod,
    onValidate,
    onSuccess
}) {

    const [isPlacingOrder, setIsPlacingOrder] = useState(false)
    const {cartItems, clearCart} = useContext(CartContext)

    const { user } = useAuth()

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const shipping = deliveryMethod === 'express' ? 12 : 5

    const total = subtotal + shipping

    const handlePlaceOrder = () => {
        // Empty cart
        if (cartItems.length === 0) {
            toast.error(
                'Your cart is empty.'
            )

            return
        }

        // Validate form
        if (!onValidate()) {
            return
        }

        // User check
        if (!user) {
            toast.error(
                'Please login before placing your order.'
            )

            return
        }

        // Start placing
        setIsPlacingOrder(true)

        setTimeout(() => {
            const orderId = `WS-${Date.now().toString().slice(-8)}`

            const order = {
                id: orderId,
                customer: {
                    email:
                        formData.email.trim(),

                    phone:
                        formData.phone.trim(),
                },

                shippingAddress: {
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    country: formData.country,
                    city: formData.city.trim(),
                    address: formData.address.trim(),
                    apartment: formData.apartment.trim(),
                    postalCode: formData.postalCode.trim(),
                },

                items: cartItems.map(
                    (item) => ({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.images?.[0] || '',
                    })
                ),

                deliveryMethod,
                paymentMethod,
                notes: formData.notes.trim(),
                subtotal,
                shipping,
                discount: 0,
                total,
                status: 'pending',
                createdAt: new Date().toISOString(),
            }

            // Save order
            const ordersKey = `orders_${user.email}`
            const existingOrders =
                JSON.parse(localStorage.getItem( ordersKey )) || []

            localStorage.setItem(
                ordersKey,
                JSON.stringify([
                    ...existingOrders,
                    order
                ])
            )

            // Clear cart
            clearCart()
            setIsPlacingOrder(false)

            // Success
            toast.success( `Order ${orderId} placed successfully! 🎉`,
                {duration: 4000,}
            )

            // Go to order confirmation
            setTimeout(() => {
                onSuccess(order)
            }, 1200)

        }, 1200)
    }

    return (
        <aside className="order_summary">
            <div className="summary_card">
                <div className="summary_header">
                    <h2>Order Summary</h2>
                    <span>
                        {cartItems.length}{' '}
                        {cartItems.length === 1 ? 'Item' : 'Items'}
                    </span>
                </div>

                <div className="summary_products">
                    {cartItems.map(
                        (item) => (
                            <div className="summary_product" key={item.id}>
                                <div className="summary_product_image">
                                    <img src={item.images[0]} alt={item.title}  width="70"
                                        height="70" loading="lazy" decoding="async"/>
                                </div>

                                <div className="summary_product_info">
                                    <h3>{item.title}</h3>
                                    <span>Qty: {item.quantity}</span>
                                </div>

                                <strong> 
                                    ${' '}{(item.price *item.quantity).toFixed(2)}
                                </strong>

                            </div>
                        )
                    )}
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

                <button className="place_order_btn"  onClick={handlePlaceOrder} disabled={isPlacingOrder}>
                    {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                </button>

                <div className="secure_message">
                    <span><FaLock /></span>
                    <span>Your payment information is secure and encrypted.</span>
                </div>
            </div>
        </aside>
    )
}

export default OrderSummary