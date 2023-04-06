import React, { FC, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { CheckBox, PrimaryButton, SecondaryButton } from './UI';
import { Rating } from 'components';
import { ITableItem } from '../interfaces';
import { Listing } from 'interfaces/Api';

import { ReactComponent as GiftIcon } from '../assets/icons/gift.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { ReactComponent as CopyIcon } from '../assets/icons/copysuccess.svg';

import { selectedCardContext } from 'contexts/SelectedCardContext';
import { ComparisonContext } from 'contexts/ComparisonContext';

interface ICardBlockProps {
  product: Listing;
  index: number;
}

export const CardBlock: FC<ICardBlockProps> = ({ product, index }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { updateSelectedCard } = useContext(selectedCardContext);
  const { products, addProduct, removeProduct } = useContext(ComparisonContext);

  // const [isInComparison, setIsInComparison] = useState(false);

  const tableItems = useMemo<ITableItem[]>(
    () => [
      {
        icon: GiftIcon,
        title: 'Welcome Offer',
        description: product.PointsPerDollar,
      },
      {
        icon: StarIcon,
        title: 'Rewards Rate',
        description: product.MilesPerDollar,
      },
      {
        icon: CopyIcon,
        title: 'Extra Perks',
        description: product.BonusMiles,
      },
      {
        icon: '',
        title: 'Annual Fees',
        description: product.AnnualFees,
      },
      { icon: '', title: 'Card Brand', description: product.CardProcessorTypeName },
      {
        icon: '',
        title: 'Credit Score Needed',
        description: product.CreditScoreNeeded,
      },
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.6 } }}
      viewport={{ once: true }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="p-[20px] bg-white rounded-[14px] space-y-[32px]"
    >
      <div className="flex flex-col md:flex-row md:h-[180px] space-y-[20px] md:space-x-[20px]">
        <img
          className="h-auto md:h-[180px] w-full md:w-auto"
          src={product.Creative.RawLogoImageUrl}
          alt="card"
        />
        <div className="flex flex-col space-y-[20px] md:justify-between">
          <div className="space-y-[12px]">
            <h2
              className="text-lg font-semibold"
              dangerouslySetInnerHTML={{ __html: product.CardName }}
            />
            <Rating value={Number(product.EditorRating)} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-start space-y-[8px] md:space-x-[8px]">
            <div className="flex flex-row items-center space-x-[8px] w-full md:w-auto">
              <PrimaryButton text="Apply Now" />
              <Link
                className="flex-1 md:flex-auto"
                to={`/cards/${product.ID}`}
                preventScrollReset={true}
              >
                <SecondaryButton onClick={() => updateSelectedCard(product)} text="Learn More" />
              </Link>
            </div>
            {products.map((product) => product.ID).includes(product.ID) ? (
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
      <motion.div className="grid grid-cols-1 md:grid-cols-3 border-[1px] border-border rounded-[10px]">
        {tableItems.slice(0, 3).map((tableItem, index) => {
          const Icon = tableItem.icon;
          return (
            <div key={index} className="p-[20px] space-y-[20px] md:tableItem">
              <div>
                {/* @ts-ignore */}
                <Icon />
              </div>
              <div className="space-y-[8px]">
                <h4 className="font-medium text-base">{tableItem.title}</h4>
                <p className="font-light text-sm">{tableItem.description}</p>
              </div>
            </div>
          );
        })}
        {isExpanded
          ? tableItems.slice(3, 6).map((tableItem) => (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 50 }}
                exit={{ opacity: 0, y: -30 }}
                className="p-[20px] space-y-[8px] md:tableItem md:tableItemExpanded"
              >
                <h4 className="font-medium text-base">{tableItem.title}</h4>
                <p className="font-light text-sm">{tableItem.description}</p>
              </motion.div>
            ))
          : ''}
      </motion.div>
      <div className="w-full flex justify-center">
        <SecondaryButton
          onClick={() => setIsExpanded(!isExpanded)}
          text={isExpanded ? 'Hide' : 'Expand'}
        />
      </div>
    </motion.div>
  );
};
