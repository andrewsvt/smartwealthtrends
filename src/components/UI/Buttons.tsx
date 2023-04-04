import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface IButton {
  text: string;
  icon?: string;
  onClick?: () => void;
}

export const PrimaryButton: FC<IButton> = ({ text }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      className="customTransition h-[48px] py-[12px] px-[28px] font-semibold text-base rounded-[10px] flex justify-center items-center text-white bg-primary hover:bg-primary-dark"
    >
      {text}
    </motion.button>
  );
};

export const SecondaryButton: FC<IButton> = ({ text, icon, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      onClick={onClick}
      className="customTransition h-[48px] py-[12px] px-[28px] font-semibold text-base rounded-[10px] flex justify-center items-center text-black bg-none border-[2px] border-black hover:text-primary hover:border-primary"
    >
      {text}
      {icon && <div className="">{icon}</div>}
    </motion.button>
  );
};
