import React, { FC, useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';

import { selectedCardContext } from 'contexts/SelectedCardContext';
import { ComparisonContext } from 'contexts/ComparisonContext';
import { FilterContext } from 'contexts/FilterContext';

import { apiDataInitialState, issuers } from 'utils/constants';
import { getFiltersLink } from 'utils/getFiltersLink';

import { CardBlock, Rating, AdvertiserDisclosure, FeatureLabel } from 'components';
import { CheckBox, HyperLink, PrimaryButton, ProgressBar } from 'components/UI';

import { IAPIData } from 'interfaces/Api';
import { ITableItem } from 'interfaces';

import { ReactComponent as StarIcon } from '../assets/icons/RatingStarFull.svg';
import { ReactComponent as CheckIcon } from '../assets/icons/check.svg';
import { ReactComponent as CrossIcon } from '../assets/icons/cross.svg';
import { ReactComponent as LockIcon } from '../assets/icons/lock.svg';
import { useGetSingleCard } from 'hooks/useGetSingleCard';
import { useGetAllCards } from 'hooks/useGetAllCards';

interface ICardpageProps {}

export const Card: FC<ICardpageProps> = () => {
  const size: IUseWindowSize = useWindowSize();
  const { cardId } = useParams();
  const navigate = useNavigate();

  const { singleCard, isSingleLoading } = useGetSingleCard('3449');
  console.log(singleCard);

  const { allCards, allCardsMeta, isAllLoading } = useGetAllCards();

  const [lastApiData, setLastApiData] = useState<IAPIData[]>([apiDataInitialState]);
  const [allAmexCards, setAllAmexCards] = useState<IAPIData[]>([apiDataInitialState]);
  const [isChaseCard, setIsChaseCard] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentParams, setCurrentParams] = useState('');

  //contexts
  const { selectedCard, updateSelectedCard } = useContext(selectedCardContext);
  const { products, addProduct, removeProduct } = useContext(ComparisonContext);
  const filter = useContext(FilterContext);

  //update header title
  useEffect(() => {
    if (singleCard) {
      const cardName = singleCard.cardName;
      const parser = new DOMParser();
      const decodedCardName = parser.parseFromString(
        `<!doctype html><body>${cardName}`,
        'text/html'
      ).body.textContent;
      //@ts-ignore
      document.title = decodedCardName;
    }
  }, [singleCard]);

  //get params
  useEffect(() => {
    const newLink = getFiltersLink(
      filter.activeCategory,
      filter.activeIssuer,
      filter.activeCreditRange
    );

    if (currentParams) {
      navigate(newLink);
    }

    setCurrentParams(newLink);
  }, [filter.activeCategory, filter.activeIssuer, filter.activeCreditRange]);

  //scroll up when open new card page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tableItems = useMemo<ITableItem[]>(
    () => [
      {
        title: 'Rewards Rate',
        description:
          singleCard.rewardsDescriptionLong.length > 0 ? singleCard.rewardsDescriptionLong : 'N/A',
      },
      {
        title: 'APR',
        description: `<p class="mb-[8px]">Intro APR: ${
          singleCard.introAprRate.length > 0 && singleCard.introAprRate !== 'N/A'
            ? `${singleCard.introAprRate}`
            : 'N/A'
        }${
          singleCard.introAprDuration.length > 0 && singleCard.introAprDuration !== 'N/A'
            ? ` for ${singleCard.introAprDuration}</p>`
            : ''
        }${`<p>Regular APR: ${
          singleCard.regApr.length > 0 && singleCard.regApr !== 'N/A'
            ? `${singleCard.regApr} ${
                singleCard.regAprType.length > 0
                  ? singleCard.regAprType.includes('(')
                    ? singleCard.regAprType
                    : `(${singleCard.regAprType})`
                  : ''
              }`
            : 'N/A'
        }</p>`}`,
      },
      {
        icon: '',
        title: 'Annual Fees',
        description: singleCard.annualFees.length > 0 ? singleCard.annualFees : 'N/A',
      },
      {
        icon: '',
        title: 'Credit Score Needed',
        description: singleCard.creditScoreNeeded.length > 0 ? singleCard.creditScoreNeeded : 'N/A',
      },
      {
        icon: '',
        title: 'Card Brand',
        description:
          singleCard.cardProcessorTypeName.length > 0 ? singleCard.cardProcessorTypeName : 'N/A',
      },
    ],
    [singleCard]
  );

  //add/remove compare function
  const handleAddToComparison = useCallback(() => {
    addProduct(singleCard);
  }, [addProduct, singleCard, products]);

  const handleRemoveFromComparison = useCallback(() => {
    removeProduct(singleCard);
  }, [removeProduct, singleCard]);

  //check user scroll
  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isChase = () => {
    if (singleCard.displayName === 'Chase') {
      setIsChaseCard(true);
    } else setIsChaseCard(false);
  };

  useEffect(() => {
    isChase();
  }, [singleCard.id]);

  const textToSlug = (text: string) => {
    return text.toLowerCase().replace(/ /g, '-');
  };

  const handleIssuerClick = () => {
    const slug = textToSlug(singleCard.displayName);

    if (issuers.some((obj) => obj.slug === slug)) {
      filter.updateIssuer(slug);
      navigate(`/${slug}`);
    }
  };

  const isAmericanExpress = () => {
    if (singleCard.displayName === 'American Express') {
      return true;
    } else return false;
  };

  // const filterAmexCards = useCallback(() => {
  //   const amexCards = lastApiData
  //     .filter((product) => String(product.id) !== cardId)
  //     .slice(0, 2)
  //     .filter((card) => card.displayName === 'American Express');
  //   setAllAmexCards(amexCards);
  // }, [lastApiData]);

  // useEffect(() => {
  //   filterAmexCards();
  // }, [filterAmexCards]);

  return (
    <>
      <motion.div
        initial={{ y: -120 }}
        animate={{ y: scrolled ? 0 : -120 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full h-[100px] bg-light-gray flex items-center justify-center z-30 p-[16px] space-x-[16px] md:space-x-[32px]"
      >
        <img
          src={singleCard.rawLogoImageUrl} //LogoImageUrl
          alt="logo"
          className="h-full w-auto rounded-[10px]"
        />
        <p
          className="text-sm md:text-lg font-semibold cutLongVerticalText"
          dangerouslySetInnerHTML={{ __html: singleCard.cardName }}
        />
        {!isChaseCard ? (
          <div className="max-w-[202px]">
            <PrimaryButton text="Learn More" />
          </div>
        ) : (
          <div className="max-w-[202px]">
            <HyperLink text="Learn More" />
          </div>
        )}
      </motion.div>
      <div className="w-full">
        {!isSingleLoading ? (
          <>
            <div className="lg:h-[72px] pb-[20px] lg:pb-0 w-full flex flex-col lg:flex-row justify-between items-center">
              <div className="flex flex-row items-center py-[24px] lg:py-0 space-x-[8px] w-full lg:w-[75%] truncate">
                <Link to={currentParams} className="text-secondary-text">
                  Home
                </Link>
                <div className="text-medium-gray">/</div>
                <div onClick={handleIssuerClick} className="text-secondary-text cursor-pointer">
                  {singleCard.displayName}
                </div>
                <div className="text-medium-gray">/</div>
                <div
                  className="text-secondary-text cursor-default"
                  dangerouslySetInnerHTML={{ __html: singleCard.cardName }}
                />
              </div>
              <AdvertiserDisclosure />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {/* card details */}
              <div id="section1" className="p-[20px] bg-white rounded-[14px] space-y-[32px]">
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
                        src={singleCard.rawLogoImageUrl}
                        alt="card"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full space-y-[20px] items-center md:items-start md:justify-between mt-[20px] md:mt-0">
                    <div className="space-y-[12px] w-full flex flex-col items-center md:items-start">
                      <div className="flex flex-col-reverse md:flex-row w-full justify-between">
                        <h2
                          className="text-lg text-center md:text-left w-full font-semibold customTransition"
                          dangerouslySetInnerHTML={{ __html: singleCard.cardName }}
                        />
                      </div>
                      <div className="flex flex-row items-center">
                        <span className="text-base font-medium mr-[14px]">
                          {Number(singleCard.editorRating).toFixed(1)}
                        </span>
                        <Rating value={Number(singleCard.editorRating)} />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-[8px] md:space-y-0 md:space-x-[8px]">
                        <div className="flex flex-col md:flex-row items-center space-y-[8px] lg:space-y-0 md:space-x-[20px]">
                          {!isChaseCard ? (
                            <div className="flex flex-row items-center space-x-[8px] w-full md:w-auto">
                              <PrimaryButton text="Learn More" />
                            </div>
                          ) : (
                            <HyperLink text="Learn More" />
                          )}

                          {products.map((product) => product.id).includes(singleCard.id) ? (
                            <CheckBox
                              onClick={handleRemoveFromComparison}
                              text="Added to compare"
                              state={true}
                            />
                          ) : (
                            <CheckBox
                              onClick={handleAddToComparison}
                              text="Add to compare"
                              state={false}
                            />
                          )}
                        </div>
                        {singleCard.termsAndConditionsLink.length > 1 && (
                          <div className="flex flex-col items-center space-y-[4px]">
                            <Link target={'_blank'} to={singleCard.termsAndConditionsLink}>
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
                      {isAmericanExpress() && (
                        <div className="mt-4 md:mt-2">
                          <p className="text-xs font-light text-secondary-text text-center md:text-left w-full">
                            American Express is a smartwealthtrends.com advertiser
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] border-border rounded-[10px]">
                  {tableItems.slice(0, 3).map((tableItem, index) => {
                    return (
                      <div
                        key={index}
                        className={`px-[20px] py-[12px] md:py-[20px] space-y-[12px] md:space-y-[20px] ${
                          size.width < 768 ? 'oddBgColor tableItemMobile' : 'tableItem'
                        }`}
                      >
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
                      className={`px-[20px] py-[12px] md:py-[20px] space-y-[4px] ${
                        size.width < 768
                          ? 'oddBgColor tableItemMobile'
                          : 'tableItem tableItemExpanded'
                      }`}
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
                <div className="w-full flex flex-col space-y-[24px]">
                  <h3 className="text-basePlus font-semibold px-[20px]">Quick Facts</h3>
                  <div
                    className="PPCDescription"
                    dangerouslySetInnerHTML={{ __html: singleCard.ppcDescription }}
                  ></div>
                </div>
              </div>
              <div className="mt-[28px] grid grid-cols-1 gap-[60px]">
                {/* Review */}
                <div
                  id="section2"
                  className="flex flex-col-reverse md:flex-row w-full md:space-x-[54px]"
                >
                  <div className="w-full md:w-[328px] h-auto bg-white rounded-[14px] space-y-[28px] p-[20px] mt-[28px] md:mt-0">
                    <div className="flex flex-row items-center space-x-[16px]">
                      <div className="w-[64px] h-[64px] rounded-[12px] bg-bg flex items-center justify-center">
                        <span className="text-[28px] leading-[36px] font-semibold text-secondary">
                          {Number(singleCard.editorRating).toFixed(1)}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-[2px]">
                        <div className="flex flex-row items-center">
                          <Rating value={Number(singleCard.editorRating)} />
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
                          __html: singleCard.cardName + ' Card Expert Review',
                        }}
                      />
                      <p className="text-sm font-light text-secondary-text">
                        Last Updated
                        {/* {singleCard.LastUpdated} */}
                      </p>
                    </div>
                    <p className="text-base font-light">
                      The Citi Custom Cash℠ Card has come to the market with one of the more
                      interesting rewards programs we’ve seen in a while. Earn 5% cash back on
                      purchases in your top eligible spend category each billing cycle, up to the
                      first $500 spent, 1% cash back thereafter. Also, earn unlimited 1% cash back
                      on all other purchases. What this means is that unlike some other rewards
                      cards on the market that require you to manually opt-in to special categories
                      each month, this card will automatically apply the highest rate of cash back
                      to your most-used category. That makes the Citi Custom Cash℠ Card a great pick
                      for anyone looking for a low-maintenance card that still offers an incredibly
                      competitive cash back offer. And the sign-up bonus just sweetens the deal with
                      a low spend threshold and a solid return in the form of ThankYou® Points.
                    </p>
                  </div>
                </div>
                {/* Pros and cons */}
                <div id="section3" className="px-[20px] space-y-[32px]">
                  <h2
                    className="text-lg font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: 'Pros and Cons of ' + singleCard.cardName,
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
                            You'll earn an unlimited 2% cash back on all purchases made with this
                            card with no rewards caps or limits
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-[16px]">
                      <h3 className="text-basePlus font-medium text-secondary-text">Cons</h3>
                      <ul className="flex flex-col space-y-[24px] p-[12px]">
                        <li className="flex flex-col space-y-[8px]">
                          <div className="flex flex-row space-x-[16px] items-center">
                            <CrossIcon className="consIcon" />
                            <h4 className="text-base font-medium">Unlimited 2% Cash Back:</h4>
                          </div>
                          <p className="font-light">
                            You'll earn an unlimited 2% cash back on all purchases made with this
                            card with no rewards caps or limits
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Related offers */}
                {/* <div id="section4" className="space-y-[32px]">
                  <h2 className="text-lg font-semibold pl-[20px]">Related Card Offers</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {allCards.length > 2
                      ? allCards
                          .filter((product) => String(product.id) !== cardId)
                          .slice(0, 2)
                          .map((card, index) => (
                            <CardBlock
                              key={card.id}
                              card={card}
                              allCards={allCards}
                              index={index}
                            />
                          ))
                      : 'No Related Items'}
                  </div>
                </div> */}
              </div>
            </div>
            {(isAmericanExpress() || allAmexCards.length > 0) && (
              <div className="text-xs font-light text-black pt-8">
                <span>
                  The following links will direct you to the rates and fees for mentioned American
                  Express Cards. These include:{' '}
                </span>
                {/* current card */}
                <span dangerouslySetInnerHTML={{ __html: singleCard.cardName }} />
                <span>
                  {' '}
                  (
                  <Link
                    target={'_blank'}
                    to={singleCard.termsAndConditionsLink}
                    className="text-primary"
                  >
                    Rates & Fees
                  </Link>
                  ).{' '}
                </span>
                {/* related cards */}
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
            )}
          </>
        ) : (
          <span className="lg:h-[72px] py-[20px] lg:py-0 w-full flex flex-col lg:flex-row justify-between items-center">
            Loading...
          </span>
        )}
      </div>
    </>
  );
};
