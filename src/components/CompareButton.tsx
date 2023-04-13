import React, { FC, useState, useContext, useEffect } from 'react';
import { ComparisonContext } from 'contexts/ComparisonContext';
import { AnimatePresence, motion } from 'framer-motion';

import { Comparison } from './index';

import { ReactComponent as ComparisonIcon } from '../assets/icons/comparison.svg';
import Portal from './Portal';

export const CompareButton: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const { products, removeProduct } = useContext(ComparisonContext);

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

  const handleCompareReset = () => {
    products.map((item) => removeProduct(item));
  };

  return (
    <>
      <AnimatePresence>
        {products.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="fixed bg-light-gray h-[80px] lg:h-[56px] w-full lg:w-[335px] left-0 lg:left-auto bottom-0 lg:bottom-[24px] flex flex-row items-center justify-between md:justify-center md:space-x-[32px] lg:rounded-full pl-[14px] lg:pl-0 pr-[14px] z-20 lg:shadow-2xl"
          >
            <div
              onClick={toggleModal}
              className="relative cursor-pointer flex justify-center items-center bg-white rounded-full h-[56px] w-[56px] box-content border-[2px] border-white"
            >
              <ComparisonIcon />
              <div className="absolute top-[-4px] right-[-2px] rounded-full w-[14px] h-[14px] bg-primary border-[2px] border-white box-content flex items-center justify-center">
                <span className="text-[10px] text-white font-semibold">{products.length}</span>
              </div>
            </div>
            <span
              onClick={toggleModal}
              className="cursor-pointer text-base text-primary font-medium"
            >
              Compare Cards
            </span>
            <button
              onClick={handleCompareReset}
              className="bg-error hover:bg-rose-600 rounded-[14px] text-white text-xs px-[14px] h-[28px] customTransition"
            >
              Reset
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <Portal>{modal ? <Comparison modal={modal} setModal={setModal} /> : ''}</Portal>
      </AnimatePresence>
    </>
  );
};
