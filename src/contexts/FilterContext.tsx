import { createContext, useCallback, useState } from 'react';
import {
  CategoriesEnum,
  CreditRatingEnum,
  IssuersEnum,
  categories,
  creditRating,
  issuers,
} from 'utils/constants';

interface IFilterContext {
  activeCategory: { text: string; field: CategoriesEnum };
  activeIssuer: { text: string; field: IssuersEnum };
  activeCreditRange: { text: string; field: CreditRatingEnum };
  updateCategory: (newCategory: { text: string; field: CategoriesEnum }) => void;
  updateIssuer: (newIssuer: { text: string; field: IssuersEnum }) => void;
  updateCreditRange: (newCreditRange: { text: string; field: CreditRatingEnum }) => void;
}

export const FilterContext = createContext<IFilterContext>(null as any);

export const FilterContextProvider = ({ children }: any) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeIssuer, setActiveIssuer] = useState(issuers[0]);
  const [activeCreditRange, setActiveCreditRange] = useState(creditRating[0]);

  const updateCategory = useCallback((newCategory: { text: string; field: CategoriesEnum }) => {
    setActiveCategory(newCategory);
  }, []);

  const updateIssuer = useCallback((newIssuer: { text: string; field: IssuersEnum }) => {
    setActiveIssuer(newIssuer);
  }, []);

  const updateCreditRange = useCallback(
    (newCreditRange: { text: string; field: CreditRatingEnum }) => {
      setActiveCreditRange(newCreditRange);
    },
    []
  );

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
