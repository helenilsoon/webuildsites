import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import VisitTracker from './components/VisitTracker';

const poppins = Poppins({
  weight: ['400'],
  //  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WebuildSites - Criação de Sites Profissionais',
  description: 'Soluções digitais inovadoras para o seu negócio. Desenvolvimento de sites profissionais, e-commerces e sistemas web.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link 
          rel="stylesheet" 
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
        />
      </head>
      <body className={`${poppins.className} bg-white text-white-400`}>
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}
