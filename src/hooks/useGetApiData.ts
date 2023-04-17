import { FilterContext } from 'contexts/FilterContext';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Listing } from 'interfaces/Api';
import { apiDataInitialState } from 'utils/constants';
import { useLocation } from 'react-router-dom';

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

  const location = useLocation();

  const isCardPage = useMemo(() => {
    const params = location.pathname.split('/').slice(1);

    if (params.includes('cards')) {
      return true;
    } else return false;
  }, [location]);

  const setLocalStorageItem = useCallback(
    (key: string, value: any, retentionTimeMs: number = 0) => {
      if (!isCardPage) {
        const now = new Date().getTime();
        const item = {
          value: value,
          expiration: retentionTimeMs ? now + retentionTimeMs : null,
        };
        localStorage.setItem(key, JSON.stringify(item));
      }
    },
    []
  );

  const fetchData = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      setIsLoading(true);
      const requestLink = `${apiUrl}${filter.activeCategory.field}${filter.activeIssuer.field}${filter.activeCreditRange.field}&xml_version=2&max=10`;
      const response = await fetch(requestLink, { signal: controllerRef.current?.signal });
      const data = await response.json();

      setTotalRecords(data.ResultSet.TotalRecords);
      setApiData(data.ResultSet.Listings.Listing);
      controllerRef.current = null;
      setIsLoading(false);

      setLocalStorageItem('lastRequestLink', requestLink, 600000); //600.000 - 10 mins
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
