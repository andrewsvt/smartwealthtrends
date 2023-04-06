import React, { FC } from 'react';
import { ReactComponent as ShortArrowDownIcon } from '../assets/icons/arrowShortDown.svg';
import { ReactComponent as ShortArrowUpIcon } from '../assets/icons/arrowShortUp.svg';

interface IDropdownProps {
  filterName: string;
  fields: any;
  updateState: any;
  contextState: any;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string>>;
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
  return (
    <li className="relative w-full">
      <div
        onClick={() => {
          if (activeDropdown === filterName) {
            setActiveDropdown('');
          } else {
            setActiveDropdown(filterName);
          }
        }}
        className="relative flex flex-row items-center cursor-pointer w-full md:w-[200px] h-[60px] justify-between bg-white rounded-t-[10px] md:rounded-[10px] py-[10px] px-[20px]"
      >
        <span className="text-sm font-medium pr-[8px] text-primary truncate">
          {contextState.text}
        </span>
        {activeDropdown === filterName ? <ShortArrowUpIcon /> : <ShortArrowDownIcon />}
        <div className="absolute top-[-9px] left-[12px] bg-light-gray rounded-[10px] h-[18px] flex justify-center items-center">
          <span className="cursor-default text-[10px] text-secondary-text px-[8px]">
            {filterName}
          </span>
        </div>
      </div>
      <div
        className={
          activeDropdown === filterName
            ? 'bg-white md:absolute md:top-[72px] flex flex-col p-[20px] w-full md:w-auto rounded-b-[10px] border-[1px] border-border md:border-none md:rounded-[10px] shadow-2xl z-20'
            : 'hidden'
        }
      >
        <ul className="space-y-[20px]">
          {fields.map((field: any) => (
            <li
              key={field.field}
              onClick={(e) => {
                updateState(field);
                setActiveDropdown('');
              }}
              className={
                field.text === contextState.text
                  ? 'cursor-default text-sm text-primary font-medium'
                  : 'cursor-pointer text-sm text-secondary-text font-medium hover:text-black customTransition'
              }
            >
              {field.text}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};
