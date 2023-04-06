import { FilterContext } from '../contexts/FilterContext';
import React, { FC, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { CardBlock, Header } from '../components';
import { Listing } from 'interfaces/Api';

interface IHomeProps {
  apiData: Listing[];
  totalRecords: number;
  isLoading: boolean;
}

export const Home: FC<IHomeProps> = ({ apiData, totalRecords, isLoading }) => {
  const filter = useContext(FilterContext);

  return (
    <>
      <div className="w-full">
        <Header innerPage={false} />
        <div className="my-[24px] md:my-0 md:h-[126px] w-full flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold pb-[6px]">{`${filter.activeCategory.text} from ${filter.activeIssuer.text}`}</h1>
            <p className="text-secondary-text text-base ">Description of the page</p>
          </div>
        </div>
        <AnimatePresence>
          <motion.div className="grid grid-cols-1 gap-4">
            {isLoading
              ? Array(3)
                  .fill(null)
                  .map((element) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1, transition: { duration: 0.6 } }}
                        viewport={{ once: true }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        className="bg-white rounded-[14px] w-full h-[490px]"
                      ></motion.div>
                    );
                  })
              : totalRecords > 0
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
