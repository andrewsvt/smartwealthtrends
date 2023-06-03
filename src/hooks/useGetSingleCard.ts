import { useCallback, useEffect, useState } from 'react';
import { IAPIData } from 'interfaces/Api';
import { apiDataInitialState } from 'utils/constants';

export const useGetSingleCard = (
  id: string
): {
  singleCard: IAPIData;
  isSingleLoading: boolean;
} => {
  const [singleCard, setSingleCard] = useState<IAPIData>(apiDataInitialState);
  const [isSingleLoading, setIsSingleLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setIsSingleLoading(true);
      const requestURL = `https://dev-api.moneyatlas.link/cards/${id}`;
      const response = await fetch(requestURL);
      const data = await response.json();

      setSingleCard(data);
      setIsSingleLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, []);

  return { singleCard, isSingleLoading };
};
