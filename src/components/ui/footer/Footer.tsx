import React from 'react';

export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {}

const Footer: React.FC<IFooter> = ({ className, ...footerProps }) => {
  return (
    <footer
      {...footerProps}
      className={`w-full bg-white shadow-inner py-4 ${className}`}
    >
      <div className="container mx-auto text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Clément Sananikone. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
