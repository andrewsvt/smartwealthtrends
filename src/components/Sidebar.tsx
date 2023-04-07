import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Logo from '../assets/images/Logo.png';
import { Filter, PageNavigation } from './index';
import { Link } from 'react-router-dom';

export const Sidebar: FC = () => {
  return (
    <div className="sticky self-start top-[100px] h-screen min-w-[260px] w-full max-w-[335px] hidden lg:flex flex-col space-y-[93px] lgPlus:space-y-[32px]">
      <Routes>
        <Route
          path="/"
          element={
            <div className="fixed lg:h-[161px] lgPlus:h-[100px] w-[389px] flex justify-start items-center border-b-[1px] border-[#EAE9EE] bg-bg">
              <Link to="/">
                <img src={Logo} alt="logo"></img>
              </Link>
            </div>
          }
        />
        <Route
          path="/cards/:id"
          element={
            <div className="fixed h-[100px] w-[389px] flex justify-start items-center border-b-[1px] border-[#EAE9EE] bg-bg">
              <Link to="/">
                <img src={Logo} alt="logo"></img>
              </Link>
            </div>
          }
        />
      </Routes>
      <Routes>
        <Route path="/" element={<Filter />} />
        <Route path="/cards/:id" element={<PageNavigation />} />
      </Routes>
    </div>
  );
};
