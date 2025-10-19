export default function StatsSection(){
    const stats = [
  { value: '150+', label: 'Projetos Entregues' },
  { value: '98%', label: 'Clientes Satisfeitos' },
  { value: '5+', label: 'Anos de Experiência' },
  { value: '24/7', label: 'Suporte Disponível' },
];

    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80 text-xs md:text-sm uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}