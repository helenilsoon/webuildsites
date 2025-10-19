import { CodeBracketIcon, CursorArrowRippleIcon, DevicePhoneMobileIcon, RocketLaunchIcon, ServerIcon } from "@heroicons/react/24/outline";

export default function Portifolio() {

  const mapIcon = {
    "Next.js": "la-node",
    "React": "react",
    "Node.js": "node",
    "MongoDB": "database",
    "WordPress": "wordpress",
    "PostgreSQL": "database",
  }
    const portfolio = [
  {
    icon: CodeBracketIcon,
    title: 'E-commerce Fashion',
    description: 'Plataforma completa de vendas online com integração de pagamento e gestão de estoque.',
    tags: [ 'Next.js', 'Stripe', 'Tailwind'],
    
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'App Delivery',
    description: 'Sistema de pedidos online para restaurantes com painel administrativo completo.',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    icon: RocketLaunchIcon,
    title: 'Landing Page SaaS',
    description: 'Página de conversão otimizada para software de gestão empresarial.',
    tags: ['Next.js', 'SEO', 'Analytics']
  },
  {
    icon: ServerIcon,
    title: 'Portal Corporativo',
    description: 'Intranet corporativa com sistema de gestão de documentos e comunicação interna.',
    tags: ['React', 'API', 'Dashboard']
  },
  {
    icon: CodeBracketIcon,
    title: 'Site Institucional',
    description: 'Website moderno para empresa de consultoria com blog integrado.',
    tags: ['WordPress', 'SEO', 'Blog']
  },
  {
    icon: CursorArrowRippleIcon,
    title: 'Marketplace',
    description: 'Plataforma de marketplace conectando vendedores e compradores.',
    tags: ['React', 'Node.js', 'PostgreSQL']
  },
];
    return(
    <section id="portfolio" className="py-20 bg-[#1d2b48]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Nosso <span className="text-[#61ce70]">Portfólio</span></h2>
            <p className="section-subtitle">Conheça alguns dos projetos que desenvolvemos com excelência e dedicação.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:scale-105  transition-all duration-300">
                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-[#36c2ac] to-[#0061aa] h-64">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <project.icon className="w-12 h-12 text-[#61ce70] group-hover:text-[#ffffff] mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-[#0061aa]">
                  <p className="text-white/90 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-[#61ce70]/20 text-[#61ce70] px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    )
}