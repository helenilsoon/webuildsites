'use client';

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const diferenciais = [
  {
    titulo: "Entregamos sistemas, não só sites",
    desc: "Do e-commerce ao SaaS com autenticação e painel administrativo.",
  },
  {
    titulo: "PIX e pagamentos integrados",
    desc: "Seus clientes pagam na hora, direto pelo site ou app.",
  },
  {
    titulo: "Painel administrativo incluso",
    desc: "Você gerencia seu conteúdo sem depender de nós para cada atualização.",
  },
  {
    titulo: "Funciona no celular como app",
    desc: "PWA configurado — o cliente instala direto pelo navegador, sem app store.",
  },
  {
    titulo: "Atendimento direto por quem desenvolve",
    desc: "Sem intermediário. Fala direto com quem faz.",
  },
];

export default function About() {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-20 bg-[#0061aa]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Coluna de texto — entra da esquerda */}
          <div
            ref={textRef}
            className={`lg:w-1/2 anim-fade-left ${textVisible ? 'visible' : ''}`}
          >
            <h2 className="section-title text-left">
              Por que escolher a{" "}
              <span className="text-[#61ce70]">WeBuildSites</span>?
            </h2>
            <p className="text-white/90 mb-6">
              Desenvolvemos produtos digitais reais — com código que roda,
              integrações que funcionam e painel que você mesmo consegue usar.
            </p>
            <ul className="space-y-5">
              {diferenciais.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 anim-fade-up anim-delay-${index} ${textVisible ? 'visible' : ''}`}
                >
                  <div className="w-6 h-6 bg-[#61ce70]/20 text-[#61ce70] rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 bg-[#61ce70] rounded-full" />
                  </div>
                  <div>
                    <span className="text-white font-semibold block">{item.titulo}</span>
                    <span className="text-white/75 text-sm">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className={`mt-8 anim-fade-up anim-delay-5 ${textVisible ? 'visible' : ''}`}>
              <Link href="#contato" className="btn-primary btn-glow inline-flex items-center gap-2">
                Fale Conosco
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Coluna da imagem — entra da direita */}
          <div
            ref={imageRef}
            className={`lg:w-1/2 mt-12 lg:mt-0 anim-fade-right ${imageVisible ? 'visible' : ''}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="/images/about-solutions.png"
                alt="Soluções digitais personalizadas WeBuildSites"
                width={800}
                height={800}
                className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}