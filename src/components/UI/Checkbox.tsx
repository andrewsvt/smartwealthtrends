import React, { FC } from 'react';
import { ReactComponent as CheckSmallIcon } from '../../assets/icons/checkSmall.svg';

interface ICheckboxProps {
  text: string;
  state: boolean;
  onClick: () => void;
}

export const CheckBox: FC<ICheckboxProps> = ({ text, state, onClick }) => {
  return (
    <button className="flex flex-row items-center space-x-[12px] p-[12px]" onClick={onClick}>
      <div
        className={`${
          state ? 'border-primary' : ''
        } w-[24px] h-[24px] border-[2px] border-black hover:border-primary rounded-[6px] flex items-center justify-center customTransition`}
      >
        {state ? <CheckSmallIcon /> : ''}
      </div>
      <span className="text-base font-medium">{text}</span>
    </button>
  );
};
