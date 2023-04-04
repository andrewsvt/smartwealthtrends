import { createContext, useCallback, useState } from 'react';
import { CategoriesEnum, IssuersEnum } from 'utils/constants';

interface IFilterContext {
  activeCategory: { text: string; field: CategoriesEnum };
  activeIssuer: { text: string; field: IssuersEnum };
  updateCategory: (newCategory: { text: string; field: CategoriesEnum }) => void;
  updateIssuer: (newIssuer: { text: string; field: IssuersEnum }) => void;
}

export const FilterContext = createContext<IFilterContext>(null as any);

export const FilterContextProvider = ({ children }: any) => {
  const [activeCategory, setActiveCategory] = useState({
    text: 'Top Cards',
    field: CategoriesEnum.topCards,
  });
  const [activeIssuer, setActiveIssuer] = useState({
    text: 'All Issuers',
    field: IssuersEnum.allIssuers,
  });

  const updateCategory = useCallback((newCategory: { text: string; field: CategoriesEnum }) => {
    setActiveCategory(newCategory);
  }, []);

  const updateIssuer = useCallback((newIssuer: { text: string; field: IssuersEnum }) => {
    setActiveIssuer(newIssuer);
  }, []);

  return (
    <FilterContext.Provider value={{ activeCategory, activeIssuer, updateCategory, updateIssuer }}>
      {children}
    </FilterContext.Provider>
  );
};
