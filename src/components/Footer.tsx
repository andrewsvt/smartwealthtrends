import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { advertiserDisclosure, editorialDisclosure } from 'utils/constants';

//icons and imgs
import Logo from '../assets/images/Logo.webp';
import boaLogo from '../assets/icons/bankofamerica.svg';
import chaseLogo from '../assets/icons/chase.svg';
import visaLogo from '../assets/icons/visa.svg';
import mastercardLogo from '../assets/icons/mastercard.svg';
import capitaloneLogo from '../assets/icons/capitalone.svg';
import citigroupLogo from '../assets/icons/citigroup.svg';

export const Footer: FC = () => {
  const policesLinks = [
    { text: 'Privacy Policy', link: 'https://smartwealthtrends.com/privacy-policy' },
    { text: 'Terms Of Service', link: 'https://smartwealthtrends.com/terms-of-service' },
    { text: 'Affiliate Disclosure', link: 'https://smartwealthtrends.com/affiliate-disclosure' },
  ];

  const creditCardRewardsLinks = [
    { text: 'Travel Credit Cards', link: '/travel' },
    { text: 'Cash Back Credit Cards', link: '/cash-back' },
    { text: 'Rewards Credit Cards', link: '/rewards' },
    { text: 'Gas Credit Cards', link: '/gas' },
    { text: 'Zero APR Credit Cards', link: '/zero-apr' },
  ];

  const creditCardIssuersLinks = [
    { text: 'Citibank Credit Cards', link: '/citi' },
    { text: 'Capital One Credit Cards', link: '/capital-one' },
    { text: 'Chase Credit Cards', link: '/chase' },
    { text: 'Bank of America Credit Cards', link: '/bank-of-america' },
    { text: 'Wells Fargo Credit Cards', link: '/wells-fargo' },
    { text: 'American Express Credit Cards', link: '/american-express' },
    { text: 'Discover Credit Cards', link: '/discover' },
  ];

  const creditScoreLinks = [
    { text: 'Excellent Credit Cards', link: '/top-cards/excellent' },
    { text: 'Good Credit Cards', link: '/top-cards/good' },
    { text: 'Fair Credit Cards', link: '/top-cards/average-fair' },
    { text: 'Poor Credit Cardss', link: '/top-cards/poor' },
    { text: 'Limited Credit Cards', link: '/top-cards/none-limited-history' },
  ];

  return (
    <div className="mt-[60px] px-4 space-y-[28px] max-w-[1400px] m-auto">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between items:center lg:items-start relative space-y-[32px] lg:space-y-0">
        <div className="space-y-[28px] w-full lg:w-[312px] flex flex-col items-start">
          <img className="w-[200px]" src={Logo} alt="logo"></img>
          <p className="text-xs font-light text-secondary-text max-w-[90%] md:max-w-[50%] lg:max-w-none text-left">
            SmartWealthTrends is dedicated to bringing you the latest in finance. With in-depth
            reviews, comprehensive comparisons, and easy-to-follow guides, you’ll be prepared for
            whatever is thrown at you!
          </p>
        </div>
        <div className="flex flex-col md:flex-row space-y-[20px] md:space-y-0 md:space-x-[20px]">
          {/* polices */}
          <div className="flex flex-col items-start space-y-[20px]">
            <h3 className="text-base font-medium">Polices</h3>
            <ul className="flex flex-col items-start space-y-[8px]">
              {policesLinks.map((item, index) => (
                <li key={index} className="text-xs text-secondary-text font-light">
                  <Link target={'_blank'} to={item.link}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* card rewards */}
          <div className="flex flex-col items-start space-y-[20px]">
            <h3 className="text-base font-medium">Credit Card Rewards</h3>
            <ul className="flex flex-col items-start space-y-[8px]">
              {creditCardRewardsLinks.map((item, index) => (
                <li key={index} className="text-xs text-secondary-text font-light">
                  <Link target={'_blank'} to={item.link}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* card issuers */}
          <div className="flex flex-col items-start space-y-[20px]">
            <h3 className="text-base font-medium">Credit Card Issuers</h3>
            <ul className="flex flex-col items-start space-y-[8px]">
              {creditCardIssuersLinks.map((item, index) => (
                <li key={index} className="text-xs text-secondary-text font-light">
                  <Link target={'_blank'} to={item.link}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* card score */}
          <div className="flex flex-col items-start space-y-[20px]">
            <h3 className="text-base font-medium">Cards by Credit Score</h3>
            <ul className="flex flex-col items-start space-y-[8px]">
              {creditScoreLinks.map((item, index) => (
                <li key={index} className="text-xs text-secondary-text font-light">
                  <Link target={'_blank'} to={item.link}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-2 gap-x-20 gap-y-12">
          <img className="w-10 h-10 object-contain" src={boaLogo} alt="" />
          <img className="w-10 h-10 object-contain" src={chaseLogo} alt="" />
          <img className="w-10 h-10 object-contain" src={visaLogo} alt="" />
          <img className="w-10 h-10 object-contain" src={mastercardLogo} alt="" />
          <img className="w-10 h-10 object-contain" src={capitaloneLogo} alt="" />
          <img className="w-10 h-10 object-contain" src={citigroupLogo} alt="" />
        </div>
      </div>
      <div className="flex flex-col space-y-[12px] pt-7 border-t-[1px] border-[#EAE9EE]">
        <p className="text-xs font-light text-black">
          <span className="font-medium text-current">Advertiser Disclosure: </span>
          {advertiserDisclosure}
        </p>
        <p className="text-xs font-light text-black">
          <span className="font-medium text-current">Editorial Disclosure: </span>
          {editorialDisclosure}
        </p>
      </div>
      <div className="flex justify-center items-center w-full border-t-[1px] border-[#EAE9EE]">
        <p className="text-xs font-medium text-[#626262] p-[28px] text-center">
          Copyright ©️ 2020-2023 AdStride LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
};
