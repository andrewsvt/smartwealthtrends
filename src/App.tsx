import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Footer, Sidebar } from './components';
import { Home, Card } from './pages';

import { useGetApiData } from 'hooks/useGetApiData';

function App() {
  const {apiData, totalRecords, isLoading} = useGetApiData()

  return (
    <div className="bg-bg">
      <div className="xl:max-w-[1400px] m-0 xl:m-auto px-4 xl:px-0 w-full h-full pt-0 lg:pt-6">
        <div className="flex flex-row lg:space-x-[54px]">
          <Sidebar />
          <Routes>
            <Route
              path="/"
              element={<Home apiData={apiData} totalRecords={totalRecords} isLoading={isLoading} />}
            />
            <Route path="/cards/:cardId" element={<Card apiData={apiData} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
