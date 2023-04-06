import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';
import { AnimatePresence, motion } from 'framer-motion';

import { Dropdown, MenuPopups, PageNavigation } from './index';

import { categories, creditRating, issuers } from '../utils/constants';
import { FilterContext } from 'contexts/FilterContext';

import Logo from '../assets/images/Logo.png';
import LogoIcon from '../assets/images/LogoIcon.png';
import { ReactComponent as BurgerOpenIcon } from '../assets/icons/Burger.svg';
import { ReactComponent as BurgerCloseIcon } from '../assets/icons/BurgerCross.svg';

interface IHeader {
  innerPage: boolean;
}

export const Header: FC<IHeader> = ({ innerPage }) => {
  const [activeDropdown, setActiveDropdown] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const filter = useContext(FilterContext);
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
        <div className="sticky bg-bg top-0 w-full h-auto pt-[24px] lg:pt-0 lgPlus:h-[86px] border-b-[1px] border-[#EAE9EE] flex flex-col lgPlus:flex-row items-start lgPlus:items-center justify-start lgPlus:justify-between z-10">
          <div className="flex items-center">
            {size.width < 976 ? (
              <div className="flex justify-center items-center mr-[16px]">
                <Link to="/">
                  <img src={LogoIcon} alt="logo" className="h-[30px]"></img>
                </Link>
              </div>
            ) : (
              ''
            )}
            <ul
              ref={dropdownRef}
              className="flex flex-col w-full md:w-auto md:flex-row items-center md:space-x-[8px]"
            >
              <Dropdown
                filterName="Category"
                fields={categories}
                updateState={filter.updateCategory}
                contextState={filter.activeCategory}
                setActiveDropdown={setActiveDropdown}
                activeDropdown={activeDropdown}
              />
              <Dropdown
                filterName="Issuer"
                fields={issuers}
                updateState={filter.updateIssuer}
                contextState={filter.activeIssuer}
                setActiveDropdown={setActiveDropdown}
                activeDropdown={activeDropdown}
              />
              <Dropdown
                filterName="Credit Range"
                fields={creditRating}
                updateState={filter.updateCreditRange}
                contextState={filter.activeCreditRange}
                setActiveDropdown={setActiveDropdown}
                activeDropdown={activeDropdown}
              />
              {filter.activeCategory !== categories[0] ||
              filter.activeIssuer !== issuers[0] ||
              filter.activeCreditRange !== creditRating[0] ? (
                <button
                  onClick={() => {
                    filter.updateCategory(categories[0]);
                    filter.updateIssuer(issuers[0]);
                    filter.updateCreditRange(creditRating[0]);
                  }}
                  className="bg-error hover:bg-rose-600 rounded-[14px] text-white text-xs px-[14px] h-[28px] customTransition"
                >
                  Reset
                </button>
              ) : (
                ''
              )}
            </ul>
          </div>
          <MenuPopups />
        </div>
      ) : (
        <>
          <div className="sticky bg-bg top-0 pt-[20px] w-full border-b-[1px] border-[#EAE9EE] flex flex-col">
            <div className="flex justify-between items-center">
              <Link to="/">
                <img src={Logo} alt="logo"></img>
              </Link>
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
                {innerPage ? (
                  <PageNavigation />
                ) : (
                  <ul
                    ref={dropdownRef}
                    className="flex flex-col justify-start items-center h-full space-y-[20px]"
                  >
                    <Dropdown
                      filterName="Category"
                      fields={categories}
                      updateState={filter.updateCategory}
                      contextState={filter.activeCategory}
                      setActiveDropdown={setActiveDropdown}
                      activeDropdown={activeDropdown}
                    />
                    <Dropdown
                      filterName="Issuer"
                      fields={issuers}
                      updateState={filter.updateIssuer}
                      contextState={filter.activeIssuer}
                      setActiveDropdown={setActiveDropdown}
                      activeDropdown={activeDropdown}
                    />
                    <Dropdown
                      filterName="Credit Range"
                      fields={creditRating}
                      updateState={filter.updateCreditRange}
                      contextState={filter.activeCreditRange}
                      setActiveDropdown={setActiveDropdown}
                      activeDropdown={activeDropdown}
                    />
                    {filter.activeCategory !== categories[0] ||
                    filter.activeIssuer !== issuers[0] ||
                    filter.activeCreditRange !== creditRating[0] ? (
                      <button
                        onClick={() => {
                          filter.updateCategory(categories[0]);
                          filter.updateIssuer(issuers[0]);
                          filter.updateCreditRange(creditRating[0]);
                        }}
                        className="bg-error hover:bg-rose-600 rounded-[14px] text-white text-xs px-[14px] h-[28px] customTransition"
                      >
                        Reset
                      </button>
                    ) : (
                      ''
                    )}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};
