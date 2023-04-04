import { createContext, useState, useCallback } from 'react';
import { Listing } from '../interfaces/Api';
import { apiDataInitialState } from 'utils/constants';

interface ISelectedCardContext {
  selectedCard: Listing;
  updateSelectedCard: (newSelectedCard: Listing) => void;
}

const defaultSelectedCardContext: ISelectedCardContext = {
  selectedCard: apiDataInitialState[0],
  updateSelectedCard: () => {},
};

export const selectedCardContext = createContext<ISelectedCardContext>(defaultSelectedCardContext);

export const SelectedCardContextProvider = ({ children }: any) => {
  const [selectedCard, setSelectedCard] = useState<Listing>(apiDataInitialState[0]);

  const updateSelectedCard = useCallback((newSelectedCard: Listing) => {
    setSelectedCard(newSelectedCard);
  }, []);

  return (
    <selectedCardContext.Provider value={{ selectedCard, updateSelectedCard }}>
      {children}
    </selectedCardContext.Provider>
  );
};
