'use client';

import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const portfolio = [
  {
    title: "MyRifa",
    description: "Plataforma completa para gestão e venda de rifas online, com sistema de pagamentos integrado e painel administrativo intuitivo em tempo real.",
    tags: ["React", "Node.js", "Stripe"],
    link: "https://myrifa.com.br/",
    image: "/images/portfolio/myrifa.png",
  },
  {
    title: "Lena Mimos",
    description: "E-commerce de presentes personalizados focada na experiência do usuário, com fluxo de checkout otimizado e design elegante.",
    tags: ["Next.js", "Tailwind", "Shopify API"],
    link: "https://lenamimos.com.br",
    image: "/images/portfolio/lenamimos.png",
  },
  {
    title: "Sistema de Reservas",
    description: "Sistema corporativo para agendamento de espaços e recursos, com visão de calendário, gestão de conflitos e relatórios analíticos de uso.",
    tags: ["Vue.js", "PostgreSQL", "Docker"],
    link: "https://reserva-feijoada.vercel.app",
    image: "/images/portfolio/reserva-feijoada.png",
  },
  {
    title: "Geração Joy",
    description: "Plataforma interativa para comunidade jovem, com recursos de gamificação, feed de notícias e áreas de interação social em tempo real.",
    tags: ["React Native", "Firebase", "WebSockets"],
    link: "https://geracaojoy.vercel.app",
    image: "/images/portfolio/geracaojoy.png",
  },
  {
    title: "Trilha do Discípulo",
    description: "Aplicativo educacional (LMS) focado em cursos e trilhas de aprendizado, com acompanhamento de progresso e entrega de conteúdo multimídia.",
    tags: ["Flutter", "AWS S3", "GraphQL"],
    link: "https://trilha-do-discipulo.vercel.app",
    image: "/images/portfolio/trilha-do-discipulo.png",
  },
  {
    title: "Growth.io",
    description: "Dashboard analítico B2B para acompanhamento de métricas de marketing e vendas, integrando múltiplas fontes de dados em painéis customizáveis.",
    tags: ["SvelteKit", "D3.js", "Go"],
    link: "https://curva-crescimento.vercel.app",
    image: "/images/portfolio/curva-crescimento.png",
  },
  {
    title: "Pequenos Discípulos",
    description: "Aplicativo web infantil com conteúdo bíblico adaptado para crianças, painel administrativo para gestão de conteúdo e PWA configurado para celular.",
    tags: ["React", "Next.js", "PWA"],
    link: "https://biblia-infantil.vercel.app",
    image: "/images/portfolio/biblia-infantil.png",
  },
];

export default function Portifolio() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section id="portfolio" className="py-24 bg-[#0b1326] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(54,194,172,0.12) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">

        {/* Cabeçalho */}
        <div ref={headerRef} className={`text-center mb-16 anim-fade-up ${headerVisible ? 'visible' : ''}`}>
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full border border-[#36c2ac]/30 bg-[#36c2ac]/10 text-[#36c2ac]">
            Cases Reais
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
            Nosso <span className="text-[#36c2ac]">Portfólio</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
            Projetos reais, entregues e em produção. Clique nos cards para visualizar a demonstração ao vivo.
          </p>
        </div>

        {/* Grid de cards */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((project, index) => {
            const delayClass = `anim-delay-${Math.min(index % 3, 7)}`;
            return (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver projeto ${project.title}`}
                className={`group relative flex flex-col rounded-2xl p-5 border border-slate-700/50 bg-[#162137] hover:bg-[#1a2742] hover:border-[#36c2ac]/60 shadow-lg hover:shadow-[0_12px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(54,194,172,0.15)] hover:-translate-y-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#36c2ac] anim-fade-up ${delayClass} ${gridVisible ? 'visible' : ''}`}
              >
                <div className="relative h-48 w-full overflow-hidden rounded-xl bg-[#0f172a] mb-5 border border-white/5 shadow-inner">
                  <Image
                    src={project.image}
                    alt={`Preview do projeto ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#162137]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                </div>

                <div className="flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#36c2ac] transition-colors duration-200">
                        {project.title}
                      </h3>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-400 group-hover:text-[#36c2ac] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold px-3 py-1 rounded-full border border-[#36c2ac]/30 bg-[#36c2ac]/10 text-[#36c2ac]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}