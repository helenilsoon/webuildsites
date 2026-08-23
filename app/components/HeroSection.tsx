'use client';

import { ArrowRightIcon, CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function HeroSection() {
  function openChat() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-floating-chat"));
    }
  }

  const { ref: badgeRef, isVisible: badgeVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="relative bg-[#1d2b48] py-20 lg:py-28 overflow-hidden mt-16 border-b border-white/10">
      {/* Blob animado de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blob pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,97,170,0.35) 0%, rgba(54,194,172,0.2) 60%, transparent 100%)' }} />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#61ce70]/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Partículas decorativas */}
      <div className="particle absolute top-[15%] left-[10%] w-2 h-2 rounded-full bg-[#36c2ac]/50 pointer-events-none" style={{ '--duration': '6s', '--delay': '0s' } as React.CSSProperties} />
      <div className="particle absolute top-[60%] left-[5%] w-1.5 h-1.5 rounded-full bg-[#61ce70]/40 pointer-events-none" style={{ '--duration': '7s', '--delay': '1s' } as React.CSSProperties} />
      <div className="particle absolute top-[30%] right-[8%] w-2 h-2 rounded-full bg-[#36c2ac]/30 pointer-events-none" style={{ '--duration': '5s', '--delay': '2s' } as React.CSSProperties} />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Coluna de Texto */}
          <div className="lg:col-span-7 text-center lg:text-left">

            {/* Badge — Fade down */}
            <div
              ref={badgeRef}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#36c2ac]/30 text-[#36c2ac] text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm backdrop-blur-md anim-fade-up ${badgeVisible ? 'visible' : ''}`}
            >
              <SparklesIcon className="w-4 h-4 text-[#61ce70] animate-pulse" />
              <span>Estúdio Digital • Sites, E-commerce & Sistemas com IA</span>
            </div>

            {/* Título — Fade up com shimmer text */}
            <div ref={headingRef}>
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 anim-fade-up anim-delay-1 ${headingVisible ? 'visible' : ''}`}>
                Transformamos marcas em{" "}
                <span className="text-shimmer">
                  experiências digitais
                </span>{" "}
                que vendem
              </h1>

              <p className={`text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal anim-fade-up anim-delay-2 ${headingVisible ? 'visible' : ''}`}>
                Criamos sites de alta performance, landing pages persuasivas e sistemas web sob medida com <strong className="text-white font-semibold">Chatbot de IA integrado</strong> para responder seus clientes na hora.
              </p>

              {/* Benefícios */}
              <div className={`grid sm:grid-cols-2 gap-3 mb-9 text-left max-w-lg mx-auto lg:mx-0 anim-fade-up anim-delay-3 ${headingVisible ? 'visible' : ''}`}>
                {[
                  'Carregamento Ultra Rápido (100% SEO)',
                  'Atendimento Automático com IA 24/7',
                  'Design 100% Responsivo no Celular',
                  'Sem Mensalidades Ocultas',
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircleIcon className="w-5 h-5 text-[#61ce70] flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Botões */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start anim-fade-up anim-delay-4 ${headingVisible ? 'visible' : ''}`}>
                <button
                  type="button"
                  onClick={openChat}
                  className="btn-primary btn-glow inline-flex items-center justify-center gap-2 text-base px-6 py-3.5 rounded-xl cursor-pointer"
                >
                  Solicitar Orçamento Grátis
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
                <Link
                  href="/#servicos"
                  className="btn-outline inline-flex items-center justify-center gap-2 text-base px-6 py-3.5 rounded-xl"
                >
                  Ver Nossos Serviços
                </Link>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Imagem com badges flutuantes */}
          <div ref={imageRef} className={`lg:col-span-5 relative flex justify-center anim-fade-right ${imageVisible ? 'visible' : ''}`}>

            <div className="relative w-full max-w-lg aspect-square rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 backdrop-blur-xl p-4 shadow-2xl shadow-[#1d2b48]/80 group">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#1d2b48]">
                <Image
                  src="/images/about-solutions.png"
                  alt="WeBuildSites Soluções Digitais e Tecnologia 3D"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d2b48]/80 via-transparent to-transparent" />
              </div>

              {/* Badge Flutuante 1 */}
              <div className="badge-float absolute -top-4 -left-4 bg-[#1d2b48]/90 border border-[#36c2ac]/40 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <div>
                  <p className="text-xs font-bold text-white">High Speed</p>
                  <p className="text-[10px] text-[#36c2ac]">100% Otimizado SEO</p>
                </div>
              </div>

              {/* Badge Flutuante 2 */}
              <button
                type="button"
                onClick={openChat}
                className="badge-float-right absolute top-1/2 -right-6 bg-[#1d2b48]/90 border border-[#61ce70]/40 backdrop-blur-md text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 cursor-pointer hover:border-[#61ce70] transition-colors text-left"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#61ce70] animate-ping" />
                <div>
                  <p className="text-xs font-bold text-white">Chatbot IA Integrado</p>
                  <p className="text-[10px] text-[#61ce70]">Clique para testar 24h</p>
                </div>
              </button>

              {/* Badge Flutuante 3 */}
              <div className="badge-float absolute -bottom-4 left-6 bg-[#1d2b48]/90 border border-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2" style={{ animationDelay: '1.5s' }}>
                <span className="text-lg">🚀</span>
                <div>
                  <p className="text-xs font-bold text-white">Estúdio em Manaus, AM</p>
                  <p className="text-[10px] text-white/70">Atende todo o Brasil</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}