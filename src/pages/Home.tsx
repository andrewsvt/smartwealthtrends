import { FilterContext } from '../contexts/FilterContext';
import React, { FC, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { CardBlock } from '../components';
import { Listing } from 'interfaces/Api';

interface IHomeProps {
  apiData: Listing[];
  totalRecords: number;
}

export const Home: FC<IHomeProps> = ({ apiData, totalRecords }) => {
  const filter = useContext(FilterContext);

  return (
    <>
      <div className="w-full">
        <div className="h-[126px] w-full flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold pb-[6px]">{filter.activeCategory.text}</h1>
            <p className="text-secondary-text text-base ">Description of the page</p>
          </div>
        </div>
        <AnimatePresence>
          <motion.div className="grid grid-cols-1 gap-4">
            {totalRecords > 0
              ? apiData.map((product, index) => (
                  <CardBlock key={product.ID} product={product} index={index} />
                ))
              : 'Nothing matching was found.'}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};
