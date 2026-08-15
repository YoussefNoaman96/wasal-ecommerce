import React from 'react'

function OrderNotes() {

    return (
        <div className="checkout_card">
            <div className="checkout_card_header">
                <span className="checkout_step">05</span>

                <div>
                    <h2>Order Notes</h2>
                    <p>Anything you'd like us to know?</p>
                </div>
            </div>

            <div className="input_group full">
                <textarea placeholder="Add a note to your order (optional)" rows="5"></textarea>
            </div>
        </div>
    )
}

export default OrderNotes