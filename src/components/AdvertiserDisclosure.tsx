import React, { FC, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { CombareButton, Disclosure } from './index';

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
