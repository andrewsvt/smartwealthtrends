export interface IAPIResponse {
  meta: IAPIMeta;
  data: IAPIData[];
}

export interface IAPIMeta {
  total: 0;
  limit: 0;
  offset: 0;
}

export interface IAPIData {
  id: number;
  serviceCardId: number;
  displayName: string;
  cardName: string;
  rawLogoImageUrl: string;
  editorRating: string;
  termsAndConditionsLink: string;
  bonusMilesFull: string;
  rewardsDescriptionLong: string;
  regApr: string;
  regAprType: string;
  annualFees: string;
  creditScoreNeeded: string;
  cardProcessorTypeName: string;
  introAprRate: string;
  introAprDuration: string;
  ppcDescription: string;
  prosAndCons?: null;
  reviewSectionText?: null;
}
