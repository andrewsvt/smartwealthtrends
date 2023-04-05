import React, { FC, useContext, useState } from 'react';

import { Dropdown, MenuPopups } from './index';

import { categories, creditRating, issuers } from '../utils/constants';
import { FilterContext } from 'contexts/FilterContext';

export const Header: FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string>('');

  const filter = useContext(FilterContext);

  return (
    <>
      <div className="relative w-full lg:h-[86px] border-b-[1px] border-[#EAE9EE] flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between">
        <ul className="flex flex-col w-full md:w-auto md:flex-row items-center md:space-x-[8px]">
          <Dropdown
            filterName="Category"
            fields={categories}
            updateState={filter.updateCategory}
            contextState={filter.activeCategory}
            setActiveDropdown={setActiveDropdown}
            activeDropdown={activeDropdown}
          />
          <Dropdown
            filterName="Issuer"
            fields={issuers}
            updateState={filter.updateIssuer}
            contextState={filter.activeIssuer}
            setActiveDropdown={setActiveDropdown}
            activeDropdown={activeDropdown}
          />
          <Dropdown
            filterName="Credit Range"
            fields={creditRating}
            updateState={filter.updateCreditRange}
            contextState={filter.activeCreditRange}
            setActiveDropdown={setActiveDropdown}
            activeDropdown={activeDropdown}
          />
          {filter.activeCategory !== categories[0] ||
          filter.activeIssuer !== issuers[0] ||
          filter.activeCreditRange !== creditRating[0] ? (
            <button
              onClick={() => {
                filter.updateCategory(categories[0]);
                filter.updateIssuer(issuers[0]);
                filter.updateCreditRange(creditRating[0]);
              }}
              className="bg-error hover:bg-rose-600 rounded-[14px] text-white text-xs px-[14px] h-[28px] customTransition"
            >
              Reset
            </button>
          ) : (
            ''
          )}
        </ul>
        <MenuPopups />
      </div>
    </>
  );
};
