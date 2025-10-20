import { CodeBracketIcon, CursorArrowRippleIcon, DevicePhoneMobileIcon, RocketLaunchIcon, ServerIcon } from '@heroicons/react/24/outline';

export default function Services() {

    const services = [
        {
            icon: CodeBracketIcon,
            title: 'Sites Institucionais',
            description: 'Desenvolvimento de sites profissionais que destacam sua marca e convertem visitantes em clientes.'
        },
        {
            icon: DevicePhoneMobileIcon,
            title: 'Sites Responsivos',
            description: 'Sites que se adaptam perfeitamente a qualquer dispositivo, do desktop ao smartphone.'
        },
        {
            icon: CursorArrowRippleIcon,
            title: 'UX/UI Design',
            description: 'Interfaces intuitivas e atraentes que proporcionam a melhor experiência para seus usuários.'
        },
        {
            icon: ServerIcon,
            title: 'Hospedagem',
            description: 'Hospedagem segura e de alto desempenho para manter seu site sempre no ar.'
        },
        {
            icon: RocketLaunchIcon,
            title: 'Otimização SEO',
            description: 'Melhore seu posicionamento nos mecanismos de busca e atraia mais visitantes qualificados.'
        },
        {
            icon: CursorArrowRippleIcon,
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
                        <div key={index} className="card group ">
                            <div className="w-12 h-12 bg-[#61ce70]/20 text-[#61ce70] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#61ce70]/30 group-hover:text-[#fff] transition-colors duration-300">
                                <service.icon className="w-6 h-6 hover:text-[#fff]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                            <p className="text-white/80">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )

}