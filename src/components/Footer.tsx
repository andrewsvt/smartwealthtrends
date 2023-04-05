import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/Logo.png';
import boaLogo from '../assets/icons/bankofamerica.svg';
import chaseLogo from '../assets/icons/chase.svg';
import visaLogo from '../assets/icons/visa.svg';
import mastercardLogo from '../assets/icons/mastercard.svg';
import capitaloneLogo from '../assets/icons/capitalone.svg';
import citigroupLogo from '../assets/icons/citigroup.svg';

export const Footer: FC = () => {
  return (
    <div className="mt-[60px] space-y-[28px]">
      <div className="flex flex-row justify-between items-start relative">
        <div className="space-y-[28px] w-[312px]">
          <Link to="/">
            <img className="w-[200px]" src={Logo} alt="logo"></img>
          </Link>
          <p className="text-xs font-light text-secondary-text">
            SmartWealthTrends is dedicated to bringing you the latest in finance. With in-depth
            reviews, comprehensive comparisons, and easy-to-follow guides, you’ll be prepared for
            whatever is thrown at you!
          </p>
        </div>
        <div className="flex flex-col space-y-[28px]">
          <h3 className="text-base font-medium">Polices</h3>
          <ul className="flex flex-col space-y-[18px]">
            <li className="text-xs text-secondary-text underline font-light">Privacy Policy</li>
            <li className="text-xs text-secondary-text underline font-light">Terms Of Service</li>
            <li className="text-xs text-secondary-text underline font-light">
              Affiliate Disclosure
            </li>
          </ul>
        </div>
        <div className="flex flex-row items-center w-[830px] justify-between">
          <img src={boaLogo} alt="" />
          <img src={chaseLogo} alt="" />
          <img src={visaLogo} alt="" />
          <img src={mastercardLogo} alt="" />
          <img src={capitaloneLogo} alt="" />
          <img src={citigroupLogo} alt="" />
        </div>
      </div>
      <div className="flex justify-center items-center w-full border-t-[1px] border-[#EAE9EE]">
        <p className="text-xs font-medium text-[#626262] p-[28px]">
          Copyright ©️ 2020-2023 AdStride LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
};
