import React, { FC, useState, useContext, useEffect } from 'react';
import { ComparisonContext } from 'contexts/ComparisonContext';
import { AnimatePresence } from 'framer-motion';

import { Comparison } from './index';

import { ReactComponent as ComparisonIcon } from '../assets/icons/comparison.svg';

export const CombareButton: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const { products } = useContext(ComparisonContext);

  const toggleModal = () => {
    setModal(!modal);
  };

  //disable scroll
  useEffect(() => {
    if (modal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [modal]);

  return (
    <>
      <div onClick={toggleModal} className="relative cursor-pointer flex flex-row items-center">
        <div className="absolute right-0 bg-white h-[40px] w-[200px] pl-[22px] pr-[62px] rounded-[40px] hidden lgPlus:flex items-center justify-center text-secondary-text hover:text-black customTransition">
          <span className="text-sm font-medium text-current w-full">Compare Cards</span>
        </div>
        <div className="relative flex justify-center items-center bg-white rounded-full h-[40px] w-[40px] border-[1px] border-light-gray">
          <ComparisonIcon />
          {products.length ? (
            <div className="absolute top-[-4px] right-[-2px] rounded-full w-[14px] h-[14px] bg-primary border-[2px] border-white box-content flex items-center justify-center">
              <span className="text-[10px] text-white font-semibold">{products.length}</span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <AnimatePresence>
        {modal ? <Comparison modal={modal} setModal={setModal} /> : ''}
      </AnimatePresence>
    </>
  );
};
