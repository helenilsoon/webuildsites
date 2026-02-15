import Link from "next/link";

export default function CtaSection() {
    return (
        <section className="py-20 bg-gradient-to-r from-[#36c2ac] to-[#0061aa] text-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar sua presença digital?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">Entre em contato conosco hoje mesmo e dê o próximo passo para o sucesso do seu negócio online.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contato" className="bg-white text-[#0061aa] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Enviar Mensagem
            </Link>
            {/* <Link href="tel:+5511999999999" className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
              (11) 99999-9999
            </Link> */}
          </div>
        </div>
      </section>
    )
}