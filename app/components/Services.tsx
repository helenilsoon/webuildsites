import Image from 'next/image';

export default function Services() {

    const services = [
        {
            image: '/images/services/institucional.png',
            title: 'Sites Institucionais',
            description: 'Desenvolvimento de sites profissionais que destacam sua marca e convertem visitantes em clientes.'
        },
        {
            image: '/images/services/responsive.png',
            title: 'Sites Responsivos',
            description: 'Sites que se adaptam perfeitamente a qualquer dispositivo, do desktop ao smartphone.'
        },
        {
            image: '/images/services/uxui.png',
            title: 'UX/UI Design',
            description: 'Interfaces intuitivas e atraentes que proporcionam a melhor experiência para seus usuários.'
        },
        {
            image: '/images/services/hosting.png',
            title: 'Hospedagem',
            description: 'Hospedagem segura e de alto desempenho para manter seu site sempre no ar.'
        },
        {
            image: '/images/services/seo.png',
            title: 'Otimização SEO',
            description: 'Melhore seu posicionamento nos mecanismos de busca e atraia mais visitantes qualificados.'
        },
        {
            image: '/images/services/maintenance.png',
            title: 'Manutenção',
            description: 'Suporte contínuo e atualizações para manter seu site sempre atualizado e seguro.'
        },
    ];

    return (
        <section id="servicos" className="py-20 bg-[#1d2b48]">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="section-title">Nossos <span className="text-[#61ce70]">Serviços</span></h2>
                    <p className="section-subtitle">Oferecemos soluções completas para sua presença digital, desde o design até a implementação e manutenção contínua.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="card group hover:border-[#36c2ac]/40 transition-all duration-300">
                            <div className="relative w-16 h-16 mb-5 p-2 rounded-xl bg-gradient-to-br from-[#0061aa]/30 to-[#36c2ac]/10 border border-white/10 group-hover:border-[#61ce70]/50 group-hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg shadow-[#1d2b48]/50">
                                <Image 
                                    src={service.image} 
                                    alt={service.title} 
                                    width={64} 
                                    height={64} 
                                    className="object-contain w-full h-full drop-shadow-[0_0_8px_rgba(54,194,172,0.4)] group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[#61ce70] transition-colors duration-300">{service.title}</h3>
                            <p className="text-white/80 leading-relaxed text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )

}