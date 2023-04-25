import { ReactComponent as BluePoint } from '../assets/icons/bluePoint.svg';

//categories
import { ReactComponent as AwardIcon } from '../assets/icons/award.svg';
import { ReactComponent as TrandingDownIcon } from '../assets/icons/trending-down.svg';
import { ReactComponent as RefreshIcon } from '../assets/icons/refresh-ccw.svg';
import { ReactComponent as CardCoinIcon } from '../assets/icons/cardcoin.svg';
import { ReactComponent as BoxIcon } from '../assets/icons/box.svg';
import { ReactComponent as AirplaneIcon } from '../assets/icons/airplane.svg';
import { ReactComponent as BriefcaseIcon } from '../assets/icons/briefcase.svg';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { ReactComponent as GlobalIcon } from '../assets/icons/global.svg';
import { ReactComponent as GasIcon } from '../assets/icons/gasstation.svg';
import { ReactComponent as PercentIcon } from '../assets/icons/percent.svg';
import { ReactComponent as StudentIcon } from '../assets/icons/student.svg';

//issures
import { ReactComponent as CitiLogo } from '../assets/icons/issuers/citi.svg';
import { ReactComponent as CaoitalOneLogo } from '../assets/icons/issuers/capitalone.svg';
import { ReactComponent as ChaseLogo } from '../assets/icons/issuers/chase.svg';
import { ReactComponent as BankOfAmericaLogo } from '../assets/icons/issuers/bankofamerica.svg';
import { ReactComponent as WellsFargoLogo } from '../assets/icons/issuers/wellsfargo.svg';
import { ReactComponent as AmericanExpressLogo } from '../assets/icons/issuers/americanexpress.svg';
import { ReactComponent as DiscoverLogo } from '../assets/icons/issuers/discover.svg';
import { ReactComponent as VisaLogo } from '../assets/icons/issuers/visa.svg';
import { ReactComponent as MastercardLogo } from '../assets/icons/issuers/mastercard.svg';

//range
import { ReactComponent as RangeNo } from '../assets/icons/rangeNo.svg';
import { ReactComponent as RangePoor } from '../assets/icons/rangePoor.svg';
import { ReactComponent as RangeFair } from '../assets/icons/rangeFair.svg';
import { ReactComponent as RangeGood } from '../assets/icons/rangeGood.svg';
import { ReactComponent as RangeExcellent } from '../assets/icons/rangeExcellent.svg';

import { Listing } from 'interfaces/Api';
import { ReactElement, SVGProps } from 'react';

export enum CategoriesEnum {
  topCards = '&crd=25',
  balanceTransfer = '&crd=6',
  lowOngoingRate = '&crd=2',
  noAnnualFee = '&crd=11',
  cashBack = '&crd=3',
  rewards = '&crd=5',
  noForeignFees = '&crd=16',
  gas = '&crd=7',
  zeroApr = '&crd=10',
  travel = '&crd=4',
  student = '&crd=8',
  business = '&crd=9',
}
export enum CategoriesSlugEnum {
  topCards = 'top-cards',
  balanceTransfer = 'balance-transfer',
  lowOngoingRate = 'low-ongoing-rate',
  noAnnualFee = 'no-annual-fee',
  cashBack = 'cash-back',
  rewards = 'rewards',
  noForeignFees = 'no-foreign-fees',
  gas = 'gas',
  zeroApr = 'zero-apr',
  travel = 'travel',
  student = 'student',
  business = 'business',
}

export enum IssuersEnum {
  allIssuers = '',
  citi = '&ccis=188934',
  capitalOne = '&ccis=637902',
  chase = '&ccis=188933',
  bankOfAmerica = '&ccis=574429',
  wellsFargo = '&ccis=636744',
  americanExpress = '&ccis=640029',
  discover = '&ccis=662750',
  visa = '&ccntwk=1',
  mastercard = '&ccntwk=2',
}
export enum IssuersSlugEnum {
  allIssuers = 'all-issuers',
  citi = 'citi',
  capitalOne = 'capital-one',
  chase = 'chase',
  bankOfAmerica = 'bank-of-america',
  wellsFargo = 'wells-fargo',
  americanExpress = 'american-express',
  discover = 'discover',
  visa = 'visa',
  mastercard = 'mastercard',
}

export enum CreditRatingEnum {
  allCreditRating = '',
  excellent = '&cccrate=1',
  good = '&cccrate=2',
  averageFair = '&cccrate=3',
  poor = '&cccrate=4',
  noneLimitedHistory = '&cccrate=5',
}
export enum CreditRatingSlugEnum {
  allCreditRating = 'all-credit-rating',
  excellent = 'excellent',
  good = 'good',
  averageFair = 'average-fair',
  poor = 'poor',
  noneLimitedHistory = 'none-limited-history',
}

export interface ISelectValue {
  text: string;
  field: string | CategoriesEnum | IssuersEnum | CreditRatingEnum;
  slug: string;
}
export interface ISVGSelectValue extends ISelectValue {
  icon: (props: SVGProps<SVGElement>) => ReactElement;
}

export const categories: ISVGSelectValue[] = [
  {
    text: 'Top Cards',
    field: CategoriesEnum.topCards,
    icon: AwardIcon,
    slug: CategoriesSlugEnum.topCards,
  },
  {
    text: 'No annual fee',
    field: CategoriesEnum.noAnnualFee,
    icon: CalendarIcon,
    slug: CategoriesSlugEnum.noAnnualFee,
  },
  {
    text: 'Balance transfer',
    field: CategoriesEnum.balanceTransfer,
    icon: RefreshIcon,
    slug: CategoriesSlugEnum.balanceTransfer,
  },
  {
    text: 'Low Ongoing Rate',
    field: CategoriesEnum.lowOngoingRate,
    icon: TrandingDownIcon,
    slug: CategoriesSlugEnum.lowOngoingRate,
  },
  {
    text: 'Cash Back',
    field: CategoriesEnum.cashBack,
    icon: CardCoinIcon,
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
    text: 'No Foreign Fees',
    field: CategoriesEnum.noForeignFees,
    icon: GlobalIcon,
    slug: CategoriesSlugEnum.noForeignFees,
  },
  {
    text: 'Gas',
    field: CategoriesEnum.gas,
    icon: GasIcon,
    slug: CategoriesSlugEnum.gas,
  },
  {
    text: '0% APR',
    field: CategoriesEnum.zeroApr,
    icon: PercentIcon,
    slug: CategoriesSlugEnum.zeroApr,
  },
  {
    text: 'Student',
    field: CategoriesEnum.student,
    icon: StudentIcon,
    slug: CategoriesSlugEnum.student,
  },
  {
    text: 'Business',
    field: CategoriesEnum.business,
    icon: BriefcaseIcon,
    slug: CategoriesSlugEnum.business,
  },
];

export const issuers: ISVGSelectValue[] = [
  {
    text: 'All Issuers',
    icon: BluePoint,
    field: IssuersEnum.allIssuers,
    slug: IssuersSlugEnum.allIssuers,
  },
  {
    text: 'Citibank',
    icon: CitiLogo,
    field: IssuersEnum.citi,
    slug: IssuersSlugEnum.citi,
  },
  {
    text: 'Capital One',
    icon: CaoitalOneLogo,
    field: IssuersEnum.capitalOne,
    slug: IssuersSlugEnum.capitalOne,
  },
  {
    text: 'Chase',
    icon: ChaseLogo,
    field: IssuersEnum.chase,
    slug: IssuersSlugEnum.chase,
  },
  {
    text: 'Bank of America',
    icon: BankOfAmericaLogo,
    field: IssuersEnum.bankOfAmerica,
    slug: IssuersSlugEnum.bankOfAmerica,
  },
  {
    text: 'Wells Fargo',
    icon: WellsFargoLogo,
    field: IssuersEnum.wellsFargo,
    slug: IssuersSlugEnum.wellsFargo,
  },
  {
    text: 'American Express',
    icon: AmericanExpressLogo,
    field: IssuersEnum.americanExpress,
    slug: IssuersSlugEnum.americanExpress,
  },
  {
    text: 'Discover',
    icon: DiscoverLogo,
    field: IssuersEnum.discover,
    slug: IssuersSlugEnum.discover,
  },
  {
    text: 'Visa',
    icon: VisaLogo,
    field: IssuersEnum.visa,
    slug: IssuersSlugEnum.visa,
  },
  {
    text: 'Mastercard',
    icon: MastercardLogo,
    field: IssuersEnum.mastercard,
    slug: IssuersSlugEnum.mastercard,
  },
];

export const creditRating: ISVGSelectValue[] = [
  {
    text: 'All Credit Ranges',
    icon: BluePoint,
    field: CreditRatingEnum.allCreditRating,
    slug: CreditRatingSlugEnum.allCreditRating,
  },
  {
    text: 'Excellent',
    icon: RangeExcellent,
    field: CreditRatingEnum.excellent,
    slug: CreditRatingSlugEnum.excellent,
  },
  {
    text: 'Good',
    icon: RangeGood,
    field: CreditRatingEnum.good,
    slug: CreditRatingSlugEnum.good,
  },
  {
    text: 'Average/Fair',
    icon: RangeFair,
    field: CreditRatingEnum.averageFair,
    slug: CreditRatingSlugEnum.averageFair,
  },
  {
    text: 'Poor',
    icon: RangePoor,
    field: CreditRatingEnum.poor,
    slug: CreditRatingSlugEnum.poor,
  },
  {
    text: 'None/Limited History',
    icon: RangeNo,
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

export const homeRoutes = ['/', '/:category', '/:category/:range'];

export const advertiserDisclosure =
  'SmartWealthTrends has partnered with CardRatings for our coverage of credit card products. SmartWealthTrends and CardRatings may receive a commission from card issuers. Some or all of the card offers that appear on SmartWealthTrends are from advertisers. Compensation may impact how and where card products appear, but does not affect our editors’ opinions or evaluations. SmartWealthTrends does not include all card companies or all available card offers.';

export const editorialDisclosure =
  'Opinions, reviews, analyses & recommendations are the author’s alone, and have not been reviewed, endorsed or approved by any of these entities.';
