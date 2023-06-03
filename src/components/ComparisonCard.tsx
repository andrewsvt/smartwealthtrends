import React, { FC, useContext } from 'react';
import { IAPIData } from 'interfaces/Api';

import { ComparisonContext } from 'contexts/ComparisonContext';

import { HyperLink, PrimaryButton, TrashButton } from './UI';

interface IComparisonCardProps {
  product: IAPIData;
}

export const ComparisonCard: FC<IComparisonCardProps> = ({ product }) => {
  const { removeProduct } = useContext(ComparisonContext);

  const compareFields = [
    // { name: 'Balance Transfer Intro APR', field: product.BalanceTransferIntroAPR },
    { name: 'Intro APR Duration', field: product.introAprDuration },
    { name: 'Intro APR Rate', field: product.introAprRate },
    { name: 'Annual Fees', field: product.annualFees },
    { name: 'Card Brand', field: product.cardProcessorTypeName },
    { name: 'Credit Score Needed', field: product.creditScoreNeeded },
  ];

  const isNotChase = () => {
    if (product.displayName === 'Chase') {
      return false;
    } else return true;
  };

  return (
    <div className="relative flex flex-col w-[325px] min-w-[230px]">
      <div className="flex flex-col justify-between bg-white w-full min-h-[305px] p-[16px] rounded-[14px]">
        <div className="flex flex-col items-center justify-center space-y-[16px]">
          <img className="w-[210px] h-auto" src={product.rawLogoImageUrl} alt="card" />
          <h2
            className="text-basePlus font-semibold text-center"
            dangerouslySetInnerHTML={{ __html: product.cardName }}
          />
        </div>
        <div className="flex flex-row space-x-[8px] justify-center items-center">
          {isNotChase() ? <PrimaryButton text="Learn More" /> : <HyperLink text="Learn More" />}
          <TrashButton onClick={() => removeProduct(product)} />
        </div>
      </div>
      <div className="px-[16px] md:px-[20px]">
        <ul>
          {compareFields.map((field, index) => (
            <li
              key={index}
              className="space-y-[8px] h-[160px] lg:h-auto py-[30px] border-b-[1px] border-medium-gray"
            >
              <h3 className="text-base font-medium">{field.name}</h3>
              <p
                className="text-sm font-light"
                dangerouslySetInnerHTML={{ __html: field.field.length > 0 ? field.field : 'N/A' }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
