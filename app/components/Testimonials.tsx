'use client';

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="depoimentos" className="py-20 bg-[#0061aa]">
      <div className="container mx-auto px-6 lg:px-8">
        <div ref={ref} className={`max-w-2xl mx-auto text-center anim-scale-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">
            Primeiros projetos entregues.{" "}
            <span className="text-[#61ce70]">Cases em construção.</span>
          </h2>
          <p className="section-subtitle mb-8">
            Estamos nos primeiros projetos e preferimos mostrar o trabalho em
            vez de depoimentos. Veja o portfólio abaixo e julgue você mesmo.
          </p>
          <Link
            href="#portfolio"
            className={`btn-primary btn-glow inline-flex items-center gap-2 anim-fade-up anim-delay-2 ${isVisible ? 'visible' : ''}`}
            aria-label="Ver portfólio de projetos entregues"
          >
            Ver Portfólio
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}