import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Footer, Sidebar } from './components';
import { Home, Card } from './pages';
import { Listing } from 'interfaces/Api';
import { FilterContext } from 'contexts/FilterContext';

import { apiDataInitialState } from 'utils/constants';
import { ComparisonContext } from 'contexts/ComparisonContext';

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const filter = useContext(FilterContext);
  const comparison = useContext(ComparisonContext);

  const [apiData, setApiData] = useState<Listing[]>(apiDataInitialState);
  const [totalRecords, setTotalRecords] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, [filter.activeCategory.field, filter.activeIssuer.field, filter.activeCreditRange.field]);

  useEffect(() => {
    console.log(comparison.products);
  }, [comparison.products]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${apiUrl}${filter.activeCategory.field}${filter.activeIssuer.field}${filter.activeCreditRange.field}&xml_version=2&max=10`
      );
      const data = await response.json();
      await setTotalRecords(data.ResultSet.TotalRecords);
      setApiData(data.ResultSet.Listings.Listing);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Router>
      <div className="bg-bg">
        <div className="xl:max-w-[1400px] m-0 xl:m-auto px-4 xl:px-0 w-full h-full pt-6">
          <div className="flex flex-row lg:space-x-[54px]">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home apiData={apiData} totalRecords={totalRecords} />} />
              <Route path="/cards/:cardId" element={<Card apiData={apiData} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
