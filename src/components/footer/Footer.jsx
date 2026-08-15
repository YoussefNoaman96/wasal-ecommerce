import React from 'react'
import { Link } from 'react-router-dom'
import { FaTruck, FaShieldAlt, FaUndo, FaCheckCircle, FaFacebookF, FaInstagram, FaTiktok} from 'react-icons/fa'
import './Footer.css'

function Footer() {

    const trustFeatures = [
        {
            icon: <FaTruck />,
            title: 'Fast & Secure Delivery',
            text: 'Fast and reliable shipping'
        },
        {
            icon: <FaShieldAlt />,
            title: 'Secure Payment',
            text: '100% secure checkout'
        },
        {
            icon: <FaUndo />,
            title: 'Easy Returns',
            text: 'Simple return process'
        },
        {
            icon: <FaCheckCircle />,
            title: 'Quality Products',
            text: 'Carefully selected products'
        }
    ]

    return (
        <footer className="footer">
            <div className="trust_features">
                <div className="container">
                    {trustFeatures.map((feature, index) => (
                        <div className="trust_item" key={index}>
                            <div className="trust_icon">
                                <span className="icon_normal">{feature.icon}</span>
                                <span className="icon_hover">{feature.icon}</span>
                            </div>

                            <div className="trust_content">
                                <h3>{feature.title}</h3>
                                <p>{feature.text}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div className="footer_main">
                <div className="container footer_grid">
                    <div className="footer_brand">
                        <a href="#" className="footer_logo" aria-label="TikTok">WASAL</a>

                        <p>Discover quality products carefully selected to make your everyday life easier and better.</p>
                        <div className="footer_social">
                            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="TikTok"><FaTiktok /></a>
                        </div>
                    </div>

                    <div className="footer_column">
                        <h3>Shop</h3>
                        <ul>
                            <li><Link to="/">All Products</Link></li>
                            <li><Link to="/Categories">Categories</Link></li>
                            <li><Link to="/">Best Sellers</Link></li>
                            <li><Link to="/">Special Offers</Link></li>
                        </ul>
                    </div>

                    <div className="footer_column">
                        <h3>Information</h3>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/">Contact Us</Link></li>
                            <li><Link to="/">Privacy Policy</Link></li>
                            <li><Link to="/">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    <div className="footer_column">
                        <h3>Customer Service</h3>
                        <ul>
                            <li><Link to="/">FAQ</Link></li>
                            <li><Link to="/">Shipping & Delivery </Link></li>
                            <li><Link to="/">Returns & Refunds</Link></li>
                            <li><Link to="/">Help Center</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer_bottom">
                    <div className="container">
                        <p>© 2026 WASAL. All rights reserved.</p>
                        <p>
                            Designed & Developed by{' '}
                            <a href="https://wa.me/201152128676" className='founder-name' target="_blank" rel="noopener noreferrer">Youssef</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer