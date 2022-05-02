import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { useInView } from "react-intersection-observer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";

// import "./styles.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Virtual } from "swiper";
import VideoItem from "./VideoItem";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Virtual]);

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
        virtual={{
          addSlidesAfter: 6,
          cache: true,
          // addSlidesBefore: 8,
          // slides: [1, 2, 3, 4, 5, 6, 7, 8],
        }}
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
        className="mx-10 mb-4 mt-4 h-full"
        lazy={true}
        breakpoints={{
          630: { slidesPerView: 7.25, slidesPerGroup: 2, spaceBetween: 6 },
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
        {videos.list.map((movie, index) => (
          <SwiperSlide key={movie.vod_id} virtualIndex={index}>
            <VideoItem
              name={movie.vod_name}
              type={movie.vod_class}
              pic={movie.vod_pic}
              remarks={movie.vod_remarks}
              id={movie.vod_id}
              rate={
                movie.rate
                  ? movie.rate
                  : movie.vod_douban_score != 0
                  ? movie.vod_douban_score
                  : ""
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* </InView> */}
    </>
  );
};

export default GroupSwiper;
