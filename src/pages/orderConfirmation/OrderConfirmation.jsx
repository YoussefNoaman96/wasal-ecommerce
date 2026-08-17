import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import PageTransition from '../../components/PageTransition'
import './orderConfirmation.css'

function OrderConfirmation() {

    const { state } = useLocation()

    const order = state?.order

    if (!order) {
        return (
            <PageTransition>

                <div className="order_confirmation">

                    <div className="confirmation_card">

                        <h1>Order Not Found</h1>

                        <p>
                            We couldn't find the order you're looking for.
                        </p>

                        <Link
                            to="/"
                            className="confirmation_btn"
                        >
                            Back to Home
                        </Link>

                    </div>

                </div>

            </PageTransition>
        )
    }

    return (

        <PageTransition>

            <main className="order_confirmation">

                <div className="confirmation_card">

                    <div className="confirmation_icon">
                        <FaCheck />
                    </div>

                    <span className="confirmation_eyebrow">
                        Order Confirmed
                    </span>

                    <h1>
                        Thank you for your order!
                    </h1>

                    <p className="confirmation_text">
                        Your order has been successfully placed.
                        We'll start preparing it shortly.
                    </p>

                    <div className="order_number">

                        <span>
                            Order Number
                        </span>

                        <strong>
                            #{order.id}
                        </strong>

                    </div>

                    <div className="confirmation_details">

                        <div>
                            <span>Total</span>
                            <strong>
                                $ {order.total.toFixed(2)}
                            </strong>
                        </div>

                        <div>
                            <span>Payment</span>
                            <strong>
                                {order.paymentMethod === 'cash'
                                    ? 'Cash on Delivery'
                                    : 'Credit / Debit Card'}
                            </strong>
                        </div>

                        <div>
                            <span>Delivery</span>
                            <strong>
                                {order.deliveryMethod === 'express'
                                    ? 'Express Delivery'
                                    : 'Standard Delivery'}
                            </strong>
                        </div>

                    </div>

                    <div className="confirmation_actions">

                        <Link
                            to="/"
                            className="confirmation_btn primary"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </div>

            </main>

        </PageTransition>
    )
}

export default OrderConfirmation