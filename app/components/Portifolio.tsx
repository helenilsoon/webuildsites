import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const portfolio = [
  {
    title: "MyRifa — Plataforma de Arrecadação Digital",
    description:
      "SaaS completo para criação e gestão de campanhas de arrecadação com PIX automático. Suporta sorteios, vaquinhas, ações solidárias e causas comunitárias. Inclui dashboard em tempo real, blog e conformidade com LGPD.",
    tags: ["SaaS", "PIX Integrado", "Dashboard", "Next.js", "Blog"],
    link: "https://myrifa.vercel.app",
    image: "/images/portfolio/myrifa.png",
  },
  {
    title: "Lena Mimos — E-commerce de Presentes Personalizados",
    description:
      "Loja virtual completa com catálogo de 31 produtos, páginas individuais por produto, categorias, fluxo de pedido via WhatsApp e CDN próprio para imagens. Projeto real em operação em Manaus, AM.",
    tags: ["E-commerce", "Next.js", "WhatsApp", "CDN", "SEO"],
    link: "https://lenamimos.com.br",
    image: "/images/portfolio/lenamimos.png",
  },
  {
    title: "Sistema de Reservas com PIX — Feijoada Solidária",
    description:
      "Sistema de pedidos online com geração de QR Code para PIX, opção de pagamento na retirada, cardápio dinâmico e painel administrativo para gestão de reservas. Solução replicável para restaurantes e eventos.",
    tags: ["Sistema de Pedidos", "PIX", "Painel Admin", "Next.js", "PWA"],
    link: "https://reserva-feijoada.vercel.app",
    image: "/images/portfolio/reserva-feijoada.png",
  },
  {
    title: "Geração Joy — Sistema de Gestão Pastoral",
    description:
      "Plataforma de supervisão de células com módulos de agenda, metas, discipulado, visitas e oração. Sistema com autenticação, painel administrativo e PWA para acompanhamento pastoral digital.",
    tags: ["Sistema de Gestão", "Autenticação", "PWA", "Next.js", "Igrejas"],
    link: "https://geracaojoy.vercel.app",
    image: "/images/portfolio/geracaojoy.png",
  },
  {
    title: "Trilha do Discípulo — Plataforma de Discipulado",
    description:
      "Plataforma educacional com 5 módulos progressivos de formação cristã. Inclui sistema de login, cadastro, landing page editorial com manifesto, método em 4 etapas e identidade visual própria.",
    tags: ["Plataforma Educacional", "Autenticação", "PWA", "Next.js", "Igrejas"],
    link: "https://trilha-do-discipulo.vercel.app",
    image: "/images/portfolio/trilha-do-discipulo.png",
  },
  {
    title: "Growth.io — Plataforma de Acompanhamento Infantil",
    description:
      "SaaS conceitual para acompanhamento de curva de crescimento infantil com posicionamento premium. Inclui autenticação, dashboard com métricas e design de alto padrão.",
    tags: ["SaaS", "Design Premium", "Autenticação", "Next.js", "Saúde"],
    link: "https://curva-crescimento.vercel.app",
    image: "/images/portfolio/curva-crescimento.png",
  },
  {
    title: "Pequenos Discípulos — Bíblia Infantil",
    description:
      "Aplicativo web infantil com conteúdo bíblico adaptado para crianças, painel administrativo para gestão de conteúdo e PWA configurado para instalação no celular.",
    tags: ["App Educacional", "Painel Admin", "PWA", "Next.js", "Infantil"],
    link: "https://biblia-infantil.vercel.app",
    image: "/images/portfolio/biblia-infantil.png",
  },
];

export default function Portifolio() {
  return (
    <section id="portfolio" className="py-20 bg-[#1d2b48]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Nosso <span className="text-[#61ce70]">Portfólio</span>
          </h2>
          <p className="section-subtitle">
            Projetos reais, entregues e no ar. Clique em cada card para ver a demonstração.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-[#0061aa] border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Preview da Imagem */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-white/10">
                <Image
                  src={project.image}
                  alt={`Screenshot do projeto ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0061aa] via-transparent to-transparent opacity-80" />
              </div>

              {/* Corpo */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-white/85 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#61ce70]/20 text-[#61ce70] px-2 py-0.5 rounded font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Botão */}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}