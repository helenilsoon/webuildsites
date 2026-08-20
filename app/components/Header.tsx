'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';

const servicos = [
  { name: 'Criação de Sites', href: '/criacao-de-sites-manaus' },
  { name: 'Loja Virtual / E-commerce', href: '/loja-virtual-ecommerce' },
  { name: 'Landing Page Profissional', href: '/landing-page-profissional' },
  { name: 'Sistema para Restaurantes', href: '/sistema-para-restaurantes' },
  { name: 'Sistemas para Igrejas', href: '/igrejas' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicosOpen, setServicosOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-[#1d2b48]/95 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <Logo />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:gap-x-8 items-center">
            <Link
              href="/"
              className="text-sm font-semibold leading-6 text-white hover:text-[#36c2ac] transition-colors uppercase tracking-wide"
            >
              Início
            </Link>

            {/* Dropdown Serviços */}
            <div className="relative">
              <button
                onClick={() => setServicosOpen(!servicosOpen)}
                onBlur={() => setTimeout(() => setServicosOpen(false), 150)}
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-white hover:text-[#36c2ac] transition-colors uppercase tracking-wide"
              >
                Serviços
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${servicosOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {servicosOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-[#0061aa] border border-white/10 shadow-xl overflow-hidden z-50">
                  {servicos.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setServicosOpen(false)}
                      className="block px-4 py-3 text-sm text-white hover:bg-[#36c2ac]/20 hover:text-[#36c2ac] transition-colors border-b border-white/5 last:border-0"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#portfolio"
              className="text-sm font-semibold leading-6 text-white hover:text-[#36c2ac] transition-colors uppercase tracking-wide"
            >
              Portfólio
            </Link>

            <Link
              href="/#contato"
              className="text-sm font-semibold leading-6 text-white hover:text-[#36c2ac] transition-colors uppercase tracking-wide"
            >
              Contato
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/#contato" className="btn-primary text-xs">
              Orçamento
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#1d2b48] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-[#0061aa]">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <Logo />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fechar menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-[#0061aa]">
                <div className="space-y-1 py-6">
                  <Link
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#0061aa]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Início
                  </Link>

                  {/* Serviços mobile — lista expandida */}
                  <div>
                    <p className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white/60 uppercase text-xs tracking-widest mt-2">
                      Serviços
                    </p>
                    {servicos.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-6 py-2 text-sm font-medium leading-7 text-white hover:bg-[#0061aa]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/#portfolio"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#0061aa]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Portfólio
                  </Link>

                  <Link
                    href="/#contato"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#0061aa]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contato
                  </Link>
                </div>

                <div className="py-6">
                  <Link
                    href="/#contato"
                    className="btn-primary w-full text-center block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Solicitar Orçamento
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
