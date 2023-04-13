import React, { FC, useContext, useState } from 'react';
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
  setActiveDropdown?: React.Dispatch<string>;
  activeDropdown?: string;
}

export const CategoryDropdown: FC<IDropdownProps> = ({
  filterName,
  fields,
  updateState,
  contextState,
}) => {
  const filter = useContext(FilterContext);
  const [activeDropdown, setActiveDropdown] = useState<string>('');

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

  const SelectedIcon = contextState.icon;

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseEnter}
      className="w-full py-3"
    >
      <div className="relative flex flex-row items-center cursor-pointer w-full md:w-[200px] h-[56px] justify-between bg-light-gray rounded-[14px] border-[2px] border-primary py-[10px] px-[20px]">
        <SelectedIcon classname="filterIconHeaderSelected" />
        <span className="text-sm font-bold pr-[8px] text-primary truncate">
          {contextState.text}
        </span>
        {activeDropdown === filterName ? <ShortArrowUpIcon /> : <ShortArrowDownIcon />}
        <span className="absolute top-[-24px] left-0 cursor-default text-[12px] uppercase font-semibold text-medium-gray px-[8px]">
          {filterName}
        </span>
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
              'bg-white absolute max-w-[360px] sm:max-w-none md:top-[70px] flex flex-col p-[20px] md:w-auto border-[1px] border-light-gray md:border-none rounded-[10px] shadow-2xl z-20'
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
