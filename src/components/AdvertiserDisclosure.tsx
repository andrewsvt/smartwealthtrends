import React, { FC, useState, useContext, useEffect } from 'react';
import { ComparisonContext } from 'contexts/ComparisonContext';
import { AnimatePresence } from 'framer-motion';

import { CombareButton, Comparison, Disclosure } from './index';

import { ReactComponent as ComparisonIcon } from '../assets/icons/comparison.svg';

export const AdvertiserDisclosure: FC = () => {
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
      <div className="w-full flex flex-row items-center justify-between md:justify-end">
        <div className="md:hidden">
          <CombareButton />
        </div>
        <span onClick={toggleModal} className="text-sm underline font-medium cursor-pointer">
          Advertiser Disclosure
        </span>
      </div>
      <AnimatePresence>
        {modal ? <Disclosure modal={modal} setModal={setModal} /> : ''}
      </AnimatePresence>
    </>
  );
};
