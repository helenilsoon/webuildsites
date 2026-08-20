import type { Metadata } from 'next';
import {
  CheckCircleIcon,
  ShoppingBagIcon,
  QrCodeIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppCTA from '../components/WhatsAppCTA';

export const metadata: Metadata = {
  title: 'Criação de Loja Virtual & E-commerce | WeBuildSites',
  description:
    'Desenvolvimento de lojas virtuais com PIX automático, catálogo de produtos e integração com WhatsApp. Sem comissões por venda.',
  alternates: {
    canonical: 'https://webuildsites.com.br/loja-virtual-ecommerce',
  },
  openGraph: {
    title: 'Desenvolvimento de E-commerce & Lojas Virtuais | WeBuildSites',
    description:
      'Tenha sua própria loja virtual profissional em Next.js com catálogo rápido, pedidos no WhatsApp e pagamento via PIX.',
    url: 'https://webuildsites.com.br/loja-virtual-ecommerce',
    siteName: 'WeBuildSites',
    locale: 'pt_BR',
    type: 'website',
  },
};

const recursos = [
  {
    icon: QrCodeIcon,
    title: 'PIX Automático & Sem Comissão',
    desc: 'Receba seus pagamentos direto na sua conta bancária sem intermediários cobrando porcentagem das suas vendas.',
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Catálogo Rápido no Celular',
    desc: 'Interface fluida como um aplicativo para seus clientes navegarem e comprarem com poucos toques.',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Checkout Inteligente via WhatsApp',
    desc: 'O cliente escolhe os produtos e o pedido chega formatado no seu WhatsApp com endereço, itens e valor total.',
  },
  {
    icon: SparklesIcon,
    title: 'Painel para Cadastrar Produtos',
    desc: 'Gerencie seu catálogo, estoque, fotos e preços de forma autônoma e simples sem complicação.',
  },
];

const faqs = [
  {
    q: 'Eu preciso pagar mensalidade para ter minha loja virtual?',
    a: 'Diferente de plataformas tradicionais como Shopify ou Nuvemshop, nós desenvolvemos sua loja própria. Você paga pelo desenvolvimento e fica com total propriedade do sistema, reduzindo significativamente seus custos mensais.',
  },
  {
    q: 'Como o cliente faz o pagamento da compra?',
    a: 'Integramos PIX automático (com QR Code estático ou dinâmico), cartão de crédito via gateway seguro ou pagamento na entrega/retirada.',
  },
  {
    q: 'Vocês têm algum exemplo de loja virtual criada?',
    a: 'Sim! Desenvolvemos o e-commerce da Lena Mimos (lenamimos.com.br), loja de presentes personalizados operando em Manaus com alto desempenho.',
  },
];

export default function LojaVirtualEcommercePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0b1220] via-[#1d2b48] to-[#0061aa] py-20 lg:py-28 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#36c2ac]/15 text-[#36c2ac] border border-[#36c2ac]/30 mb-6">
                🛍️ Sua Própria Loja Virtual — Sem Taxas por Venda
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Criação de <span className="text-[#36c2ac]">Loja Virtual</span> & E-commerce Profissional
              </h1>
              <p className="text-lg md:text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
                Venda seus produtos 24 horas por dia com um e-commerce moderno, rápido e fácil de usar. Receba pagamentos via PIX e pedidos organizados no WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppCTA
                  message="Olá! Quero um orçamento para criar minha Loja Virtual."
                  className="btn-primary inline-flex items-center justify-center gap-2 text-base py-3.5 px-8 cursor-pointer"
                  ariaLabel="Solicitar E-commerce no WhatsApp"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  Criar Minha Loja Virtual
                </WhatsAppCTA>
                <a
                  href="https://lenamimos.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center justify-center gap-2 text-base py-3.5 px-8"
                >
                  Ver Case Real (Lena Mimos)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Recursos */}
        <section className="py-20 bg-[#1d2b48]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="section-title">
                Tudo o que sua loja precisa para <span className="text-[#36c2ac]">vender mais na internet</span>
              </h2>
              <p className="section-subtitle">
                Desenvolvimento focado na jornada de compra do cliente e na facilidade de gestão do lojista.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {recursos.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} className="p-6 rounded-2xl bg-[#0061aa]/40 border border-white/10 hover:border-[#36c2ac]/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#36c2ac] to-[#0061aa] flex items-center justify-center mb-5 text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{r.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{r.desc}</p>
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
                Recursos inclusos no seu <span className="text-[#36c2ac]">E-commerce</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Catálogo de produtos ilimitados com categorias',
                  'Páginas de produto com fotos de alta qualidade e zoom',
                  'Integração com PIX e cartão de crédito',
                  'Carrinho de compras intuitivo no celular',
                  'Painel Administrativo para cadastrar e editar itens',
                  'Cálculo de frete / taxa de entrega configurável',
                  'Otimização SEO para os produtos aparecerem no Google',
                  'Integração com WhatsApp para confirmação de pedidos',
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
                Dúvidas sobre <span className="text-[#36c2ac]">Criação de Lojas Virtuais</span>
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
              Coloque seus produtos na internet com quem <span className="text-[#36c2ac]">entende do assunto</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Monte sua loja virtual e comece a vender sem pagar comissões por cada venda.
            </p>
            <WhatsAppCTA
              message="Olá! Vim pela página de Loja Virtual e quero um orçamento."
              className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-10 cursor-pointer"
              ariaLabel="Falar no WhatsApp comercial sobre e-commerce"
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
