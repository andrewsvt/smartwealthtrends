import React, { FC, useContext } from 'react';
import { IAPIData } from 'interfaces/Api';

import { ComparisonContext } from 'contexts/ComparisonContext';

import { HyperLink, PrimaryButton, TrashButton } from './UI';
import { Link } from 'react-router-dom';

interface IComparisonCardProps {
  product: IAPIData;
}

export const ComparisonCard: FC<IComparisonCardProps> = ({ product }) => {
  const { removeProduct } = useContext(ComparisonContext);

  const compareFields1 = [
    { name: 'Sign up bonus', field: product.bonusMilesFull },
    { name: 'Rewards Rate', field: product.rewardsDescriptionLong },
    { name: 'Intro APR', field: product.introAprRate },
  ];

  const compareFields4 = [
    { name: 'APR rate', field: product.regApr },
    { name: 'APR for balance transfer', field: product.balanceTransferIntroApr },
    { name: 'APR for cash advance', field: product.cashAdvanceApr },
  ];

  const compareFields5 = [
    { name: 'Annual fee', field: product.annualFees },
    { name: 'Foreign transaction fee', field: product.foreignTransactionFee },
    { name: 'Balance transfer fee', field: product.balanceTransferFees },
    { name: 'Cash advance fee', field: product.cashAdvanceFee },
  ];

  const isNotChase = () => {
    if (product.displayName === 'Chase') {
      return false;
    } else return true;
  };

  const arrayFromHtml = () => {
    const liTags = product.ppcDescription.match(/<li>(.*?)<\/li>/g);
    const arrayStrings = liTags?.map((liTag) => liTag.replace(/<\/?li>/g, '')) ?? [
      'No elements found',
    ];
    return arrayStrings.slice(0, 5);
  };

  return (
    <div className="relative flex flex-col flex-1 min-w-[290px] max-w-[670px]">
      <div className="flex flex-col justify-between items-center bg-white w-full min-h-[305px] p-[16px] rounded-[14px]">
        <div className="flex flex-col items-center justify-center space-y-[16px]">
          <img className="w-[210px] h-auto" src={product.rawLogoImageUrl} alt="card" />
          <Link
            className="min-w-[202px]"
            to={`/cards/${product.displayName.toLowerCase()}/${product.slug}`}
          >
            <h2
              className="text-basePlus font-semibold text-center hover:text-primary-dark customTransition"
              dangerouslySetInnerHTML={{ __html: product.cardName }}
            />
          </Link>
        </div>
        <div className="flex flex-row space-x-[8px] justify-center items-center w-[262px]">
          {isNotChase() ? (
            <PrimaryButton
              text={product.ctaButtonText}
              isActive={!!product.link}
              link={product.link}
            />
          ) : (
            <HyperLink text={product.ctaButtonText} isActive={!!product.link} link={product.link} />
          )}
          <TrashButton onClick={() => removeProduct(product)} />
        </div>
      </div>
      {/* Quick Facts */}
      <div className="px-[16px] md:px-[20px] border-b-[1px] border-light-gray">
        <h3 className="text-basePlus font-semibold pb-8 pt-10">Quick Facts</h3>
        <ul className="space-y-5">
          {compareFields1.map((field, index) => (
            <li key={index} className="h-[76px]">
              <div
                className="h-full overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
              >
                <span className="text-base font-medium">{`${field.name}: `}</span>
                <span
                  className="text-sm font-light"
                  dangerouslySetInnerHTML={{ __html: field.field.length > 0 ? field.field : 'N/A' }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Main Benefits */}
      <div className="px-[16px] md:px-[20px] border-b-[1px] border-light-gray">
        <h3 className="text-basePlus font-semibold pb-8 pt-10">Main Benefits</h3>
        <ul className="space-y-5">
          {arrayFromHtml().map((string, index) => (
            <li key={index} className="h-[76px]">
              <div
                className="h-full overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
              >
                <span
                  className="text-sm font-light"
                  dangerouslySetInnerHTML={{ __html: string.length > 0 ? string : 'N/A' }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Rates */}
      <div className="px-[16px] md:px-[20px] border-b-[1px] border-light-gray">
        <h3 className="text-basePlus font-semibold py-8">Rates:</h3>
        <ul className="space-y-5">
          {compareFields4.map((field, index) => (
            <li key={index} className="h-[76px]">
              <div
                className="h-full overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
              >
                <span className="text-base font-medium">{`${field.name}: `}</span>
                <span
                  className="text-sm font-light"
                  dangerouslySetInnerHTML={{ __html: field.field.length > 0 ? field.field : 'N/A' }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Fees */}
      <div className="px-[16px] md:px-[20px] border-b-[1px] border-light-gray">
        <h3 className="text-basePlus font-semibold py-8">Fees:</h3>
        <ul className="space-y-5">
          {compareFields5.map((field, index) => (
            <li key={index} className="h-[76px]">
              <div
                className="h-full overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
              >
                <span className="text-base font-medium">{`${field.name}: `}</span>
                <span
                  className="text-sm font-light"
                  dangerouslySetInnerHTML={{ __html: field.field.length > 0 ? field.field : 'N/A' }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
