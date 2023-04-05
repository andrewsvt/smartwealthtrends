import React, { FC, useContext } from 'react';

import { motion } from 'framer-motion';
import { ComparisonContext } from 'contexts/ComparisonContext';
import { ComparisonCard } from './ComparisonCard';

interface ComparisonProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Comparison: FC<ComparisonProps> = ({ modal, setModal }) => {
  const { products } = useContext(ComparisonContext);

  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
      <motion.div
        className="absolute z-20 flex flex-row justify-center bg-bg rounded-[18px] max-w-[1400px] w-full h-[776px] p-[20px] space-x-[20px] overflow-x-hidden overflow-y-scroll"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
      >
        {products.length ? (
          products.map((product) => <ComparisonCard product={product} />)
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
