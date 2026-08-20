import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 bg-[#0061aa]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
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
            className="btn-primary inline-flex items-center gap-2"
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