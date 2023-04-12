import React, { useState, useEffect, FC } from 'react';
import { motion } from 'framer-motion';

import { ReactComponent as QuotesIcon } from '../assets/icons/quotes.svg';

const reviews: { quote: string; logo: string }[] = [
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget nunc ut neque vestibulum pellentesque.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Forbes_logo.svg',
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget nunc ut neque vestibulum pellentesque.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg',
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget nunc ut neque vestibulum pellentesque.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
];

interface ReviewSlideProps {
  review: {
    quote: string;
    logo: string;
  };
  isVisible: boolean;
}

// const ReviewSlide: FC<ReviewSlideProps> = ({ review, isVisible }) => {
//   return (
//     <motion.div
//       className="p-[20px] space-y-[20px] flex flex-col justify-center items-center"
//       initial={{ x: isVisible ? '100%' : '-100%' }}
//       animate={{ x: 0 }}
//       exit={{ x: isVisible ? '-100%' : '100%' }}
//       transition={{ duration: 0.5 }}
//     >
//       <QuotesIcon />
//       <p className="text-center">{review.quote}</p>
//       <img src={review.logo} alt="reviwer logo" className="w-[50%]" />
//     </motion.div>
//   );
// };

export const ReviewsSlider: FC = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentReviewIndex(currentReviewIndex === reviews.length - 1 ? 0 : currentReviewIndex + 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentReviewIndex]);

  return (
    <div className="flex flex-col w-full p-[16px]">
      <span className="font-normal text-primary text-sm">Reviews</span>
      <div className="relative h-[240px] w-full overflow-x-hidden">
        <div
          className="slider absolute flex flex-nowrap top-0 left-0 w-full h-full"
          style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`slide space-y-[20px] h-full p-[20px] flex flex-col justify-center items-center ${
                index === currentReviewIndex ? 'active' : ''
              } ${
                index === currentReviewIndex - 1 ||
                (index === reviews.length - 1 && currentReviewIndex === 0)
                  ? 'previous'
                  : ''
              } ${
                index === currentReviewIndex + 1 ||
                (index === 0 && currentReviewIndex === reviews.length - 1)
                  ? 'next'
                  : ''
              }`}
            >
              <QuotesIcon />
              <p className="text-center flex-1">{review.quote}</p>
              <img src={review.logo} alt="reviwer logo" className="w-[50%] object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
