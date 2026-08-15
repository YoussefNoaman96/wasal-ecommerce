import React, { useState } from 'react'
import PageTransition from '../../components/PageTransition'
import ContactInformation from './ContactInformation'
import Address from './Address'
import DeliveryMethod from './DeliveryMethod'
import PaymentMethod from './PaymentMethod'
import OrderNotes from './OrderNotes'
import OrderSummary from './OrderSummary'
import './checkout.css'
import CheckoutFooter from './CheckoutFooter'

function Checkout() {

    const [deliveryMethod, setDeliveryMethod] = useState('standard')
    const [paymentMethod, setPaymentMethod] = useState('cash')

    return (
        <PageTransition>
            <main className="checkout_page">
                <div className="checkout_container">
                    <div className="checkout_title">
                        <h1>Checkout</h1>
                        <p>Complete your order securely and easily.</p>
                    </div>

                    <div className="checkout_layout">

                        <div className="checkout_form">
                            <ContactInformation />
                            <Address />
                            <DeliveryMethod deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} />
                            <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                            <OrderNotes />
                        </div>

                        <OrderSummary deliveryMethod={deliveryMethod} />
                    </div>
                </div>
                <CheckoutFooter />
            </main>
        </PageTransition>
    )
}

export default Checkout