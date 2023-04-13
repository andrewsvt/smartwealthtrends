import React, { FC, useState, useContext, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { CheckBox, ExpandButton, PrimaryButton, SecondaryButton } from './UI';
import { Rating } from 'components';
import { ITableItem } from '../interfaces';
import { Listing } from 'interfaces/Api';

import { ReactComponent as GiftIcon } from '../assets/icons/gift.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { ReactComponent as CopyIcon } from '../assets/icons/copysuccess.svg';
import { ReactComponent as LockIcon } from '../assets/icons/lock.svg';

import { selectedCardContext } from 'contexts/SelectedCardContext';
import { ComparisonContext } from 'contexts/ComparisonContext';
import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';

interface ICardBlockProps {
  product: Listing;
  index: number;
}

export const CardBlock: FC<ICardBlockProps> = ({ product, index }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { updateSelectedCard } = useContext(selectedCardContext);
  const { products, addProduct, removeProduct } = useContext(ComparisonContext);

  const size: IUseWindowSize = useWindowSize();

  const tableItems = useMemo<ITableItem[]>(
    () => [
      {
        icon: GiftIcon,
        title: `Welcome Offer ${product.SignupReward.length ? '- ' + product.SignupReward : ''}`,
        description: product.SignupRequirement.length > 0 ? product.SignupRequirement : 'N/A',
      },
      {
        icon: StarIcon,
        title: 'Rewards Rate',
        description: product.PointsPerDollar.length > 0 ? product.PointsPerDollar : 'N/A',
      },
      {
        icon: CopyIcon,
        title: 'Intro APR',
        description: product.BonusMiles.length > 0 ? product.BonusMiles : 'N/A',
      },
      {
        icon: '',
        title: 'Annual Fees',
        description: product.AnnualFees,
      },
      {
        icon: '',
        title: 'Credit Score Needed',
        description: product.CreditScoreNeeded,
      },
      { icon: '', title: 'Card Brand', description: product.CardProcessorTypeName },
    ],
    [product]
  );

  const handleAddToComparison = useCallback(() => {
    addProduct(product);
  }, [addProduct, product, products]);

  const handleRemoveFromComparison = useCallback(() => {
    removeProduct(product);
  }, [removeProduct, product]);

  return (
    <motion.div
      initial={{ opacity: 0, zIndex: 1 }}
      whileInView={{ opacity: 1, transition: { duration: 0.6 } }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="p-[20px] bg-white rounded-[14px] space-y-[32px]"
    >
      <div className="flex flex-col md:flex-row md:h-[180px] md:space-x-[20px]">
        <div className="h-full flex flex-col justify-center items-center">
          <div className="relative h-full md:h-fit md:max-h-[180px] w-[240px] md:max-w-[290px] md:w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer absolute flex flex-col justify-center items-center space-y-[10px] bg-primary-dark bg-opacity-60 h-full w-full rounded-[10px]"
            >
              <LockIcon />
              <span className="text-lg font-semibold text-white">Apply Now</span>
            </motion.div>
            <img
              className="w-full h-full object-contain"
              src={product.Creative.RawLogoImageUrl}
              alt="card"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-[20px] items-center md:justify-between mt-[20px] md:mt-0">
          <div className="space-y-[12px] w-full flex flex-col items-center md:items-start">
            <Link to={`/cards/${product.ID}`} onClick={() => updateSelectedCard(product)}>
              <h2
                className="text-lg text-center md:text-left w-full font-semibold hover:text-primary-dark customTransition"
                dangerouslySetInnerHTML={{ __html: product.CardName }}
              />
            </Link>
            <div className="flex flex-row items-center">
              <span className="text-base font-medium mr-[14px]">
                {Number(product.EditorRating).toFixed(1)}
              </span>
              <Rating value={Number(product.EditorRating)} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-start space-y-[8px] md:space-y-0 md:space-x-[8px] w-full md:w-auto">
            <div className="flex flex-row items-center space-x-[8px] w-full md:w-auto">
              <PrimaryButton text="Apply Now" />
            </div>
            {products.map((product) => product.ID).includes(product.ID) ? (
              <CheckBox onClick={handleRemoveFromComparison} text="Added to compare" state={true} />
            ) : (
              <CheckBox onClick={handleAddToComparison} text="Add to compare" state={false} />
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
              className={`p-[20px] space-y-[20px] md:tableItem ${
                size.width < 768 ? 'oddBgColor tableItemMobile' : 'tableItem'
              }`}
            >
              <div>
                {/* @ts-ignore */}
                <Icon style={{ width: '44px', height: '44px' }} />
              </div>
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
        {isExpanded &&
          tableItems.slice(3, 6).map((tableItem, index) => (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 50 }}
              exit={{ opacity: 0, y: -30 }}
              className={`p-[20px] space-y-[8px] ${
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
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                    // className="flex items-center space-x-[20px] md:space-x-[12px] py-[12px] px-[20px] rounded-[10px] oddBgColor"
                  >
                    {/* <div className="w-[8px] h-[8px] rounded-[2px] bg-primary" /> */}
                    {/* <p className="flex-1">{item}</p> */}
                  </li>
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
                to={`/cards/${product.ID}`}
                onClick={() => updateSelectedCard(product)}
                className="text-primary font-semibold"
                dangerouslySetInnerHTML={{ __html: product.CardName }}
              ></Link>
            </p>
            <Link
              className="min-w-[202px]"
              to={`/cards/${product.ID}`}
              onClick={() => updateSelectedCard(product)}
            >
              <SecondaryButton text="Learn More" />
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
