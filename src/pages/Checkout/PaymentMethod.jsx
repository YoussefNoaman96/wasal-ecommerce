import React, { useState } from 'react'
import { FaCreditCard, FaCheck } from 'react-icons/fa'

function PaymentMethod({ paymentMethod, setPaymentMethod }) {

    const [cardNumber, setCardNumber] = useState('')

    const handleCardNumber = (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0, 16)
        value = value.replace(/(.{4})/g, '$1 ').trim()
        setCardNumber(value)
    }

    return (
        <div className="checkout_card">

            <div className="checkout_card_header">
                <span className="checkout_step">04</span>

                <div>
                    <h2>Payment Method</h2>
                    <p>Choose your preferred payment method.</p>
                </div>
            </div>

            <div className="payment_options">

                <label className={`payment_option ${paymentMethod === 'cash' ? 'active' : ''}`}>
                    <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={(e) => setPaymentMethod(e.target.value)} />

                    <div>
                        <strong>Cash on Delivery</strong>
                        <span>Pay when your order arrives.</span>
                    </div>
                </label>

                <label className={`payment_option ${paymentMethod === 'card' ? 'active' : ''}`}>
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} />

                    <div>
                        <strong>Credit / Debit Card</strong>
                        <span>Pay securely using your card.</span>
                    </div>
                </label>

                {paymentMethod === 'card' && (
                    <div className="card_payment">
                        <div className="premium_card">

                            <div className="premium_card_icon">
                                <FaCreditCard />
                            </div>

                            <div className="premium_card_content">
                                <span>Card Number</span>
                                <input type="text" inputMode="numeric" value={cardNumber} onChange={handleCardNumber} placeholder="0000 0000 0000 0000" />
                            </div>

                            {cardNumber.replace(/\s/g, '').length === 16 && <button type="button" className="premium_card_check"><FaCheck /></button>}
                        </div>

                        <div className="input_group full">
                            <label>Card Holder Name</label>
                            <input type="text" placeholder="Name on card" />
                        </div>

                        <div className="card_payment_row">

                            <div className="input_group">
                                <label>Expiry Date</label>
                                <input type="text" placeholder="MM / YY" />
                            </div>

                            <div className="input_group">
                                <label>CVV</label>
                                <input type="password" inputMode="numeric" maxLength="4" placeholder="123" />
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default PaymentMethod