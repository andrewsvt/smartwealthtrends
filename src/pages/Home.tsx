import { FilterContext } from '../contexts/FilterContext';
import React, { FC, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { CardBlock, CategoryDropdown } from '../components';
import { Listing } from 'interfaces/Api';
import { AdvertiserDisclosure } from 'components/AdvertiserDisclosure';
import { categories } from 'utils/constants';
import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';

interface IHomeProps {
  apiData: Listing[];
  totalRecords: number;
  isLoading: boolean;
}

export const Home: FC<IHomeProps> = ({ apiData, totalRecords, isLoading }) => {
  const filter = useContext(FilterContext);
  const size: IUseWindowSize = useWindowSize();

  //update header title
  useEffect(() => {
    document.title = 'Smart Wealth Trends';
  }, []);

  return (
    <>
      <div className="relative w-full mt-[24px] lg:space-y-0">
        <AdvertiserDisclosure />
        <div className="flex flex-col items-start justify-center w-full py-[20px] lg:py-0 lg:pb-[20px]">
          <h1 className="text-xl font-semibold pb-[6px] lg:w-[70%]">{`${filter.activeCategory.text} from ${filter.activeIssuer.text}`}</h1>
          <p className="text-secondary-text text-base lg:w-[50%]">Description of the page</p>
        </div>
        {size.width < 976 && (
          <ul>
            <CategoryDropdown
              filterName="Category"
              fields={categories}
              updateState={filter.updateCategory}
              contextState={filter.activeCategory}
            />
          </ul>
        )}
        <AnimatePresence>
          <motion.div className="grid grid-cols-1 gap-4">
            {isLoading ? (
              Array(3)
                .fill(null)
                .map((element, idx) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1, transition: { duration: 0.6 } }}
                      viewport={{ once: true }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      className="bg-white rounded-[14px] w-full h-[490px]"
                      key={idx}
                    ></motion.div>
                  );
                })
            ) : totalRecords > 0 ? (
              apiData.map((product, index) => (
                <CardBlock key={product.ID} product={product} index={index} />
              ))
            ) : (
              <p className="w-full h-screen">Nothing matching was found.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};
