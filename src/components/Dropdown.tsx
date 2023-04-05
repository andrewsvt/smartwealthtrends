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
    <li>
      <div
        onClick={() => {
          if (activeDropdown === filterName) {
            setActiveDropdown('');
          } else {
            setActiveDropdown(filterName);
          }
        }}
        className="relative flex flex-row items-center cursor-pointer w-[200px] h-[60px] justify-between bg-white rounded-[10px] py-[10px] px-[20px]"
      >
        <span className="text-sm font-medium pr-[8px] text-primary truncate">
          {contextState.text}
        </span>
        {activeDropdown === filterName ? <ShortArrowUpIcon /> : <ShortArrowDownIcon />}
        <div className="bg-light-gray rounded-[10px] h-[18px] absolute top-[-9px] left-[12px] flex justify-center items-center">
          <span className="cursor-default text-[10px] text-secondary-text px-[8px]">
            {filterName}
          </span>
        </div>
      </div>
      <div
        className={
          activeDropdown === filterName
            ? 'bg-white absolute top-[110px] flex flex-col p-[20px] w-auto rounded-[10px] shadow-2xl z-20'
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
                  ? 'cursor-default text-base text-primary font-medium'
                  : 'cursor-pointer text-base text-secondary-text font-medium hover:text-black customTransition'
              }
            >
              {field.text}
            </li>
          ))}
        </ul>
      </div>
      {/* <div
        onClick={() => setActiveDropdown('')}
        className={
          activeDropdown === filterName
            ? 'absolute left-0 top-0 w-full h-[200%] bg-transparent'
            : 'hidden'
        }
      ></div> */}
    </li>
  );
};
