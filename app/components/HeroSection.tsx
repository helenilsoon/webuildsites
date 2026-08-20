'use client';

import { ArrowRightIcon, CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  function openChat() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-floating-chat"));
    }
  }

  return (
    <section className="relative bg-[#1d2b48] py-20 lg:py-28 overflow-hidden mt-16 border-b border-white/10">
      {/* Luzes ambiente de fundo com efeito Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#0061aa]/40 to-[#36c2ac]/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#61ce70]/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Coluna de Texto e Chamadas de Conversão */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#36c2ac]/30 text-[#36c2ac] text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm backdrop-blur-md">
              <SparklesIcon className="w-4 h-4 text-[#61ce70] animate-pulse" />
              <span>Estúdio Digital • Sites, E-commerce & Sistemas com IA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Transformamos marcas em{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#36c2ac] via-[#61ce70] to-[#0061aa]">
                experiências digitais
              </span>{" "}
              que vendem
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Criamos sites de alta performance, landing pages persuasivas e sistemas web sob medida com <strong className="text-white font-semibold">Chatbot de IA integrado</strong> para responder seus clientes na hora.
            </p>

            {/* Bullet points de benefícios rápida leitura */}
            <div className="grid sm:grid-cols-2 gap-3 mb-9 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <CheckCircleIcon className="w-5 h-5 text-[#61ce70] flex-shrink-0" />
                <span>Carregamento Ultra Rápido (100% SEO)</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <CheckCircleIcon className="w-5 h-5 text-[#61ce70] flex-shrink-0" />
                <span>Atendimento Automático com IA 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <CheckCircleIcon className="w-5 h-5 text-[#61ce70] flex-shrink-0" />
                <span>Design 100% Responsivo no Celular</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <CheckCircleIcon className="w-5 h-5 text-[#61ce70] flex-shrink-0" />
                <span>Sem Mensalidades Ocultas</span>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                type="button"
                onClick={openChat}
                className="btn-primary inline-flex items-center justify-center gap-2 text-base px-6 py-3.5 rounded-xl shadow-lg shadow-[#36c2ac]/25 hover:shadow-[#61ce70]/40 transition-all cursor-pointer"
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

          {/* Coluna Direita: Ilustração 3D em Destaque com Badges Flutuantes */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Card Principal da Ilustração 3D com Glassmorphic Border */}
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

              {/* Badge Flutuante 1: Performance */}
              <div className="absolute -top-4 -left-4 bg-[#1d2b48]/90 border border-[#36c2ac]/40 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <div>
                  <p className="text-xs font-bold text-white">High Speed</p>
                  <p className="text-[10px] text-[#36c2ac]">100% Otimizado SEO</p>
                </div>
              </div>

              {/* Badge Flutuante 2: Chatbot IA */}
              <button 
                type="button"
                onClick={openChat}
                className="absolute top-1/2 -right-6 -translate-y-1/2 bg-[#1d2b48]/90 border border-[#61ce70]/40 backdrop-blur-md text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 cursor-pointer hover:border-[#61ce70] transition-colors text-left"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#61ce70] animate-ping" />
                <div>
                  <p className="text-xs font-bold text-white">Chatbot IA Integrado</p>
                  <p className="text-[10px] text-[#61ce70]">Clique para testar 24h</p>
                </div>
              </button>

              {/* Badge Flutuante 3: Projetos Reais */}
              <div className="absolute -bottom-4 left-6 bg-[#1d2b48]/90 border border-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
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