import React from 'react';
import './About.css';
import About1 from '../../images/About1.webp'
import About2 from '../../images/About2.webp'
import About3 from '../../images/About3.webp'
import About4 from '../../images/About4.webp'
import PageTransition from '../../components/PageTransition';

function About() {
    return (
        <PageTransition>
            <div className="about-page">

                <div className="about-timeline">
                    <section className="about-item">
                        <div className="about-image">
                            <img src={About1} alt="Our Store" />
                        </div>

                        <div className="about-dot">01</div>

                        <div className="about-content">
                            <span>Who We Are</span>
                            <h2>More Than Just Shopping</h2>
                            <p>
                                We believe shopping should be simple, enjoyable, and built
                                around quality. Our goal is to provide carefully selected
                                products and a smooth shopping experience for every customer.
                            </p>
                        </div>
                    </section>

                    <section className="about-item reverse">
                        <div className="about-content">
                            <span>Our Story</span>
                            <h2>Built With Passion</h2>
                            <p>
                                What started as a simple idea became a platform designed
                                to make discovering and purchasing products easier,
                                faster, and more enjoyable.
                            </p>
                        </div>

                        <div className="about-dot">02</div>

                        <div className="about-image">
                            <img src={About2} alt="Our Story" />
                        </div>
                    </section>

                    <section className="about-item">
                        <div className="about-image">
                            <img src={About3} alt="Our Mission" />
                        </div>

                        <div className="about-dot"> 03</div>

                        <div className="about-content">
                            <span>Our Mission</span>
                            <h2>Quality Comes First</h2>
                            <p>
                                We are committed to offering products that meet high
                                standards while keeping the entire shopping experience
                                simple, secure, and convenient.
                            </p>
                        </div>
                    </section>

                    <section className="about-item reverse">
                        <div className="about-content">
                            <span>Why Choose Us</span>
                            <h2>Designed Around You</h2>
                            <p>
                                From discovering products to completing your order,
                                every part of our platform is designed with your
                                experience in mind.
                            </p>
                        </div>

                        <div className="about-dot">04</div>

                        <div className="about-image">
                            <img
                                src={About4}
                                alt="Why Choose Us" />
                        </div>
                    </section>
                </div>
            </div>
        </PageTransition>
    );
}

export default About;