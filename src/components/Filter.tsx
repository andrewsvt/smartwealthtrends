import React, { FC, useContext } from 'react';

import { FilterContext } from '../contexts/FilterContext';
import { categories } from '../utils/constants';

export const Filter: FC = () => {
  const { activeCategory, updateCategory } = useContext(FilterContext);

  return (
    <>
      <div className="p-[16px] w-full flex justify-start flex-col">
        <span className="font-normal text-primary text-sm">CATEGORIES</span>
        <div className="grid grid-cols-2 gap-[8px] mt-4">
          {categories.map((item) => {
            const Icon = item.icon;
            const isActive = item.field === activeCategory.field;
            return (
              <div
                className={`filterItem w-full rounded-[12px] py-[16px] px-[20px] cursor-pointer ${
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
                  className={`mt-4 ${
                    isActive ? 'font-bold filterTextSelected' : 'filterText font-medium'
                  }`}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
