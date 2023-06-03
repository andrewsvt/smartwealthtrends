import { createContext, useState, useCallback } from 'react';
import { IAPIData } from '../interfaces/Api';
import { apiDataInitialState } from 'utils/constants';

interface ISelectedCardContext {
  selectedCard: IAPIData;
  updateSelectedCard: (newSelectedCard: IAPIData) => void;
}

const defaultSelectedCardContext: ISelectedCardContext = {
  selectedCard: apiDataInitialState,
  updateSelectedCard: () => {},
};

export const selectedCardContext = createContext<ISelectedCardContext>(defaultSelectedCardContext);

export const SelectedCardContextProvider = ({ children }: any) => {
  const [selectedCard, setSelectedCard] = useState<IAPIData>(apiDataInitialState);

  const updateSelectedCard = useCallback((newSelectedCard: IAPIData) => {
    setSelectedCard(newSelectedCard);
  }, []);

  return (
    <selectedCardContext.Provider value={{ selectedCard, updateSelectedCard }}>
      {children}
    </selectedCardContext.Provider>
  );
};
