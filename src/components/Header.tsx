import React, { FC, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';
import { AnimatePresence, motion } from 'framer-motion';

import { MenuPopups, PageNavigation } from './index';

import Logo from '../assets/images/Logo.png';
import LogoIcon from '../assets/images/LogoIcon.png';
import { ReactComponent as BurgerOpenIcon } from '../assets/icons/Burger.svg';
import { ReactComponent as BurgerCloseIcon } from '../assets/icons/BurgerCross.svg';
import { HeaderFilters } from './HeaderFilters';

export const Header: FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const { cardId } = useParams();

  const size: IUseWindowSize = useWindowSize();

  const dropdownRef = useRef<HTMLUListElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropdownHandler = (e: any) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setActiveDropdown('');
      }
    };

    const mobileMenuHandler = (e: any) => {
      if (!mobileMenuRef.current?.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', dropdownHandler);
    document.addEventListener('mousedown', mobileMenuHandler);

    return () => {
      document.removeEventListener('mousedown', dropdownHandler);
      document.removeEventListener('mousedown', mobileMenuHandler);
    };
  }, []);

  //disable scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {size.width > 768 ? (
        <div className="max-w-[1400px] sticky top-0 bg-bg w-full h-auto lg:pt-0 border-b-[1px] border-[#EAE9EE] flex flex-col lgPlus:flex-row items-start lgPlus:items-center justify-start lgPlus:justify-between z-10">
          <div className="flex items-center h-[100px]">
            {size.width < 976 && (
              <div className="flex justify-center items-center mr-[16px]">
                <img src={LogoIcon} alt="logo" className="h-[30px]"></img>
              </div>
            )}
            {size.width > 976 && (
              <div className="flex justify-center items-center mr-[54px]">
                <img src={Logo} alt="logo" className="h-[30px]"></img>
              </div>
            )}
            <HeaderFilters
              ref={dropdownRef}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
          <MenuPopups />
        </div>
      ) : (
        <>
          <div className="sticky bg-bg top-0 pt-[20px] w-full border-b-[1px] border-[#EAE9EE] flex flex-col">
            <div className="flex justify-between items-center">
              <img src={Logo} alt="logo"></img>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <BurgerOpenIcon />
              </button>
            </div>
            <MenuPopups />
          </div>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                ref={mobileMenuRef}
                className="fixed top-0 right-0 z-50 bg-white p-[20px] h-full space-y-[32px]"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 0.95, x: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 50 }}
                exit={{ opacity: 0, x: '100%' }}
              >
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  <BurgerCloseIcon />
                </button>
                {cardId?.length ? (
                  <PageNavigation />
                ) : (
                  <HeaderFilters
                    ref={dropdownRef}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};
