'use client';

import Link from 'next/link';
import {
  ComputerDesktopIcon,
  ChartBarIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ServerIcon,
  DevicePhoneMobileIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
  href?: string;
  isPopular?: boolean;
}

export default function Services() {
  function openChat() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-floating-chat'));
    }
  }

  const services: ServiceItem[] = [
    {
      icon: ComputerDesktopIcon,
      title: 'Sites Institucionais Otimizados',
      description:
        'Desenvolvimento de sites profissionais com alta velocidade, SEO local e foco em conversão de clientes.',
      href: '/criacao-de-sites-manaus',
    },
    {
      icon: ChartBarIcon,
      title: 'Landing Pages de Alta Conversão',
      description:
        'Páginas de vendas otimizadas para campanhas de anúncios no Google e Instagram com alta taxa de conversão.',
      href: '/landing-page-profissional',
    },
    {
      icon: CreditCardIcon,
      title: 'Sistemas para Restaurantes',
      description:
        'Cardápio digital com pedidos online via QR Code e PIX direto no caixa sem taxas por pedido.',
      href: '/sistema-para-restaurantes',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Sistemas para Igrejas & Ministérios',
      description:
        'Plataformas de gestão de células, discipulado, contribuições e eventos pastoral digital.',
      href: '/igrejas',
    },
    {
      icon: BoltIcon,
      title: 'Otimização SEO & Performance',
      description:
        'Indexação no Google, Schema Markup estruturado e otimização de velocidade para primeiras posições.',
      href: '/landing-page-profissional',
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Manutenção & Suporte Técnico',
      description:
        'Suporte contínuo, backups automatizados, atualizações de segurança e monitoramento 24h.',
    },
    {
      icon: ServerIcon,
      title: 'Hospedagem & Nuvem',
      description:
        'Servidores rápidos com CDN global, certificado SSL HTTPS grátis e e-mails corporativos.',
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Aplicativos Web & PWA',
      description:
        'Sistemas e PWAs instaláveis em smartphones com suporte a funcionamento offline e notificações.',
    },
  ];

  return (
    <section id="servicos" className="py-16 md:py-20 bg-[#09101d] relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Cabeçalho */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3.5 py-1.5 rounded-full border border-[#00c4cc]/30 bg-[#00c4cc]/10 text-[#00c4cc]">
            Soluções Digitais sob Medida
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Nossos <span className="text-[#00c4cc]">Serviços</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Desenvolvimento web de alta performance com SEO integrado para posicionar sua empresa em destaque no Google.
          </p>
        </div>

        {/* Grid de 8 Cards com Ícone Vetorial — 4 colunas no Desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isHighlighted = index < 3; // destacar os primeiros cards como na imagem

            return (
              <article
                key={index}
                className="group relative rounded-2xl p-6 bg-[#0f172a] border border-slate-800 hover:border-[#00c4cc]/60 shadow-lg hover:shadow-[0_8px_30px_rgba(0,196,204,0.15)] transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Ícone Vetorial Ciano Centralizado */}
                  <div className="w-14 h-14 rounded-2xl bg-[#00c4cc]/10 border border-[#00c4cc]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00c4cc]/20 transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-[#00c4cc]" />
                  </div>

                  {/* Título e Descrição */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00c4cc] transition-colors duration-200 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Botões de Ação estilo Ciano (Com Orçamento e Link SEO) */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={openChat}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isHighlighted
                        ? 'bg-[#00c4cc] hover:bg-[#00a8af] text-[#09101d] shadow-md shadow-[#00c4cc]/20'
                        : 'bg-transparent border border-[#00c4cc]/60 hover:bg-[#00c4cc] text-[#00c4cc] hover:text-[#09101d]'
                    }`}
                    aria-label={`Solicitar orçamento para ${service.title}`}
                  >
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    <span>Orçamento</span>
                  </button>

                  {service.href && (
                    <Link
                      href={service.href}
                      className="w-full py-1.5 px-3 rounded-lg bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white text-[11px] font-medium transition-all duration-200 flex items-center justify-center gap-1.5 text-center"
                      title={`Ver mais detalhes sobre ${service.title}`}
                    >
                      <span>Ver mais detalhes</span>
                      <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Schema.org Microdata JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Serviços de Desenvolvimento Web — WeBuildSites',
            itemListElement: services.map((s, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              item: {
                '@type': 'Service',
                name: s.title,
                description: s.description,
                provider: {
                  '@type': 'Organization',
                  name: 'WeBuildSites',
                  url: 'https://webuildsites.com.br',
                },
                ...(s.href ? { url: `https://webuildsites.com.br${s.href}` } : {}),
              },
            })),
          }),
        }}
      />
    </section>
  );
}