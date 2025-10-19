export default function ContactForm(){
    return(
        <section id="contato" className="py-20 bg-[#1d2b48]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Entre em <span className="text-[#61ce70]">Contato</span></h2>
              <p className="section-subtitle">Preencha o formulário abaixo e entraremos em contato em breve.</p>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-[#0061aa] bg-[#0061aa] text-white rounded-lg focus:ring-2 focus:ring-[#36c2ac] focus:border-transparent outline-none transition placeholder:text-white/50"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-[#0061aa] bg-[#0061aa] text-white rounded-lg focus:ring-2 focus:ring-[#36c2ac] focus:border-transparent outline-none transition placeholder:text-white/50"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-[#0061aa] bg-[#0061aa] text-white rounded-lg focus:ring-2 focus:ring-[#36c2ac] focus:border-transparent outline-none transition placeholder:text-white/50"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-white mb-2">
                    Serviço de Interesse
                  </label>
                  <select
                    id="service"
                    className="w-full px-4 py-3 border border-[#0061aa] bg-[#0061aa] text-white rounded-lg focus:ring-2 focus:ring-[#36c2ac] focus:border-transparent outline-none transition placeholder:text-white/50"
                  >
                    <option>Site Institucional</option>
                    <option>E-commerce</option>
                    <option>Landing Page</option>
                    <option>Redesign</option>
                    <option>Outro</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-[#0061aa] bg-[#0061aa] text-white rounded-lg focus:ring-2 focus:ring-[#36c2ac] focus:border-transparent outline-none transition resize-none placeholder:text-white/50"
                  placeholder="Conte-nos sobre seu projeto..."
                />
              </div>
              
              <button type="submit" className="btn-primary w-full md:w-auto px-12">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>        
    )
}