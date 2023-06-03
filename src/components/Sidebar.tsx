import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Filter, PageNavigation } from 'components';

import { homeRoutes } from 'utils/constants';

export const Sidebar: FC = () => {
  return (
    <aside className="sticky self-start top-[124px] mr-[24px] lgPlus:mr-[54px] h-[calc(100vh-148px)] min-w-[260px] max-w-[335px] w-full rounded-[14px] hidden lg:flex flex-col overflow-y-auto">
      <div className="h-full overflow-y-scroll thinScrollbar">
        <Routes>
          {homeRoutes.map((path) => (
            <Route key={path} path={path} element={<Filter />} />
          ))}

          <Route path="/cards/:issuer/:id" element={<PageNavigation />} />
        </Routes>
      </div>
    </aside>
  );
};
