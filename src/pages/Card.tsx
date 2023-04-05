import React, { FC, useEffect, useState, useContext, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

import { CardBlock, Rating } from 'components';
import { CheckBox, PrimaryButton } from 'components/UI';

import { ITableItem } from '../interfaces';

import { ReactComponent as CheckIcon } from '../assets/icons/check.svg';
import { ReactComponent as CrossIcon } from '../assets/icons/cross.svg';
import { Listing } from 'interfaces/Api';

import { selectedCardContext } from 'contexts/SelectedCardContext';
import { ComparisonContext } from 'contexts/ComparisonContext';

interface ICardpageProps {
  apiData: Listing[];
}

export const Card: FC<ICardpageProps> = ({ apiData }) => {
  const pathname = window.location.pathname.split('/');

  const { selectedCard } = useContext(selectedCardContext);
  const { products, addProduct, removeProduct } = useContext(ComparisonContext);

  const [isInComparison, setIsInComparison] = useState(false);

  const [tableItems, setTableItems] = useState<ITableItem[]>([
    {
      title: 'Balance Transfer Intro APR',
      description: selectedCard.BalanceTransferIntroAPR,
    },
    {
      title: 'Intro APRD uration',
      description: selectedCard.IntroAPRDuration,
    },
    {
      title: 'Intro APR Rate',
      description: selectedCard.IntroAPRRate,
    },
    {
      title: 'Annual Fees',
      description: selectedCard.AnnualFees,
    },
    { title: 'Card Brand', description: selectedCard.CardProcessorTypeName },
    {
      title: 'Credit Score Needed',
      description: selectedCard.CreditScoreNeeded,
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (products.includes(selectedCard)) {
      setIsInComparison(true);
    } else {
      setIsInComparison(false);
    }
  }, [selectedCard]);

  const handleAddToComparison = useCallback(() => {
    addProduct(selectedCard);
    if (products.length < 4) {
      setIsInComparison(true);
    } else {
      setIsInComparison(false);
    }
  }, [addProduct, selectedCard, products]);

  const handleRemoveFromComparison = useCallback(() => {
    removeProduct(selectedCard);
    setIsInComparison(false);
  }, [removeProduct, selectedCard]);

  return (
    <>
      <div className="w-full">
        <div className="h-[86px] w-full flex flex-row justify-between items-center">
          <div className="flex flex-row">
            <Link to={'/'} className="text-secondary-text pr-[8px]">
              Home
            </Link>
            {pathname.slice(1).map((path, i) => {
              return (
                <div key={i} className="flex flex-row space-x-[8px]">
                  <div className="text-medium-gray">/</div>
                  <span className="text-secondary-text pr-[8px]">{path}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {/* card details */}
          <div className="p-[20px] bg-white rounded-[14px] space-y-[32px]">
            <div className="flex flex-row h-[180px] space-x-[20px] ">
              <img
                className="h-full w-auto"
                src={selectedCard.Creative.RawLogoImageUrl}
                alt="card"
              />
              <div className="flex flex-col justify-between">
                <div className="space-y-[12px]">
                  <h2
                    className="text-lg font-semibold"
                    dangerouslySetInnerHTML={{ __html: selectedCard.CardName }}
                  />
                  <Rating value={Number(selectedCard.EditorRating)} />
                </div>
                <div className="flex flex-row items-center justify-start space-x-[8px]">
                  <PrimaryButton text="Apply Now" />
                  {isInComparison ? (
                    <CheckBox
                      onClick={handleRemoveFromComparison}
                      text="Remove from compare"
                      state={true}
                    />
                  ) : (
                    <CheckBox onClick={handleAddToComparison} text="Add to compare" state={false} />
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 border-[1px] border-border rounded-[10px]">
              {tableItems.slice(0, 3).map((tableItem, index) => {
                const Icon = tableItem.icon;
                return (
                  <div key={index} className="p-[20px] space-y-[20px] tableItem">
                    <div className="space-y-[8px]">
                      <h4 className="font-medium text-base">{tableItem.title}</h4>
                      <p className="font-light text-sm">{tableItem.description}</p>
                    </div>
                  </div>
                );
              })}
              {tableItems.slice(3, 6).map((tableItem) => (
                <div className="p-[20px] space-y-[8px] tableItem tableItemExpanded">
                  <h4 className="font-medium text-base">{tableItem.title}</h4>
                  <p className="font-light text-sm">{tableItem.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[28px] grid grid-cols-1 gap-[60px]">
            {/* Pros and cons */}
            <div className="px-[20px] space-y-[32px]">
              <h2
                className="text-lg font-semibold"
                dangerouslySetInnerHTML={{
                  __html: 'Pros and Cons of ' + selectedCard.CardName,
                }}
              />
              <div className="grid grid-cols-2 gap-[74px] ">
                <div className="space-y-[16px]">
                  <h3 className="text-basePlus font-medium text-secondary-text">Pros</h3>
                  <ul className="flex flex-col space-y-[24px] p-[12px]">
                    <li className="flex flex-col space-y-[8px]">
                      <div className="flex flex-row space-x-[16px] items-center">
                        <CheckIcon />
                        <h4 className="text-base font-medium">Unlimited 2% Cash Back:</h4>
                      </div>
                      <p className="font-light">
                        You'll earn an unlimited 2% cash back on all purchases made with this card
                        with no rewards caps or limits
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="space-y-[16px]">
                  <h3 className="text-basePlus font-medium text-secondary-text">Cons</h3>
                  <ul className="flex flex-col space-y-[24px] p-[12px]">
                    <li className="flex flex-col space-y-[8px]">
                      <div className="flex flex-row space-x-[16px] items-center">
                        <CrossIcon classname="consIcon" />
                        <h4 className="text-base font-medium">Unlimited 2% Cash Back:</h4>
                      </div>
                      <p className="font-light">
                        You'll earn an unlimited 2% cash back on all purchases made with this card
                        with no rewards caps or limits
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Review */}
            <div className="flex flex-row w-full space-x-[54px]">
              <div className="w-[328px] h-[300px] bg-white rounded-[14px]"></div>
              <div className="flex flex-col flex-1 space-y-[28px]">
                <div className="space-y-[8px]">
                  <h2
                    className="text-lg font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: selectedCard.CardName + ' Card Expert Review',
                    }}
                  />
                  <p className="text-sm font-light text-secondary-text">
                    {selectedCard.LastUpdated}
                  </p>
                </div>
                <p className="text-base font-light">
                  The Citi Custom Cash℠ Card has come to the market with one of the more interesting
                  rewards programs we’ve seen in a while. Earn 5% cash back on purchases in your top
                  eligible spend category each billing cycle, up to the first $500 spent, 1% cash
                  back thereafter. Also, earn unlimited 1% cash back on all other purchases. What
                  this means is that unlike some other rewards cards on the market that require you
                  to manually opt-in to special categories each month, this card will automatically
                  apply the highest rate of cash back to your most-used category. That makes the
                  Citi Custom Cash℠ Card a great pick for anyone looking for a low-maintenance card
                  that still offers an incredibly competitive cash back offer. And the sign-up bonus
                  just sweetens the deal with a low spend threshold and a solid return in the form
                  of ThankYou® Points.
                </p>
              </div>
            </div>
            {/* Related offers */}
            <div className="space-y-[32px]">
              <h2 className="text-lg font-semibold pl-[20px]">Related Card Offers</h2>
              <motion.div className="grid grid-cols-1 gap-4">
                {apiData?.slice(0, 2).map((product, index) => (
                  <CardBlock key={product.ID} product={product} index={index} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
