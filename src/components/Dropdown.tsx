import React, { FC, useState } from 'react';
import { ReactComponent as ShortArrowDownIcon } from '../assets/icons/arrowShortDown.svg';
import { ReactComponent as ShortArrowUpIcon } from '../assets/icons/arrowShortUp.svg';

interface IDropdownProps {
  filterName: string;
  fields: any;
  updateState: any;
  contextState: any;
}

export const Dropdown: FC<IDropdownProps> = ({ filterName, fields, updateState, contextState }) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return (
    <li>
      <div
        onClick={() => setIsDropdownActive(!isDropdownActive)}
        className="flex flex-row items-center cursor-pointer w-[240px] justify-between bg-white rounded-[14px] py-[10px] px-[20px]"
      >
        <span className="text-base font-medium pr-[8px] text-primary">{contextState.text}</span>
        {isDropdownActive ? <ShortArrowUpIcon /> : <ShortArrowDownIcon />}
      </div>
      <div
        className={
          isDropdownActive
            ? 'bg-white absolute top-[110px] flex flex-col p-[20px] w-[240px] rounded-[14px] shadow-2xl z-20'
            : 'hidden'
        }
      >
        <ul className="space-y-[20px]">
          {fields.map((field: any) => (
            <li
              key={field.field}
              onClick={(e) => {
                updateState(field);
                setIsDropdownActive(!isDropdownActive);
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
    </li>
  );
};
