import { AnimatePresence } from 'framer-motion';
import React, { FC, useState } from 'react';
import { Disclosure } from './Disclosure';

import { ReactComponent as ComparisonIcon } from '../assets/icons/comparison.svg';
import { ReactComponent as ShortArrowIcon } from '../assets/icons/arrowShort.svg';

export const Header: FC = () => {
  const [modal, setModal] = useState<boolean>(false);

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
        <ul className="flex flex-row space-x-[48px]">
          <li className="flex flex-row items-center space-x-[8px] cursor-pointer">
            <span className="text-base font-medium">Card Category</span>
            <ShortArrowIcon />
          </li>
          <li className="flex flex-row items-center space-x-[8px] cursor-pointer">
            <span className="text-base font-medium">Card Issuer</span>
            <ShortArrowIcon />
          </li>
          <li className="flex flex-row items-center space-x-[8px] cursor-pointer">
            <span className="text-base font-medium">Credit Range</span>
            <ShortArrowIcon />
          </li>
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
