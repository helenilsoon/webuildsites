import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const portfolio = [
  {
    title: "MyRifa — Plataforma de Arrecadação Digital",
    description:
      "SaaS completo para criação e gestão de campanhas de arrecadação com PIX automático. Suporta sorteios, vaquinhas, ações solidárias e causas comunitárias. Inclui dashboard em tempo real, blog e conformidade com LGPD.",
    tags: ["SaaS", "PIX Integrado", "Dashboard", "Next.js", "Blog"],
    link: "https://myrifa.com.br/",
    image: "/images/portfolio/myrifa.png",
  },
  {
    title: "Lena Mimos — E-commerce de Presentes Personalizados",
    description:
      "Loja virtual completa com catálogo de produtos, páginas individuais por produto, categorias, fluxo de pedido via WhatsApp e CDN próprio para imagens. Projeto real em operação em Manaus, AM.",
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
    <section id="portfolio" className="py-24 bg-[#1d2b48] relative overflow-hidden">
      {/* Luz de fundo decorativa */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(54,194,172,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#36c2ac" }}
          >
            Cases Reais
          </span>
          <h2 className="section-title">
            Nosso{" "}
            <span style={{ color: "#36c2ac" }}>Portfólio</span>
          </h2>
          <p className="section-subtitle">
            Projetos reais, entregues e no ar. Clique em cada card para ver a demonstração ao vivo.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {portfolio.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver projeto ${project.title}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2"
              style={{
                background: "#0061aa",
                transition: "transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease",
              }}
            >
              {/* Borda superior teal */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] z-10"
                style={{ background: "linear-gradient(90deg, #36c2ac, #0061aa)" }}
              />

              {/* Badge numerado */}
              <div
                className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #36c2ac, #0061aa)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Imagem */}
              <div className="relative h-52 w-full overflow-hidden bg-[#1d2b48] shrink-0">
                <Image
                  src={project.image}
                  alt={`Screenshot do projeto ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradiente sobre a imagem */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to bottom, transparent 40%, #0061aa 100%)",
                  }}
                />
                {/* Overlay teal no hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300"
                  style={{ background: "#36c2ac" }}
                />
              </div>

              {/* Corpo */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border"
                      style={{
                        color: "#36c2ac",
                        borderColor: "rgba(54,194,172,0.35)",
                        background: "rgba(54,194,172,0.12)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="flex items-center justify-between pt-3 border-t border-white/10 text-sm font-semibold"
                  style={{ color: "#36c2ac" }}
                >
                  <span className="group-hover:underline underline-offset-2">Ver Projeto</span>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </div>

              {/* Gradiente de hover no card inteiro */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(200deg, rgba(54,194,172,0.08) 0%, transparent 60%)",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}