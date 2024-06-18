import React from 'react';
import Footer from '../ui/footer';
import Header from '../ui/header';

export interface IDashboardLayout {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<IDashboardLayout> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
