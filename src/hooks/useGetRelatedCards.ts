import { useCallback, useEffect, useState } from 'react';
import { Listing } from 'interfaces/Api';
import { apiDataInitialState } from 'utils/constants';

export const useGetRelatedCards = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [relatedApiData, setRelatedApiData] = useState<Listing[]>(apiDataInitialState);

  const fetchRelatedData = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}&crd=25&xml_version=2&max=2`);
      const data = await response.json();
      setRelatedApiData(data.ResultSet.Listings.Listing);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    console.log('related data log 1', relatedApiData);

    if (relatedApiData[0].ID === '') {
      fetchRelatedData();
    }
  }, [fetchRelatedData]);

  return relatedApiData;
};
