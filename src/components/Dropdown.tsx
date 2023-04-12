import React, { FC, useContext } from 'react';
import { ReactComponent as ShortArrowDownIcon } from '../assets/icons/arrowShortDown.svg';
import { ReactComponent as ShortArrowUpIcon } from '../assets/icons/arrowShortUp.svg';
import { ISVGSelectValue } from 'utils/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { FilterContext } from 'contexts/FilterContext';

import _ from 'lodash';

interface IDropdownProps {
  filterName: string;
  fields: ISVGSelectValue[];
  updateState: any;
  contextState: any;
  setActiveDropdown: React.Dispatch<string>;
  activeDropdown: any;
}

export const Dropdown: FC<IDropdownProps> = ({
  filterName,
  fields,
  updateState,
  contextState,
  setActiveDropdown,
  activeDropdown,
}) => {
  const filter = useContext(FilterContext);

  const handleMouseEnter = () => {
    if (activeDropdown === filterName) {
      setActiveDropdown('');
    } else {
      setActiveDropdown(filterName);
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown('');
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10, x: 0 },
    visible: { opacity: 1, y: 10 },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseEnter}
      className="w-full py-4"
    >
      <div className="relative flex flex-row items-center cursor-pointer w-full md:w-[200px] h-[48px] justify-between bg-white rounded-[10px] border-[1px] border-light-gray py-[10px] px-[20px]">
        <span className="text-sm font-medium pr-[8px] text-primary truncate">
          {contextState.text}
        </span>
        {activeDropdown === filterName ? <ShortArrowUpIcon /> : <ShortArrowDownIcon />}
        <div className="absolute top-[-12px] left-[12px] bg-light-gray rounded-[10px] h-[18px] flex justify-center items-center">
          <span className="cursor-default text-[10px] text-secondary-text px-[8px]">
            {filterName}
          </span>
        </div>
      </div>
      <AnimatePresence>
        {activeDropdown === filterName && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
            exit="exit"
            className={
              'bg-white md:absolute md:top-[70px] flex flex-col p-[20px] md:w-auto border-[1px] border-light-gray md:border-none rounded-[10px] shadow-2xl z-20'
            }
          >
            <ul className="grid grid-cols-2 gap-y-[20px] gap-x-[40px]">
              {fields.map((item) => {
                const Icon = item.icon;
                const isActive = item.field === filter.activeCategory.field;
                const isCategory = _.some(fields, { field: filter.activeCategory.field });
                console.log(isCategory);
                return (
                  <li
                    key={item.field}
                    onClick={(e) => {
                      updateState(item.slug);
                      setActiveDropdown('');
                    }}
                    className={`text-sm font-medium flex flex-row items-center space-x-[20px] ${
                      item.text === contextState.text
                        ? 'cursor-default text-primary'
                        : 'cursor-pointer text-secondary-text hover:text-black customTransition'
                    }`}
                  >
                    <Icon
                      className={`${isActive && 'filterIconHeaderSelected'} ${
                        isCategory && 'filterIcon'
                      }`}
                    />
                    <span className="text-current">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
