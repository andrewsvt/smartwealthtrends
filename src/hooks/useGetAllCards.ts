import { FilterContext } from 'contexts/FilterContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IAPIData, IAPIMeta } from 'interfaces/Api';
import { apiDataInitialState, apiMetaInitialState } from 'utils/constants';

export const useGetAllCards = (): {
  allCards: IAPIData[];
  allCardsMeta: IAPIMeta;
  isAllLoading: boolean;
} => {
  const [allCards, setAllCards] = useState<IAPIData[]>([apiDataInitialState]);
  const [allCardsMeta, setAllCardsMeta] = useState<IAPIMeta>(apiMetaInitialState);
  const [isAllLoading, setIsAllLoading] = useState<boolean>(false);

  const filter = useContext(FilterContext);

  const fetchData = useCallback(async () => {
    try {
      setIsAllLoading(true);
      const requestURL = `http://dev-api-moneyatlas.us-east-1.elasticbeanstalk.com/cards?limit=10&offset=0${filter.activeCategory.field}${filter.activeIssuer.field}${filter.activeCreditRange.field}`;
      const response = await fetch(requestURL);
      const data = await response.json();

      setAllCards(data.data);
      setAllCardsMeta(data.meta);
      setIsAllLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [filter.activeCategory, filter.activeIssuer, filter.activeCreditRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { allCards, allCardsMeta, isAllLoading };
};
