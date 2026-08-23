'use client';

import Link from "next/link";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function CtaSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-20 bg-gradient-to-r from-[#36c2ac] to-[#0061aa] text-white relative overflow-hidden">
      {/* Blob decorativo */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 bg-blob rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 bg-blob rounded-full pointer-events-none" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
        <div ref={ref} className={`anim-fade-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar sua presença digital?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            Entre em contato conosco hoje mesmo e dê o próximo passo para o sucesso do seu negócio online.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center anim-fade-up anim-delay-2 ${isVisible ? 'visible' : ''}`}>
            <Link
              href="#contato"
              className="bg-white text-[#0061aa] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Enviar Mensagem
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}