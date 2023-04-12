import React, { FC } from 'react';
import { Link as ScrollLink } from 'react-scroll';

export const PageNavigation: FC = () => {
  const sectionArray = [
    { section: 'section1', name: 'Quick Details' },
    { section: 'section2', name: 'Expert Review' },
    { section: 'section3', name: 'Pros & Cons' },
    { section: 'section4', name: 'Related Offers' },
  ];

  return (
    <div className="p-[16px] w-full flex justify-start flex-col space-y-[24px] bg-white rounded-[14px]">
      <span className="font-normal text-primary text-sm">Page Sections</span>
      <ul className="flex flex-col space-y-[16px] cursor-pointer pl-0 md:pl-[16px]">
        {sectionArray.map((section) => (
          <ScrollLink
            to={section.section}
            smooth={true}
            duration={500}
            spy={true}
            offset={-120}
            className="text-secondary-text font-medium hover:text-primary customTransition"
          >
            {section.name}
          </ScrollLink>
        ))}
      </ul>
    </div>
  );
};
