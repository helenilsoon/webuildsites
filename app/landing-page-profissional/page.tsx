import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircleIcon,
  BoltIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Criação de Landing Page Profissional para Anúncios | WeBuildSites',
  description:
    'Landing pages de alta conversão para Google Ads e Meta Ads. Otimizadas para gerar leads e vendas com carregamento em menos de 1 segundo.',
  alternates: {
    canonical: 'https://webuildsites.com.br/landing-page-profissional',
  },
  openGraph: {
    title: 'Landing Pages de Alta Conversão para Anúncios | WeBuildSites',
    description:
      'Aumente o ROI do seu tráfego pago com landing pages ultrarrápidas, design persuasivo e integração direta com WhatsApp.',
    url: 'https://webuildsites.com.br/landing-page-profissional',
    siteName: 'WeBuildSites',
    locale: 'pt_BR',
    type: 'website',
  },
};

const beneficios = [
  {
    icon: BoltIcon,
    title: 'Carregamento Instantâneo',
    desc: 'Sem perda de cliques. Páginas construídas em Next.js com notas máximas no Google PageSpeed.',
  },
  {
    icon: ChartBarIcon,
    title: 'FOCO em Conversão (CRO)',
    desc: 'Copywriting estratégico, gatilhos mentais e hierarquia visual projetados para transformar visitantes em clientes.',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Integração com WhatsApp & CRM',
    desc: 'Botões inteligentes que direcionam o lead com mensagem pronta direto para seu WhatsApp ou sistema de vendas.',
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Pronta para Google & Meta Ads',
    desc: 'Tags de rastreamento (Pixel, Google Tag Manager) e estrutura com excelente Índice de Qualidade para pagar menos por clique.',
  },
];

const faqs = [
  {
    q: 'O que é necessário para criar a landing page?',
    a: 'Precisamos apenas das informações sobre o seu produto/serviço, oferta e contatos. Nós estruturamos a arquitetura de conversão, layout e desenvolvimento.',
  },
  {
    q: 'A landing page vem com suporte a tráfego pago?',
    a: 'Sim! Entregamos a página com as tags do Meta Pixel, Google Tag Manager e rastreamento de cliques no WhatsApp pré-instalados.',
  },
  {
    q: 'Qual o prazo de entrega de uma Landing Page?',
    a: 'Entregamos landing pages profissionais prontas para rodar anúncios em um prazo de 3 a 7 dias úteis.',
  },
];

export default function LandingPageProfissionalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0b1220] via-[#1d2b48] to-[#0061aa] py-20 lg:py-28 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#36c2ac]/15 text-[#36c2ac] border border-[#36c2ac]/30 mb-6">
                ⚡ Alta Conversão para Google Ads & Facebook Ads
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Criação de <span className="text-[#36c2ac]">Landing Pages</span> Profissionais que Vendem
              </h1>
              <p className="text-lg md:text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
                Pare de rasgar dinheiro com anúncios enviando tráfego para páginas lentas. Desenvolvemos landing pages ultra-rápidas e otimizadas para transformar cliques em leads e vendas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5592991805753?text=Ol%C3%A1!%20Preciso%20de%20uma%20Landing%20Page%20profissional%20para%20meus%20an%C3%BAncios."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-base py-3.5 px-8"
                  aria-label="Solicitar Landing Page no WhatsApp"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Criar Minha Landing Page
                </a>
                <Link
                  href="/#portfolio"
                  className="btn-outline inline-flex items-center justify-center gap-2 text-base py-3.5 px-8"
                >
                  Ver Exemplos de Sucesso
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20 bg-[#1d2b48]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="section-title">
                Por que você precisa de uma <span className="text-[#36c2ac]">Landing Page de Alta Conversão?</span>
              </h2>
              <p className="section-subtitle">
                Uma landing page profissional reduz seu custo por lead (CPL) e aumenta o retorno das suas campanhas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {beneficios.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="p-6 rounded-2xl bg-[#0061aa]/40 border border-white/10 hover:border-[#36c2ac]/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#36c2ac] to-[#0061aa] flex items-center justify-center mb-5 text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* O que inclui */}
        <section className="py-20 bg-[#0061aa]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-12">
                O que entregamos na sua <span className="text-[#36c2ac]">Landing Page</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Design exclusivo alinhado à sua identidade visual',
                  'Copywriting persuasivo focado no seu público-alvo',
                  'Instalação do Pixel do Meta e Google Tag Manager',
                  'Formulário inteligente com validação de dados',
                  'Integração direta com WhatsApp comercial',
                  'Velocidade mobile nota 90+ no Google PageSpeed',
                  'Hospedagem e certificado de segurança SSL inclusos',
                  'Chatbot inteligente com IA (opcional)',
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

        {/* FAQ */}
        <section className="py-20 bg-[#0b1220]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center mb-12">
                Perguntas Frequentes sobre <span className="text-[#36c2ac]">Landing Pages</span>
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
              Pronto para maximizar o resultado dos seus <span className="text-[#36c2ac]">anúncios?</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Fale conosco agora no WhatsApp e receba uma proposta sob medida para sua campanha.
            </p>
            <a
              href="https://wa.me/5592991805753?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20de%20Landing%20Page%20e%20quero%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-10"
            >
              Falar no WhatsApp (92) 99180-5753
            </a>
          </div>
        </section>

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
