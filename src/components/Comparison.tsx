import React, { FC, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { ComparisonContext } from 'contexts/ComparisonContext';

import { ComparisonCard } from './ComparisonCard';

import { ReactComponent as CrossIcon } from '../assets/icons/cross.svg';

interface ComparisonProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Comparison: FC<ComparisonProps> = ({ modal, setModal }) => {
  const { products } = useContext(ComparisonContext);
  const [closing, setClosing] = useState<boolean>(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (products.length === 0 && !closing) {
      setClosing(true);
      setTimeout(() => {
        setModal(false);
        setClosing(false);
      }, 500);
    }
  }, [products, closing, setModal]);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
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
        className="fixed bottom-[16px] lg:bottom-auto z-20 flex flex-row justify-start lg:justify-center bg-bg rounded-[18px] lg:rounded-t-[18px] max-w-[1400px] w-full h-[776px] max-h-[86%] p-[20px] space-x-[20px] overflow-x-scroll lg:overflow-x-hidden overflow-y-scroll popupScrollbar"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
      >
        {products.length ? (
          products.map((product) => <ComparisonCard key={product.ID} product={product} />)
        ) : (
          <span className="w-full h-full flex justify-center items-center text-secondary-text">
            Compare is empty
          </span>
        )}
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
