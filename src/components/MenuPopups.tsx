import React, { FC, useState, useContext } from 'react';
import { ComparisonContext } from 'contexts/ComparisonContext';
import { AnimatePresence } from 'framer-motion';

import { Comparison, Disclosure } from './index';

import { ReactComponent as ComparisonIcon } from '../assets/icons/comparison.svg';

export const MenuPopups: FC = () => {
  const [modalOne, setModalOne] = useState<boolean>(false);
  const [modalTwo, setModalTwo] = useState<boolean>(false);
  const { products } = useContext(ComparisonContext);

  const toggleModalOne = () => {
    setModalOne(!modalOne);
  };

  const toggleModalTwo = () => {
    setModalTwo(!modalTwo);
  };

  //disable scroll
  if (modalOne || modalTwo) {
    document.body.classList.add('activeModal');
  } else {
    document.body.classList.remove('activeModal');
  }

  return (
    <>
      <div className="flex flex-row items-center w-full lgPlus:w-auto justify-between lgPlus:justify-start h-[60px] lg:px-[24px] rounded-[10px]">
        <span
          onClick={toggleModalOne}
          className="text-sm underline font-medium md:mr-5 cursor-pointer"
        >
          Advertiser Disclosure
        </span>
        <div
          onClick={toggleModalTwo}
          className="relative cursor-pointer flex justify-center items-center bg-primary-light rounded-full h-[40px] w-[40px]"
        >
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
      <AnimatePresence>
        {modalOne ? <Disclosure modal={modalOne} setModal={setModalOne} /> : ''}
        {modalTwo ? <Comparison modal={modalTwo} setModal={setModalTwo} /> : ''}
      </AnimatePresence>
    </>
  );
};
