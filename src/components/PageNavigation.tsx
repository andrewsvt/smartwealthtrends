import React, { FC, useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { ReviewsSlider } from './index';
import { AnimatePresence, motion } from 'framer-motion';

export const PageNavigation: FC = () => {
  const sectionArray = [
    { section: 'section1', name: 'Quick Details' },
    { section: 'section2', name: 'Expert Review' },
    { section: 'section3', name: 'Pros & Cons' },
    { section: 'section4', name: 'Related Offers' },
  ];

  const [activeSection, setActiveSection] = useState<string>('section1');

  useEffect(() => {
    setActiveSection('section1');
  }, []);

  const handleSetActive = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="bg-white rounded-[14px]">
      <div className="p-[16px] w-full flex justify-start flex-col space-y-[24px]">
        <span className="w-full pl-[4px] font-normal text-primary text-sm">Page Section</span>
        <div className="flex flex-col space-y-[16px] cursor-pointer pl-0 md:pl-[4px]">
          {sectionArray.map((section) => (
            <ScrollLink
              to={section.section}
              smooth={true}
              duration={500}
              spy={true}
              offset={-124}
              onSetActive={() => handleSetActive(section.section)}
            >
              <motion.div
                className={`flex flex-row items-center hover:text-primary customTransition ${
                  activeSection === section.section
                    ? 'text-primary font-medium'
                    : 'text-secondary-text font-light'
                }`}
              >
                <AnimatePresence>
                  {activeSection === section.section && (
                    <motion.div
                      initial={{ x: -6, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -6, opacity: 0 }}
                      transition={{ ease: 'easeInOut', duration: 0.3 }}
                      className="bg-primary h-[24px] w-[2px] rounded-[2px]"
                    />
                  )}
                </AnimatePresence>
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: activeSection === section.section ? 16 : 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                  className="text-current"
                >
                  {section.name}
                </motion.span>
              </motion.div>
            </ScrollLink>
          ))}
        </div>
      </div>
      <div className="h-[1px] w-full bg-border" />
      <ReviewsSlider />
    </div>
  );
};
