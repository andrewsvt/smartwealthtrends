import { ReactComponent as AwardIcon } from '../assets/icons/award.svg';
import { ReactComponent as TrandingDownIcon } from '../assets/icons/trending-down.svg';
import { ReactComponent as RefreshIcon } from '../assets/icons/refresh-ccw.svg';
import { ReactComponent as CoinIcon } from '../assets/icons/coin.svg';
import { ReactComponent as BoxIcon } from '../assets/icons/box.svg';
import { ReactComponent as AirplaneIcon } from '../assets/icons/airplane.svg';
import { ReactComponent as BriefcaseIcon } from '../assets/icons/briefcase.svg';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { Listing } from 'interfaces/Api';

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

export const filterCategories = [
  {
    text: 'Top Cards',
    title: 'Top Offers Page Title',
    icon: AwardIcon,
    field: CategoriesEnum.topCards,
  },
  {
    text: 'Low Ongoing Rate',
    title: 'Low Interest Page Title',
    icon: TrandingDownIcon,
    field: CategoriesEnum.lowOngoingRate,
  },
  {
    text: 'Balance transfer',
    title: 'Balance transfer Page Title',
    icon: RefreshIcon,
    field: CategoriesEnum.balanceTransfer,
  },
  {
    text: 'Cash Back',
    title: 'Cash Back Page Title',
    icon: CoinIcon,
    field: CategoriesEnum.cashBack,
  },
  {
    text: 'Rewards',
    title: 'Rewards Page Title',
    icon: BoxIcon,
    field: CategoriesEnum.rewards,
  },
  {
    text: 'Travel',
    title: 'Travel Page Title',
    icon: AirplaneIcon,
    field: CategoriesEnum.travel,
  },
  {
    text: 'Business',
    title: 'Business Page Title',
    icon: BriefcaseIcon,
    field: CategoriesEnum.business,
  },
  {
    text: 'No annual fee',
    title: 'No annual fee Page Title',
    icon: CalendarIcon,
    field: CategoriesEnum.noAnnualFee,
  },
];

export const categories = [
  {
    text: 'Top Cards',
    field: CategoriesEnum.topCards,
  },
  {
    text: 'Low Ongoing Rate',
    field: CategoriesEnum.lowOngoingRate,
  },
  {
    text: 'Balance transfer',
    field: CategoriesEnum.balanceTransfer,
  },
  {
    text: 'Cash Back',
    field: CategoriesEnum.cashBack,
  },
  {
    text: 'Rewards',
    field: CategoriesEnum.rewards,
  },
  {
    text: 'Travel',
    field: CategoriesEnum.travel,
  },
  {
    text: 'Business',
    field: CategoriesEnum.business,
  },
  {
    text: 'No annual fee',
    field: CategoriesEnum.noAnnualFee,
  },
];

export const issuers = [
  {
    text: 'All Issuers',
    field: IssuersEnum.allIssuers,
  },
  {
    text: 'Chase',
    field: IssuersEnum.chase,
  },
  {
    text: 'Citi',
    field: IssuersEnum.citi,
  },
  {
    text: 'First Progress',
    field: IssuersEnum.firstProgress,
  },
  {
    text: 'Reliant Holdings',
    field: IssuersEnum.reliantHoldings,
  },
  {
    text: 'Bank of America',
    field: IssuersEnum.bankOfAmerica,
  },
  {
    text: 'The Bank of Missouri',
    field: IssuersEnum.theBankOfMissouri,
  },
  {
    text: 'Genesis Bankcard',
    field: IssuersEnum.genesisBankcard,
  },
  {
    text: 'Celtic Bank',
    field: IssuersEnum.celticBank,
  },
  {
    text: 'TD Bank',
    field: IssuersEnum.TDBank,
  },
  {
    text: 'Merrick Bank',
    field: IssuersEnum.merrickBank,
  },
  {
    text: 'Wells Fargo',
    field: IssuersEnum.wellsFargo,
  },
];

export const creditRating = [
  {
    text: 'All Credit Ranges',
    field: CreditRatingEnum.allCreditRating,
  },
  {
    text: 'Excellent',
    field: CreditRatingEnum.excellent,
  },
  {
    text: 'Good',
    field: CreditRatingEnum.good,
  },
  {
    text: 'Average/Fair',
    field: CreditRatingEnum.averageFair,
  },
  {
    text: 'Poor',
    field: CreditRatingEnum.poor,
  },
  {
    text: 'None/Limited History',
    field: CreditRatingEnum.noneLimitedHistory,
  },
];

export const apiDataInitialState: Listing[] = [
  {
    ID: 'test',
    AccountID: 'test',
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
