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
  title: 'WebuildSites | Agência de Desenvolvimento Web - Sites, E-commerce e Apps',
  description: 'Crie sua presença digital com a WebuildSites. Especialistas em desenvolvimento de sites profissionais, e-commerces, landing pages e sistemas web personalizados. Orçamento rápido.',
  keywords: ['criação de sites', 'desenvolvimento web', 'e-commerce', 'agência digital', 'sites profissionais', 'desenvolvimento de apps', 'web design', 'SEO', 'landing page', 'sistemas web'],
  authors: [{ name: 'WebuildSites' }],
  creator: 'WebuildSites',
  publisher: 'WebuildSites',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://webuildsites.com.br',
    title: 'WebuildSites | Agência de Desenvolvimento Web',
    description: 'Transformamos ideias em experiências digitais excepcionais. Sites profissionais, e-commerces e sistemas web personalizados.',
    siteName: 'WebuildSites',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebuildSites - Agência de Desenvolvimento Web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebuildSites | Agência de Desenvolvimento Web',
    description: 'Crie sua presença digital com especialistas em desenvolvimento web. Sites, e-commerces e apps personalizados.',
    // images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://webuildsites.com.br',
  },
  metadataBase: new URL('https://webuildsites.com.br'),
  applicationName: 'WebuildSites',
  category: 'technology',
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    // apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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
