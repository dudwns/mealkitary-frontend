import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";

import Image from "next/image";

interface SliderProp {
  images: string[];
}

const Slider = ({ images }: SliderProp) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        className="banner z-10"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true, el: ".pagination_fraction", type: "fraction" }}
        scrollbar={{ draggable: true }}
        navigation
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image src={image} className="w-full h-64" width={500} height={1} alt="제품 이미지" />
          </SwiperSlide>
        ))}
        <span className="pagination_fraction  absolute bottom-3 right-3 z-10 bg-blue-500 text-white text-base px-4 font-medium rounded-full"></span>
      </Swiper>
    </div>
  );
};

export default Slider;
