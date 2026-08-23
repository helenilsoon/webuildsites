import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppCTA from '../components/WhatsAppCTA';

export const metadata: Metadata = {
  title: 'Portfólio de Projetos | WeBuildSites — Casos de Sucesso Digitais',
  description:
    'Explore nosso portfólio completo de sites, e-commerces, sistemas web, PWAs e plataformas SaaS desenvolvidos pela WeBuildSites.',
  alternates: {
    canonical: 'https://webuildsites.com.br/portfolio',
  },
  openGraph: {
    title: 'Portfólio de Projetos — WeBuildSites',
    description:
      'Soluções digitais de alta performance entregues para empresas e clientes em todo o Brasil.',
    url: 'https://webuildsites.com.br/portfolio',
    siteName: 'WeBuildSites',
    locale: 'pt_BR',
    type: 'website',
  },
};

const portfolioProjects = [
  {
    title: "MyRifa",
    subtitle: "Plataforma de Arrecadação Digital & Rifas Online",
    description:
      "Plataforma completa para gestão e venda de rifas online, com sistema de pagamentos PIX integrado, geração automática de bilhetes e painel administrativo intuitivo em tempo real.",
    tags: ["React", "Node.js", "Stripe", "PIX Integrado", "SaaS"],
    link: "https://myrifa.com.br/",
    image: "/images/portfolio/myrifa.png",
  },
  {
    title: "Lena Mimos",
    subtitle: "E-commerce de Presentes Personalizados",
    description:
      "E-commerce de presentes personalizados focada na experiência do usuário, com fluxo de checkout otimizado, integração com WhatsApp e design moderno e elegante.",
    tags: ["Next.js", "Tailwind", "Shopify API", "WhatsApp", "E-commerce"],
    link: "https://lenamimos.com.br",
    image: "/images/portfolio/lenamimos.png",
  },
  {
    title: "Sistema de Reservas",
    subtitle: "Sistema Corporativo de Agendamentos & Eventos",
    description:
      "Sistema corporativo para agendamento de espaços e recursos, com visão de calendário, gestão de conflitos de horários e relatórios analíticos de uso em tempo real.",
    tags: ["Vue.js", "PostgreSQL", "Docker", "Painel Admin"],
    link: "https://reserva-feijoada.vercel.app",
    image: "/images/portfolio/reserva-feijoada.png",
  },
  {
    title: "Geração Joy",
    subtitle: "Plataforma Interativa para Comunidade Jovem",
    description:
      "Plataforma interativa para comunidade jovem, com recursos de gamificação, feed de notícias, supervisão pastoral e áreas de interação social em tempo real.",
    tags: ["React Native", "Firebase", "WebSockets", "PWA"],
    link: "https://geracaojoy.vercel.app",
    image: "/images/portfolio/geracaojoy.png",
  },
  {
    title: "Trilha do Discípulo",
    subtitle: "Plataforma Educacional & LMS",
    description:
      "Aplicativo educacional (LMS) focado em cursos e trilhas de aprendizado, com acompanhamento de progresso dos alunos e entrega otimizada de conteúdo multimídia.",
    tags: ["Flutter", "AWS S3", "GraphQL", "LMS", "Educação"],
    link: "https://trilha-do-discipulo.vercel.app",
    image: "/images/portfolio/trilha-do-discipulo.png",
  },
  {
    title: "Growth.io",
    subtitle: "Dashboard Analítico B2B & Métricas",
    description:
      "Dashboard analítico B2B para acompanhamento de métricas de marketing e vendas, integrando múltiplas fontes de dados em painéis e gráficos customizáveis.",
    tags: ["SvelteKit", "D3.js", "Go", "B2B Analytics"],
    link: "https://curva-crescimento.vercel.app",
    image: "/images/portfolio/curva-crescimento.png",
  },
  {
    title: "Pequenos Discípulos",
    subtitle: "Aplicativo Web Infantil & PWA",
    description:
      "Aplicativo web infantil com conteúdo bíblico adaptado para crianças, painel administrativo para gestão de histórias e PWA pré-configurado para instalação no celular.",
    tags: ["React", "Next.js", "PWA", "Painel Admin"],
    link: "https://biblia-infantil.vercel.app",
    image: "/images/portfolio/biblia-infantil.png",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-[#0b1326] relative overflow-hidden text-white">
        {/* Fundo radiante decorativo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle 800px at 50% 0%, rgba(54,194,172,0.12) 0%, transparent 80%)",
          }}
        />

        {/* Hero do Portfólio */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-6 lg:px-8 max-w-5xl text-center">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3.5 py-1.5 rounded-full border border-[#36c2ac]/30 bg-[#36c2ac]/10 text-[#36c2ac]">
              Casos Reais & Projetos Entregues
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Nosso <span className="text-[#36c2ac]">Portfólio</span>
            </h1>
            <p className="text-slate-300 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
              Explore nossos projetos recentes. Construímos soluções digitais de alta performance, unindo design moderno, tecnologia avançada e foco em resultados para nossos clientes.
            </p>
          </div>
        </section>

        {/* Lista de Projetos em Linhas Alternadas (Modelo em Z do Layout) */}
        <section className="pb-24 relative z-10">
          <div className="container mx-auto px-6 lg:px-8 max-w-6xl space-y-12 md:space-y-16">
            {portfolioProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="group relative rounded-3xl p-6 lg:p-8 bg-[#162137] border border-slate-700/50 hover:border-[#36c2ac]/60 shadow-xl hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_0_25px_rgba(54,194,172,0.15)] transition-all duration-300 overflow-hidden"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    {/* Imagem do Projeto (Alterna lado no desktop) */}
                    <div
                      className={`lg:col-span-7 relative h-64 sm:h-80 lg:h-[360px] w-full rounded-2xl overflow-hidden bg-[#0f172a] border border-white/10 ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <Image
                        src={project.image}
                        alt={`Preview do projeto ${project.title}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#162137]/70 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
                    </div>

                    {/* Detalhes do Projeto */}
                    <div
                      className={`lg:col-span-5 flex flex-col justify-center ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 group-hover:text-[#36c2ac] transition-colors duration-200">
                        {project.title}
                      </h2>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#36c2ac] mb-4">
                        {project.subtitle}
                      </p>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-xs font-semibold px-3 py-1 rounded-full border border-[#36c2ac]/30 bg-[#36c2ac]/10 text-[#36c2ac]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Botão Acessar Projeto */}
                      <div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary inline-flex items-center gap-2 text-sm font-bold py-3 px-6 rounded-xl cursor-pointer"
                          aria-label={`Acessar projeto ${project.title} ao vivo`}
                        >
                          <span>Ver Projeto Ao Vivo</span>
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action Final da Página de Portfólio */}
        <section className="py-20 bg-gradient-to-r from-[#0061aa] to-[#162137] relative z-10 border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-8 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Gostou dos nossos <span className="text-[#36c2ac]">projetos?</span>
            </h2>
            <p className="text-base md:text-xl text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
              Criamos o seu site, e-commerce ou sistema personalizado com a mesma qualidade e alta performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppCTA
                message="Olá! Vi o portfólio da WeBuildSites e quero solicitar um orçamento."
                className="btn-primary inline-flex items-center justify-center gap-2 text-base py-4 px-8 cursor-pointer"
                ariaLabel="Solicitar orçamento pelo WhatsApp"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                Solicitar Orçamento no WhatsApp
              </WhatsAppCTA>
              <Link
                href="/#contato"
                className="btn-outline inline-flex items-center justify-center gap-2 text-base py-4 px-8"
              >
                Falar com Consultor
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
