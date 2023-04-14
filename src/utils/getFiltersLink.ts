import { ISVGSelectValue, creditRating, issuers } from 'utils/constants';

export const getFiltersLink = (
  activeCategory: ISVGSelectValue,
  activeIssuer: ISVGSelectValue,
  activeCreditRange: ISVGSelectValue
) => {
  const newCategoryParam =
    activeIssuer.slug === issuers[0].slug ? activeCategory.slug : activeIssuer.slug;

  const newRangeParam =
    activeCreditRange.slug === creditRating[0].slug ? '' : `/${activeCreditRange.slug}`;

  return `/${newCategoryParam}${newRangeParam}`;
};
