import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircleIcon,
  BuildingStorefrontIcon,
  QrCodeIcon,
  DevicePhoneMobileIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppCTA from '../components/WhatsAppCTA';

export const metadata: Metadata = {
  title: 'Sistema de Pedidos e Cardápio Digital com PIX para Restaurantes | WeBuildSites',
  description:
    'Sistema de pedidos online para restaurantes, lanchonetes e delivery. Cardápio digital no WhatsApp, PIX automático e ZERO comissão por pedido.',
  alternates: {
    canonical: 'https://webuildsites.com.br/sistema-para-restaurantes',
  },
  openGraph: {
    title: 'Sistema de Pedidos & Delivery Próprio para Restaurantes | WeBuildSites',
    description:
      'Livre-se das altas taxas dos aplicativos de delivery. Tenha seu próprio cardápio digital com PIX e gestão de pedidos.',
    url: 'https://webuildsites.com.br/sistema-para-restaurantes',
    siteName: 'WeBuildSites',
    locale: 'pt_BR',
    type: 'website',
  },
};

const diferenciais = [
  {
    icon: CurrencyDollarIcon,
    title: 'ZERO Comissão por Pedido',
    desc: 'Economize até 27% que você deixaria em aplicativos terceiros. Todo o lucro das suas vendas é 100% seu.',
  },
  {
    icon: QrCodeIcon,
    title: 'Pagamento PIX Instantâneo',
    desc: 'O cliente conclui o pedido e paga via QR Code PIX ou chave copia e cola com confirmação rápida.',
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Cardápio Digital no Celular (PWA)',
    desc: 'Cardápio leve e intuitivo que carrega em segundos sem precisar que o cliente baixe nada na Play Store.',
  },
  {
    icon: BuildingStorefrontIcon,
    title: 'Painel Admin de Cozinha & Gestão',
    desc: 'Acompanhe os pedidos chegando em tempo real, altere status (em preparo, saiu para entrega) e edite o menu.',
  },
];

const faqs = [
  {
    q: 'Como os pedidos chegam para a equipe do restaurante?',
    a: 'Os pedidos aparecem no seu Painel Administrativo de Gestão e também podem ser enviados formatados direto no WhatsApp da sua cozinha ou atendimento.',
  },
  {
    q: 'Funciona para eventos ou vendas sazonais (ex: feijoadas, almoços)?',
    a: 'Perfeitamente! Desenvolvemos o sistema da Feijoada Solidária, ideal tanto para eventos pontuais quanto para operação diária de restaurantes e lanchonetes.',
  },
  {
    q: 'Posso alterar os preços e produtos do cardápio quando quiser?',
    a: 'Sim! Você recebe acesso a um painel simples para ativar/desativar pratos, alterar valores e adicionar novos itens a qualquer momento.',
  },
];

export default function SistemaParaRestaurantesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0b1220] via-[#1d2b48] to-[#0061aa] py-20 lg:py-28 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#36c2ac]/15 text-[#36c2ac] border border-[#36c2ac]/30 mb-6">
                🍔 Delivery Próprio — Fature Mais Sem Comissões
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Sistema de <span className="text-[#36c2ac]">Cardápio Digital</span> & Pedidos com PIX
              </h1>
              <p className="text-lg md:text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
                Tenha sua própria plataforma de pedidos online para seu restaurante ou delivery. Atenda seus clientes com velocidade, receba no PIX e elimine comissões abusivas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppCTA
                  message="Olá! Quero um orçamento do Sistema de Pedidos para Restaurantes."
                  className="btn-primary inline-flex items-center justify-center gap-2 text-base py-3.5 px-8 cursor-pointer"
                  ariaLabel="Solicitar Sistema para Restaurante no WhatsApp"
                >
                  <BuildingStorefrontIcon className="w-5 h-5" />
                  Testar Demonstração no WhatsApp
                </WhatsAppCTA>
                <Link
                  href="/#portfolio"
                  className="btn-outline inline-flex items-center justify-center gap-2 text-base py-3.5 px-8"
                >
                  Ver Projeto Feijoada Solidária
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
                Por que migrar para um <span className="text-[#36c2ac]">Delivery Próprio?</span>
              </h2>
              <p className="section-subtitle">
                Fidelize seus clientes e mantenha 100% da margem de lucro no seu bolso.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {diferenciais.map((d, i) => {
                const Icon = d.icon;
                return (
                  <div key={i} className="p-6 rounded-2xl bg-[#0061aa]/40 border border-white/10 hover:border-[#36c2ac]/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#36c2ac] to-[#0061aa] flex items-center justify-center mb-5 text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{d.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{d.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recursos inclusos */}
        <section className="py-20 bg-[#0061aa]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-12">
                O que inclui no <span className="text-[#36c2ac]">Sistema para Restaurantes</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Cardápio digital responsivo com categorias e adicionais',
                  'Geração de QR Code PIX para pagamento na hora',
                  'Opção de retirada no local ou entrega no endereço',
                  'Painel de controle de pedidos em tempo real',
                  'Integração com WhatsApp para notificar o cliente',
                  'Sem mensalidades abusivas por volume de vendas',
                  'PWA instalável na tela inicial do celular do cliente',
                  'Suporte técnico e treinamento de uso',
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
                Perguntas Frequentes sobre o <span className="text-[#36c2ac]">Sistema de Pedidos</span>
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
              Pronto para economizar com <span className="text-[#36c2ac]">seu próprio sistema de pedidos?</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Fale conosco pelo WhatsApp e veja como é simples transformar suas vendas online.
            </p>
            <WhatsAppCTA
              message="Olá! Vim pela página de Restaurantes e quero um orçamento."
              className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-10 cursor-pointer"
              ariaLabel="Falar no WhatsApp comercial sobre restaurantes"
            >
              Falar no WhatsApp Comercial
            </WhatsAppCTA>
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
