import React, { FC } from 'react';
import { motion } from 'framer-motion';

import { ReactComponent as CrossIcon } from '../assets/icons/cross.svg';

interface DisclosureProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Disclosure: FC<DisclosureProps> = ({ modal, setModal }) => {
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50 ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{ scale: 1.3, rotateZ: '90deg' }}
        onClick={toggleModal}
        className="fixed top-0 right-0 m-4 md:m-5 cursor-pointer bg-white rounded-full p-[8px] z-20"
      >
        <CrossIcon />
      </motion.div>
      <motion.div
        className="absolute z-20 flex flex-col justify-center items-start md:items-center bg-white rounded-[14px] max-w-[90%] max-h-[80%] md:max-w-[786px] w-full h-auto p-[32px] md:p-[48px]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
      >
        <div className="w-full h-full overflow-y-scroll space-y-[48px]">
          <div>
            <h2 className="text-lg font-semibold pb-[24px]">Advertiser Disclosure</h2>
            <p className="text-base font-light overflow-y-auto">
              SmartWealthTrends has partnered with CardRatings for our coverage of credit card
              products. SmartWealthTrends and CardRatings may receive a commission from card
              issuers. Some or all of the card offers that appear on SmartWealthTrends are from
              advertisers. Compensation may impact how and where card products appear, but does not
              affect our editors’ opinions or evaluations. SmartWealthTrends does not include all
              card companies or all available card offers.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold pb-[24px]">Editorial Disclousre</h2>
            <p className="text-base font-light overflow-y-auto">
              Opinions, reviews, analyses & recommendations are the author’s alone, and have not
              been reviewed, endorsed or approved by any of these entities.
            </p>
          </div>
        </div>
      </motion.div>

      {/* dark screen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="absolute w-full h-full bg-black bg-opacity-80 z-0"
        onClick={toggleModal}
      ></motion.div>
    </div>
  );
};
