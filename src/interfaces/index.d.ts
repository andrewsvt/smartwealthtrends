export interface ITestApiData {
  products: ITestProduct[];
  total: number;
  skip?: number;
  limit?: number;
}

export interface ITestProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];
}

// export interface IApiData {
//     ID: string;
//     BuyerID: string;
//     cpc: string;
//     CustomerID: string;
//     Company: string;
//     DisplayName: string;
//     BankingDisplayName: string;
//     ImpressionID: string;
//     RateProduct: {
//         ID: string;
//         TermID: string;
//         Name: string;};
//     Amount: {
//         ID: string;
//         Name: string;};
//     Rank: string;
//     BankingRateProductTypes: string;
//     Updated: string;
//     ImpPixel: string;
//     Creative: ICreative;
//     Products: ProductArr;
// }

// interface ICreative {
//     ID: string;
//     Title: string;
//     Description: string;
//     DisplayUrl: string;
//     AdditionalNotes: string;
//     BankAccountName: string;
//     LogoImageUrl: string;
//     RawLogoImageUrl: string;
//     Company: string;
//     FDIC: string;
//     NCUA: string;
//     ListingUrl: {
//       ID: string;
//       text: string;
//     };
//   }

//   interface ProductArr {
//     Product: Product[];
//   }

//   interface Product {
//     ID: string;
//     selected: string;
//     Type: string;
//     ProductUrl: string;
//     Description: string;
//     Precedence: string;
//     Rate: string;
//     CM: string;
//     APY: string;
//     MinDeposit: string;
//     AvoidFees: string;
//     MonthlyFee: string;
//     MinBalanceToEarnAPY: string;
//     MinDepositToEarnAPY: string;
//     IntroRate: string;
//     IntroMonths: string;
//     MinInvestmentAmount: string;
//     MaxInvestmentAmount: string;
//     TermMonths: string;
//     AtmFee: string;
//     OverDraftFee: string;
//     SignUpBonus: string;
//     Creative: ICreativeProduct
//   }

//   interface ICreativeProduct {
//     ID: string;
//     Title: string;
//     Description: string;
//     AdvImpPixel?: any;
//     DisplayUrl: string;
//     LogoImageUrl: string;
//     RawLogoImageUrl: string;
//     Company: string;
//   };

export interface ITableItem {
  icon?: string;
  title: string;
  description: string;
}
