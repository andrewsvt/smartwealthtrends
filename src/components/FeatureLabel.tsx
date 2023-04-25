import React, { FC } from 'react';

import { ReactComponent as InfoIcon } from '../assets/icons/information.svg';

interface IFeatureLabelProps {
  text: string;
}

export const FeatureLabel: FC<IFeatureLabelProps> = ({ text }) => {
  return (
    <div className="max-w-none md:max-w-[260px] right-[-20px] top-0 flex flex-row justify-center items-center space-x-[20px] py-[6px] pl-[12px] pr-[12px] md:pr-[20px] rounded-l-[10px] rounded-r-[10px] md:rounded-r-[0px] bg-secondary-light mb-4 md:mb-0 lg:ml-4">
      <p className="text-secondary font-medium text-xs">{text}</p>
      <div className="w-[24px] h-[24px]">
        <InfoIcon />
      </div>
    </div>
  );
};
