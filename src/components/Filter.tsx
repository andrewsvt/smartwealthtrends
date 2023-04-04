import React, { FC, useContext } from 'react';

import { FilterContext } from '../contexts/FilterContext';
import { filterData } from '../utils/constants';

export const Filter: FC = () => {
  const { activeFilter, updateFilter } = useContext(FilterContext);

  return (
    <>
      <div className="p-[16px] w-full flex justify-start flex-col">
        <span className="font-normal text-primary text-sm">CATEGORIES</span>
        <div className="grid grid-cols-2 gap-[8px] mt-4">
          {filterData.map((item) => {
            const Icon = item.icon;
            const isActive = item.field === activeFilter;
            return (
              <div
                className={`filterItem w-full rounded-[12px] py-[16px] px-[20px] cursor-pointer ${
                  isActive ? 'bg-primary' : 'bg-light-gray'
                }`}
                onClick={() => updateFilter(item.field)}
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
