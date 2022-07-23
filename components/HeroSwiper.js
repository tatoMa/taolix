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
import "swiper/css/virtual";

// import "swiper/css/effect-coverflow";

import Banner from "./Banner";
import { useState } from "react";
import HeroSwiperThumbItem from "./HeroSwiperThumbItem";
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Virtual, Thumbs]);

const HeroSwiper = ({ movieList }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        className="mt-0 lg:mt-16"
        // virtual={{
        //   addSlidesAfter: 8,
        //   cache: true,
        //   // addSlidesBefore: 8,
        //   // slides: [1, 2, 3, 4, 5, 6, 7, 8],
        // }}
        thumbs={{ swiper: thumbsSwiper }}
        lazy={true}
        autoplay={{
          delay: 7000,
          // disableOnInteraction: true,
        }}
        // effect="coverflow"
        loop={false}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        removeClippedSubviews={false}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        scrollbar={{ draggable: true }}

        // onSwiper={(swiper) => console.log()}
        // onSlideChange={() => console.log("slide change")}
      >
        {movieList.map((movie, index) => (
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
            transform: translate(0.65rem, -45%);
            height: 100%;
            background-image: linear-gradient(
              to right,
              hsl(var(--b1) / 0.1),
              hsl(var(--b1))
            );
          }
          .swiper-button-prev {
            transform: translate(-0.65rem, -45%);
            height: 100%;
            background-image: linear-gradient(
              to left,
              hsl(var(--b1) / 0.1),
              hsl(var(--b1))
            );
          }
          .swiper-button-next,
          .swiper-button-prev {
            color: hsl(var(--bc));
            z-index: 50;
          }
          .swiper-button-next.swiper-button-disabled,
          .swiper-button-prev.swiper-button-disabled {
            opacity: 0.1;
          }
          .mySwiper .swiper-slide {
            clip-path: polygon(20% 0, 105% 0, 80% 100%, -5% 100%);
            transition: clip-path 1s, filter 0.5s;
          }
          .mySwiper .swiper-slide .thumb-picture {
            filter: grayscale(80%) saturate(0.8);
            transition: clip-path 1s, filter 0.5s;
          }
          .mySwiper .swiper-slide .thumb-picture:hover {
            filter: grayscale(0) saturate(0.8);
          }
          .mySwiper .swiper-slide-thumb-active {
            clip-path: polygon(10% 0%, 115% 0%, 90% 100%, -15% 100%);
          }
          .mySwiper .swiper-slide-thumb-active .thumb-picture {
            filter: grayscale(0) saturate(1.3);
          }
          .mySwiper .swiper-slide .thumb-text {
            top: 87%;
            left: 0px;
            transition: clip-path 1s, filter 0.5s, top 1s, left 1s;
          }
          .mySwiper .swiper-slide-thumb-active .thumb-text {
            top: 82%;
            left: 10%;
          }
        `}</style>
      </Swiper>
      <Swiper
        // virtual={{
        //   addSlidesAfter: 8,
        //   cache: true,
        //   // addSlidesBefore: 8,
        //   // slides: [1, 2, 3, 4, 5, 6, 7, 8],
        // }}
        onSwiper={setThumbsSwiper}
        // loop={true}
        lazy={true}
        spaceBetween={0}
        slidesPerView={10}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        breakpoints={{
          1: { slidesPerView: 3 },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 8,
          },
          1536: {
            slidesPerView: 10,
          },
        }}
      >
        {movieList.map((movie, index) => (
          <SwiperSlide key={movie.vod_id}>
            <HeroSwiperThumbItem movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroSwiper;
