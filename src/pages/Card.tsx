import React, { FC, useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { CardBlock, Rating } from 'components';
import { CheckBox, PrimaryButton } from 'components/UI';

import { ReactComponent as StarIcon } from '../assets/icons/RatingStarFull.svg';

import { Listing } from 'interfaces/Api';

import { ReactComponent as CheckIcon } from '../assets/icons/check.svg';
import { ReactComponent as CrossIcon } from '../assets/icons/cross.svg';
import { ReactComponent as LockIcon } from '../assets/icons/lock.svg';

import { selectedCardContext } from 'contexts/SelectedCardContext';
import { ComparisonContext } from 'contexts/ComparisonContext';
import { IUseWindowSize, useWindowSize } from 'hooks/useWindowSize';
import ProgressBar from 'components/UI/ProgressBar';
import { apiDataInitialState } from 'utils/constants';
import { AdvertiserDisclosure } from 'components/AdvertiserDisclosure';
import { FilterContext } from 'contexts/FilterContext';
import { motion } from 'framer-motion';
import { getFiltersLink } from 'utils/getFiltersLink';

interface ICardpageProps {
  apiData: Listing[];
}

export const Card: FC<ICardpageProps> = ({ apiData }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const size: IUseWindowSize = useWindowSize();
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [allApiData, setAllApiData] = useState<Listing[]>(apiDataInitialState);
  const [scrolled, setScrolled] = useState(false);
  const [currentParams, setCurrentParams] = useState('');

  //contexts
  const { selectedCard, updateSelectedCard } = useContext(selectedCardContext);
  const { products, addProduct, removeProduct } = useContext(ComparisonContext);
  const filter = useContext(FilterContext);

  //fetch all cards
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}&crd=25&xml_version=2&max=999`);
      const data = await response.json();
      setAllApiData(data.ResultSet.Listings.Listing);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [apiUrl]);

  //call fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  //set context after reloading
  useEffect(() => {
    const currentObject = allApiData.find((card: Listing) => card.ID === cardId);
    if (currentObject) {
      updateSelectedCard(currentObject);
    }
  }, [cardId, allApiData]);

  //scroll up when open new card page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCard.ID]);

  const tableItems = [
    {
      title: 'Sign Up Bonus',
      description: selectedCard.SignupRequirement.length ? selectedCard.SignupRequirement : 'N/A',
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
  ];

  //add/remove compare function
  const handleAddToComparison = useCallback(() => {
    addProduct(selectedCard);
  }, [addProduct, selectedCard, products]);

  const handleRemoveFromComparison = useCallback(() => {
    removeProduct(selectedCard);
  }, [removeProduct, selectedCard]);

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

  const textToSlug = (text: string) => {
    return text.toLowerCase().replace(/ /g, '-');
  };

  // const issuerSlug = textToSlug(selectedCard.DisplayName);

  const handleIssuerClick = () => {
    const slug = textToSlug(selectedCard.DisplayName);
    filter.updateIssuer(slug);
    navigate(`/${slug}`);
  };

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: scrolled ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full h-[100px] bg-light-gray flex items-center justify-center z-30 p-[16px] space-x-[16px] md:space-x-[32px]"
      >
        <img
          src={selectedCard.Creative.LogoImageUrl}
          alt="logo"
          className="h-full w-auto rounded-[10px]"
        />
        <p
          className="text-sm md:text-lg font-semibold"
          dangerouslySetInnerHTML={{ __html: selectedCard.CardName }}
        />
        <div className="max-w-[202px]">
          <PrimaryButton text="Apply Now" />
        </div>
      </motion.div>
      <div className="w-full">
        {selectedCard.ID.length ? (
          <>
            {' '}
            {size.width > 768 ? (
              <div className="sticky top-0 bg-bg h-[72px] w-full flex flex-row justify-between items-center">
                <div className="flex flex-row items-center py-[24px] lg:py-0 space-x-[8px]">
                  <Link to={currentParams} className="text-secondary-text">
                    Home
                  </Link>
                  <div className="text-medium-gray">/</div>
                  <div onClick={handleIssuerClick} className="text-secondary-text cursor-pointer">
                    {selectedCard.DisplayName}
                  </div>
                  <div className="text-medium-gray">/</div>
                  <div
                    className="text-secondary-text cursor-default"
                    dangerouslySetInnerHTML={{ __html: selectedCard.CardName }}
                  />
                </div>
                <AdvertiserDisclosure />
              </div>
            ) : (
              <div className="w-full flex flex-col py-[20px] space-y-[20px]">
                <div className="flex flex-row items-center lg:py-0 space-x-[8px] truncate">
                  <Link to={currentParams} className="text-secondary-text">
                    Home
                  </Link>
                  <div className="text-medium-gray">/</div>
                  <div onClick={handleIssuerClick} className="text-secondary-text cursor-pointer">
                    {selectedCard.DisplayName}
                  </div>
                  <div className="text-medium-gray">/</div>
                  <div
                    className="text-secondary-text cursor-default"
                    dangerouslySetInnerHTML={{ __html: selectedCard.CardName }}
                  />
                </div>
                <AdvertiserDisclosure />
              </div>
            )}
            <div className="grid grid-cols-1 gap-4">
              {/* card details */}
              <div id="section1" className="p-[20px] bg-white rounded-[14px] space-y-[32px]">
                <div className="flex flex-col md:flex-row md:h-[180px] md:space-x-[20px]">
                  <div className="relative h-full md:max-w-[300px] w-full md:w-auto ">
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
                      src={selectedCard.Creative.RawLogoImageUrl}
                      alt="card"
                    />
                  </div>
                  <div className="flex flex-col space-y-[20px] items-center md:items-start md:justify-between mt-[20px] md:mt-0">
                    <div className="space-y-[12px] w-full flex flex-col items-center md:items-start">
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
                    <div className="flex flex-col md:flex-row items-center justify-start space-y-[8px] md:space-x-[8px] w-full md:w-auto">
                      <div className="flex flex-row items-center space-x-[8px] w-full md:w-auto">
                        <PrimaryButton text="Apply Now" />
                      </div>
                      {products.map((product) => product.ID).includes(selectedCard.ID) ? (
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
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] border-border rounded-[10px]">
                  {tableItems.slice(0, 3).map((tableItem, index) => {
                    return (
                      <div
                        key={index}
                        className={`p-[20px] space-y-[20px] ${
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
                      className={`p-[20px] space-y-[8px] ${
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
                    dangerouslySetInnerHTML={{ __html: selectedCard.Creative.PPCDescription }}
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
                <div id="section4" className="space-y-[32px]">
                  <h2 className="text-lg font-semibold pl-[20px]">Related Card Offers</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {apiData.length >= 2
                      ? apiData
                          .filter((product) => product.ID !== cardId)
                          .slice(0, 2)
                          .map((product, index) => (
                            <CardBlock key={product.ID} product={product} index={index} />
                          ))
                      : allApiData
                          .filter((product) => product.ID !== cardId)
                          .slice(0, 2)
                          .map((product, index) => (
                            <CardBlock key={product.ID} product={product} index={index} />
                          ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          'Loading...'
        )}
      </div>
    </>
  );
};
