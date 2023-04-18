import React, { FC, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Portal from '../utils/Portal';

import { Disclosure } from './index';

export const AdvertiserDisclosure: FC = () => {
  const [modal, setModal] = useState<boolean>(false);

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
      <div className="lg:absolute lg:right-0 lg:h-[40px] w-full lg:w-auto flex flex-row items-center justify-center lg:justify-end">
        <span
          onClick={toggleModal}
          className="text-xs underline font-medium cursor-pointer text-center"
        >
          Advertiser & <br /> Editorial Disclosure
        </span>
      </div>
      <Portal>
        <AnimatePresence>
          {modal ? <Disclosure modal={modal} setModal={setModal} /> : ''}
        </AnimatePresence>
      </Portal>
    </>
  );
};
