import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircleIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Criação de Sites em Manaus | Estúdio Digital Especializado',
  description:
    'Desenvolvimento de sites profissionais, e-commerces e sistemas web em Manaus - AM. Entrega rápida, integração com PIX, PWA e IA. Fale conosco!',
  alternates: {
    canonical: 'https://webuildsites.com.br/criacao-de-sites-manaus',
  },
  openGraph: {
    title: 'Criação de Sites Profissionais em Manaus - AM | WeBuildSites',
    description:
      'Projetos web sob medida para empresas manauaras. Performance, SEO local, Painel Admin e suporte via WhatsApp.',
    url: 'https://webuildsites.com.br/criacao-de-sites-manaus',
    siteName: 'WeBuildSites',
    locale: 'pt_BR',
    type: 'website',
  },
};

const diferenciais = [
  {
    icon: DevicePhoneMobileIcon,
    title: 'Visual Moderno & Responsivo',
    desc: 'Sites 100% otimizados para smartphones, garantindo navegação fluida em qualquer tela.',
  },
  {
    icon: BoltIcon,
    title: 'Velocidade Extrema (Next.js)',
    desc: 'Carregamento instantâneo para não perder nenhum cliente e ter notas altas no Google.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Painel Admin & Autonomia',
    desc: 'Edite conteúdos, produtos e banners do seu site de forma simples sem precisar de programador.',
  },
  {
    icon: SparklesIcon,
    title: 'Atendimento com IA 24h',
    desc: 'Chatbot inteligente integrado no seu site respondendo dúvidas dos clientes imediatamente.',
  },
];

const faqs = [
  {
    q: 'Quanto custa para criar um site em Manaus com a WeBuildSites?',
    a: 'O investimento varia conforme o escopo do projeto (Landing Page, Site Institucional ou E-commerce/SaaS). Como estúdio enxuto, oferecemos valores altamente competitivos com parcelamento no cartão ou PIX.',
  },
  {
    q: 'Em quanto tempo meu site fica pronto?',
    a: 'Landing pages e sites institucionais são entregues em média entre 5 a 12 dias úteis após o recebimento dos conteúdos base.',
  },
  {
    q: 'O site aparece no Google para buscas em Manaus?',
    a: 'Sim! Todos os nossos projetos são desenvolvidos com SEO Local integrado, otimização de velocidade, meta tags e Schema Markup estruturado para o Google.',
  },
  {
    q: 'Como funciona o suporte pós-entrega?',
    a: 'Oferecemos garantia de funcionamento, suporte direto via WhatsApp e treinamento gravado ou ao vivo para você gerenciar seu painel.',
  },
];

export default function CriacaoDeSitesManausPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0b1220] via-[#1d2b48] to-[#0061aa] py-20 lg:py-28 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#36c2ac]/15 text-[#36c2ac] border border-[#36c2ac]/30 mb-6">
                📍 Estúdio Digital em Manaus — Atendimento Presencial & Online
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Criação de Sites Profissionais em{' '}
                <span className="text-[#36c2ac]">Manaus - AM</span>
              </h1>
              <p className="text-lg md:text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
                Transforme sua presença digital com sites ultra-rápidos, visual de alto impacto e assistente virtual de IA. Conquiste clientes em Manaus e todo o Brasil.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5592991805753?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20criar%20um%20site%20em%20Manaus."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-base py-3.5 px-8"
                  aria-label="Falar pelo WhatsApp com consultor em Manaus"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Solicitar Orçamento no WhatsApp
                </a>
                <Link
                  href="/#portfolio"
                  className="btn-outline inline-flex items-center justify-center gap-2 text-base py-3.5 px-8"
                >
                  Ver Projetos Entregues
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-20 bg-[#1d2b48]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="section-title">
                Por que empresas de Manaus{' '}
                <span className="text-[#36c2ac]">escolhem a WeBuildSites?</span>
              </h2>
              <p className="section-subtitle">
                Desenvolvimento moderno com foco em conversão de clientes e performance técnica.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {diferenciais.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-[#0061aa]/40 border border-white/10 hover:border-[#36c2ac]/50 transition-all duration-300 flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#36c2ac] to-[#0061aa] flex items-center justify-center mb-5 text-white shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* O que está incluso */}
        <section className="py-20 bg-[#0061aa]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-12">
                O que está incluso no seu <span className="text-[#36c2ac]">novo site</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Otimização completa de SEO para o Google',
                  'Certificado SSL de segurança (HTTPS grátis)',
                  'Integração com WhatsApp e redes sociais',
                  'Formulários e captação de leads direto no e-mail',
                  'Chatbot inteligente com IA respondendo 24h',
                  'Design responsivo para celular e computador',
                  'Hospedagem rápida e configuração de domínio .com.br',
                  'Painel administrativo para atualizar conteúdos',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-[#1d2b48]/60 rounded-xl border border-white/10">
                    <CheckCircleIcon className="w-6 h-6 text-[#36c2ac] flex-shrink-0 mt-0.5" />
                    <span className="text-white text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[#0b1220]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center mb-12">
                Dúvidas frequentes sobre <span className="text-[#36c2ac]">Criação de Sites em Manaus</span>
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-6 bg-[#1d2b48] rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                    <p className="text-sm text-white/75 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-gradient-to-r from-[#0061aa] to-[#1d2b48]">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Pronto para ter um site que <span className="text-[#36c2ac]">vende mais?</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Fale diretamente com nossa equipe em Manaus e receba uma proposta em minutos.
            </p>
            <a
              href="https://wa.me/5592991805753?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20de%20Manaus%20e%20quero%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-10"
            >
              Falar no WhatsApp (92) 99180-5753
            </a>
          </div>
        </section>

        {/* Schema FAQ markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.a,
                },
              })),
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
