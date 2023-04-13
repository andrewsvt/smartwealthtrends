import React, { FC, useContext, useState } from 'react';

import { FilterContext } from '../contexts/FilterContext';
import { categories } from '../utils/constants';
import { motion } from 'framer-motion';
import { SecondaryButton } from './UI';

export const Filter: FC = () => {
  const { activeCategory, updateCategory } = useContext(FilterContext);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadMore(!isLoadMore);
  };

  return (
    <motion.div className="p-[16px] w-full flex justify-start items-center flex-col bg-white rounded-[14px]">
      <span className="w-full pl-[4px] font-normal text-primary text-sm">Categories</span>
      <div className="grid grid-cols-2 gap-[8px] mt-4">
        {categories.slice(0, 8).map((item) => {
          const Icon = item.icon;
          const isActive = item.field === activeCategory.field;
          return (
            <div
              className={`filterItem w-full rounded-[12px] py-[16px] px-[16px] cursor-pointer flex flex-col items-center justify-center space-y-[12px] ${
                isActive ? 'bg-primary' : 'bg-light-gray'
              }`}
              onClick={() => updateCategory(item.slug)}
              key={item.field}
            >
              <Icon id="menuIcon" className={`${isActive ? 'filterIconSelected' : 'filterIcon'}`} />
              <p
                className={`text-sm text-center ${
                  isActive ? 'font-semibold filterTextSelected' : 'filterText font-medium'
                }`}
              >
                {item.text}
              </p>
            </div>
          );
        })}
        {isLoadMore
          ? categories.slice(8).map((item) => {
              const Icon = item.icon;
              const isActive = item.field === activeCategory.field;
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`filterItem w-full rounded-[12px] py-[16px] px-[16px] cursor-pointer flex flex-col items-center justify-center space-y-[12px] ${
                    isActive ? 'bg-primary' : 'bg-light-gray'
                  }`}
                  onClick={() => updateCategory(item.slug)}
                  key={item.field}
                >
                  <Icon
                    id="menuIcon"
                    className={`${isActive ? 'filterIconSelected' : 'filterIcon'}`}
                  />
                  <p
                    className={`text-sm text-center ${
                      isActive ? 'font-semibold filterTextSelected' : 'filterText font-medium'
                    }`}
                  >
                    {item.text}
                  </p>
                </motion.div>
              );
            })
          : ''}
      </div>
      <div className={isLoadMore ? 'hidden' : ''}>
        <button
          className="bg-transparent rounded-[14px] border-[1px] border-secondary-text hover:border-black text-black font-medium text-xs px-[14px] h-[28px] mt-[16px] customTransition"
          onClick={handleLoadMore}
        >
          More Options
        </button>
      </div>
    </motion.div>
  );
};
