import React, { FC } from 'react';
import { Link as ScrollLink } from 'react-scroll';

interface IPageNavigationProps {
  anchorLinks: string[];
}

export const PageNavigation: FC<IPageNavigationProps> = () => {
  return (
    <div className="p-[16px] w-full flex justify-start flex-col space-y-[24px]">
      <span className="font-normal text-primary text-sm">CATEGORIES</span>
      <ul className="flex flex-col space-y-[16px] cursor-pointer">
        <ScrollLink to="section1" smooth={true} duration={500} spy={true} offset={-50}>
          Card Details
        </ScrollLink>
        <ScrollLink to="section2" smooth={true} duration={500} spy={true} offset={-50}>
          Pros and Cons
        </ScrollLink>
        <ScrollLink to="section3" smooth={true} duration={500} spy={true} offset={-50}>
          Expert Review
        </ScrollLink>
        <ScrollLink to="section4" smooth={true} duration={500} spy={true} offset={-50}>
          Related Offers
        </ScrollLink>
      </ul>
    </div>
  );
};
