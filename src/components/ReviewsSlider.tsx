import React, { FC, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

import { ReactComponent as QuotesIcon } from '../assets/icons/quotes.svg';

const reviews: { quote: string; logo: string }[] = [
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget nunc ut neque vestibulum pellentesque.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Forbes_logo.svg',
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget nunc ut neque vestibulum pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget nunc ut neque vestibulum pellentesque.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg',
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget nunc ut neque vestibulum pellentesque.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget nunc ut neque vestibulum pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget nunc ut neque vestibulum pellentesque.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
];

export const ReviewsSlider: FC = () => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    let interval: NodeJS.Timeout;

    const startAutoplay = () => {
      interval = setInterval(() => {
        swiperInstance?.slideNext();
      }, 5000);
    };

    const stopAutoplay = () => {
      clearInterval(interval);
    };

    if (swiperInstance) {
      swiperInstance.on('mouseenter', stopAutoplay);
      swiperInstance.on('mouseleave', startAutoplay);

      startAutoplay();
    }

    return () => {
      swiperInstance?.off('mouseenter', stopAutoplay);
      swiperInstance?.off('mouseleave', startAutoplay);

      stopAutoplay();
    };
  }, []);

  return (
    <div className="flex flex-col w-full p-[16px]">
      <span className="w-full pl-[4px] font-normal text-primary text-sm">Reviews</span>
      <div className="flex flex-col justify-center items-center pt-[20px]">
        <QuotesIcon />
        <Swiper
          modules={[Pagination]}
          className="h-[300px] mt-[-28px] w-full"
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          // onSlideChange={() => console.log('slide change')}
          loop
          ref={swiperRef}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.logo}>
              <div className="flex flex-col justify-center items-center w-full h-full space-y-[20px]">
                <p className="text-center text-base text-black font-medium">{review.quote}</p>
                <img className="h-[30px]" src={review.logo} alt="reviewer logo" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
