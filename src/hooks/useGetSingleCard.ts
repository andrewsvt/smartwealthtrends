import { useCallback, useEffect, useState } from 'react';
import { IAPIData, IAPIMeta } from 'interfaces/Api';
import { apiDataInitialState, apiMetaInitialState } from 'utils/constants';

export const useGetSingleCard = (id: string) => {
  const [singleCard, setSingleCard] = useState<IAPIData>(apiDataInitialState);
  const [isSingleLoading, setIsSingleLoading] = useState<boolean>(false);

  // const [allIssuerCards, setAllIssuerCards] = useState<IAPIData[]>([apiDataInitialState]);
  // const [allIssuerCardsMeta, setAllIssuerCardsMeta] = useState<IAPIMeta>(apiMetaInitialState);
  // const [isIssuerLoading, setIsIssuerLoading] = useState<boolean>(false);
  // const [isSingleFetchCompleted, setIsSingleFetchCompleted] = useState<boolean>(false);

  const fetchSingleData = useCallback(async () => {
    try {
      setIsSingleLoading(true);
      const requestURL = `https://dev-api.moneyatlas.link/cards/${id}`;
      const response = await fetch(requestURL);
      const data = await response.json();

      setSingleCard(data);
      setIsSingleLoading(false);
      // setIsSingleFetchCompleted(true);
    } catch (error) {
      console.error('Error fetching single card data:', error);
      setIsSingleLoading(false);
    }
  }, [id]);

  // const fetchIssuerData = useCallback(async () => {
  //   try {
  //     setIsIssuerLoading(true);
  //     const issuerQuery = `&issuer=${encodeURIComponent(singleCard.displayName)}`;
  //     const requestURL = `https://dev-api.moneyatlas.link/cards?limit=10&offset=0${issuerQuery}`;
  //     const response = await fetch(requestURL);
  //     const data = await response.json();

  //     setAllIssuerCards(data.data);
  //     setAllIssuerCardsMeta(data.meta);
  //     setIsIssuerLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching issuer card data:', error);
  //     setIsIssuerLoading(false);
  //   }
  // }, [singleCard.displayName]);

  useEffect(() => {
    fetchSingleData();
  }, [fetchSingleData]);

  // useEffect(() => {
  //   if (isSingleFetchCompleted) {
  //     fetchIssuerData();
  //   }
  // }, [isSingleFetchCompleted, fetchIssuerData]);

  return {
    singleCard,
    isSingleLoading,
    // allIssuerCards,
    // allIssuerCardsMeta,
    // isIssuerLoading,
  };
};
