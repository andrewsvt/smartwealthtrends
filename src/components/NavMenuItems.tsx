import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const NavMenuItems: FC = () => {
  const linksTable = [
    { name: 'Credit Cards', to: '/' },
    { name: 'Banking', to: '/banking' },
    { name: 'Loans', to: '/loans' },
  ];

  return (
    <>
      <div
        className={
          'bg-white space-y-[32px] flex flex-col p-[20px] border-[1px] border-light-gray rounded-[14px] mb-[20px]'
        }
      >
        {linksTable.map((link) => (
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium text-lg'
                : 'text-secondary-text font-medium text-lg hover:text-primary customTransition'
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </>
  );
};
