import { ArrowRightIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function About() {
    return(
         <section className="py-20 bg-[#0061aa]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="section-title text-left">Por que escolher a <span className="text-[#61ce70]">WebuildSites</span>?</h2>
              <p className="text-white/90 mb-6">
                Somos especialistas em criar experiências digitais excepcionais que geram resultados reais para o seu negócio.
              </p>
              <ul className="space-y-4">
                {[
                  'Design moderno e responsivo',
                  'Otimização para mecanismos de busca (SEO)',
                  'Tecnologias de ponta',
                  'Suporte contínuo',
                  'Entrega dentro do prazo',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#61ce70]/20 text-[#61ce70] rounded-full flex-shrink-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#61ce70] rounded-full"></div>
                    </div>
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="#contato" className="btn-primary inline-flex items-center gap-2">
                  Fale Conosco
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-[#36c2ac] to-[#0061aa] w-full h-80 md:h-96 rounded-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <CodeBracketIcon className="w-12 h-12 text-[#61ce70] mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white">Soluções Digitais Personalizadas</h3>
                      <p className="text-white/90 mt-2">Tecnologia e inovação para o seu negócio</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}