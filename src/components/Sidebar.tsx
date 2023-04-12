import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Filter, PageNavigation } from './index';

export const Sidebar: FC = () => {
  return (
    <div className="sticky self-start top-[124px] h-screen min-w-[260px] w-full max-w-[335px] hidden lg:flex flex-col space-y-[93px] lgPlus:space-y-[32px]">
      <Routes>
        <Route path="/" element={<Filter />} />
        <Route path="/cards/:id" element={<PageNavigation />} />
      </Routes>
    </div>
  );
};
