import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Tecnologia para Igrejas e Ministérios | WeBuildSites',
  description:
    'Desenvolvemos sistemas digitais para igrejas, células e ministérios — do app de discipulado ao sistema de gestão pastoral completo.',
  alternates: {
    canonical: 'https://webuildsites.com.br/igrejas',
  },
  openGraph: {
    title: 'Tecnologia para Igrejas e Ministérios | WeBuildSites',
    description:
      'Desenvolvemos sistemas digitais para igrejas, células e ministérios — do app de discipulado ao sistema de gestão pastoral completo.',
    url: 'https://webuildsites.com.br/igrejas',
    siteName: 'WeBuildSites',
    locale: 'pt_BR',
    type: 'website',
  },
};

const servicos = [
  'Sistemas de gestão de células e discípulos',
  'Plataformas de ensino e formação bíblica',
  'Arrecadação digital com PIX para eventos e projetos',
  'Apps infantis para escola bíblica dominical',
  'Sites institucionais para ministérios e igrejas',
];

const portfolioIgrejas = [
  {
    title: 'Geração Joy — Sistema de Gestão Pastoral',
    description:
      'Plataforma de supervisão de células com módulos de agenda, metas, discipulado, visitas e oração. Sistema com autenticação e PWA.',
    tags: ['Sistema de Gestão', 'Autenticação', 'PWA', 'Next.js'],
    link: 'https://geracaojoy.vercel.app',
    gradient: 'from-[#0061aa] to-[#1d2b48]',
  },
  {
    title: 'Trilha do Discípulo — Plataforma de Discipulado',
    description:
      'Plataforma educacional com 5 módulos progressivos de formação cristã. Login, cadastro e landing page editorial completa.',
    tags: ['Plataforma Educacional', 'Autenticação', 'PWA', 'Next.js'],
    link: 'https://trilha-do-discipulo.vercel.app',
    gradient: 'from-[#36c2ac] to-[#0061aa]',
  },
  {
    title: 'Pequenos Discípulos — Bíblia Infantil',
    description:
      'App web infantil com conteúdo bíblico adaptado, painel administrativo para gestão de conteúdo e PWA para instalação no celular.',
    tags: ['App Educacional', 'Painel Admin', 'PWA', 'Next.js'],
    link: 'https://biblia-infantil.vercel.app',
    gradient: 'from-[#1d2b48] to-[#36c2ac]',
  },
  {
    title: 'MyRifa — Plataforma de Arrecadação Digital',
    description:
      'SaaS para campanhas de arrecadação com PIX automático. Ideal para eventos, projetos missionários e causas comunitárias.',
    tags: ['SaaS', 'PIX Integrado', 'Dashboard', 'Next.js'],
    link: 'https://myrifa.vercel.app',
    gradient: 'from-[#0061aa] to-[#36c2ac]',
  },
];

export default function IgrejasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#1d2b48] to-[#0061aa] py-20 md:py-32 overflow-hidden mt-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Tecnologia para igrejas que levam o{' '}
                <span className="text-[#61ce70]">discipulado</span> a sério
              </h1>
              <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                Desenvolvemos sistemas digitais para ministérios, células e
                comunidades cristãs — do app de discipulado ao sistema de gestão
                pastoral completo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* TODO: substituir pelo número real */}
                <a
                  href="https://wa.me/5592XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                  aria-label="Falar pelo WhatsApp"
                >
                  Falar pelo WhatsApp
                </a>
                <Link
                  href="#portfolio-igrejas"
                  className="btn-outline inline-flex items-center justify-center gap-2"
                >
                  Ver Projetos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* O que entregamos */}
        <section className="py-20 bg-[#0061aa]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center">
                O que entregamos{' '}
                <span className="text-[#61ce70]">para igrejas</span>
              </h2>
              <ul className="mt-10 space-y-5">
                {servicos.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircleIcon className="w-6 h-6 text-[#61ce70] flex-shrink-0 mt-0.5" />
                    <span className="text-white text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Portfólio igrejas */}
        <section id="portfolio-igrejas" className="py-20 bg-[#1d2b48]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-title">
                Projetos <span className="text-[#61ce70]">entregues</span>
              </h2>
              <p className="section-subtitle">
                Sistemas reais desenvolvidos para igrejas e ministérios.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {portfolioIgrejas.map((project, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col"
                >
                  <div
                    className={`bg-gradient-to-br ${project.gradient} h-36 flex items-center justify-center px-6`}
                  >
                    <h3 className="text-base font-semibold text-white text-center leading-snug">
                      {project.title}
                    </h3>
                  </div>
                  <div className="p-6 bg-[#0061aa] flex flex-col flex-1">
                    <p className="text-white/85 text-sm mb-4 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-[#61ce70]/20 text-[#61ce70] px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver projeto ${project.title} em nova aba`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-[#61ce70]/40 text-[#61ce70] text-sm font-semibold hover:bg-[#61ce70]/10 transition-colors"
                    >
                      Ver Projeto
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-[#0061aa]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="section-title">
                Sua igreja merece{' '}
                <span className="text-[#61ce70]">tecnologia de qualidade</span>
              </h2>
              <p className="section-subtitle mb-8">
                Atendimento direto, sem burocracia. Conte o que sua igreja
                precisa e montamos uma proposta.
              </p>
              {/* TODO: substituir pelo número real */}
              <a
                href="https://wa.me/5592XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2"
                aria-label="Falar pelo WhatsApp para solicitar orçamento"
              >
                Falar pelo WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
