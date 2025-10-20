'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm(){
    const [formData, setFormData] = useState({
      name: 'helenilson',
      email: 'helenilsoon@gmail.com',
      phone: '92981186413',
      service: 'Site Institucional',
      message: 'Olá quero um ecommerce!'
    });
    
    const [status, setStatus] = useState<{
      type: 'idle' | 'loading' | 'success' | 'error';
      message: string;
    }>({
      type: 'idle',
      message: ''
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus({ type: 'loading', message: 'Enviando...' });

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus({ type: 'success', message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' });
          setFormData({
            name: '',
            email: '',
            phone: '',
            service: 'Site Institucional',
            message: ''
          });
        } else {
          setStatus({ type: 'error', message: data.error || 'Erro ao enviar mensagem.' });
        }
      } catch (error) {
        setStatus({ type: 'error', message: 'Erro ao enviar mensagem. Por favor, tente novamente.' });
      }

      // Limpar mensagem após 5 segundos
      setTimeout(() => {
        setStatus({ type: 'idle', message: '' });
      }, 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    };

    return(
        <section id="contato" className="py-20 bg-[#1d2b48]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Entre em <span className="text-[#61ce70]">Contato</span></h2>
              <p className="section-subtitle">Preencha o formulário abaixo e entraremos em contato em breve.</p>
            </div>
            
            {status.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                status.type === 'success' ? 'bg-green-500/20 border border-green-500 text-green-100' :
                status.type === 'error' ? 'bg-red-500/20 border border-red-500 text-red-100' :
                'bg-blue-500/20 border border-blue-500 text-blue-100'
              }`}>
                {status.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
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
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                    value={formData.phone}
                    onChange={handleChange}
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
                    value={formData.service}
                    onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#0061aa] bg-[#0061aa] text-white rounded-lg focus:ring-2 focus:ring-[#36c2ac] focus:border-transparent outline-none transition resize-none placeholder:text-white/50"
                  placeholder="Conte-nos sobre seu projeto..."
                />
              </div>
              
              <button 
                type="submit" 
                disabled={status.type === 'loading'}
                className="btn-primary w-full md:w-auto px-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.type === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
        </div>
      </section>        
    )
}