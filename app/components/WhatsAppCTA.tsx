'use client';

import React from 'react';

interface WhatsAppCTAProps {
  message?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export default function WhatsAppCTA({ className, children, ariaLabel }: WhatsAppCTAProps) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-floating-chat"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel || 'Solicitar Orçamento no Chatbot IA'}
    >
      {children}
    </button>
  );
}
