import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppCTA from '../components/WhatsAppCTA';

export const metadata: Metadata = {
  title: 'Sistema para Igrejas e Gestão de Células | WeBuildSites',
  description:
    'Desenvolvemos sistemas para igrejas com gestão de células, discipulado, visitas e oração. Case real entregue: Geração Joy. Atendemos todo o Brasil a partir de Manaus, AM.',
  alternates: {
    canonical: 'https://webuildsites.com.br/igrejas',
  },
  keywords: [
    'sistema para igrejas',
    'gestão de células',
    'plataforma de discipulado',
    'sistema pastoral',
    'sistema de supervisão de células',
    'app para igrejas',
    'gestão pastoral digital',
  ],
  openGraph: {
    title: 'Sistema para Igrejas e Gestão de Células | WeBuildSites',
    description:
      'Desenvolvemos sistemas para igrejas com gestão de células, discipulado, visitas e oração. Case real: Geração Joy.',
    url: 'https://webuildsites.com.br/igrejas',
    siteName: 'WeBuildSites',
    locale: 'pt_BR',
    type: 'website',
  },
};

const problemas = [
  {
    titulo: 'Controle de células feito em planilha',
    desc: 'Líderes preenchem planilhas manualmente. As informações chegam atrasadas, desorganizadas ou não chegam. O supervisor não tem visibilidade em tempo real.',
  },
  {
    titulo: 'Relatórios de visitas e oração perdidos',
    desc: 'Pedidos de oração e visitas pastorais ficam no papel ou no WhatsApp. Ninguém sabe o que foi acompanhado, o que está pendente ou o que já foi resolvido.',
  },
  {
    titulo: 'Discipulado sem registro',
    desc: 'O processo de formação de membros não tem rastreamento. Não há como saber em que etapa cada pessoa está ou quem está sem acompanhamento há semanas.',
  },
  {
    titulo: 'Informação dispersa entre líderes',
    desc: 'Cada líder guarda sua informação do seu jeito. A liderança pastoral não consegue ter uma visão consolidada da saúde das células.',
  },
  {
    titulo: 'Nenhum sistema adequado ao modelo da igreja',
    desc: 'Aplicativos genéricos não respeitam o fluxo interno da sua igreja. Você adapta o processo ao sistema — deveria ser o contrário.',
  },
];

const entregamos = [
  {
    titulo: 'Gestão de células e membros',
    desc: 'Cada célula com sua lista de membros, frequência e histórico de reuniões. O supervisor acompanha tudo em um painel centralizado.',
  },
  {
    titulo: 'Módulo de discipulado com progresso',
    desc: 'Trilhas de formação com etapas definidas. O líder registra o avanço de cada discípulo e o supervisor acompanha quem está atrasado.',
  },
  {
    titulo: 'Registro de visitas e pedidos de oração',
    desc: 'Líderes registram visitas pastorais e pedidos de oração diretamente no sistema. O histórico fica salvo e disponível para toda a liderança autorizada.',
  },
  {
    titulo: 'Agenda e metas por célula',
    desc: 'Cada célula define suas metas de crescimento e registra os eventos agendados. O pastor supervisor visualiza o cumprimento das metas por período.',
  },
  {
    titulo: 'Autenticação e controle de acesso por perfil',
    desc: 'Membros, líderes, supervisores e pastores têm acesso a níveis diferentes de informação. Nenhum dado sensível fica exposto a quem não precisa ver.',
  },
  {
    titulo: 'PWA — funciona como aplicativo no celular',
    desc: 'O sistema pode ser instalado no celular sem depender de loja de aplicativos. Funciona em Android e iOS, com experiência de app nativo.',
  },
  {
    titulo: 'Painel administrativo completo',
    desc: 'A liderança da igreja gerencia usuários, configurações, conteúdos e relatórios sem precisar de suporte técnico para cada mudança.',
  },
];

const funcionalidades = [
  'Cadastro e login com perfis por cargo (membro, líder, supervisor, pastor)',
  'Mapa de células por região ou distrito',
  'Relatório semanal de células com envio digital',
  'Módulo de agenda com eventos e reuniões',
  'Acompanhamento de metas por célula e por supervisor',
  'Registro e histórico de visitas pastorais',
  'Lista de pedidos de oração com status de acompanhamento',
  'Trilha de discipulado com etapas e progresso por membro',
  'Arrecadação digital com PIX para eventos e projetos',
  'Notificações para líderes via sistema ou e-mail',
  'Dashboard com visão geral da saúde das células',
  'Instalação como PWA no celular (Android e iOS)',
];

export default function IgrejasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── HERO ── */}
        <section className="relative bg-gradient-to-br from-[#0b1220] via-[#1d2b48] to-[#0061aa] py-20 md:py-28 overflow-hidden mt-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(97,206,112,0.12) 0%, transparent 70%)',
            }}
          />
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block text-xs font-bold tracking-widest uppercase mb-5 px-3.5 py-1.5 rounded-full border border-[#61ce70]/30 bg-[#61ce70]/10 text-[#61ce70]">
                Case real entregue — Geração Joy
              </span>

              {/* H1 otimizado para SEO */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Sistema para igrejas:{' '}
                <span className="text-[#61ce70]">gestão de células, discipulado e supervisão pastoral</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                Desenvolvemos plataformas digitais personalizadas para igrejas que precisam organizar células, registrar visitas, acompanhar o discipulado e centralizar a informação pastoral — em um único sistema, acessível pelo celular.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppCTA
                  message="Olá! Quero saber mais sobre o sistema para igrejas da WeBuildSites."
                  className="btn-primary inline-flex items-center justify-center gap-2 cursor-pointer"
                  ariaLabel="Falar no WhatsApp sobre sistema para igrejas"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Falar no WhatsApp
                </WhatsAppCTA>
                <Link
                  href="#o-que-entregamos"
                  className="btn-outline inline-flex items-center justify-center gap-2"
                >
                  Ver o que entregamos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLEMA ── */}
        <section className="py-20 bg-[#0b1220]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* H2 */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4">
                O que acontece quando a igleja{' '}
                <span className="text-[#61ce70]">não tem um sistema</span>
              </h2>
              <p className="text-white/75 text-center text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                A maioria das igrejas em crescimento chega a um ponto onde planilhas e grupos de WhatsApp deixam de ser suficientes. A informação se perde, o acompanhamento falha e o pastor não tem visibilidade do que está acontecendo nas células.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {problemas.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl bg-[#162137] border border-red-900/30"
                  >
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold mb-1 text-sm md:text-base">
                        {item.titulo}
                      </h3>
                      <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CASE REAL: GERAÇÃO JOY ── */}
        <section className="py-20 bg-[#1d2b48] border-y border-white/10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12 items-center">

                {/* Texto */}
                <div className="lg:w-1/2">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full border border-[#61ce70]/30 bg-[#61ce70]/10 text-[#61ce70]">
                    Case real entregue
                  </span>

                  {/* H2 */}
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-snug">
                    Geração Joy — Plataforma de supervisão de células com gestão pastoral completa
                  </h2>

                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                    A Geração Joy é uma plataforma de gestão pastoral desenvolvida pela WeBuildSites para uma comunidade cristã. O sistema organiza células, supervisores e membros em módulos integrados de agenda, metas, discipulado, visitas e oração — com autenticação por perfil de acesso e PWA instalável no celular.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      'Módulos de agenda, metas, discipulado, visitas e oração',
                      'Autenticação com perfis: membro, líder, supervisor e pastor',
                      'Painel administrativo para a liderança da igreja',
                      'PWA instalável no Android e iOS sem loja de aplicativos',
                      'Desenvolvido em Next.js com banco de dados e API própria',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/85">
                        <CheckCircleIcon className="w-5 h-5 text-[#61ce70] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://geracaojoy.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#61ce70] text-sm font-semibold hover:underline"
                    aria-label="Acessar a demonstração do Geração Joy"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    Acessar a demonstração — geracaojoy.vercel.app
                  </a>
                </div>

                {/* Card de destaque */}
                <div className="lg:w-1/2">
                  <div className="rounded-2xl bg-gradient-to-br from-[#0061aa] to-[#1d2b48] border border-[#61ce70]/30 p-8 shadow-xl">
                    <div className="text-center mb-6">
                      <span className="text-4xl">⛪</span>
                      <h3 className="text-white font-bold text-xl mt-3 mb-1">Geração Joy</h3>
                      <p className="text-[#61ce70] text-sm font-semibold">Sistema de Gestão Pastoral</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        'Supervisão de células por distrito',
                        'Registro de reuniões e frequência',
                        'Acompanhamento de discipulado',
                        'Pedidos de oração com histórico',
                        'Visitas pastorais registradas',
                        'Metas por célula com dashboard',
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-white/90">
                          <div className="w-5 h-5 rounded-full bg-[#61ce70]/20 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-[#61ce70]" />
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {['Next.js', 'PWA', 'Autenticação', 'Painel Admin', 'API Própria'].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-[#61ce70]/15 text-[#61ce70] border border-[#61ce70]/30 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── O QUE ENTREGAMOS ── */}
        <section id="o-que-entregamos" className="py-20 bg-[#0061aa]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* H2 */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4">
                O que a WeBuildSites entrega no{' '}
                <span className="text-[#61ce70]">sistema pastoral</span>
              </h2>
              <p className="text-white/80 text-center text-base mb-12 max-w-2xl mx-auto leading-relaxed">
                Cada sistema é desenvolvido de acordo com o modelo de gestão da sua igreja. Os módulos abaixo são baseados no que já foi entregue e podem ser combinados conforme a necessidade.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {entregamos.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl bg-[#1d2b48]/60 border border-white/10 hover:border-[#61ce70]/40 transition-colors duration-200"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-[#61ce70] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold mb-1 text-sm md:text-base">
                        {item.titulo}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FUNCIONALIDADES ── */}
        <section className="py-20 bg-[#0b1220]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* H2 */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4">
                Funcionalidades que podem ser{' '}
                <span className="text-[#61ce70]">desenvolvidas para sua igreja</span>
              </h2>
              <p className="text-white/75 text-center text-sm md:text-base mb-12 max-w-2xl mx-auto">
                O sistema é construído sob medida. Você escolhe os módulos que fazem sentido para o modelo de gestão da sua comunidade.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {funcionalidades.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#162137] border border-slate-700/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#61ce70] flex-shrink-0 mt-2" />
                    <span className="text-white/85 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20 bg-gradient-to-br from-[#0061aa] to-[#1d2b48]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">

              {/* H2 */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5">
                Fale com quem já desenvolveu um{' '}
                <span className="text-[#61ce70]">sistema para igrejas</span>
              </h2>
              <p className="text-white/80 text-base mb-8 max-w-xl mx-auto leading-relaxed">
                Conte como sua igreja organiza as células e o discipulado hoje. Vamos montar uma proposta baseada no que faz sentido para o seu modelo de gestão pastoral — sem custo para conversar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppCTA
                  message="Olá! Preciso de um sistema para gestão de células e discipulado na minha igreja. Quero entender como funciona."
                  className="btn-primary inline-flex items-center justify-center gap-2 cursor-pointer"
                  ariaLabel="Falar no WhatsApp sobre sistema de gestão de células para igrejas"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Falar no WhatsApp Comercial
                </WhatsAppCTA>
                <Link
                  href="mailto:contato@webuildsites.com.br"
                  className="btn-outline inline-flex items-center justify-center gap-2"
                >
                  Enviar E-mail
                </Link>
              </div>

              <p className="text-white/50 text-xs mt-6">
                Atendemos igrejas de todo o Brasil. Estúdio baseado em Manaus, AM.
              </p>
            </div>
          </div>
        </section>

        {/* Schema.org JSON-LD — FAQ e LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'O que é um sistema para igrejas?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'É uma plataforma digital personalizada que centraliza a gestão de células, discipulado, visitas pastorais e pedidos de oração em um único sistema — acessível pelo celular como um aplicativo.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Quanto custa desenvolver um sistema de gestão de células?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'O valor depende dos módulos e do porte da igreja. Entre em contato via WhatsApp para receber uma proposta baseada no que sua comunidade precisa.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'O sistema funciona no celular?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sim. Desenvolvemos com tecnologia PWA, que permite instalar o sistema direto no celular, sem precisar de loja de aplicativos. Funciona em Android e iOS.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Vocês já desenvolveram um sistema para igrejas antes?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sim. Desenvolvemos o Geração Joy, uma plataforma de supervisão de células com módulos de agenda, metas, discipulado, visitas e oração — com autenticação por perfil e PWA. Acesse a demonstração em geracaojoy.vercel.app.',
                  },
                },
              ],
            }),
          }}
        />

      </main>
      <Footer />
    </>
  );
}
