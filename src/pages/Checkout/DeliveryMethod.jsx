import React from 'react'

function DeliveryMethod({ deliveryMethod, setDeliveryMethod }) {

    return (
        <div className="checkout_card">
            <div className="checkout_card_header">
                <span className="checkout_step">03</span>
                <div>
                    <h2>Delivery Method</h2>
                    <p>Choose how you'd like to receive your order.</p>
                </div>
            </div>

            <div className="delivery_options">

                <label className={`delivery_option ${deliveryMethod === 'standard' ? 'active' : ''}`}>
                    <input type="radio" name="delivery" value="standard" checked={deliveryMethod === 'standard'} onChange={(e) => setDeliveryMethod(e.target.value)} />
                    <div className="delivery_info">
                        <strong>Standard Delivery</strong>
                        <span>3 - 5 Business Days</span>
                    </div>
                    <b>$5.00</b>
                </label>

                <label className={`delivery_option ${deliveryMethod === 'express' ? 'active' : ''}`}>
                    <input type="radio" name="delivery" value="express" checked={deliveryMethod === 'express'} onChange={(e) => setDeliveryMethod(e.target.value)} />

                    <div className="delivery_info">
                        <strong>Express Delivery</strong>
                        <span>1 - 2 Business Days</span>
                    </div>
                    <b>$12.00</b>
                </label>
            </div>
        </div>
    )
}

export default DeliveryMethod