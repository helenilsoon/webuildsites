import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppCTA from '../components/WhatsAppCTA';

export const metadata: Metadata = {
  title: 'Plataforma de Arrecadação e Sistema de Rifa Online com PIX | WeBuildSites',
  description:
    'Sistemas para rifas, vaquinhas e campanhas de arrecadação digital com PIX automático, dashboard em tempo real e LGPD. Case real: MyRifa.',
  alternates: {
    canonical: 'https://webuildsites.com.br/plataforma-de-arrecadacao',
  },
  keywords: [
    'plataforma de arrecadação com PIX',
    'sistema de rifa online',
    'vaquinha online',
    'arrecadação digital',
    'plataforma de arrecadação online',
    'sistema para rifas e sorteios',
  ],
  openGraph: {
    title: 'Plataforma de Arrecadação e Sistema de Rifa com PIX',
    description:
      'Desenvolvemos sistemas SaaS para gestão de campanhas de arrecadação, sorteios e vaquinhas online com recebimento automático via PIX.',
    url: 'https://webuildsites.com.br/plataforma-de-arrecadacao',
    siteName: 'WeBuildSites',
    locale: 'pt_BR',
    type: 'website',
  },
};

const problemas = [
  {
    titulo: 'Recebimento de valores sem controle',
    desc: 'Sem um sistema de PIX automático, você precisa conferir cada comprovante manualmente no WhatsApp, o que leva a fraudes e falhas.',
  },
  {
    titulo: 'Baixa credibilidade na campanha',
    desc: 'Campanhas feitas apenas via redes sociais, sem uma página oficial, geram desconfiança e reduzem drasticamente a conversão de doadores ou compradores.',
  },
  {
    titulo: 'Falta de transparência e prestação de contas',
    desc: 'Não há um painel público para mostrar o andamento da arrecadação, o que dificulta o engajamento de novas pessoas com a causa.',
  },
  {
    titulo: 'Riscos jurídicos e LGPD',
    desc: 'Coletar e expor dados de doadores sem as devidas políticas de privacidade pode gerar problemas legais graves para os organizadores.',
  },
  {
    titulo: 'Dificuldade em gerenciar números e bilhetes',
    desc: 'Em sorteios e rifas, controlar quais números já foram vendidos e quais estão livres por meio de planilhas resulta em números duplicados e confusão.',
  },
];

const entregamos = [
  {
    titulo: 'PIX Automático Integrado',
    desc: 'A baixa de pagamentos é instantânea. O sistema identifica o recebimento via API e atualiza o status do bilhete ou doação sem ação humana.',
  },
  {
    titulo: 'Dashboard em Tempo Real',
    desc: 'Painel completo para o administrador acompanhar o volume de arrecadação, bilhetes vendidos e metas batidas a cada minuto.',
  },
  {
    titulo: 'Controle inteligente de números e cotas',
    desc: 'Reserva temporária de bilhetes. Se o PIX não for pago dentro do limite de tempo, o número volta automaticamente para venda.',
  },
  {
    titulo: 'Conformidade com a LGPD',
    desc: 'Termos de uso, políticas de privacidade e gestão de consentimento integrados, garantindo a proteção dos dados dos participantes.',
  },
  {
    titulo: 'Blog e Área de Notícias',
    desc: 'Espaço integrado para publicar novidades, transparência das ações sociais e os resultados dos sorteios, gerando SEO e autoridade.',
  },
  {
    titulo: 'Experiência de alta conversão',
    desc: 'Interface fluida, carregamento rápido e design voltado para o fechamento da doação ou compra no celular em poucos cliques.',
  },
];

const funcionalidades = [
  'Geração automática de QR Code PIX e chave Pix Copia e Cola',
  'Baixa automática de pagamentos confirmados via webhook',
  'Gestão e liberação automática de números reservados não pagos',
  'Painel administrativo (Dashboard) com métricas financeiras',
  'Exportação de dados de participantes e doadores',
  'Configuração de metas e barra de progresso pública',
  'Criação de múltiplas campanhas ativas simultaneamente',
  'Integração com políticas de LGPD e Aceite de Termos',
  'Módulo de Blog integrado para notícias e resultados',
  'Disparo de comprovantes de participação',
  'Painel de suporte para gestão de estornos ou dúvidas',
  'Otimização avançada de SEO para a landing page da campanha',
];

export default function ArrecadacaoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── HERO ── */}
        <section className="relative bg-gradient-to-br from-[#0b1220] via-[#1d2b48] to-[#0061aa] py-20 md:py-28 overflow-hidden mt-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(97,206,112,0.12) 0%, transparent 70%)',
            }}
          />
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block text-xs font-bold tracking-widest uppercase mb-5 px-3.5 py-1.5 rounded-full border border-[#61ce70]/30 bg-[#61ce70]/10 text-[#61ce70]">
                Case real entregue — MyRifa SaaS
              </span>

              {/* H1 otimizado para SEO */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Plataforma de arrecadação online e{' '}
                <span className="text-[#61ce70]">sistema de rifa com PIX</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                Desenvolvemos sistemas sob medida para gestão de vaquinhas, campanhas solidárias e sorteios digitais. Tenha sua própria plataforma com baixa automática de PIX e dashboard financeiro em tempo real.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppCTA
                  message="Olá! Tenho interesse em desenvolver um sistema de arrecadação digital e gostaria de mais informações."
                  className="btn-primary inline-flex items-center justify-center gap-2 cursor-pointer"
                  ariaLabel="Falar no WhatsApp sobre sistema de arrecadação"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Falar no WhatsApp
                </WhatsAppCTA>
                <Link
                  href="#o-que-entregamos"
                  className="btn-outline inline-flex items-center justify-center gap-2"
                >
                  Ver o que entregamos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLEMA ── */}
        <section className="py-20 bg-[#0b1220]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* H2 */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4">
                Por que organizar campanhas manuais é{' '}
                <span className="text-[#61ce70]">um risco para o projeto?</span>
              </h2>
              <p className="text-white/75 text-center text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                Quando a campanha cresce, o controle no papel e no WhatsApp se torna impossível. E se você depende de plataformas genéricas terceirizadas, perde dinheiro em taxas abusivas e atrasos de saque.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {problemas.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl bg-[#162137] border border-red-900/30"
                  >
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold mb-1 text-sm md:text-base">
                        {item.titulo}
                      </h3>
                      <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CASE REAL: MYRIFA ── */}
        <section className="py-20 bg-[#1d2b48] border-y border-white/10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12 items-center">

                {/* Texto */}
                <div className="lg:w-1/2">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full border border-[#61ce70]/30 bg-[#61ce70]/10 text-[#61ce70]">
                    Case real entregue
                  </span>

                  {/* H2 */}
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-snug">
                    MyRifa — Plataforma SaaS de Campanhas e Sorteios
                  </h2>

                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                    A MyRifa é uma solução SaaS projetada e desenvolvida pela WeBuildSites para gerenciar múltiplas campanhas simultaneamente. O sistema controla a venda de números de sorteios com integração direta via PIX automático, liberando os bilhetes sem intervenção humana após o pagamento.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      'Sistema Multi-campanhas para várias ações simultâneas',
                      'Baixa e conciliação bancária via PIX Webhook',
                      'Dashboard financeiro administrativo completo',
                      'Adequação total às normativas de LGPD',
                      'Blog institucional integrado com CMS próprio',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/85">
                        <CheckCircleIcon className="w-5 h-5 text-[#61ce70] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://myrifa.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#61ce70] text-sm font-semibold hover:underline"
                    aria-label="Acessar o case MyRifa"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    Conhecer o projeto — myrifa.com.br
                  </a>
                </div>

                {/* Card de destaque */}
                <div className="lg:w-1/2 w-full">
                  <div className="rounded-2xl bg-gradient-to-br from-[#0061aa] to-[#1d2b48] border border-[#61ce70]/30 p-8 shadow-xl">
                    <div className="text-center mb-6">
                      <span className="text-4xl">🎟️</span>
                      <h3 className="text-white font-bold text-xl mt-3 mb-1">MyRifa SaaS</h3>
                      <p className="text-[#61ce70] text-sm font-semibold">Sistema de Arrecadação Digital</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        'Criação de campanhas ilimitadas',
                        'Módulo de sorteio de bilhetes',
                        'Checkout rápido mobile-first',
                        'Gerenciamento de estornos e fraudes',
                        'Exportação de dados de participantes',
                        'Proteção contra sobrecarga (High Traffic)',
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-white/90">
                          <div className="w-5 h-5 rounded-full bg-[#61ce70]/20 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-[#61ce70]" />
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {['Next.js SaaS', 'PIX API', 'Webhooks', 'Dashboard', 'LGPD'].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-[#61ce70]/15 text-[#61ce70] border border-[#61ce70]/30 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── O QUE ENTREGAMOS ── */}
        <section id="o-que-entregamos" className="py-20 bg-[#0061aa]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* H2 */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4">
                O que a WeBuildSites constrói para sua{' '}
                <span className="text-[#61ce70]">plataforma de campanhas</span>
              </h2>
              <p className="text-white/80 text-center text-base mb-12 max-w-2xl mx-auto leading-relaxed">
                Desenvolvemos a sua estrutura própria de recebimento, livre de taxas das grandes plataformas de vaquinha online e pronta para processar centenas de pagamentos simultâneos.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {entregamos.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl bg-[#1d2b48]/60 border border-white/10 hover:border-[#61ce70]/40 transition-colors duration-200"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-[#61ce70] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold mb-1 text-sm md:text-base">
                        {item.titulo}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FUNCIONALIDADES ── */}
        <section className="py-20 bg-[#0b1220]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* H2 */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4">
                Módulos e funcionalidades para{' '}
                <span className="text-[#61ce70]">sistemas de arrecadação</span>
              </h2>
              <p className="text-white/75 text-center text-sm md:text-base mb-12 max-w-2xl mx-auto">
                Toda campanha é única. Seu sistema pode ter as funcionalidades abaixo dependendo do seu modelo: rifa de produtos, sorteio beneficente, doação por cotas ou vaquinha tradicional.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {funcionalidades.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#162137] border border-slate-700/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#61ce70] flex-shrink-0 mt-2" />
                    <span className="text-white/85 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20 bg-gradient-to-br from-[#0061aa] to-[#1d2b48]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">

              {/* H2 */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5">
                Desenvolva a tecnologia para{' '}
                <span className="text-[#61ce70]">o seu próximo projeto de sucesso</span>
              </h2>
              <p className="text-white/80 text-base mb-8 max-w-xl mx-auto leading-relaxed">
                Converse com a nossa equipe para entendermos o escopo da sua plataforma de arrecadação ou sorteio digital, os gateways de pagamento e a estrutura técnica necessária.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppCTA
                  message="Olá! Vim através da página de Sistema de Arrecadação. Gostaria de solicitar um orçamento para desenvolvimento de uma plataforma própria."
                  className="btn-primary inline-flex items-center justify-center gap-2 cursor-pointer"
                  ariaLabel="Falar no WhatsApp sobre projeto de plataforma de arrecadação"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Falar no WhatsApp Comercial
                </WhatsAppCTA>
                <Link
                  href="mailto:contato@webuildsites.com.br"
                  className="btn-outline inline-flex items-center justify-center gap-2"
                >
                  Enviar E-mail
                </Link>
              </div>

              <p className="text-white/50 text-xs mt-6">
                Desenvolvemos plataformas escaláveis para todo o Brasil, a partir de Manaus (AM).
              </p>
            </div>
          </div>
        </section>

        {/* Schema.org JSON-LD — FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'O que é uma plataforma de arrecadação online própria?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'É um sistema de doações, rifas ou vaquinhas onde o dinheiro recebido vai diretamente para a conta da sua empresa via PIX, eliminando a dependência e as taxas de grandes sites de terceiros.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Como funciona a baixa automática de PIX?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Integramos o sistema com o seu banco ou gateway de pagamentos via API. Quando o doador paga o PIX, a API notifica nosso sistema, que aprova a transação em tempo real, sem intervenção humana.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'O sistema lida com reserva de números em rifas?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sim. O participante escolhe os números e tem um prazo (ex: 15 minutos) para pagar o PIX. Se não pagar, o sistema libera os números automaticamente de volta para a venda.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Qual sistema de arrecadação vocês já desenvolveram?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'A WeBuildSites desenvolveu a MyRifa, um SaaS de campanhas e sorteios com integração direta PIX, dashboard financeiro em tempo real e foco na adequação à LGPD. Pode ser acessada em myrifa.com.br.',
                  },
                },
              ],
            }),
          }}
        />

      </main>
      <Footer />
    </>
  );
}
