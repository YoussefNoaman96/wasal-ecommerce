import React from 'react'

function Address({
    formData,
    onChange,
    errors
}) {

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

                {/* first name*/}
                <div className={`input_group ${errors.firstName ? 'has_error' : ''}`}>

                    <label>First Name<span className="required">*</span></label>
                    <input type="text" name="firstName" value={formData.firstName}
                        onChange={onChange} placeholder="First name" autoComplete="given-name" />

                    {errors.firstName && (
                        <small className="field_error">
                            {errors.firstName}
                        </small>
                    )}
                </div>

                {/* last name */}
                <div className={`input_group ${errors.lastName ? 'has_error' : ''}`}>
                    <label>Last Name<span className="required">*</span></label>
                    <input type="text" name="lastName" value={formData.lastName}
                        onChange={onChange} placeholder="Last name" autoComplete="family-name" />

                    {errors.lastName && (
                        <small className="field_error">
                            {errors.lastName}
                        </small>
                    )}
                </div>

                {/* country */}
                <div className={`input_group ${errors.country ? 'has_error' : ''}`}>

                    <label>Country<span className="required">*</span></label>
                    <select name="country" value={formData.country}
                        onChange={onChange} autoComplete="country">

                        <option value="">Select country</option>
                        <option value="egypt">Egypt</option>
                        <option value="saudi">Saudi Arabia</option>
                        <option value="uae">United Arab Emirates</option>
                    </select>

                    {errors.country && (
                        <small className="field_error">
                            {errors.country}
                        </small>
                    )}
                </div>

                {/* city */}
                <div className={`input_group ${errors.city ? 'has_error' : ''}`}>
                    <label>City<span className="required">*</span></label>
                    <input type="text" name="city" value={formData.city}
                        onChange={onChange} placeholder="City" autoComplete="address-level2" />

                    {errors.city && (
                        <small className="field_error">
                            {errors.city}
                        </small>
                    )}
                </div>

                {/* address */}

                <div className={`input_group full ${errors.address ? 'has_error' : ''}`}>
                    <label>Address<span className="required">*</span></label>

                    <input type="text" name="address" value={formData.address}
                        onChange={onChange} placeholder="Street address" autoComplete="street-address"/>

                    {errors.address && (
                        <small className="field_error">
                            {errors.address}
                        </small>
                    )}
                </div>


                {/* apartment */}

                <div className="input_group">
                    <label>
                        Apartment / Suite<span className="optional">Optional</span>
                    </label>

                    <input type="text" name="apartment" value={formData.apartment}
                        onChange={onChange} placeholder="Apartment / Suite" autoComplete="address-line2"/>
                </div>

                {/*  postal code */}

                <div className={`input_group ${errors.postalCode ? 'has_error' : ''}`}>
                    <label>Postal Code<span className="required">*</span></label>

                    <input type="text" name="postalCode" value={formData.postalCode}
                        onChange={onChange} placeholder="Postal code" inputMode="numeric" autoComplete="postal-code"/>

                    {errors.postalCode && (
                        <small className="field_error">
                            {errors.postalCode}
                        </small>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Address