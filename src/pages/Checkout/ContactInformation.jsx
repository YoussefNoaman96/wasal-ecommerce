import React from 'react'

function ContactInformation({
    formData,
    onChange,
    errors
}) {

    return (
        <div className="checkout_card">
            <div className="checkout_card_header">
                <span className="checkout_step"> 01 </span>
                <div>
                    <h2>Contact Information</h2>
                    <p>We'll use this information to contact you about your order.</p>
                </div>
            </div>

            <div className="checkout_inputs">

                {/* email */}

                <div className={`input_group ${errors.email ? 'has_error' : ''}`}>

                    <label>
                        Email Address<span className="required">*</span>
                    </label>

                    <input type="email" name="email" value={formData.email}
                        onChange={onChange} placeholder="example@email.com" autoComplete="email"
                    />

                    {errors.email && (
                        <small className="field_error">
                            {errors.email}
                        </small>
                    )}
                </div>

                {/* phone */}

                <div className={`input_group ${errors.phone ? 'has_error' : ''}`}>

                    <label>
                        Phone Number<span className="required">*</span>
                    </label>

                    <input type="tel" name="phone" value={formData.phone}
                        onChange={onChange} placeholder="+20 100 000 0000" inputMode="tel" autoComplete="tel"
                    />

                    {errors.phone && (
                        <small className="field_error">
                            {errors.phone}
                        </small>
                    )}

                </div>
            </div>
        </div>
    )
}

export default ContactInformation