import React, { FC } from 'react';

import Logo from '../assets/images/Logo.webp';
import boaLogo from '../assets/icons/bankofamerica.svg';
import chaseLogo from '../assets/icons/chase.svg';
import visaLogo from '../assets/icons/visa.svg';
import mastercardLogo from '../assets/icons/mastercard.svg';
import capitaloneLogo from '../assets/icons/capitalone.svg';
import citigroupLogo from '../assets/icons/citigroup.svg';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
  return (
    <div className="mt-[60px] space-y-[28px] max-w-[1400px] m-auto">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between items:center lg:items-start relative space-y-[32px] lg:space-y-0">
        <div className="space-y-[28px] w-full lg:w-[312px] flex flex-col items-center lg:items-start">
          <img className="w-[200px]" src={Logo} alt="logo"></img>
          <p className="text-xs font-light text-secondary-text max-w-[90%] md:max-w-[50%] lg:max-w-none text-center lg:text-left">
            SmartWealthTrends is dedicated to bringing you the latest in finance. With in-depth
            reviews, comprehensive comparisons, and easy-to-follow guides, you’ll be prepared for
            whatever is thrown at you!
          </p>
        </div>
        <div className="flex flex-col items-center lg:items-start space-y-[28px]">
          <h3 className="text-base font-medium">Polices</h3>
          <ul className="flex flex-col items-center lg:items-start space-y-[18px]">
            <li className="text-xs text-secondary-text underline font-light">
              <Link to={'https://smartwealthtrends.com/privacy-policy/'}>Privacy Policy</Link>
            </li>
            <li className="text-xs text-secondary-text underline font-light">
              <Link to={'https://smartwealthtrends.com/terms-of-service/'}>Terms Of Service</Link>
            </li>
            <li className="text-xs text-secondary-text underline font-light">
              <Link to={'https://smartwealthtrends.com/affiliate-disclosure/'}>
                Affiliate Disclosure
              </Link>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 m-auto lg:m-0 lg:flex lg:flex-row lg:items-center justify-center lg:justify-between w-[90%] md:w-[50%] lg:w-[830px]">
          <img src={boaLogo} alt="" />
          <img src={chaseLogo} alt="" />
          <img src={visaLogo} alt="" />
          <img src={mastercardLogo} alt="" />
          <img src={capitaloneLogo} alt="" />
          <img src={citigroupLogo} alt="" />
        </div>
      </div>
      <div className="flex justify-center items-center w-full border-t-[1px] border-[#EAE9EE]">
        <p className="text-xs font-medium text-[#626262] p-[28px] text-center">
          Copyright ©️ 2020-2023 AdStride LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
};
