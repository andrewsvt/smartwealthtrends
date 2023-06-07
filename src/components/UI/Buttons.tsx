import React, { FC } from 'react';
import { motion } from 'framer-motion';

import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as SmallLockIcon } from '../../assets/icons/smallLock.svg';
import { ReactComponent as Arrow } from '../../assets/icons/Arrow down.svg';
import { Link } from 'react-router-dom';

interface IButton {
  text?: string;
  icon?: string;
  onClick?: () => void;
  isActive?: boolean;
  state?: boolean;
  link?: string;
}

export const PrimaryButton: FC<IButton> = ({ text, isActive, link }) => {
  const activeClasses = 'text-white bg-primary hover:bg-primary-dark';
  const inactiveClasses = 'text-white/30 bg-primary-dark hover:none cursor-default';

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      className={`${
        isActive ? activeClasses : inactiveClasses
      } customTransition py-[12px] px-[16px] min-w-[140px] w-full md:w-[202px] lg:w-[180px] space-x-[8px] font-semibold text-sm md:text-base rounded-[10px] flex flex-1 md:flex-auto justify-center items-center`}
    >
      {isActive && link ? (
        <Link to={link} className="flex flex-row space-x-[8px] text-inherit">
          <span className="text-current">{text}</span>
          <SmallLockIcon />
        </Link>
      ) : (
        <>
          <span className="text-current">{text}</span>
          <SmallLockIcon style={{ opacity: '30%' }} />
        </>
      )}
    </motion.button>
  );
};

export const SecondaryButton: FC<IButton> = ({ text, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      onClick={onClick}
      className="customTransition py-[12px] w-full md:max-w-[202px] space-x-[8px] font-semibold text-sm md:text-base rounded-[10px] flex flex-1 md:flex-auto justify-center items-center text-primary bg-primary-light hover:bg-transparent border-[2px] border-transparent hover:border-primary"
    >
      <span className="text-current">{text}</span>
    </motion.button>
  );
};

export const ExpandButton: FC<IButton> = ({ text, onClick, state }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      onClick={onClick}
      className="customTransition h-[48px] py-[12px] space-x-[12px] w-full md:w-[202px] font-semibold text-sm md:text-base rounded-[10px] flex justify-center items-center text-black bg-none border-[2px] border-secondary-text hover:text-black hover:border-black"
    >
      <span className="text-current">{text}</span>
      <motion.div animate={{ rotate: state ? -180 : 0 }} transition={{ duration: 0.2 }}>
        <Arrow />
      </motion.div>
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

export const HyperLink: FC<IButton> = ({ text, state, isActive, link }) => {
  const activeClasses = 'text-black cursor-pointer';
  const inactiveClasses = 'text-gray-900/30';

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      className="cursor-default customTransition py-[12px] px-[16px] w-full md:w-auto space-x-[8px] font-semibold text-sm md:text-base flex flex-1 md:flex-auto justify-center items-center"
    >
      {isActive && link ? (
        <Link to={link} className="flex flex-row space-x-[8px] text-inherit">
          <span className={`${isActive ? activeClasses : inactiveClasses} text-current underline`}>
            {text}
          </span>
          {!state && <SmallLockIcon className="tableIcon" />}
        </Link>
      ) : (
        <>
          <span className={`${isActive ? activeClasses : inactiveClasses} text-current underline`}>
            {text}
          </span>
          {!state && <SmallLockIcon className="tableIcon" style={{ opacity: '30%' }} />}
        </>
      )}
    </motion.button>
  );
};
