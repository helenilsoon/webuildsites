import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import VisitTracker from './components/VisitTracker';
import FloatingChat from './components/Chat';


const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Criação de Sites e Sistemas Digitais em Manaus | WeBuildSites',
  description:
    'Criamos sites, e-commerces, sistemas e plataformas para empresas e ministérios em todo o Brasil. Atendimento imediato via chatbot com IA. Orçamento rápido.',
  // keywords removidas — irrelevantes desde 2009
  authors: [{ name: 'WeBuildSites' }],
  creator: 'WeBuildSites',
  publisher: 'WeBuildSites',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://webuildsites.com.br',
    title: 'Criação de Sites e Sistemas Digitais em Manaus | WeBuildSites',
    description:
      'Criamos sites, e-commerces, sistemas e plataformas para empresas e ministérios em todo o Brasil. Atendimento imediato via chatbot com IA.',
    siteName: 'WeBuildSites',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WeBuildSites - Criação de Sites e Sistemas Digitais',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Criação de Sites e Sistemas Digitais em Manaus | WeBuildSites',
    description:
      'Criamos sites, e-commerces, sistemas e plataformas para empresas e ministérios em todo o Brasil. Atendimento via chatbot com IA.',
  },
  alternates: {
    canonical: 'https://webuildsites.com.br',
  },
  metadataBase: new URL('https://webuildsites.com.br'),
  applicationName: 'WeBuildSites',
  category: 'technology',
  verification: {
    // TODO: substituir pelo código real do Google Search Console após verificar
    // o domínio em https://search.google.com/search-console
    // google: 'seu-codigo-aqui',
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
        />
        {/* Schema Markup — LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'WeBuildSites',
              description:
                'Criação de sites, e-commerces e sistemas digitais para empresas e ministérios em Manaus e todo o Brasil',
              url: 'https://webuildsites.com.br',
              email: 'contato@webuildsites.com.br',
              telephone: '+55-92-99180-5753',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Manaus',
                addressRegion: 'AM',
                addressCountry: 'BR',
              },
              areaServed: 'BR',
              serviceType: [
                'Criação de Sites',
                'E-commerce',
                'Sistemas Web',
                'Aplicativos PWA',
                'Plataformas SaaS',
              ],
            }),
          }}
        />
      </head>
      <body className={`${poppins.className} bg-white text-white-400`}>
        <VisitTracker />
        <FloatingChat />
        {children}
      </body>
    </html>
  );
}
