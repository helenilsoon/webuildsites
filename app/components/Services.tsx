'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface ServiceItem {
  image: string;
  title: string;
  description: string;
  href?: string;
  keywords: string;
}

export default function Services() {
    function openChat() {
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("open-floating-chat"));
        }
    }

    const services: ServiceItem[] = [
        {
            image: '/images/services/institucional.png',
            title: 'Sites Institucionais',
            description: 'Desenvolvimento de sites profissionais com alta velocidade, SEO local e foco em conversão de clientes.',
            href: '/criacao-de-sites-manaus',
            keywords: 'criação de sites institucionais manaus'
        },
        {
            image: '/images/services/ecommerce.png',
            title: 'Loja Virtual & E-commerce',
            description: 'Lojas virtuais completas com catálogo de produtos, cálculo de frete, PIX automático e checkout seguro.',
            href: '/loja-virtual-ecommerce',
            keywords: 'desenvolvimento de e-commerce loja virtual'
        },
        {
            image: '/images/services/responsive.png',
            title: 'Landing Pages de Alta Conversão',
            description: 'Páginas de vendas otimizadas para campanhas de anúncios no Google e Instagram com alta taxa de conversão.',
            href: '/landing-page-profissional',
            keywords: 'landing page profissional alta conversão'
        },
        {
            image: '/images/services/uxui.png',
            title: 'Sistemas para Restaurantes',
            description: 'Cardápio digital com pedidos online via QR Code e PIX direto no caixa sem taxas por pedido.',
            href: '/sistema-para-restaurantes',
            keywords: 'sistema cardápio digital restaurantes pix'
        },
        {
            image: '/images/services/hosting.png',
            title: 'Sistemas para Igrejas & Ministérios',
            description: 'Plataformas de gestão de células, discipulado, contribuições e eventos pastoral digital.',
            href: '/igrejas',
            keywords: 'sistema de gestão para igrejas pastoral'
        },
        {
            image: '/images/services/seo.png',
            title: 'Otimização SEO & Performance',
            description: 'Indexação no Google, Schema Markup estruturado e otimização de velocidade para primeiras posições.',
            keywords: 'otimização seo primeira pagina google'
        },
        {
            image: '/images/services/maintenance.png',
            title: 'Manutenção & Suporte Técnico',
            description: 'Suporte contínuo, backups automatizados, atualizações de segurança e monitoramento 24h.',
            keywords: 'manutenção de sites suporte técnico'
        },
        {
            image: '/images/services/social.png',
            title: 'Hospedagem & Nuvem de Alta Velocidade',
            description: 'Servidores rápidos com CDN global, certificado SSL HTTPS grátis e e-mails corporativos.',
            keywords: 'hospedagem de sites ssl gratis'
        },
        {
            image: '/images/services/app.png',
            title: 'Aplicativos Web & PWA',
            description: 'Sistemas e PWAs instaláveis em smartphones com suporte a funcionamento offline e notificações.',
            keywords: 'desenvolvimento pwa aplicativo web'
        }
    ];

    return (
        <section id="servicos" className="py-12 md:py-16 bg-[#1d2b48] relative">
            <div className="container mx-auto px-6 lg:px-8">
                {/* Cabeçalho SEO */}
                <div className="text-center mb-8 md:mb-10">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase mb-2 px-3 py-1 rounded-full border border-[#36c2ac]/30 bg-[#36c2ac]/10 text-[#36c2ac]">
                      Soluções Digitais sob Medida
                    </span>
                    <h2 className="section-title !mb-2">
                        Nossos <span className="text-[#61ce70]">Serviços</span>
                    </h2>
                    <p className="section-subtitle !mb-0 max-w-2xl text-sm md:text-base leading-relaxed">
                        Desenvolvimento web de alta performance com SEO integrado para posicionar sua empresa em destaque no Google.
                    </p>
                </div>

                {/* Grid de Cards Otimizados */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, index) => (
                        <article 
                            key={index} 
                            className="card !p-0 overflow-hidden group hover:border-[#36c2ac]/50 transition-all duration-300 flex flex-col h-full rounded-xl border border-white/10 bg-[#0061aa]/30"
                        >
                            {/* Imagem com alt semântico */}
                            <div className="relative w-full h-36 bg-gradient-to-br from-[#1d2b48] to-[#0061aa]/40 overflow-hidden border-b border-white/10">
                                <Image 
                                    src={service.image} 
                                    alt={`Serviço de ${service.title} — WeBuildSites`} 
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0061aa] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                            </div>

                            {/* Conteúdo textual com palavra-chave */}
                            <div className="p-4 flex flex-col flex-grow justify-between">
                                <div>
                                    <h3 className="text-base font-semibold mb-2 text-white group-hover:text-[#61ce70] transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-white/80 leading-snug text-xs mb-4">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Ações: Link interno de SEO ou Chatbot */}
                                <div className="flex gap-2 items-center">
                                    {service.href ? (
                                        <Link
                                            href={service.href}
                                            className="flex-1 py-2 px-2.5 rounded-lg bg-white/10 hover:bg-[#36c2ac] hover:text-[#1d2b48] border border-white/15 text-white text-[11px] font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer text-center"
                                            title={`Saiba mais sobre ${service.title}`}
                                        >
                                            <span>Saiba Mais</span>
                                            <ArrowRightIcon className="w-3 h-3" />
                                        </Link>
                                    ) : null}

                                    <button
                                        type="button"
                                        onClick={openChat}
                                        className="flex-1 py-2 px-2.5 rounded-lg bg-[#36c2ac]/15 hover:bg-[#36c2ac] hover:text-[#1d2b48] border border-[#36c2ac]/40 text-[#36c2ac] hover:text-slate-900 text-[11px] font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
                                        aria-label={`Solicitar orçamento para ${service.title}`}
                                    >
                                        <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
                                        <span>Orçamento</span>
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Schema.org Microdata JSON-LD para SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        name: 'Serviços de Desenvolvimento Web e Software — WeBuildSites',
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
                                    url: 'https://webuildsites.com.br'
                                },
                                ...(s.href ? { url: `https://webuildsites.com.br${s.href}` } : {})
                            }
                        }))
                    })
                }}
            />
        </section>
    );
}