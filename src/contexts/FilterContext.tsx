import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ISVGSelectValue,
  categories,
  creditRating,
  issuers,
  ISelectValue,
  IssuersSlugEnum,
  CreditRatingSlugEnum,
} from 'utils/constants';
import { getFiltersLink } from 'utils/getFiltersLink';

interface IFilterContext {
  activeCategory: ISVGSelectValue;
  activeIssuer: ISVGSelectValue;
  activeCreditRange: ISVGSelectValue;
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

  const { categoryParam, rangeParam } = useMemo(() => {
    const params = location.pathname.split('/').slice(1);

    return { categoryParam: params[0], rangeParam: params[1] };
  }, [location]);

  const isHomePage = useMemo(() => {
    if (location.pathname === '/') return true;

    const isCorrectCategory = [...categories, ...issuers].find(
      (item) => item.slug === categoryParam
    );

    return !!isCorrectCategory;
  }, [categoryParam, location]);

  const updateCategory = useCallback((newCategory: string) => {
    const fullCategory = categories.find((category) => category.slug === newCategory);
    if (fullCategory) {
      setActiveIssuer(issuers[0]);
      setActiveCategory(fullCategory);
    }
  }, []);

  const updateIssuer = useCallback((newIssuer: string) => {
    const fullIssuers = issuers.find((issuer) => issuer.slug === newIssuer);
    if (fullIssuers) {
      setActiveCategory(categories[0]);
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
    if (isHomePage) {
      const newLink = getFiltersLink(activeCategory, activeIssuer, activeCreditRange);
      navigate(newLink);
    }
  }, [activeCategory, activeIssuer, activeCreditRange]);

  useEffect(() => {
    if (!isHomePage) return;

    if (categoryParam) {
      const isCategory = categories.find((item) => item.slug === categoryParam);
      const isIssuers = issuers.find((item) => item.slug === categoryParam);

      if (isCategory) {
        updateCategory(categoryParam);
      } else if (isIssuers) {
        updateIssuer(categoryParam);
      } else {
        navigate('/');
      }
    }

    if (rangeParam) {
      updateCreditRange(rangeParam);
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
