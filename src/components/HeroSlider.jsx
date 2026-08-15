import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../pages/Home/home.css'
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import hero1 from '../images/Hero-1.webp'
import hero2 from '../images/Hero-2.webp'
import hero3 from '../images/Hero-3.webp'

export default function HeroSlider() {
    return (
        <>
            <div className="hero">
                <div className="container">
                    <Swiper 
                        loop={true}
                        pagination={{ dynamicBullets: true }}
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 2500, disableOnInteraction: false, }}
                        className="mySwiper">
                        <SwiperSlide>
                            <div className="content">
                                <h4>NEW ARRIVAL</h4>
                                <h3>Powerful.<br />Portable.<br />Perfect for You.</h3>
                                <p>Discover the latest laptops and audio essentials.</p>
                                <Link to='/' className='btn'>Shop Now</Link>
                            </div>
                            <img src={hero1} alt="Slider hero 1" className="hero-img" width="600" height="600" fetchPriority="high" loading="eager" decoding="async"/>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="content">
                                <h4>STAY ACTIVE</h4>
                                <h3>Move Better.<br />Live Better.</h3>
                                <p>Everything you need for <br /> an active lifestyle.</p>
                                <Link to='/' className='btn'>Shop Now</Link>
                            </div>
                            <img src={hero2} alt="Slider hero 2" className="hero-img" width="600" height="600" loading="lazy" decoding="async"/>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="content">
                                <h4>NEW STYLE</h4>
                                <h3>Style That<br />Speaks For You.</h3>
                                <p>Find the perfect sunglasses for every look and occasion.</p>
                                <Link to='/' className='btn'>Shop Now</Link>
                            </div>
                            <img src={hero3} alt="Slider hero 3" className="hero-img" width="600" height="600" loading="lazy" decoding="async"/>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    );
}
