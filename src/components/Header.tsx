import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { FilterContext } from 'contexts/FilterContext';
import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';

import { CreditRatingSlugEnum, IssuersSlugEnum } from 'utils/constants';

import { PageNavigation } from 'components';

//icons and imgs
import Logo from '../assets/images/Logo.webp';
import LogoIcon from '../assets/images/LogoIcon.png';
import { ReactComponent as BurgerOpenIcon } from '../assets/icons/Burger.svg';
import { ReactComponent as BurgerCloseIcon } from '../assets/icons/BurgerCross.svg';
import { HeaderFilters } from './index';

interface IHeaderProps {
  queryParams?: URLSearchParams;
}

export const Header: FC<IHeaderProps> = ({ queryParams }) => {
  const [activeDropdown, setActiveDropdown] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currentParams, setCurrentParams] = useState<string>('');

  const filter = useContext(FilterContext);

  const size: IUseWindowSize = useWindowSize();

  const dropdownRef = useRef<HTMLUListElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  //click outside handlers
  useEffect(() => {
    const mobileMenuHandler = (e: any) => {
      if (!mobileMenuRef.current?.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', mobileMenuHandler);

    return () => {
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

  useEffect(() => {
    const paramsObj = {
      category: filter.activeCategory.slug,
      ...(filter.activeIssuer.slug !== IssuersSlugEnum.allIssuers && {
        issuer: filter.activeIssuer.slug,
      }),
      ...(filter.activeCreditRange.slug !== CreditRatingSlugEnum.allCreditRating && {
        creditRange: filter.activeCreditRange.slug,
      }),
    };

    const params = Object.entries(paramsObj)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');

    setCurrentParams(params);
  }, [filter]);

  return (
    <>
      {size.width > 768 ? (
        <div className="sticky top-0 w-full px-[16px] h-auto bg-light-gray z-10 flex flex-row justify-center items-center">
          <div className="max-w-[1400px] w-full h-auto lg:pt-0 border-b-[1px] border-primary-light flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between">
            <div className="flex items-center h-[100px]">
              {size.width < 976 && (
                <div className="flex justify-center items-center mr-[16px] cursor-pointer">
                  <Link to={`/?${currentParams}`} preventScrollReset={true}>
                    <img src={LogoIcon} alt="logo" className="h-[30px]" />
                  </Link>
                </div>
              )}
              {size.width > 976 && (
                <div className="flex justify-center items-center lg:w-[335px] mr-[54px] cursor-pointer">
                  <Link
                    className="lg:w-full w-[200px]"
                    to={`/?${currentParams}`}
                    preventScrollReset={true}
                  >
                    <img
                      src={Logo}
                      alt="logo"
                      className="h-[30px] lg:h-auto w-[200px] lg:w-full object-contain"
                    />
                  </Link>
                </div>
              )}
              <HeaderFilters
                ref={dropdownRef}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="sticky bg-light-gray top-0 h-[80px] w-full border-b-[1px] border-[#EAE9EE] px-[16px] flex flex-col justify-center z-10">
            <div className="flex justify-between items-center">
              <Link to={`/?${currentParams}`} preventScrollReset={true}>
                <img src={Logo} alt="logo" className="max-w-[250px] object-contain" />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <BurgerOpenIcon />
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                ref={mobileMenuRef}
                className="fixed top-0 right-0 z-50 bg-white px-[20px] h-full w-full space-y-[32px]"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 50 }}
                exit={{ opacity: 0, x: '100%' }}
              >
                <button
                  className="h-[100px]"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <BurgerCloseIcon />
                </button>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <HeaderFilters
                        ref={dropdownRef}
                        activeDropdown={activeDropdown}
                        setActiveDropdown={setActiveDropdown}
                      />
                    }
                  />
                  <Route path="/cards/:id" element={<PageNavigation />} />
                </Routes>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};
