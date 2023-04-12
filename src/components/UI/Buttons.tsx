import React, { FC } from 'react';
import { motion } from 'framer-motion';

import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as SmallLockIcon } from '../../assets/icons/smallLock.svg';

interface IButton {
  text?: string;
  icon?: string;
  onClick?: () => void;
}

export const PrimaryButton: FC<IButton> = ({ text }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      className="customTransition py-[12px] w-full md:w-[202px] space-x-[8px] font-semibold text-sm md:text-base rounded-[10px] flex flex-1 md:flex-auto justify-center items-center text-white bg-primary hover:bg-primary-dark"
    >
      <span className="text-current">{text}</span>
      <SmallLockIcon />
    </motion.button>
  );
};

export const SecondaryButton: FC<IButton> = ({ text }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      className="customTransition py-[12px] w-full md:max-w-[202px] space-x-[8px] font-semibold text-sm md:text-base rounded-[10px] flex flex-1 md:flex-auto justify-center items-center text-primary bg-primary-light hover:bg-transparent border-[2px] border-transparent hover:border-primary"
    >
      <span className="text-current">{text}</span>
    </motion.button>
  );
};

export const ExpandButton: FC<IButton> = ({ text, icon, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      onClick={onClick}
      className="customTransition h-[48px] py-[12px] w-full md:w-[202px] font-semibold text-sm md:text-base rounded-[10px] flex justify-center items-center text-black bg-none border-[2px] border-secondary-text hover:text-black hover:border-black"
    >
      {text}
      {icon && <div className="">{icon}</div>}
    </motion.button>
  );
};

export const TrashButton: FC<IButton> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      className="h-[48px] w-[48px] bg-error justify-center items-center rounded-[10px] text-white hover:bg-rose-600"
    >
      <TrashIcon style={{ display: 'inline' }} />
    </motion.button>
  );
};
