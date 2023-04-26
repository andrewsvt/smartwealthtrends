import React, { FC } from 'react';
import { ReactComponent as CheckSmallIcon } from '../../assets/icons/checkSmall.svg';
import { ReactComponent as CompareIcon } from '../../assets/icons/comparison.svg';
import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';

interface ICheckboxProps {
  text: string;
  state: boolean;
  onClick: () => void;
}

export const CheckBox: FC<ICheckboxProps> = ({ text, state, onClick }) => {
  const size: IUseWindowSize = useWindowSize();

  return (
    <button className="flex flex-row items-center space-x-[12px] py-[12px]" onClick={onClick}>
      <div
        className={`${
          state ? 'border-primary' : ''
        } w-[24px] h-[24px] border-[2px] border-black hover:border-primary rounded-[6px] flex items-center justify-center customTransition`}
      >
        {state ? <CheckSmallIcon /> : ''}
      </div>
      {size.width >= 768 && size.width < 1180 ? (
        <CompareIcon />
      ) : (
        <span className="text-base font-medium flex-1">{text}</span>
      )}
    </button>
  );
};
