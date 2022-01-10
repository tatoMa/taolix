import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { useInView } from "react-intersection-observer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";
import VideoItem from "./VideoItem";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const GroupSwiper = ({ videos }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });
  return (
    <>
      {/* <InView> */}

      <Swiper
        style={{
          "--swiper-pagination-color": "red",
        }}
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        slidesPerView={2.25}
        slidesPerGroup={2}
        spaceBetween={6}
        className="h-full mx-10 mb-4 mt-4"
        lazy={true}
        breakpoints={{
          640: {
            slidesPerView: 3.25,
            slidesPerGroup: 3,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 4.25,
            slidesPerGroup: 4,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: 5.25,
            slidesPerGroup: 5,
            spaceBetween: 12,
          },
          1280: {
            slidesPerView: 6.25,
            slidesPerGroup: 6,
            spaceBetween: 12,
          },
          1536: {
            slidesPerView: 8.25,
            slidesPerGroup: 8,
            spaceBetween: 12,
          },
        }}
      >
        {videos.list.map((movie) => (
          <SwiperSlide key={movie.vod_id}>
            <VideoItem
              name={movie.vod_name}
              type={movie.vod_class}
              pic={movie.vod_pic}
              remarks={movie.vod_remarks}
              id={movie.vod_id}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* </InView> */}
    </>
  );
};

export default GroupSwiper;
