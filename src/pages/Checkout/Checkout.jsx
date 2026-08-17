import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../../components/PageTransition'
import ContactInformation from './ContactInformation'
import Address from './Address'
import DeliveryMethod from './DeliveryMethod'
import PaymentMethod from './PaymentMethod'
import OrderNotes from './OrderNotes'
import OrderSummary from './OrderSummary'
import './checkout.css'
import CheckoutFooter from './CheckoutFooter'
import { validateCheckout } from './checkoutValidation'
import toast from 'react-hot-toast'

function Checkout() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        address: '',
        apartment: '',
        postalCode: '',
        notes: '',
    })

    const [errors, setErrors] = useState({})

    const [deliveryMethod, setDeliveryMethod] = useState('standard')
    const [paymentMethod, setPaymentMethod] = useState('cash')

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Remove error once user starts fixing the field
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }))
        }
    }

    const validateOrder = () => {
        const newErrors = validateCheckout(
            formData,
            paymentMethod
        )

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {

            const firstError = Object.keys(newErrors)[0]

            setTimeout(() => {
                const element = document.querySelector(`[name="${firstError}"]`)

                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    })

                    element.focus()
                }
            }, 100)

            toast.error(
                'Please check the highlighted fields.'
            )

            return false
        }

        return true
    }

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
                            <ContactInformation formData={formData} onChange={handleInputChange} errors={errors} />
                            <Address formData={formData} onChange={handleInputChange} errors={errors} />
                            <DeliveryMethod deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} />
                            <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                            <OrderNotes notes={formData.notes} onChange={handleInputChange} />
                        </div>

                        <OrderSummary formData={formData} deliveryMethod={deliveryMethod}
                            paymentMethod={paymentMethod} onValidate={validateOrder}
                            onSuccess={(order) => {
                                navigate('/order-confirmation', {
                                    state: { order }
                                })
                            }}
                        />
                    </div>

                </div>
                <CheckoutFooter />
            </main>
        </PageTransition>
    )
}

export default Checkout