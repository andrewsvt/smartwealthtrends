import { FilterContext } from '../contexts/FilterContext';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { CardBlock, CategoryDropdown } from '../components';
import { IAPIData, IAPIMeta } from 'interfaces/Api';
import { AdvertiserDisclosure } from 'components/AdvertiserDisclosure';
import { apiDataInitialState, categories } from 'utils/constants';
import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';
import { Link } from 'react-router-dom';
import { useGetAllCards } from 'hooks/useGetAllCards';

interface IHomeProps {
  // allCards: IAPIData[];
  // allCardsMeta: IAPIMeta;
  // isLoading: boolean;
}

export const Home: FC<IHomeProps> = () => {
  const { allCards, allCardsMeta, isAllLoading } = useGetAllCards();

  const filter = useContext(FilterContext);
  const size: IUseWindowSize = useWindowSize();

  const [allAmexCards, setAllAmexCards] = useState<IAPIData[]>([apiDataInitialState]);

  //update header title
  useEffect(() => {
    document.title = 'Smart Wealth Trends';
  }, []);

  const filterAmexCards = useCallback(() => {
    const amexCards = allCards.filter((card) => card.displayName === 'American Express');
    setAllAmexCards(amexCards);
  }, [allCards]);

  useEffect(() => {
    filterAmexCards();
  }, [filterAmexCards]);

  return (
    <>
      <div className="relative w-full mt-[16px] md:mt-[24px]">
        <AdvertiserDisclosure />
        <div className="flex flex-col items-center lg:items-start justify-center w-full py-[16px] md:py-[20px] lg:py-0 lg:pb-[20px]">
          <h1 className="text-lg md:text-xl font-semibold text-center lg:text-left pb-[6px] lg:w-[70%]">{`${filter.activeCategory.text} from ${filter.activeIssuer.text}`}</h1>
          <p className="text-secondary-text text-center lg:text-left text-base lg:w-[50%]">
            Description of the page
          </p>
        </div>
        {size.width < 976 && (
          <ul>
            <CategoryDropdown
              filterName="Category"
              fields={categories}
              updateState={filter.updateCategory}
              contextState={filter.activeCategory}
            />
          </ul>
        )}
        <AnimatePresence>
          <motion.div className="grid grid-cols-1 gap-4">
            {isAllLoading ? (
              Array(3)
                .fill(null)
                .map((element, index) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1, transition: { duration: 0.6 } }}
                      viewport={{ once: true }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      className="bg-white rounded-[14px] w-full h-[490px]"
                      key={index}
                    ></motion.div>
                  );
                })
            ) : allCardsMeta.total > 0 ? (
              allCards.map((card, index) => (
                <CardBlock key={card.id} card={card} allCards={allCards} index={index} />
              ))
            ) : (
              <p className="w-full h-screen">Nothing matching was found.</p>
            )}
          </motion.div>
        </AnimatePresence>
        {allAmexCards.length > 0 ? (
          <div className="text-xs font-light text-black pt-8">
            <span>
              The following links will direct you to the rates and fees for mentioned American
              Express Cards. These include:{' '}
            </span>
            {allAmexCards.map((amexCard) => (
              <div key={amexCard.id}>
                <span dangerouslySetInnerHTML={{ __html: amexCard.cardName }} />
                <span>
                  {' '}
                  (
                  <Link
                    target={'_blank'}
                    to={amexCard.termsAndConditionsLink}
                    className="text-primary"
                  >
                    Rates & Fees
                  </Link>
                  ).{' '}
                </span>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
