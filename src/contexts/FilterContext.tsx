import { createContext, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ICategorySelectValue,
  categories,
  creditRating,
  issuers,
  ISelectValue,
  IssuersSlugEnum,
  CreditRatingSlugEnum,
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

  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const updateCategory = useCallback((newCategory: string) => {
    const fullCategory = categories.find((category) => category.slug === newCategory);
    if (fullCategory) {
      setActiveCategory(fullCategory);
    }
  }, []);

  const updateIssuer = useCallback((newIssuer: string) => {
    const fullIssuers = issuers.find((issuer) => issuer.slug === newIssuer);
    if (fullIssuers) {
      setActiveIssuer(fullIssuers);
    }
  }, []);

  const updateCreditRange = useCallback((newCreditRange: string) => {
    const fullCreditRating = creditRating.find((item) => item.slug === newCreditRange);
    if (fullCreditRating) {
      setActiveCreditRange(fullCreditRating);
    }
  }, []);

  useEffect(() => {
    const isHomePage = location.pathname === '/';

    const paramsObj = {
      category: activeCategory.slug,
      ...(activeIssuer.slug !== IssuersSlugEnum.allIssuers && { issuer: activeIssuer.slug }),
      ...(activeCreditRange.slug !== CreditRatingSlugEnum.allCreditRating && {
        creditRange: activeCreditRange.slug,
      }),
    };

    if (isHomePage) {
      const params = Object.entries(paramsObj)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&');
      navigate({ search: params });
    }
  }, [activeCategory, activeIssuer, activeCreditRange, location.pathname]);

  useEffect(() => {
    const newParams = {
      category: params.get('category'),
      issuer: params.get('issuer'),
      creditRange: params.get('creditRange'),
    };

    if (newParams.category) {
      updateCategory(newParams.category);
    }

    if (newParams.issuer) {
      updateIssuer(newParams.issuer);
    }

    if (newParams.creditRange) {
      updateCreditRange(newParams.creditRange);
    }
  }, []);

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
