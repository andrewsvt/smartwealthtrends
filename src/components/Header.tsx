import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { FilterContext } from 'contexts/FilterContext';
import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';

import { NavMenuItems, ReviewsSlider, HeaderFilters } from 'components';

//icons and imgs
import Logo from '../assets/images/Logo.webp';
import LogoIcon from '../assets/images/LogoIcon.png';
import { ReactComponent as BurgerOpenIcon } from '../assets/icons/Burger.svg';
import { ReactComponent as BurgerCloseIcon } from '../assets/icons/BurgerCross.svg';
import { getFiltersLink } from 'utils/getFiltersLink';
import { homeRoutes } from 'utils/constants';

export const Header: FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState<boolean>(false);

  const filter = useContext(FilterContext);

  const size: IUseWindowSize = useWindowSize();

  const dropdownRef = useRef<HTMLUListElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);

  //click outside handlers
  useEffect(() => {
    const burgerMenuHandler = (e: any) => {
      if (!mobileMenuRef.current?.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
      if (!desktopMenuRef.current?.contains(e.target)) {
        setIsDesktopMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', burgerMenuHandler);

    return () => {
      document.removeEventListener('mousedown', burgerMenuHandler);
    };
  }, []);

  //disable scroll
  useEffect(() => {
    if (isMobileMenuOpen || isDesktopMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen, isDesktopMenuOpen]);

  const homeLink = useMemo(
    () => getFiltersLink(filter.activeCategory, filter.activeIssuer, filter.activeCreditRange),
    [filter]
  );

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDesktopMenu = () => {
    setIsDesktopMenuOpen(!isDesktopMenuOpen);
  };

  return (
    <>
      {size.width > 976 ? (
        <>
          <div className="sticky top-0 w-full px-[16px] h-auto bg-light-gray z-10 flex flex-row justify-center items-center">
            <div className="max-w-[1400px] w-full h-auto lg:pt-0 border-b-[1px] border-primary-light flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between">
              <div className="flex items-center h-[100px]">
                {/* {size.width < 976 && (
                  <div className="flex justify-center items-center mr-[16px] cursor-pointer">
                    <Link to={homeLink} preventScrollReset={true}>
                      <img src={LogoIcon} alt="logo" className="h-[30px]" />
                    </Link>
                  </div>
                )} */}
                {/* {size.width > 976 && ( */}
                <div className="flex justify-center items-center lg:w-[335px] mr-[24px] lgPlus:mr-[54px] cursor-pointer">
                  <Link className="lg:w-full w-[200px]" to={homeLink} preventScrollReset={true}>
                    <img
                      src={Logo}
                      alt="logo"
                      className="h-[30px] lg:h-auto w-[200px] lg:w-full object-contain"
                    />
                  </Link>
                </div>
                {/* )} */}
                <HeaderFilters
                  ref={dropdownRef}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              </div>
              <div className="relative py-3" onClick={handleDesktopMenu}>
                <motion.div
                  className="h-[48px] w-[48px] flex items-center justify-center bg-white rounded-[14px] cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <BurgerOpenIcon />
                </motion.div>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isDesktopMenuOpen && (
              <>
                <motion.div
                  ref={desktopMenuRef}
                  className="fixed top-0 right-0 z-50 bg-white px-4 h-full w-[300px]"
                  initial={{ opacity: 0, right: -300 }}
                  animate={{ opacity: 1, right: 0 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0, right: -300 }}
                >
                  <button
                    className="h-[100px]"
                    onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
                  >
                    <BurgerCloseIcon />
                  </button>
                  <NavMenuItems />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-80 z-20"
                ></motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <div className="sticky bg-light-gray top-0 h-[64px] w-full border-b-[1px] border-[#EAE9EE] px-[16px] flex flex-col justify-center z-10">
            <div className="flex justify-between items-center">
              <Link to={homeLink} preventScrollReset={true}>
                <img src={Logo} alt="logo" className="max-w-[250px] object-contain" />
              </Link>
              <button onClick={handleMobileMenu}>
                <BurgerOpenIcon />
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                ref={mobileMenuRef}
                className="fixed top-0 right-0 z-50 bg-white px-[20px] h-full w-full"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 50 }}
                exit={{ opacity: 0, x: '100%' }}
              >
                <div className="flex items-center justify-between w-full">
                  <img src={Logo} alt="logo" className="max-w-[250px] object-contain" />
                  <button
                    className="h-[100px]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <BurgerCloseIcon />
                  </button>
                </div>

                <Routes>
                  {homeRoutes.map((path) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <>
                          <NavMenuItems />
                          <HeaderFilters
                            ref={dropdownRef}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                          />
                        </>
                      }
                    />
                  ))}
                  <Route
                    path="/cards/:id"
                    element={
                      <>
                        <HeaderFilters
                          ref={dropdownRef}
                          activeDropdown={activeDropdown}
                          setActiveDropdown={setActiveDropdown}
                        />
                        <ReviewsSlider />
                      </>
                    }
                  />
                </Routes>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};
