import { createContext, useCallback, useState } from 'react';

export enum FilterEnum {
  topCards = '&crd=25',
  lowOngoingRate = '&crd=2',
  balanceTransfer = '&crd=6',
  cashBack = '&crd=3',
  rewards = '&crd=5',
  travel = '&crd=4',
  business = '&crd=9',
  noAnnualFee = '&crd=11',
}

interface IFilterContext {
  activeFilter: FilterEnum;
  updateFilter: (newFilter: FilterEnum) => void;
}

export const FilterContext = createContext<IFilterContext>(null as any);

export const FilterContextProvider = ({ children }: any) => {
  const [activeFilter, setActiveFilter] = useState(FilterEnum.topCards);

  const updateFilter = useCallback((newFilter: FilterEnum) => {
    setActiveFilter(newFilter);
  }, []);

  return (
    <FilterContext.Provider value={{ activeFilter, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
