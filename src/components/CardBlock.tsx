import React, { FC, useState, useContext, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { selectedCardContext } from 'contexts/SelectedCardContext';
import { ComparisonContext } from 'contexts/ComparisonContext';

import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';

import { CheckBox, ExpandButton, HyperLink, PrimaryButton, SecondaryButton } from './UI';
import { FeatureLabel, Rating } from 'components';

import { ITableItem } from '../interfaces';
import { IAPIData } from 'interfaces/Api';

//icons
import { ReactComponent as GiftIcon } from '../assets/icons/gift.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { ReactComponent as PercentIcon } from '../assets/icons/percent.svg';
import { ReactComponent as LockIcon } from '../assets/icons/lock.svg';

interface ICardBlockProps {
  card: IAPIData;
  allCards?: IAPIData[];
  index: number;
}

export const CardBlock: FC<ICardBlockProps> = ({ card, allCards, index }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { updateSelectedCard } = useContext(selectedCardContext);
  const { products, addProduct, removeProduct } = useContext(ComparisonContext);

  const size: IUseWindowSize = useWindowSize();

  const tableItems = useMemo<ITableItem[]>(
    () => [
      {
        icon: GiftIcon,
        title: 'Welcome Offer',
        description: card.bonusMilesFull.length > 0 ? card.bonusMilesFull : 'N/A',
      },
      {
        icon: StarIcon,
        title: 'Rewards Rate',
        description: card.rewardsDescriptionLong.length > 0 ? card.rewardsDescriptionLong : 'N/A',
      },
      {
        icon: PercentIcon,
        title: 'APR',
        description: `<p class="mb-[8px]">Intro APR: ${
          card.introAprRate.length > 0 && card.introAprRate !== 'N/A'
            ? `${card.introAprRate}`
            : 'N/A'
        }${
          card.introAprDuration.length > 0 && card.introAprDuration !== 'N/A'
            ? ` for ${card.introAprDuration}</p>`
            : ''
        }${`<p>Regular APR: ${
          card.regApr.length > 0 && card.regApr !== 'N/A'
            ? `${card.regApr} ${
                card.regAprType.length > 0
                  ? card.regAprType.includes('(')
                    ? card.regAprType
                    : `(${card.regAprType})`
                  : ''
              }`
            : 'N/A'
        }</p>`}`,
      },
      {
        icon: '',
        title: 'Annual Fees',
        description: card.annualFees.length > 0 ? card.annualFees : 'N/A',
      },
      {
        icon: '',
        title: 'Credit Score Needed',
        description: card.creditScoreNeeded.length > 0 ? card.creditScoreNeeded : 'N/A',
      },
      {
        icon: '',
        title: 'Card Brand',
        description: card.cardProcessorTypeName.length > 0 ? card.cardProcessorTypeName : 'N/A',
      },
    ],
    [card]
  );

  const trimmedPPCDescription = (string: string) => {
    const regex = /<li>.*?<\/li>/g;
    let match;
    let trimmedString = '';

    for (let i = 0; i < 5; i++) {
      match = regex.exec(string);
      if (match) {
        trimmedString += match[0];
      }
    }

    return `<ul>${trimmedString}</ul>`;
  };

  const handleAddToComparison = useCallback(() => {
    addProduct(card);
  }, [addProduct, card]);

  const handleRemoveFromComparison = useCallback(() => {
    removeProduct(card);
  }, [removeProduct, card]);

  const isAmericanExpress = () => {
    if (card.displayName === 'American Express') {
      return true;
    } else return false;
  };

  // const isFirstAmex = () => {
  //   const firstAmexCard = apiData.find((card) => card.DisplayName === 'American Express');

  //   if (firstAmexCard) {
  //     if (firstAmexCard.ID === card.ID) {
  //       return true;
  //     }
  //   } else return false;
  // };

  const isNotChase = () => {
    if (card.displayName === 'Chase') {
      return false;
    } else return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.6 } }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="p-[20px] bg-white rounded-[14px] space-y-[32px]"
    >
      <div className="relative flex flex-col md:flex-row md:min-h-[180px] md:space-x-[20px]">
        <div className="h-full md:h-[180px] flex flex-col justify-center items-center">
          <div className="relative h-full md:h-full md:min-h-[180px] md:max-h-[180px] w-[240px] md:min-w-[284px] md:max-w-[290px] md:w-full">
            {card.link ? (
              <Link to={card.link}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer absolute flex flex-col justify-center items-center space-y-[10px] bg-primary-dark bg-opacity-60 h-full w-full rounded-[10px]"
                >
                  <LockIcon />
                  <span className="text-lg font-semibold text-white">Learn More</span>
                </motion.div>
              </Link>
            ) : (
              ''
            )}

            <img
              className="w-full h-full object-contain lg:object-cover rounded-[10px]"
              src={card.rawLogoImageUrl}
              alt="card"
            />
          </div>
        </div>
        <div className="flex flex-col w-full space-y-[20px] items-center md:items-start md:justify-between mt-[20px] md:mt-0">
          <div className="space-y-[12px] w-full flex flex-col items-center md:items-start">
            <div className="flex flex-col-reverse md:flex-row w-full justify-between">
              <Link
                target={'_blank'}
                to={`/cards/${card.displayName.toLowerCase().split(' ').join('-')}/${card.slug}`}
                onClick={() => updateSelectedCard(card)}
              >
                <h2
                  className="text-lg flex-1 text-center md:text-left w-full font-semibold hover:text-primary-dark customTransition"
                  dangerouslySetInnerHTML={{ __html: card.cardName }}
                />
              </Link>
              {card.badgeText !== null ? (
                <div className="md:mr-[-20px]">
                  <FeatureLabel text={card.badgeText} />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="flex flex-row items-center">
              <span className="text-base font-medium mr-[14px]">
                {Number(card.editorRating).toFixed(1)}
              </span>
              <Rating value={Number(card.editorRating)} />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-[8px] md:space-y-0 md:space-x-[8px]">
              <div className="flex flex-col md:flex-row items-center space-y-[8px] lg:space-y-0 md:space-x-[20px]">
                {isNotChase() ? (
                  <div className="flex flex-row items-center space-x-[8px] w-full md:w-auto">
                    <PrimaryButton text="Learn More" isActive={!!card.link} link={card.link} />
                  </div>
                ) : (
                  <HyperLink text="Learn More" isActive={!!card.link} link={card.link} />
                )}

                {products.map((card) => card.id).includes(card.id) ? (
                  <CheckBox
                    onClick={handleRemoveFromComparison}
                    text="Added to compare"
                    state={true}
                  />
                ) : (
                  <CheckBox onClick={handleAddToComparison} text="Add to compare" state={false} />
                )}
              </div>
              {card.termsAndConditionsLink.length > 1 && (
                <div className="flex flex-col items-center space-y-[4px]">
                  <Link target={'_blank'} to={card.termsAndConditionsLink}>
                    <div className="px-[10px] py-1 bg-light-gray rounded-lg text-primary font-medium text-xs text-center">
                      Rates & Fees
                    </div>
                  </Link>
                  {isAmericanExpress() && (
                    <span className="text-secondary-text font-light text-[10px] leading-3 text-center">
                      Terms Apply
                    </span>
                  )}
                </div>
              )}
            </div>
            {/* {isFirstAmex() && (
              <div className="mt-4 md:mt-2">
                <p className="text-xs font-light text-secondary-text text-center md:text-left w-full">
                  American Express is a smartwealthtrends.com advertiser
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <motion.div className="grid grid-cols-1 md:grid-cols-3 border-[1px] border-border rounded-[10px]">
        {tableItems.slice(0, 3).map((tableItem, index) => {
          const Icon = tableItem.icon;
          return (
            <div
              key={index}
              className={`px-[20px] py-[12px] md:py-[20px] space-y-[12px] md:space-y-[20px] ${
                size.width < 768 ? 'oddBgColor tableItemMobile' : 'tableItem'
              }`}
            >
              <div>
                {/* @ts-ignore */}
                <Icon style={{ width: '44px', height: '44px' }} className="tableIcon" />
              </div>
              <div className="space-y-[4px]">
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
        {isExpanded &&
          tableItems.slice(3, 6).map((tableItem, index) => (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 50 }}
              exit={{ opacity: 0, y: -30 }}
              className={`px-[20px] py-[12px] md:py-[20px] space-y-[4px] ${
                size.width < 768 ? 'oddBgColor tableItemMobile' : 'tableItem tableItemExpanded'
              }`}
              key={index}
            >
              <h4
                className="font-medium text-base"
                dangerouslySetInnerHTML={{ __html: tableItem.title }}
              />
              <p
                className="font-light text-sm"
                dangerouslySetInnerHTML={{ __html: tableItem.description }}
              />
            </motion.div>
          ))}
      </motion.div>
      {isExpanded && (
        <>
          <motion.div
            className="w-full flex flex-col space-y-[24px]"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 50 }}
            exit={{ opacity: 0, y: -30 }}
          >
            <h3 className="text-basePlus font-semibold px-[20px]">Quick Facts</h3>
            {/* <div className="PPCDescription">
              <ul>
                {card.Creative.PPCDescriptionLines.slice(0, 5).map((item, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                ))}
              </ul>
            </div> */}
            <div
              className="PPCDescription"
              dangerouslySetInnerHTML={{ __html: trimmedPPCDescription(card.ppcDescription) }}
            ></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 50 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full border-[1px] border-border rounded-[10px] p-[20px] flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <p className="text-black font-medium text-base w-full md:w-[50%] mb-[20px] md:mb-0">
              Review additional details for{' '}
              <Link
                target={'_blank'}
                to={`/cards/${card.displayName.toLowerCase()}/${card.slug}`}
                onClick={() => updateSelectedCard(card)}
                className="text-primary font-semibold"
                dangerouslySetInnerHTML={{ __html: card.cardName }}
              />
            </p>
            <Link
              target={'_blank'}
              className="min-w-[202px]"
              to={`/cards/${card.displayName.toLowerCase()}/${card.slug}`}
              onClick={() => updateSelectedCard(card)}
            >
              {isNotChase() ? (
                <SecondaryButton text="Read Review" />
              ) : (
                <HyperLink text="Read Review" state={true} />
              )}
            </Link>
          </motion.div>
        </>
      )}
      <div className="w-full flex justify-center">
        <ExpandButton
          onClick={() => setIsExpanded(!isExpanded)}
          text={isExpanded ? 'Show Less' : 'Expand'}
          state={isExpanded}
        />
      </div>
    </motion.div>
  );
};
