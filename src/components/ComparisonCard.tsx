import { Listing } from 'interfaces/Api';
import React, { FC, useContext } from 'react';
import { PrimaryButton, TrashButton } from './UI';
import { ComparisonContext } from 'contexts/ComparisonContext';

interface IComparisonCardProps {
  product: Listing;
}

export const ComparisonCard: FC<IComparisonCardProps> = ({ product }) => {
  const { removeProduct } = useContext(ComparisonContext);

  return (
    <div className="flex flex-col w-[325px] min-w-[230px]">
      <div className="flex flex-col justify-between bg-white w-full min-h-[305px] p-[16px] md:p-[20px] rounded-[14px]">
        <div className="flex flex-col space-y-[16px]">
          <img className="w-[210px] h-auto" src={product.Creative.LogoImageUrl} alt="card" />
          <h2
            className="text-basePlus font-semibold"
            dangerouslySetInnerHTML={{ __html: product.CardName }}
          />
        </div>
        <div className="flex flex-row space-x-[8px]">
          <PrimaryButton text="Apply Now" />
          <TrashButton onClick={() => removeProduct(product)} />
        </div>
      </div>
      <div className="px-[16px] md:px-[20px]">
        <ul>
          <li className="space-y-[8px] h-[160px] lg:h-auto py-[30px] border-b-[1px] border-medium-gray">
            <h3 className="text-base font-medium">Balance Transfer Intro APR</h3>
            <p
              className="text-sm font-light"
              dangerouslySetInnerHTML={{ __html: product.BalanceTransferIntroAPR }}
            />
          </li>
          <li className="space-y-[8px] h-[160px] lg:h-auto py-[30px] border-b-[1px] border-medium-gray">
            <h3 className="text-base font-medium">Intro APRD uration</h3>
            <p
              className="text-sm font-light"
              dangerouslySetInnerHTML={{ __html: product.IntroAPRDuration }}
            />
          </li>
          <li className="space-y-[8px] h-[160px] lg:h-auto py-[30px] border-b-[1px] border-medium-gray">
            <h3 className="text-base font-medium">Intro APR Rate</h3>
            <p
              className="text-sm font-light"
              dangerouslySetInnerHTML={{ __html: product.IntroAPRRate }}
            />
          </li>
          <li className="space-y-[8px] h-[160px] lg:h-auto py-[30px] border-b-[1px] border-medium-gray">
            <h3 className="text-base font-medium">Annual Fees</h3>
            <p
              className="text-sm font-light"
              dangerouslySetInnerHTML={{ __html: product.AnnualFees }}
            />
          </li>
          <li className="space-y-[8px] h-[160px] lg:h-auto py-[30px] border-b-[1px] border-medium-gray">
            <h3 className="text-base font-medium">Card Brand</h3>
            <p
              className="text-sm font-light"
              dangerouslySetInnerHTML={{ __html: product.CardProcessorTypeName }}
            />
          </li>
          <li className="space-y-[8px] h-[160px] lg:h-auto py-[30px] border-b-[1px] border-medium-gray">
            <h3 className="text-base font-medium">Credit Score Needed</h3>
            <p
              className="text-sm font-light"
              dangerouslySetInnerHTML={{ __html: product.CreditScoreNeeded }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
