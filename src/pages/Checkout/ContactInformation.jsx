import React from 'react'

function ContactInformation() {

    return (
        <div className="checkout_card">
            <div className="checkout_card_header">
                <span className="checkout_step">01</span>

                <div>
                    <h2>Contact Information</h2>
                    <p>We'll use this information to contact you about your order.</p>
                </div>
            </div>

            <div className="checkout_inputs">

                <div className="input_group full">
                    <label>Email Address</label>
                    <input type="email" placeholder="example@email.com" />
                </div>

                <div className="input_group full">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+20 100 000 0000" />
                </div>
            </div>
        </div>
    )
}

export default ContactInformation