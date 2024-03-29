import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";

import SwiperCore, { Pagination, Navigation, Virtual } from "swiper";
import VideoItemWide from "./VideoItemWide";

SwiperCore.use([Pagination, Navigation, Virtual]);

const GroupSwiper = ({ playedMovies }) => {
  const MAX_ITEM = 25;
  return (
    <>
      <Swiper
        virtual={{
          addSlidesAfter: 6,
          cache: true,
          // addSlidesBefore: 8,
          // slides: [1, 2, 3, 4, 5, 6, 7, 8],
        }}
        style={{
          "--swiper-pagination-color": "red",
          "--swiper-theme-color": "#e5e7eb",
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
        {/* {playedMovies?.length > 0 &&
          playedMovies.map((movie: string) => {
            const item = movie.split(",");
            const [name, imageUrl, id, resourceApiId] = item;
            return (
              <VideoItemWide
                key={id + resourceApiId}
                name={name}
                imageUrl={imageUrl}
                id={id}
                resource={resourceApiId}
              />
            );
          })} */}
        {playedMovies.slice(0, MAX_ITEM).map((movie, index) => {
          const item = movie.split(",");
          const [name, imageUrl, id, resourceApiId] = item;
          return (
            <SwiperSlide key={id + resourceApiId} virtualIndex={index}>
              <VideoItemWide
                key={id + resourceApiId}
                name={name}
                imageUrl={imageUrl}
                id={id}
                resource={resourceApiId}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default GroupSwiper;
