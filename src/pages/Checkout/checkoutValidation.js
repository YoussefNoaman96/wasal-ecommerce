export const validateCheckout = (formData, paymentMethod, cardData) => {
    const errors = {}

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    if (!formData.email.trim()) {
        errors.email = 'Email address is required.'
    } else if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email address.'
    }

    // Phone
    const phoneDigits = formData.phone.replace(/\D/g, '')

    if (!formData.phone.trim()) {
        errors.phone = 'Phone number is required.'
    } else if (
        phoneDigits.length < 8 ||
        phoneDigits.length > 15
    ) {
        errors.phone = 'Please enter a valid phone number.'
    }

    // Names
    const nameRegex = /^[A-Za-z\u0600-\u06FF\s'-]+$/

    if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required.'
    } else if (formData.firstName.trim().length < 2) {
        errors.firstName =
            'First name must be at least 2 characters.'
    } else if (!nameRegex.test(formData.firstName.trim())) {
        errors.firstName =
            'First name can only contain letters.'
    }

    if (!formData.lastName.trim()) {
        errors.lastName = 'Last name is required.'
    } else if (formData.lastName.trim().length < 2) {
        errors.lastName =
            'Last name must be at least 2 characters.'
    } else if (!nameRegex.test(formData.lastName.trim())) {
        errors.lastName =
            'Last name can only contain letters.'
    }

    // Country
    if (!formData.country) {
        errors.country = 'Please select your country.'
    }

    // City
    if (!formData.city.trim()) {
        errors.city = 'City is required.'
    } else if (formData.city.trim().length < 2) {
        errors.city = 'Please enter a valid city.'
    } else if (!nameRegex.test(formData.city.trim())) {
        errors.city = 'City can only contain letters.'
    }

    // Address
    if (!formData.address.trim()) {
        errors.address = 'Shipping address is required.'
    } else if (formData.address.trim().length < 5) {
        errors.address =
            'Please enter a complete shipping address.'
    }

    // Postal Code
    if (!formData.postalCode.trim()) {
        errors.postalCode = 'Postal code is required.'
    } else {
        const postalDigits =
            formData.postalCode.replace(/\D/g, '')

        if (
            formData.country === 'egypt' &&
            postalDigits.length !== 5
        ) {
            errors.postalCode =
                'Egyptian postal code must contain 5 digits.'
        }

        if (
            formData.country === 'saudi' &&
            postalDigits.length !== 5
        ) {
            errors.postalCode =
                'Saudi postal code must contain 5 digits.'
        }

        if (
            formData.country === 'uae' &&
            !/^\d{5}$/.test(postalDigits)
        ) {
            errors.postalCode =
                'Please enter a valid postal code.'
        }
    }

    // Payment
    if (paymentMethod === 'card') {
        const cardNumber = cardData?.cardNumber
            ?.replace(/\D/g, '') || ''

        const cardHolder = cardData?.cardHolder?.trim() || ''

        const expiryDate = cardData?.expiryDate?.trim() || ''

        const cvv = cardData?.cvv?.replace(/\D/g, '') || ''

        // Card Number
        if (!cardNumber) {
            errors.cardNumber = 'Card number is required.'
        } else if (cardNumber.length !== 16) {
            errors.cardNumber =
                'Card number must contain 16 digits.'
        }

        // Card Holder
        if (!cardHolder) {
            errors.cardHolder =
                'Card holder name is required.'
        } else if (cardHolder.length < 2) {
            errors.cardHolder =
                'Card holder name must be at least 2 characters.'
        } else if (!nameRegex.test(cardHolder)) {
            errors.cardHolder =
                'Card holder name can only contain letters.'
        }

        // Expiry Date
        if (!expiryDate) {
            errors.expiryDate =
                'Expiry date is required.'
        } else {
            const expiryDigits =
                expiryDate.replace(/\D/g, '')

            if (expiryDigits.length !== 4) {
                errors.expiryDate =
                    'Please enter a valid expiry date.'
            } else {
                const month = Number(
                    expiryDigits.slice(0, 2)
                )

                if (month < 1 || month > 12) {
                    errors.expiryDate =
                        'Please enter a valid expiry month.'
                }
            }
        }

        // CVV
        if (!cvv) {
            errors.cvv = 'CVV is required.'
        } else if (cvv.length < 3 || cvv.length > 4) {
            errors.cvv =
                'CVV must contain 3 or 4 digits.'
        }
    }

    return errors
}