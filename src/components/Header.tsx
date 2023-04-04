import { AnimatePresence } from 'framer-motion';
import React, { FC, useContext, useState } from 'react';
import { Disclosure } from './Disclosure';

import { ReactComponent as ComparisonIcon } from '../assets/icons/comparison.svg';
import { Dropdown } from './Dropdown';

import { CategoriesEnum, IssuersEnum, categories, issuers } from '../utils/constants';
import { FilterContext } from 'contexts/FilterContext';

export const Header: FC = () => {
  const [modal, setModal] = useState<boolean>(false);

  const { activeCategory, updateCategory, activeIssuer, updateIssuer } = useContext(FilterContext);

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
            filterName="Card Category"
            fields={categories}
            updateState={updateCategory}
            contextState={activeCategory}
          />
          <Dropdown
            filterName="Card Issuer"
            fields={issuers}
            updateState={updateIssuer}
            contextState={activeIssuer}
          />
          <button
            onClick={() => {
              updateCategory({
                text: 'Top Cards',
                field: CategoriesEnum.topCards,
              });
              updateIssuer({
                text: 'All Issuers',
                field: IssuersEnum.allIssuers,
              });
            }}
            className="bg-error hover:bg-rose-600 rounded-[14px] text-white text-xs px-[14px] h-[28px] customTransition"
          >
            Reset
          </button>
        </ul>
        <div>
          <div className="flex flex-row items-center">
            <span
              onClick={toggleModal}
              className="text-sm underline font-medium m-5 cursor-pointer"
            >
              Advertiser Disclosure
            </span>
            <div className="flex justify-center items-center bg-primary-light rounded-full h-[40px] w-[40px]">
              <ComparisonIcon />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {modal ? <Disclosure modal={modal} setModal={setModal} /> : ''}
      </AnimatePresence>
    </>
  );
};
