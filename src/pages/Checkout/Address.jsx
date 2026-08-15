import React from 'react'

function Address() {

    return (
        <div className="checkout_card">
            <div className="checkout_card_header">
                <span className="checkout_step">02</span>

                <div>
                    <h2>Shipping Address</h2>
                    <p>Enter the address where you'd like to receive your order.</p>
                </div>
            </div>

            <div className="checkout_inputs">
                <div className="input_group">
                    <label>First Name</label>
                    <input type="text" placeholder="First name" />
                </div>

                <div className="input_group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Last name" />
                </div>

                <div className="input_group">
                    <label>Country</label>
                    <select>
                        <option value="">Select country</option>
                        <option value="egypt">Egypt</option>
                        <option value="saudi">Saudi Arabia</option>
                        <option value="uae">United Arab Emirates</option>
                    </select>
                </div>

                <div className="input_group">
                    <label>City</label>
                    <input type="text" placeholder="City" />
                </div>

                <div className="input_group full">
                    <label>Address</label>
                    <input type="text" placeholder="Street address" />
                </div>

                <div className="input_group">
                    <label>Apartment / Suite</label>
                    <input type="text" placeholder="Optional" />
                </div>

                <div className="input_group">
                    <label>Postal Code</label>
                    <input type="text" placeholder="Postal code" />
                </div>
            </div>
        </div>
    )
}

export default Address