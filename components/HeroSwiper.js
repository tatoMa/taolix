import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Virtual,
  Thumbs,
  FreeMode,
  // EffectCoverflow,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

// import "swiper/css/effect-coverflow";

import Banner from "./Banner";
import { useState } from "react";
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Virtual, Thumbs]);

const HeroSwiper = ({ top5 }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        // virtual={{
        //   addSlidesAfter: 2,
        //   cache: true,
        //   // addSlidesBefore: 8,
        //   // slides: [1, 2, 3, 4, 5, 6, 7, 8],
        // }}
        thumbs={{ swiper: thumbsSwiper }}
        lazy={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: true,
        }}
        // effect="coverflow"
        loop
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log()}
        // onSlideChange={() => console.log("slide change")}
      >
        {top5.map((movie, index) => (
          <SwiperSlide key={movie.vod_id}>
            <Banner
              detail={{
                ...movie,
                mode: "homePage",
              }}
              index={index}
            />
          </SwiperSlide>
        ))}
        <style global jsx>{`
          .swiper-pagination-bullet {
            background-color: white;
            padding: 0.4rem;
          }
          .swiper-button-next {
            transform: translate(0.65rem, -41%);
            height: 100%;
            background-image: linear-gradient(
              to right,
              rgba(0, 0, 0, 0),
              rgba(10, 10, 10, 0.3)
            );
          }
          .swiper-button-prev {
            transform: translate(-0.65rem, -40%);
            height: 100%;
            background-image: linear-gradient(
              to left,
              rgba(0, 0, 0, 0),
              rgba(10, 10, 10, 0.3)
            );
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            color: #888;
          }
          .swiper-button-next,
          .swiper-button-prev {
            color: white;
          }
          .swiper-button-next.swiper-button-disabled,
          .swiper-button-prev.swiper-button-disabled {
            opacity: 0.1;
          }
          .mySwiper .swiper-slide {
            clip-path: polygon(35% 0, 90% 0, 65% 100%, 10% 100%);
            transition: clip-path 1s;
            height: 20vh;
            opacity: 0.4;
          }

          .mySwiper .swiper-slide-thumb-active {
            transition: clip-path 1s;
            clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
            opacity: 1;
          }
        `}</style>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={0}
        slidesPerView={8}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {top5.map((movie, index) => (
          <SwiperSlide key={movie.vod_id}>
            <img
              src={movie.vod_pic}
              alt={movie.vod_name}
              className="h-full w-full object-cover "
              referrerPolicy="no-referrer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroSwiper;
