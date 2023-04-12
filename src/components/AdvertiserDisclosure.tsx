import React, { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Disclosure } from './index';

export const AdvertiserDisclosure: FC = () => {
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  //disable scroll
  if (modal) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between">
        <div></div>
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
