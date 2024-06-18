import Link from 'next/link';
import React from 'react';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
  return (
    <header
      {...headerProps}
      className={`w-full bg-white shadow-md py-4 ${className}`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Logo
        </Link>
        <nav className="space-x-4">
          <Link
            href="/"
            className="hover:underline text-blue-600 font-semibold"
          >
            Home
          </Link>
          <Link href="/about" className="hover:underline text-gray-600">
            About
          </Link>
          <Link href="/contact" className="hover:underline text-gray-600">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
