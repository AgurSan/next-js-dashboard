import Head from 'next/head';
import React from 'react';
import Footer from '../../navigation/footer';
import Header from '../../navigation/header';

export interface IDashboardLayout {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<IDashboardLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>NextJs Fullstack Dashboard App</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="max-w-screen-2xl">{children}</main>
        <div className="m-auto"></div>
        <Footer />
      </div>
    </>
  );
};

export default DashboardLayout;
