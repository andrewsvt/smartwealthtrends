import { AnimatePresence } from 'framer-motion';
import React, { FC, useContext, useState } from 'react';
import { Disclosure } from './Disclosure';

import { ReactComponent as ComparisonIcon } from '../assets/icons/comparison.svg';
import { Dropdown } from './index';

import { categories, creditRating, issuers } from '../utils/constants';
import { FilterContext } from 'contexts/FilterContext';
import { ComparisonContext } from 'contexts/ComparisonContext';

export const Header: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string>('');

  const filter = useContext(FilterContext);
  const { products } = useContext(ComparisonContext);

  const toggleModal = () => {
    setModal(!modal);
  };

  //disable scroll
  if (modal) {
    document.body.classList.add('activeModal');
  } else {
    document.body.classList.remove('activeModal');
  }

  return (
    <>
      <div className="w-full h-[86px] border-b-[1px] border-[#EAE9EE] flex flex-row items-center justify-between">
        <ul className="flex flex-row items-center space-x-[8px]">
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

        <div className="flex flex-row items-center">
          <span onClick={toggleModal} className="text-sm underline font-medium m-5 cursor-pointer">
            Advertiser Disclosure
          </span>
          <div className="relative cursor-pointer flex justify-center items-center bg-primary-light rounded-full h-[40px] w-[40px]">
            <ComparisonIcon />
            {products.length ? (
              <div className="absolute top-[-2px] right-[-2px] rounded-full w-[14px] h-[14px] bg-primary border-[2px] border-bg box-content flex items-center justify-center">
                <span className="pl-[1px] text-[10px] text-white font-semibold">
                  {products.length}
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {modal ? <Disclosure modal={modal} setModal={setModal} /> : ''}
      </AnimatePresence>
    </>
  );
};
