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

export const apiDataInitialState: Listing[] = [
  {
    ID: '56552675',
    AccountID: '637950',
    ActiveCreditCardTypes: '3,5,6,7,10,11,27',
    HasAnnualFee: 'No',
    AnnualFeeDisclaimer: '',
    AnnualFees: '$0',
    AnnualFeesAmount: '0',
    BalanceTransferDurationMonths: '15 billing cycles on balance transfers',
    BalanceTransferFees:
      'Either 3% of the amount of each transfer or $5 minimum, whichever is greater',
    BalanceTransferGracePeriod: 'N/A',
    BalanceTransferIntroAPR: '0% Intro on balance transfers',
    BalanceTransferIntroDuration: '15 billing cycles on balance transfers',
    BalanceTransferMin: 'N/A',
    BalanceTransferRate: '0% Intro on balance transfers',
    BonusMiles: '$200 bonus',
    BonusMilesDisclaimer:
      'after spending $1,000 in eligible purchases within the first 120 days of account opening.',
    BonusMilesFull:
      '$200 bonus after spending $1,000 in eligible purchases within the first 120 days of account opening.',
    BuyerID: '637950',
    CardDetailsLink:
      'https://www.cardratings.com/credit-card/us-bank-cash-plus-visa-signature-card.html',
    CardName: 'U.S. Bank Cash+&#174; Visa Signature&#174; Card',
    CardProcessorTypeName: 'Visa',
    CardRatingsID: '1048',
    CardUse: 'Consumer',
    CashAdvanceAPR: '29.99%',
    CashAdvanceFee: 'N/A',
    CashAdvanceGracePeriod: 'N/A',
    CashBackOnAllOther: '1-5%',
    CashBackOnGas: '1-5%',
    CashBackOnGroceries: '1-5%',
    OverallCashBack: '',
    AirlineRewards: '',
    HotelRewards: '',
    DiningRewards: '',
    Company: 'US Bank',
    CreditCardID: '4048133',
    CreditCardIssuerID: '49',
    CreditCardType: 'Cash Back',
    CreditRatingGroup: 5,
    CreditScoreNeeded: 'Excellent/Good',
    DefaultCreditCardTypeName: 'Cash Back',
    DisplayName: 'US Bank',
    EditorRating: '5',
    ForeignTransactionFee:
      '2% of each foreign purchase transaction or foreign ATM advance transaction in U.S. Dollars 3% of each foreign purchase transaction or foreign ATM advance transaction in a Foreign Currency',
    ImpressionID: 'dd0de918-780d-4139-9b82-89f25b194bfc',
    IntroAPRDuration: '15 billing cycles on purchases',
    IntroAPRRate: '0% Intro on purchases',
    LastUpdated: '3/29/2023 3:26:02 PM',
    LatePaymentFee: 'N/A',
    MaxRegAPR: '29.24',
    MilesPerDollar:
      '5% cash back on your first $2,000 in combined eligible purchases each quarter on two categories you choose. 5% cash back on prepaid air, hotel and car reservations booked directly in the Rewards Center. 2% cash back on one everyday category, like Gas Stations/EV Charging Stations, Grocery Stores or Restaurants. 1% cash back on all other eligible purchases.',
    MinRegAPR: '19.24',
    PenaltyAPR: 'N/A',
    PointsPerDollar:
      '5% cash back on your first $2,000 in combined eligible purchases each quarter on two categories you choose. 5% cash back on prepaid air, hotel and car reservations booked directly in the Rewards Center. 2% cash back on one everyday category, like Gas Stations/EV Charging Stations, Grocery Stores or Restaurants. 1% cash back on all other eligible purchases.',
    Rank: '1',
    RegAPR: '19.24% - 29.24%',
    RegAPRType: 'Variable',
    RewardsDescriptionLong:
      '5% cash back on your first $2,000 in combined eligible purchases each quarter on two categories you choose. 5% cash back on prepaid air, hotel and car reservations booked directly in the Rewards Center. 2% cash back on one everyday category, like Gas Stations/EV Charging Stations, Grocery Stores or Restaurants. 1% cash back on all other eligible purchases.',
    RewardsInfo: [
      {
        value: '5',
        description:
          '% cash back on your first $2,000 in combined eligible purchases each quarter on two categories you choose.',
      },
    ],
    RewardsProgramLogoImage: '',
    RewardsProgramName: '',
    SignupFeatured: '$200 bonus',
    SignupRequirement:
      'after spending $1,000 in eligible purchases within the first 120 days of account opening.',
    SignupReward: '200',
    SpecialOffer: '$200 bonus',
    SpecialOfferDisclaimer:
      'after spending $1,000 in eligible purchases within the first 120 days of account opening.',
    TermsAndConditionsLink:
      'https://applications.usbank.com/oad/termsSimpleApply.controller?locationCode=8069&offerId=G6PHR4DV11&sourceCode=43678',
    Creative: {
      ID: '113917695',
      LogoImageUrl:
        'https://cdn.nextinsure.com/imaging/opt/7dc4432f-019f-4848-a2da-ed81b74156f9.png?w=210',
      RawLogoImageUrl:
        'https://cdn.nextinsure.com/imaging/opt/7dc4432f-019f-4848-a2da-ed81b74156f9.png',
      LogoWidth: '140',
      LogoHeight: '88',
      Description:
        '<ul><li>$200 bonus after spending $1,000 in eligible purchases within the first 120 days of account opening.</li><li>5% cash back on your first $2,000 in combined eligible purchases each quarter on two categories you choose</li><li>5% cash back on prepaid air, hotel and car reservations booked directly in the Rewards Center</li></ul>',
      DescriptionLines: [
        '$200 bonus after spending $1,000 in eligible purchases within the first 120 days of account opening.',
        '5% cash back on your first $2,000 in combined eligible purchases each quarter on two categories you choose',
        '5% cash back on prepaid air, hotel and car reservations booked directly in the Rewards Center',
      ],
      PPCDescription:
        '<ul><li>$200 bonus after spending $1,000 in eligible purchases within the first 120 days of account opening.</li><li>5% cash back on your first $2,000 in combined eligible purchases each quarter on two categories you choose</li><li>5% cash back on prepaid air, hotel and car reservations booked directly in the Rewards Center</li><li>2% cash back on one everyday category, like Gas Stations/EV Charging Stations, Grocery Stores or Restaurants</li><li>1% cash back on all other eligible purchases</li><li>0% Intro APR on purchases and balance transfers for the first 15 billing cycles. After that, a variable APR currently 19.24 - 29.24%</li><li>No Annual Fee</li><li>Terms and conditions apply.</li></ul>',
      PPCDescriptionLines: [
        '$200 bonus after spending $1,000 in eligible purchases within the first 120 days of account opening.',
        '5% cash back on your first $2,000 in combined eligible purchases each quarter on two categories you choose',
        '5% cash back on prepaid air, hotel and car reservations booked directly in the Rewards Center',
        '2% cash back on one everyday category, like Gas Stations/EV Charging Stations, Grocery Stores or Restaurants',
        '1% cash back on all other eligible purchases',
        '0% Intro APR on purchases and balance transfers for the first 15 billing cycles. After that, a variable APR currently 19.24 - 29.24%',
        'No Annual Fee',
        'Terms and conditions apply.',
      ],
    },
  },
];
