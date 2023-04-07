import { ReactComponent as AwardIcon } from '../assets/icons/award.svg';
import { ReactComponent as TrandingDownIcon } from '../assets/icons/trending-down.svg';
import { ReactComponent as RefreshIcon } from '../assets/icons/refresh-ccw.svg';
import { ReactComponent as CoinIcon } from '../assets/icons/coin.svg';
import { ReactComponent as BoxIcon } from '../assets/icons/box.svg';
import { ReactComponent as AirplaneIcon } from '../assets/icons/airplane.svg';
import { ReactComponent as BriefcaseIcon } from '../assets/icons/briefcase.svg';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { Listing } from 'interfaces/Api';
import { ReactElement, SVGProps } from 'react';

export enum CategoriesEnum {
  topCards = '&crd=25',
  lowOngoingRate = '&crd=2',
  balanceTransfer = '&crd=6',
  cashBack = '&crd=3',
  rewards = '&crd=5',
  travel = '&crd=4',
  business = '&crd=9',
  noAnnualFee = '&crd=11',
}

export enum CategoriesSlugEnum {
  topCards = 'top-cards',
  lowOngoingRate = 'low-ongoing-rate',
  balanceTransfer = 'balance-transfer',
  cashBack = 'cash-back',
  rewards = 'rewards',
  travel = 'travel',
  business = 'business',
  noAnnualFee = 'no-annual-fee',
}

export enum IssuersEnum {
  allIssuers = '',
  chase = '&ccis=188933',
  citi = '&ccis=188934',
  firstProgress = '&ccis=572111',
  reliantHoldings = '&ccis=572914',
  bankOfAmerica = '&ccis=574429',
  theBankOfMissouri = '&ccis=606689',
  genesisBankcard = '&ccis=607775',
  celticBank = '&ccis=607790',
  TDBank = '&ccis=607968',
  merrickBank = '&ccis=608025',
  wellsFargo = '&ccis=636744',
}

export enum CreditRatingEnum {
  allCreditRating = '',
  excellent = '&cccrate=1',
  good = '&cccrate=2',
  averageFair = '&cccrate=3',
  poor = '&cccrate=4',
  noneLimitedHistory = '&cccrate=5',
}

export interface ISelectValue {
  text: string;
  field: string | CategoriesEnum | IssuersEnum | CreditRatingEnum;
  slug: string;
}

export interface ICategorySelectValue extends ISelectValue {
  icon: (props: SVGProps<SVGElement>) => ReactElement;
}

export const categories: ICategorySelectValue[] = [
  {
    text: 'Top Cards',
    field: CategoriesEnum.topCards,
    icon: AwardIcon,
    slug: CategoriesSlugEnum.topCards,
  },
  {
    text: 'Low Ongoing Rate',
    field: CategoriesEnum.lowOngoingRate,
    icon: TrandingDownIcon,
    slug: CategoriesSlugEnum.lowOngoingRate,
  },
  {
    text: 'Balance transfer',
    field: CategoriesEnum.balanceTransfer,
    icon: RefreshIcon,
    slug: CategoriesSlugEnum.balanceTransfer,
  },
  {
    text: 'Cash Back',
    field: CategoriesEnum.cashBack,
    icon: CoinIcon,
    slug: CategoriesSlugEnum.cashBack,
  },
  {
    text: 'Rewards',
    field: CategoriesEnum.rewards,
    icon: BoxIcon,
    slug: CategoriesSlugEnum.rewards,
  },
  {
    text: 'Travel',
    field: CategoriesEnum.travel,
    icon: AirplaneIcon,
    slug: CategoriesSlugEnum.travel,
  },
  {
    text: 'Business',
    field: CategoriesEnum.business,
    icon: BriefcaseIcon,
    slug: CategoriesSlugEnum.business,
  },
  {
    text: 'No annual fee',
    field: CategoriesEnum.noAnnualFee,
    icon: CalendarIcon,
    slug: CategoriesSlugEnum.noAnnualFee,
  },
];

export enum IssuersSlugEnum {
  allIssuers = 'all-issuers',
  chase = 'chase',
  citi = 'citi',
  firstProgress = 'first-progress',
  reliantHoldings = 'reliant-holdings',
  bankOfAmerica = 'bank-of-america',
  theBankOfMissouri = 'the-bank-of-missouri',
  genesisBankcard = 'genesis-bankcard',
  celticBank = 'celtic-bank',
  tdBank = 'td-bank',
  merrickBank = 'merrick-bank',
  wellsFargo = 'wellsFargo',
}

export const issuers: ISelectValue[] = [
  {
    text: 'All Issuers',
    field: IssuersEnum.allIssuers,
    slug: IssuersSlugEnum.allIssuers,
  },
  {
    text: 'Chase',
    field: IssuersEnum.chase,
    slug: IssuersSlugEnum.chase,
  },
  {
    text: 'Citi',
    field: IssuersEnum.citi,
    slug: IssuersSlugEnum.citi,
  },
  {
    text: 'First Progress',
    field: IssuersEnum.firstProgress,
    slug: IssuersSlugEnum.firstProgress,
  },
  {
    text: 'Reliant Holdings',
    field: IssuersEnum.reliantHoldings,
    slug: IssuersSlugEnum.reliantHoldings,
  },
  {
    text: 'Bank of America',
    field: IssuersEnum.bankOfAmerica,
    slug: IssuersSlugEnum.bankOfAmerica,
  },
  {
    text: 'The Bank of Missouri',
    field: IssuersEnum.theBankOfMissouri,
    slug: IssuersSlugEnum.theBankOfMissouri,
  },
  {
    text: 'Genesis Bankcard',
    field: IssuersEnum.genesisBankcard,
    slug: IssuersSlugEnum.genesisBankcard,
  },
  {
    text: 'Celtic Bank',
    field: IssuersEnum.celticBank,
    slug: IssuersSlugEnum.celticBank,
  },
  {
    text: 'TD Bank',
    field: IssuersEnum.TDBank,
    slug: IssuersSlugEnum.tdBank,
  },
  {
    text: 'Merrick Bank',
    field: IssuersEnum.merrickBank,
    slug: IssuersSlugEnum.merrickBank,
  },
  {
    text: 'Wells Fargo',
    field: IssuersEnum.wellsFargo,
    slug: IssuersSlugEnum.wellsFargo,
  },
];

export enum CreditRatingSlugEnum {
  allCreditRating = 'all-credit-rating',
  excellent = 'excellent',
  good = 'good',
  averageFair = 'average-fair',
  poor = 'poor',
  noneLimitedHistory = 'none-limited-history',
}

export const creditRating: ISelectValue[] = [
  {
    text: 'All Credit Ranges',
    field: CreditRatingEnum.allCreditRating,
    slug: CreditRatingSlugEnum.allCreditRating,
  },
  {
    text: 'Excellent',
    field: CreditRatingEnum.excellent,
    slug: CreditRatingSlugEnum.excellent,
  },
  {
    text: 'Good',
    field: CreditRatingEnum.good,
    slug: CreditRatingSlugEnum.good,
  },
  {
    text: 'Average/Fair',
    field: CreditRatingEnum.averageFair,
    slug: CreditRatingSlugEnum.averageFair,
  },
  {
    text: 'Poor',
    field: CreditRatingEnum.poor,
    slug: CreditRatingSlugEnum.poor,
  },
  {
    text: 'None/Limited History',
    field: CreditRatingEnum.noneLimitedHistory,
    slug: CreditRatingSlugEnum.noneLimitedHistory,
  },
];

export const apiDataInitialState: Listing[] = [
  {
    ID: '',
    AccountID: '',
    ActiveCreditCardTypes: '',
    HasAnnualFee: '',
    AnnualFeeDisclaimer: '',
    AnnualFees: '',
    AnnualFeesAmount: '',
    BalanceTransferDurationMonths: '',
    BalanceTransferFees: '',
    BalanceTransferGracePeriod: '',
    BalanceTransferIntroAPR: '',
    BalanceTransferIntroDuration: '',
    BalanceTransferMin: '',
    BalanceTransferRate: '',
    BonusMiles: '',
    BonusMilesDisclaimer: '',
    BonusMilesFull: '',
    BuyerID: '',
    CardDetailsLink: '',
    CardName: '',
    CardProcessorTypeName: '',
    CardRatingsID: '',
    CardUse: '',
    CashAdvanceAPR: '',
    CashAdvanceFee: '',
    CashAdvanceGracePeriod: '',
    CashBackOnAllOther: '',
    CashBackOnGas: '',
    CashBackOnGroceries: '',
    OverallCashBack: '',
    AirlineRewards: '',
    HotelRewards: '',
    DiningRewards: '',
    Company: '',
    CreditCardID: '',
    CreditCardIssuerID: '',
    CreditCardType: '',
    CreditRatingGroup: 5,
    CreditScoreNeeded: '',
    DefaultCreditCardTypeName: '',
    DisplayName: '',
    EditorRating: '',
    ForeignTransactionFee: '',
    ImpressionID: '',
    IntroAPRDuration: '',
    IntroAPRRate: '',
    LastUpdated: '',
    LatePaymentFee: '',
    MaxRegAPR: '',
    MilesPerDollar: '',
    MinRegAPR: '',
    PenaltyAPR: '',
    PointsPerDollar: '',
    Rank: '',
    RegAPR: '',
    RegAPRType: '',
    RewardsDescriptionLong: '',
    RewardsInfo: [
      {
        value: '',
        description: '',
      },
    ],
    RewardsProgramLogoImage: '',
    RewardsProgramName: '',
    SignupFeatured: '',
    SignupRequirement: '',
    SignupReward: '',
    SpecialOffer: '',
    SpecialOfferDisclaimer: '',
    TermsAndConditionsLink: '',
    Creative: {
      ID: '',
      LogoImageUrl:
        'https://cdn.nextinsure.com/imaging/opt/7dc4432f-019f-4848-a2da-ed81b74156f9.png?w=210',
      RawLogoImageUrl:
        'https://cdn.nextinsure.com/imaging/opt/7dc4432f-019f-4848-a2da-ed81b74156f9.png',
      LogoWidth: '',
      LogoHeight: '',
      Description: '',
      DescriptionLines: ['', '', ''],
      PPCDescription: '',
      PPCDescriptionLines: [''],
    },
  },
];
