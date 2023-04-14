import React, { useContext, forwardRef, Dispatch } from 'react';

import { FilterContext } from 'contexts/FilterContext';

import { categories, creditRating, issuers } from 'utils/constants';

import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';

import { Dropdown } from 'components';

interface HeaderFiltersProps {
  activeDropdown: string;
  setActiveDropdown: Dispatch<string>;
}

export const HeaderFilters = forwardRef<HTMLUListElement, HeaderFiltersProps>(
  ({ activeDropdown, setActiveDropdown }, ref) => {
    const filter = useContext(FilterContext);

    const size: IUseWindowSize = useWindowSize();

    return (
      <ul
        ref={ref}
        className={
          size.width > 768
            ? 'flex flex-col w-full md:w-auto md:flex-row items-center md:space-x-[8px]'
            : 'flex flex-col justify-start items-center h-full space-y-[20px]'
        }
      >
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
              filter.updateCategory(categories[0].slug);
              filter.updateIssuer(issuers[0].slug);
              filter.updateCreditRange(creditRating[0].slug);
            }}
            className="bg-error hover:bg-rose-600 rounded-[14px] text-white text-xs px-[14px] h-[28px] customTransition"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </ul>
    );
  }
);
