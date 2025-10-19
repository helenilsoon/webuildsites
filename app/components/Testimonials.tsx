import { StarIcon } from "@heroicons/react/24/outline";

export default function Testimonials() {

    const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'CEO, TechStart',
    text: 'A WebuildSites transformou nossa presença digital. O site ficou incrível e as vendas aumentaram 200% no primeiro mês!'
  },
  {
    name: 'Maria Santos',
    role: 'Diretora de Marketing, Fashion Co',
    text: 'Profissionais extremamente competentes e atenciosos. Entregaram o projeto antes do prazo e superaram nossas expectativas.'
  },
  {
    name: 'João Oliveira',
    role: 'Fundador, Delivery Express',
    text: 'Excelente trabalho! O sistema desenvolvido é robusto, rápido e muito fácil de usar. Recomendo fortemente!'
  },
  {
    name: 'Ana Costa',
    role: 'Gerente, Consultoria Plus',
    text: 'Parceria excepcional! A equipe entendeu perfeitamente nossas necessidades e entregou um site moderno e funcional.'
  },
  {
    name: 'Pedro Almeida',
    role: 'Diretor, Marketplace Brasil',
    text: 'Profissionalismo e qualidade em cada detalhe. O suporte pós-entrega também é excelente. Muito satisfeito!'
  },
  {
    name: 'Juliana Ferreira',
    role: 'CEO, Beauty Shop',
    text: 'Nosso e-commerce ficou perfeito! Design moderno, rápido e com todas as funcionalidades que precisávamos.'
  },
];
    return(
        <section id="depoimentos" className="py-20 bg-[#0061aa]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">O que nossos <span className="text-[#61ce70]">clientes</span> dizem</h2>
            <p className="section-subtitle">Veja os depoimentos de quem confia no nosso trabalho.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/90 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#61ce70]/20 rounded-full flex items-center justify-center text-[#61ce70] font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/70">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
    }