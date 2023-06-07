import { useCallback, useEffect, useState } from 'react';
import { IAPIData, IAPIMeta } from 'interfaces/Api';
import { apiDataInitialState, apiMetaInitialState } from 'utils/constants';

export const useGetSingleCard = (cardSlug: string) => {
  const [singleCard, setSingleCard] = useState<IAPIData>(apiDataInitialState);
  const [isSingleLoading, setIsSingleLoading] = useState<boolean>(false);

  const [relatedCards, setRelatedCards] = useState<IAPIData[]>([apiDataInitialState]);
  const [relatedCardsMeta, setRelatedCardsMeta] = useState<IAPIMeta>(apiMetaInitialState);
  const [isRelatedLoading, setIsRelatedLoading] = useState<boolean>(false);
  const [isSingleFetchCompleted, setIsSingleFetchCompleted] = useState<boolean>(false);

  const fetchSingleData = useCallback(async () => {
    console.log(encodeURIComponent(cardSlug));

    try {
      setIsSingleLoading(true);
      const requestURL = `https://dev-api.moneyatlas.link/cards/slug/${encodeURIComponent(
        encodeURIComponent(cardSlug)
      )}`;
      const response = await fetch(requestURL);
      const data = await response.json();

      setSingleCard(data);
      setIsSingleLoading(false);
      setIsSingleFetchCompleted(true);
    } catch (error) {
      console.error('Error fetching single card data:', error);
      setIsSingleLoading(false);
    }
  }, [cardSlug]);

  const fetchRelatedData = useCallback(async () => {
    try {
      setIsRelatedLoading(true);
      const issuerQuery = `&category=${encodeURIComponent(singleCard.defaultCreditCardTypeName)}`;
      const requestURL = `https://dev-api.moneyatlas.link/cards?limit=10&offset=0${issuerQuery}`;
      const response = await fetch(requestURL);
      const data = await response.json();

      setRelatedCards(data.data);
      setRelatedCardsMeta(data.meta);
      setIsRelatedLoading(false);
    } catch (error) {
      console.error('Error fetching issuer card data:', error);
      setIsRelatedLoading(false);
    }
  }, [singleCard.displayName]);

  useEffect(() => {
    fetchSingleData();
  }, [fetchSingleData]);

  useEffect(() => {
    if (isSingleFetchCompleted) {
      fetchRelatedData();
    }
  }, [isSingleFetchCompleted, fetchRelatedData]);

  return {
    singleCard,
    isSingleLoading,
    relatedCards,
    relatedCardsMeta,
    isRelatedLoading,
  };
};
