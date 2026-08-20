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
                        <div key={index} className="card !p-0 overflow-hidden group hover:border-[#36c2ac]/40 transition-all duration-300 flex flex-col h-full">
                            <div className="relative w-full h-52 bg-gradient-to-br from-[#1d2b48] to-[#0061aa]/40 overflow-hidden border-b border-white/10">
                                <Image 
                                    src={service.image} 
                                    alt={service.title} 
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0061aa] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[#61ce70] transition-colors duration-300">{service.title}</h3>
                                <p className="text-white/80 leading-relaxed text-sm">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )

}