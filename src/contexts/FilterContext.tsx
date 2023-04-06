import { createContext, useCallback, useEffect, useState } from 'react';
import {
  ICategorySelectValue,
  categories,
  creditRating,
  issuers,
  ISelectValue,
} from 'utils/constants';

interface IFilterContext {
  activeCategory: ICategorySelectValue;
  activeIssuer: ISelectValue;
  activeCreditRange: ISelectValue;
  updateCategory: (newCategory: string) => void;
  updateIssuer: (newIssuer: string) => void;
  updateCreditRange: (newCreditRange: string) => void;
}

export const FilterContext = createContext<IFilterContext>(null as any);

export const FilterContextProvider = ({ children }: any) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeIssuer, setActiveIssuer] = useState(issuers[0]);
  const [activeCreditRange, setActiveCreditRange] = useState(creditRating[0]);

  const updateCategory = useCallback((newCategory: string) => {
    const fullCategory = categories.find(category => category.slug === newCategory);
    if (fullCategory) {
      setActiveCategory(fullCategory);
    }
  }, []);

  const updateIssuer = useCallback((newIssuer: string) => {
    const fullIssuers = issuers.find(issuer => issuer.slug === newIssuer);
    if (fullIssuers) {
      setActiveIssuer(fullIssuers);
    }
  }, []);

  const updateCreditRange = useCallback(
    (newCreditRange: string) => {
      const fullCreditRating = creditRating.find(item => item.slug === newCreditRange);
      if (fullCreditRating) {
        setActiveCreditRange(fullCreditRating);
      }
    },
    []
  );

  useEffect(() => {
    console.log({activeCategory, activeIssuer, activeCreditRange});
  }, [activeCategory, activeIssuer, activeCreditRange])


  return (
    <FilterContext.Provider
      value={{
        activeCategory,
        activeIssuer,
        activeCreditRange,
        updateCategory,
        updateIssuer,
        updateCreditRange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
