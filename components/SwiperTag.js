import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";

import Banner from "../components/Banner";

const SwiperTag = ({ top5 }) => {
  // console.log(top5);
  return (
    <Swiper
      // install Swiper modules
      modules={[
        Navigation,
        Pagination,
        Scrollbar,
        A11y,
        Autoplay,
        EffectCoverflow,
      ]}
      autoplay={{
        delay: 8000,
        disableOnInteraction: true,
      }}
      effect="coverflow"
      loop
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log()}
      onSlideChange={() => console.log("slide change")}
    >
      {top5.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Banner
            detail={{
              vod_pic: movie.data[0].poster,
              vod_name: movie.data[0].name,
              vod_blurb: movie.data[0].description,
              vod_director: "",
              vod_actor: "",
              vod_class: movie.data[0].genre,
              mode: "homePage",
            }}
          />
        </SwiperSlide>
      ))}
      <style global jsx>{`
        .swiper-pagination-bullet {
          background-color: white;
          padding: 0.4rem;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
            1px 1px 0 #000;
        }
      `}</style>
    </Swiper>
  );
};

export default SwiperTag;
