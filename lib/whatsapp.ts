'use client';

/**
 * Utilitário para abrir o WhatsApp sem expor o número de telefone em texto puro
 * no HTML estático renderizado (SSR/SSG), prevenindo scraping por robôs de spam.
 */
export function openWhatsApp(message?: string) {
  if (typeof window === 'undefined') return;

  const parts = ['55', '92', '99180', '5753'];
  const phone = parts.join('');
  const defaultText = 'Olá! Vim pelo site WeBuildSites e gostaria de solicitar um orçamento.';
  const encodedText = encodeURIComponent(message || defaultText);

  const url = `https://wa.me/${phone}?text=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
