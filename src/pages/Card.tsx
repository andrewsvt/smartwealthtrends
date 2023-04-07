import React, { FC, useEffect, useState, useContext, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

import { CardBlock, Header, MenuPopups, Rating } from 'components';
import { CheckBox, PrimaryButton } from 'components/UI';

import { ITableItem } from '../interfaces';

import { ReactComponent as CheckIcon } from '../assets/icons/check.svg';
import { ReactComponent as CrossIcon } from '../assets/icons/cross.svg';
import { ReactComponent as StarIcon } from '../assets/icons/RatingStarFull.svg';

import { Listing } from 'interfaces/Api';

import { selectedCardContext } from 'contexts/SelectedCardContext';
import { ComparisonContext } from 'contexts/ComparisonContext';
import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';
import ProgressBar from 'components/UI/ProgressBar';

interface ICardpageProps {
  apiData: Listing[];
}

export const Card: FC<ICardpageProps> = ({ apiData }) => {
  const pathname = window.location.pathname.split('/');

  const size: IUseWindowSize = useWindowSize();

  //contexts
  const { selectedCard, updateSelectedCard } = useContext(selectedCardContext);
  const { products, addProduct, removeProduct } = useContext(ComparisonContext);

  const [tableItems, setTableItems] = useState<ITableItem[]>([
    {
      title: 'Sign Up Bonus',
      description: selectedCard.SignupRequirement,
    },
    {
      title: 'Rewards Rate',
      description: selectedCard.PointsPerDollar,
    },
    {
      title: 'Intro APR Rate',
      description: `${selectedCard.IntroAPRRate}<br/>${selectedCard.IntroAPRDuration}<br/>${selectedCard.RegAPR}<br/>${selectedCard.RegAPRType}`,
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

  //scroll up when open new card page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCard]);

  //add/remove compare function
  const handleAddToComparison = useCallback(() => {
    addProduct(selectedCard);
  }, [addProduct, selectedCard, products]);

  const handleRemoveFromComparison = useCallback(() => {
    removeProduct(selectedCard);
  }, [removeProduct, selectedCard]);

  return (
    <>
      <div className="w-full">
        {size.width > 768 ? (
          <div className="sticky top-0 bg-bg border-b-[1px] border-[#EAE9EE] h-[72px] w-full flex flex-row justify-between items-center">
            <div className="flex flex-row items-center py-[24px] lg:py-0">
              <div className="text-secondary-text pr-[8px]">Home</div>
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
        ) : (
          <>
            <div className="flex flex-row items-center py-[24px] lg:py-0">
              <div className="text-secondary-text pr-[8px]">Home</div>
              {pathname.slice(1).map((path, i) => {
                return (
                  <div key={i} className="flex flex-row items-center space-x-[8px]">
                    <div className="text-medium-gray">/</div>
                    <span className="text-secondary-text pr-[8px]">{path}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div className="grid grid-cols-1 gap-4">
          {/* card details */}
          <div id="section1" className="p-[20px] bg-white rounded-[14px] space-y-[32px]">
            <div className="flex flex-col md:flex-row md:h-[180px] space-y-[20px] md:space-x-[20px]">
              <img
                className="h-auto md:h-[180px] w-full md:w-auto"
                src={selectedCard.Creative.RawLogoImageUrl}
                alt="card"
              />
              <div className="flex flex-col space-y-[20px] md:justify-between">
                <div className="space-y-[12px]">
                  <h2
                    className="text-lg font-semibold"
                    dangerouslySetInnerHTML={{ __html: selectedCard.CardName }}
                  />
                  <div className="flex flex-row items-center">
                    <span className="text-base font-medium mr-[14px]">
                      {Number(selectedCard.EditorRating).toFixed(1)}
                    </span>
                    <Rating value={Number(selectedCard.EditorRating)} />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-start space-y-[8px] md:space-x-[8px]">
                  <PrimaryButton text="Apply Now" />

                  {products.map((product) => product.ID).includes(selectedCard.ID) ? (
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
            <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] border-border rounded-[10px]">
              {tableItems.slice(0, 3).map((tableItem, index) => {
                const Icon = tableItem.icon;
                return (
                  <div key={index} className="p-[20px] space-y-[20px] md:tableItem">
                    <div className="space-y-[8px]">
                      <h4
                        className="font-medium text-base"
                        dangerouslySetInnerHTML={{ __html: tableItem.title }}
                      />
                      <p
                        className="font-light text-sm"
                        dangerouslySetInnerHTML={{ __html: tableItem.description }}
                      />
                    </div>
                  </div>
                );
              })}
              {tableItems.slice(3, 6).map((tableItem, index) => (
                <div
                  key={index}
                  className="p-[20px] space-y-[8px] md:tableItem md:tableItemExpanded"
                >
                  <h4
                    className="font-medium text-base"
                    dangerouslySetInnerHTML={{ __html: tableItem.title }}
                  />
                  <p
                    className="font-light text-sm"
                    dangerouslySetInnerHTML={{ __html: tableItem.description }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[28px] grid grid-cols-1 gap-[60px]">
            {/* Pros and cons */}
            {/* <div id="section2" className="px-[20px] space-y-[32px]">
              <h2
                className="text-lg font-semibold"
                dangerouslySetInnerHTML={{
                  __html: 'Pros and Cons of ' + selectedCard.CardName,
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px] md:gap-[74px] ">
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
            </div> */}
            <div id="section2" className="px-[20px] space-y-[32px]">
              <h2
                className="text-lg font-semibold"
                dangerouslySetInnerHTML={{
                  __html: 'Quick Facts about ' + selectedCard.CardName,
                }}
              />
              <div className="flex flex-col">
                <ul className="space-y-[28px]">
                  {selectedCard.Creative.PPCDescriptionLines.map((line) => (
                    <li className="flex items-center">
                      <div className="w-[12px] h-[12px] rounded-[4px] bg-primary mr-[32px]" />
                      <p
                        className="text-base font-light flex-1"
                        dangerouslySetInnerHTML={{
                          __html: line,
                        }}
                      ></p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Review */}
            <div
              id="section3"
              className="flex flex-col-reverse md:flex-row w-full md:space-x-[54px]"
            >
              <div className="w-full md:w-[328px] h-auto bg-white rounded-[14px] space-y-[28px] p-[20px] mt-[28px] md:mt-0">
                <div className="flex flex-row items-center space-x-[16px]">
                  <div className="w-[64px] h-[64px] rounded-[12px] bg-bg flex items-center justify-center">
                    <span className="text-[28px] leading-[36px] font-semibold text-secondary">
                      {Number(selectedCard.EditorRating).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-[2px]">
                    <div className="flex flex-row items-center">
                      <Rating value={Number(selectedCard.EditorRating)} />
                    </div>
                    <p className="text-base font-medium">Expert Rating</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <div className="space-y-[8px]">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-text font-medium">Rewards</span>
                      <div className="flex flex-row items-center space-x-[4px]">
                        <span className="text-sm font-medium">{3.4}</span>
                        <StarIcon style={{ width: '16px', height: '16px' }} />
                      </div>
                    </div>
                    <ProgressBar value={3.4} />
                  </div>
                  <div className="space-y-[8px]">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-text font-medium">Fees</span>
                      <div className="flex flex-row items-center space-x-[4px]">
                        <span className="text-sm font-medium">{4.2}</span>
                        <StarIcon style={{ width: '16px', height: '16px' }} />
                      </div>
                    </div>
                    <ProgressBar value={4.2} />
                  </div>
                  <div className="space-y-[8px]">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-text font-medium">Value</span>
                      <div className="flex flex-row items-center space-x-[4px]">
                        <span className="text-sm font-medium">{5.0}</span>
                        <StarIcon style={{ width: '16px', height: '16px' }} />
                      </div>
                    </div>
                    <ProgressBar value={5.0} />
                  </div>
                </div>
              </div>
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
            <div id="section4" className="space-y-[32px]">
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
