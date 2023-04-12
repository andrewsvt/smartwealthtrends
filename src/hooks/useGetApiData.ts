import { FilterContext } from 'contexts/FilterContext';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Listing } from 'interfaces/Api';
import { apiDataInitialState } from 'utils/constants';

const apiUrl = process.env.REACT_APP_API_URL;

export const useGetApiData = (): {
  apiData: Listing[];
  totalRecords: number;
  isLoading: boolean;
} => {
  const [apiData, setApiData] = useState<Listing[]>(apiDataInitialState);
  const [totalRecords, setTotalRecords] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const controllerRef = useRef<AbortController | null>();

  const filter = useContext(FilterContext);

  const fetchData = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${apiUrl}${filter.activeCategory.field}${filter.activeIssuer.field}${filter.activeCreditRange.field}&xml_version=2&max=10`,
        { signal: controllerRef.current?.signal }
      );
      const data = await response.json();

      setTotalRecords(data.ResultSet.TotalRecords);
      setApiData(data.ResultSet.Listings.Listing);
      controllerRef.current = null;
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [filter.activeCategory, filter.activeIssuer, filter.activeCreditRange]);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [fetchData]);

  return { apiData, totalRecords, isLoading };
};
