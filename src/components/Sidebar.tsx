import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Logo from '../assets/images/Logo.png';
import { Filter, PageNavigation } from './index';
import { Link } from 'react-router-dom';

export const Sidebar: FC = () => {
  return (
    <aside className="sticky bottom-[24px] min-h-screen min-w-[335px] w-[335px] self-end bg-white rounded-[14px] flex flex-col items-center">
      <div className="h-[86px] flex justify-center items-center">
        <Link to="/">
          <img src={Logo} alt="logo"></img>
        </Link>
      </div>
      <div className="h-[1px] w-full bg-border"></div>
      <Routes>
        <Route path="/" element={<Filter />} />
        <Route path="/cards/:id" element={<PageNavigation />} />
      </Routes>
    </aside>
  );
};
