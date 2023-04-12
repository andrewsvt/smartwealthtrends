import React, { FC, useContext } from 'react';

import { FilterContext } from '../contexts/FilterContext';
import { categories } from '../utils/constants';

export const Filter: FC = () => {
  const { activeCategory, updateCategory } = useContext(FilterContext);

  return (
    <aside className="w-full bg-white rounded-[14px] hidden lg:flex flex-col items-center">
      <div className="p-[16px] w-full flex justify-start flex-col">
        <span className="font-normal text-primary text-sm">Categories</span>
        <div className="grid grid-cols-2 gap-[8px] mt-4">
          {categories.map((item) => {
            const Icon = item.icon;
            const isActive = item.field === activeCategory.field;
            return (
              <div
                className={`filterItem w-full rounded-[12px] py-[12px] px-[16px] cursor-pointer flex flex-col ${
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
                  className={`mt-4 text-sm ${
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
    </aside>
  );
};
