import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Virtual,
  // EffectCoverflow,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
// import "swiper/css/effect-coverflow";

import Banner from "./Banner";
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Virtual]);

const HeroSwiper = ({ top5 }) => {
  // console.log("top5", top5);
  return (
    <Swiper
      // virtual={{
      //   addSlidesAfter: 2,
      //   cache: true,
      //   // addSlidesBefore: 8,
      //   // slides: [1, 2, 3, 4, 5, 6, 7, 8],
      // }}
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
      `}</style>
    </Swiper>
  );
};

export default HeroSwiper;
