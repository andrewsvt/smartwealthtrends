import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Filter, PageNavigation, ReviewsSlider } from './index';

export const Sidebar: FC = () => {
  return (
    <aside className="sticky self-start top-[124px] h-[calc(100vh-148px)] min-w-[260px] max-w-[335px] w-full bg-white rounded-[14px] hidden lg:flex flex-col items-center overflow-y-scroll">
      <div className="h-full overflow-y-scroll thinScrollbar">
        <Routes>
          <Route path="/" element={<Filter />} />
          <Route path="/cards/:id" element={<PageNavigation />} />
        </Routes>
        <ReviewsSlider />
      </div>
    </aside>
  );
};
