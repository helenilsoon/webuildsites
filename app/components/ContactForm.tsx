'use client';

import { useState, FormEvent, useEffect } from 'react';
import Label from './form/Label';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactForm(){
    const [csrfToken, setCsrfToken] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
      // Generate CSRF token on component mount
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setCsrfToken(token);
    }, []);

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      service: 'Site Institucional',
      message: '',
      // Honeypot field - should be empty when submitted by humans
      _honey: ''
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
      
      // Basic client-side validation
      if (formData._honey) {
        // If honeypot field is filled, it's likely a bot
        console.log('Bot detected');
        return;
      }

      if (!recaptchaToken) {
        setStatus({ type: 'error', message: 'Por favor, complete a verificação do reCAPTCHA.' });
        return;
      }

      setStatus({ type: 'loading', message: 'Enviando...' });
      setIsSubmitting(true);

      try {
        const payload = {
          ...formData,
          _csrf: csrfToken,
          recaptchaToken
        };

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify(payload),
          credentials: 'same-origin'
        });

        const data = await response.json();

        if (response.ok) {
          setStatus({ type: 'success', message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' });
          setFormData({
            name: '',
            email: '',
            phone: '',
            service: 'Site Institucional',
            message: '',
            _honey: ''
          });
          setRecaptchaToken('');
        } else {
          setStatus({ type: 'error', message: data.error || 'Erro ao enviar mensagem.' });
        }
      } catch (error) {
        setStatus({ type: 'error', message: 'Erro ao enviar mensagem. Por favor, tente novamente.' });
      } finally {
        setIsSubmitting(false);
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
            
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              {/* CSRF Token */}
              <input type="hidden" name="_csrf" value={csrfToken} />
              
              {/* Honeypot field - hidden from users but visible to bots */}
              <div className="hidden">
                <label htmlFor="_honey">Não preencha este campo</label>
                <input
                  type="text"
                  id="_honey"
                  name="_honey"
                  value={formData._honey}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">
                    Nome Completo
                  </Label>
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
                  <Label htmlFor="email">
                    E-mail
                  </Label>
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
                  <label htmlFor="phone">
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
                  <Label htmlFor="service">
                    Serviço de Interesse
                  </Label>
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
                <Label htmlFor="message">
                  Mensagem
                </Label>
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
              
              <div className="mt-4">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_SITE_KEY'}
                  onChange={(token: string | null) => setRecaptchaToken(token || '')}
                  className="flex justify-center mb-4"
                />
                
                <button
                  type="submit"
                  className="w-full bg-[#61ce70] hover:bg-[#4da85a] text-white font-bold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#4da85a] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={status.type === 'loading' || isSubmitting || !recaptchaToken}
                >
                  {status.type === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>        
    )
}