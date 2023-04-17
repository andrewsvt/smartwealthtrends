import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { CompareButton, Footer, Header, Sidebar } from './components';
import { Home, Card } from './pages';

import { useGetApiData } from 'hooks/useGetApiData';
import { homeRoutes } from './utils/constants';
import { useGetRelatedCards } from 'hooks/useGetRelatedCards';

function App() {
  const { apiData, totalRecords, isLoading } = useGetApiData();
  const relatedApiData = useGetRelatedCards();

  return (
    <div className="bg-bg scrollbar-hide">
      <div className="relative w-full h-full pt-0">
        <Header />
        <div className="relative flex flex-row xl:max-w-[1400px] m-0 xl:m-auto px-4 xl:px-0">
          <Sidebar />
          <CompareButton />
          <Routes>
            {homeRoutes.map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <Home apiData={apiData} totalRecords={totalRecords} isLoading={isLoading} />
                }
              />
            ))}
            <Route
              path="/cards/:cardId"
              element={<Card apiData={apiData} relatedApiData={relatedApiData} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
