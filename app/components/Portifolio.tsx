import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const portfolio = [
  {
    title: "MyRifa — Plataforma de Arrecadação Digital",
    description:
      "SaaS completo para criação e gestão de campanhas de arrecadação com PIX automático. Suporta sorteios, vaquinhas, ações solidárias e causas comunitárias. Inclui dashboard em tempo real, blog e conformidade com LGPD.",
    tags: ["SaaS", "PIX Integrado", "Dashboard", "Next.js", "Blog"],
    link: "https://myrifa.vercel.app",
    gradient: "from-[#0061aa] to-[#36c2ac]",
  },
  {
    title: "Lena Mimos — E-commerce de Presentes Personalizados",
    description:
      "Loja virtual completa com catálogo de 31 produtos, páginas individuais por produto, categorias, fluxo de pedido via WhatsApp e CDN próprio para imagens. Projeto real em operação em Manaus, AM.",
    tags: ["E-commerce", "Next.js", "WhatsApp", "CDN", "SEO"],
    link: "https://lenamimos.com.br",
    gradient: "from-[#36c2ac] to-[#1d2b48]",
  },
  {
    title: "Sistema de Reservas com PIX — Feijoada Solidária",
    description:
      "Sistema de pedidos online com geração de QR Code para PIX, opção de pagamento na retirada, cardápio dinâmico e painel administrativo para gestão de reservas. Solução replicável para restaurantes e eventos.",
    tags: ["Sistema de Pedidos", "PIX", "Painel Admin", "Next.js", "PWA"],
    link: "https://reserva-feijoada.vercel.app",
    gradient: "from-[#1d2b48] to-[#0061aa]",
  },
  {
    title: "Geração Joy — Sistema de Gestão Pastoral",
    description:
      "Plataforma de supervisão de células com módulos de agenda, metas, discipulado, visitas e oração. Sistema com autenticação, painel administrativo e PWA para acompanhamento pastoral digital.",
    tags: ["Sistema de Gestão", "Autenticação", "PWA", "Next.js", "Igrejas"],
    link: "https://geracaojoy.vercel.app",
    gradient: "from-[#0061aa] to-[#1d2b48]",
  },
  {
    title: "Trilha do Discípulo — Plataforma de Discipulado",
    description:
      "Plataforma educacional com 5 módulos progressivos de formação cristã. Inclui sistema de login, cadastro, landing page editorial com manifesto, método em 4 etapas e identidade visual própria.",
    tags: ["Plataforma Educacional", "Autenticação", "PWA", "Next.js", "Igrejas"],
    link: "https://trilha-do-discipulo.vercel.app",
    gradient: "from-[#36c2ac] to-[#0061aa]",
  },
  {
    title: "Growth.io — Plataforma de Acompanhamento Infantil",
    description:
      "SaaS conceitual para acompanhamento de curva de crescimento infantil com posicionamento premium. Inclui autenticação, dashboard com métricas e design de alto padrão.",
    tags: ["SaaS", "Design Premium", "Autenticação", "Next.js", "Saúde"],
    link: "https://curva-crescimento.vercel.app",
    gradient: "from-[#1d2b48] to-[#36c2ac]",
  },
  {
    title: "Pequenos Discípulos — Bíblia Infantil",
    description:
      "Aplicativo web infantil com conteúdo bíblico adaptado para crianças, painel administrativo para gestão de conteúdo e PWA configurado para instalação no celular.",
    tags: ["App Educacional", "Painel Admin", "PWA", "Next.js", "Infantil"],
    link: "https://biblia-infantil.vercel.app",
    gradient: "from-[#0061aa] to-[#36c2ac]",
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
            Projetos reais, entregues e no ar. Clique em cada card para ver.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col"
            >
              {/* Topo com gradiente */}
              <div
                className={`bg-gradient-to-br ${project.gradient} h-40 flex items-center justify-center px-6`}
              >
                <h3 className="text-base font-semibold text-white text-center leading-snug">
                  {project.title}
                </h3>
              </div>

              {/* Corpo */}
              <div className="p-6 bg-[#0061aa] flex flex-col flex-1">
                <p className="text-white/85 text-sm mb-4 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#61ce70]/20 text-[#61ce70] px-2 py-1 rounded"
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
          ))}
        </div>
      </div>
    </section>
  );
}