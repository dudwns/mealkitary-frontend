import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

interface SliderProps {
  images: string[];
}

const Slider = ({ images }: SliderProps) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        className="z-10 banner"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{
          clickable: true,
          el: '.pagination_fraction',
          type: 'fraction',
        }}
        scrollbar={{ draggable: true }}
        navigation>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              className="object-cover w-full h-64"
              width={500}
              height={1}
              alt="제품 이미지"
            />
          </SwiperSlide>
        ))}
        <span className="absolute z-20 px-4 text-base font-medium text-white bg-black bg-opacity-50 rounded-full pagination_fraction bottom-3 right-3"></span>
      </Swiper>
    </div>
  );
};

export default Slider;
