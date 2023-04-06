import React, { FC } from 'react';
import { ReactComponent as RatingStarFull } from '../assets/icons/RatingStarFull.svg';
import { ReactComponent as RatingStarHalf } from '../assets/icons/RatingStarHalf.svg';
import { ReactComponent as RatingStarEmpty } from '../assets/icons/RatingStarEmpty.svg';

interface RatingProps {
  value: number;
}

export const Rating: FC<RatingProps> = ({ value }) => {
  const stars = Array(5)
    .fill(null)
    .map((_, index) => {
      const filled = value >= index + 1;
      const half = value - index > 0.5;
      return (
        <div key={index}>
          {filled ? <RatingStarFull /> : half ? <RatingStarHalf /> : <RatingStarEmpty />}
        </div>
      );
    });

  return <div className="flex flex-row items-center">{stars}</div>;
};
