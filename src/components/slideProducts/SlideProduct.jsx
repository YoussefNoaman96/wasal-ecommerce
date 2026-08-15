import React from 'react'
import Product from './Product'
import './slideProduct.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

function SlideProduct({ data, title }) {
  return (
    <div className='slide_products slide'>
      <div className="container">
        <div className="top_slide">
          <h2>{title}</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima nemo adipisci quaerat natus incidunt fugit.</p>
        </div>

        <Swiper
          slidesPerView={1.5}
          spaceBetween={10}
          breakpoints={{
            380: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          navigation={true} modules={[Navigation, Autoplay]} className="mySwiper"
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false}}
        >
          {data?.map((item) => {
            return (
              <SwiperSlide key={item.id}><Product item={item} /></SwiperSlide>
            )
          })}
        </Swiper>

      </div>
    </div >
  )
}

export default SlideProduct
