'use client';

import React from 'react';
import { openWhatsApp } from '@/lib/whatsapp';

interface WhatsAppCTAProps {
  message?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export default function WhatsAppCTA({ message, className, children, ariaLabel }: WhatsAppCTAProps) {
  return (
    <button
      type="button"
      onClick={() => openWhatsApp(message)}
      className={className}
      aria-label={ariaLabel || 'Falar no WhatsApp Comercial'}
    >
      {children}
    </button>
  );
}
