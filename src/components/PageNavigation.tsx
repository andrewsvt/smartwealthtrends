import React, { FC } from 'react';
import { Link as ScrollLink } from 'react-scroll';

export const PageNavigation: FC = () => {
  return (
    <div className="p-[16px] w-full flex justify-start flex-col space-y-[24px] bg-white rounded-[14px]">
      <span className="font-normal text-primary text-sm">Page Sections</span>
      <ul className="flex flex-col space-y-[16px] cursor-pointer pl-0 md:pl-[16px]">
        <ScrollLink
          to="section1"
          smooth={true}
          duration={500}
          spy={true}
          offset={-50}
          className="text-secondary-text font-medium hover:text-primary customTransition"
        >
          Card Details
        </ScrollLink>
        <ScrollLink
          to="section2"
          smooth={true}
          duration={500}
          spy={true}
          offset={-50}
          className="text-secondary-text font-medium hover:text-primary customTransition"
        >
          Quick Facts
        </ScrollLink>
        <ScrollLink
          to="section3"
          smooth={true}
          duration={500}
          spy={true}
          offset={-50}
          className="text-secondary-text font-medium hover:text-primary customTransition"
        >
          Expert Review
        </ScrollLink>
        <ScrollLink
          to="section4"
          smooth={true}
          duration={500}
          spy={true}
          offset={-50}
          className="text-secondary-text font-medium hover:text-primary customTransition"
        >
          Related Offers
        </ScrollLink>
      </ul>
    </div>
  );
};
