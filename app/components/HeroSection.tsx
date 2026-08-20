import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#1d2b48] to-[#0061aa] py-20 md:py-32 overflow-hidden mt-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transformamos ideias em{" "}
            <span className="text-[#61ce70]">produtos digitais</span>{" "}
            que funcionam de verdade
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Criamos sites, e-commerces, sistemas e plataformas SaaS para
            empresas e ministérios em todo o Brasil. Do projeto simples ao
            sistema completo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contato"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Solicitar Orçamento
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="#servicos"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Nossos Serviços
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}