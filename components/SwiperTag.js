import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import Banner from "../components/Banner";

const SwiperTag = ({ top5 }) => {
  // console.log(top5);
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoPlay
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
    </Swiper>
  );
};

export default SwiperTag;
