export interface ResultSet {
    TotalRecords: string;
    SearchID: string;
    RootSearchID: string;
    SearchStatusID: string;
    BaseSearchStatusID: string;
    ShowPhone: string;
    StrategyChainID: string;
    RandomSeed: string;
    NumberOfAvailableCards: string;
    CardBeginRank: string;
    CardEndRank: string;
    CurrentOffset: string;
    TimeTaken: string;
    ProfIndicator: string;
    Listings: {
        CreditCardType: string;
        Income: string;
        Listing: Listing [];
    };
    Disclaimer: string;
  }
  

export interface Listing {
    ID: string;
    AccountID: string;
    ActiveCreditCardTypes: string;
    HasAnnualFee: string;
    AnnualFeeDisclaimer: string;
    AnnualFees: string;
    AnnualFeesAmount: string;
    BalanceTransferDurationMonths: string;
    BalanceTransferFees: string;
    BalanceTransferGracePeriod: string;
    BalanceTransferIntroAPR: string;
    BalanceTransferIntroDuration: string;
    BalanceTransferMin: string;
    BalanceTransferRate: string;
    BonusMiles: string;
    BonusMilesDisclaimer: string;
    BonusMilesFull: string;
    BuyerID: string;
    CardDetailsLink: string;
    CardName: string;
    CardProcessorTypeName: string;
    CardRatingsID: string;
    CardUse: string;
    CashAdvanceAPR: string;
    CashAdvanceFee: string;
    CashAdvanceGracePeriod: string;
    CashBackOnAllOther: string;
    CashBackOnGas: string;
    CashBackOnGroceries: string;
    OverallCashBack: string;
    AirlineRewards: string;
    HotelRewards: string;
    DiningRewards: string;
    Company: string;
    CreditCardID: string;
    CreditCardIssuerID: string;
    CreditCardType: string;
    CreditRatingGroup: number;
    CreditScoreNeeded: string;
    DefaultCreditCardTypeName: string;
    DisplayName: string;
    EditorRating: string;
    ForeignTransactionFee: string;
    ImpressionID: string;
    IntroAPRDuration: string;
    IntroAPRRate: string;
    LastUpdated: string;
    LatePaymentFee: string;
    MaxRegAPR: string;
    MilesPerDollar: string;
    MinRegAPR: string;
    PenaltyAPR: string;
    PointsPerDollar: string;
    Rank: string;
    RegAPR: string;
    RegAPRType: string;
    RewardsDescriptionLong: string;
    RewardsInfo: {
      value: string;
      description: string;
    }[];
    RewardsProgramLogoImage: string;
    RewardsProgramName: string;
    SignupFeatured: string;
    SignupRequirement: string;
    SignupReward: string;
    SpecialOffer: string;
    SpecialOfferDisclaimer: string;
    TermsAndConditionsLink: string;
    Creative: ICreative;
  }
  
  interface ICreative {
    ID: string;
    LogoImageUrl: string;
    RawLogoImageUrl: string;
    LogoWidth: string;
    LogoHeight: string;
    Description: string;
    DescriptionLines: string[];
    PPCDescription: string;
    PPCDescriptionLines: string[];
  }
  