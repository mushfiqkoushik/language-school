import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



// import required modules
import { Keyboard, Pagination, Navigation } from "swiper";
import PopularClass from "./PopularClass";

export default function Slider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><div> <img className="w-full" src="https://i.ibb.co/0YzpXhp/download-2.jpg" alt="" /></div></SwiperSlide>
        <SwiperSlide><img className="w-full items-center" src="https://i.ibb.co/0YzpXhp/download-2.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full items-center" src="https://i.ibb.co/Vm4Cgk3/download.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full items-center" src="https://i.ibb.co/LxyY6xR/images-1.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full items-center" src="https://i.ibb.co/nwMv2Qp/images-2.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full items-center" src="https://i.ibb.co/Zc8h0H8/images.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full items-center" src="https://i.ibb.co/CmMdRtf/uhfgfdsa.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full items-center" src="https://i.ibb.co/C0rSr7z/download-3.jpg" alt="" /></SwiperSlide>
        
      </Swiper>
    </>
  );
}
