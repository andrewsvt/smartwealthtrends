import { FilterContext } from '../contexts/FilterContext';
import React, { FC, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { CardBlock } from '../components';
import { Listing } from 'interfaces/Api';

interface IHomeProps {
  apiData: Listing[];
}

export const Home: FC<IHomeProps> = ({ apiData }) => {
  const filter = useContext(FilterContext);

  return (
    <>
      <div className="w-full">
        <div className="h-[126px] w-full flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold pb-[6px]">{filter.activeFilter}</h1>
            <p className="text-secondary-text text-base ">
              Top Credit Card Offers From Our Partners
            </p>
          </div>
        </div>
        <AnimatePresence>
          <motion.div className="grid grid-cols-1 gap-4">
            {apiData.map((product, index) => (
              <CardBlock key={product.ID} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};
