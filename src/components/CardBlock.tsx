import React, { FC, useState, useContext, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { selectedCardContext } from 'contexts/SelectedCardContext';
import { ComparisonContext } from 'contexts/ComparisonContext';

import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';

import { CheckBox, ExpandButton, HyperLink, PrimaryButton, SecondaryButton } from './UI';
import { FeatureLabel, Rating } from 'components';

import { ITableItem } from '../interfaces';
import { Listing } from 'interfaces/Api';

//icons
import { ReactComponent as GiftIcon } from '../assets/icons/gift.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { ReactComponent as PercentIcon } from '../assets/icons/percent.svg';
import { ReactComponent as LockIcon } from '../assets/icons/lock.svg';

interface ICardBlockProps {
  product: Listing;
  index: number;
  apiData: Listing[];
}

export const CardBlock: FC<ICardBlockProps> = ({ apiData, product, index }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { updateSelectedCard } = useContext(selectedCardContext);
  const { products, addProduct, removeProduct } = useContext(ComparisonContext);

  const size: IUseWindowSize = useWindowSize();

  const tableItems = useMemo<ITableItem[]>(
    () => [
      {
        icon: GiftIcon,
        // title: `Welcome Offer ${product.SignupReward.length ? '- ' + product.SignupReward : ''}`,
        title: 'Welcome Offer',
        description: product.BonusMilesFull.length > 0 ? product.BonusMilesFull : 'N/A',
      },
      {
        icon: StarIcon,
        title: 'Rewards Rate',
        description:
          product.RewardsDescriptionLong.length > 0 ? product.RewardsDescriptionLong : 'N/A',
      },
      {
        icon: PercentIcon,
        title: 'APR',
        description: `<p class="mb-[8px]">Intro APR: ${
          product.IntroAPRRate.length > 0 && product.IntroAPRRate !== 'N/A'
            ? `${product.IntroAPRRate}`
            : 'N/A'
        }${
          product.IntroAPRDuration.length > 0 && product.IntroAPRDuration !== 'N/A'
            ? ` for ${product.IntroAPRDuration}</p>`
            : ''
        }${`<p>Regular APR: ${
          product.RegAPR.length > 0 && product.RegAPR !== 'N/A'
            ? `${product.RegAPR} ${
                product.RegAPRType.length > 0
                  ? product.RegAPRType.includes('(')
                    ? product.RegAPRType
                    : `(${product.RegAPRType})`
                  : '' // good api btw
              }`
            : 'N/A'
        }</p>`}`,
      },
      {
        icon: '',
        title: 'Annual Fees',
        description: product.AnnualFees.length > 0 ? product.AnnualFees : 'N/A',
      },
      {
        icon: '',
        title: 'Credit Score Needed',
        description: product.CreditScoreNeeded.length > 0 ? product.CreditScoreNeeded : 'N/A',
      },
      {
        icon: '',
        title: 'Card Brand',
        description:
          product.CardProcessorTypeName.length > 0 ? product.CardProcessorTypeName : 'N/A',
      },
    ],
    [product]
  );

  const handleAddToComparison = useCallback(() => {
    addProduct(product);
  }, [addProduct, product]);

  const handleRemoveFromComparison = useCallback(() => {
    removeProduct(product);
  }, [removeProduct, product]);

  const isAmericanExpress = () => {
    if (product.DisplayName === 'American Express') {
      return true;
    } else return false;
  };

  const isFirstAmex = () => {
    const firstAmexCard = apiData.find((card) => card.DisplayName === 'American Express');

    if (firstAmexCard) {
      if (firstAmexCard.ID === product.ID) {
        return true;
      }
    } else return false;
  };

  const isNotChase = () => {
    if (product.DisplayName === 'Chase') {
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
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer absolute flex flex-col justify-center items-center space-y-[10px] bg-primary-dark bg-opacity-60 h-full w-full rounded-[10px]"
            >
              <LockIcon />
              <span className="text-lg font-semibold text-white">Learn More</span>
            </motion.div>
            <img
              className="w-full h-full object-contain lg:object-cover rounded-[10px]"
              src={product.Creative.RawLogoImageUrl}
              alt="card"
            />
          </div>
        </div>
        <div className="flex flex-col w-full space-y-[20px] items-center md:items-start md:justify-between mt-[20px] md:mt-0">
          <div className="space-y-[12px] w-full flex flex-col items-center md:items-start">
            <div className="flex flex-col-reverse md:flex-row w-full justify-between">
              <Link
                target={'_blank'}
                to={`/cards/${product.ID}`}
                onClick={() => updateSelectedCard(product)}
              >
                <h2
                  className="text-lg text-center md:text-left w-full font-semibold hover:text-primary-dark customTransition"
                  dangerouslySetInnerHTML={{ __html: product.CardName }}
                />
              </Link>
            </div>
            <div className="flex flex-row items-center">
              <span className="text-base font-medium mr-[14px]">
                {Number(product.EditorRating).toFixed(1)}
              </span>
              <Rating value={Number(product.EditorRating)} />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-[8px] md:space-y-0 md:space-x-[8px]">
              <div className="flex flex-col md:flex-row items-center space-y-[8px] lg:space-y-0 md:space-x-[20px]">
                {isNotChase() ? (
                  <div className="flex flex-row items-center space-x-[8px] w-full md:w-auto">
                    <PrimaryButton text="Learn More" />
                  </div>
                ) : (
                  <HyperLink text="Learn More" />
                )}

                {products.map((product) => product.ID).includes(product.ID) ? (
                  <CheckBox
                    onClick={handleRemoveFromComparison}
                    text="Added to compare"
                    state={true}
                  />
                ) : (
                  <CheckBox onClick={handleAddToComparison} text="Add to compare" state={false} />
                )}
              </div>
              {product.TermsAndConditionsLink.length > 1 && (
                <div className="flex flex-col items-center space-y-[4px]">
                  <Link target={'_blank'} to={product.TermsAndConditionsLink}>
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
            {isFirstAmex() && (
              <div className="mt-4 md:mt-2">
                <p className="text-xs font-light text-secondary-text text-center md:text-left w-full">
                  American Express is a smartwealthtrends.com advertiser
                </p>
              </div>
            )}
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
            <div className="PPCDescription">
              <ul>
                {product.Creative.PPCDescriptionLines.slice(0, 5).map((item, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                ))}
              </ul>
            </div>
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
                to={`/cards/${product.ID}`}
                onClick={() => updateSelectedCard(product)}
                className="text-primary font-semibold"
                dangerouslySetInnerHTML={{ __html: product.CardName }}
              ></Link>
            </p>
            <Link
              target={'_blank'}
              className="min-w-[202px]"
              to={`/cards/${product.ID}`}
              onClick={() => updateSelectedCard(product)}
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
