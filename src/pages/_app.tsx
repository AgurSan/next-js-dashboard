import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import DashboardLayout from '../components/layout/primary/Primary';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </div>
  );
}
