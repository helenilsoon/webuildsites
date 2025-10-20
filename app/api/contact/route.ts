import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// Simple in-memory rate limiting
const rateLimit = {
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  // In-memory store for IPs and their request counts
  store: new Map<string, { count: number; resetTime: number }>(),
  check: function(ip: string) {
    const now = Date.now();
    const ipData = this.store.get(ip);
    
    // If this is a new IP or the window has passed, reset the counter
    if (!ipData || now > ipData.resetTime) {
      this.store.set(ip, { count: 1, resetTime: now + this.windowMs });
      return true;
    }
    
    // If we're under the limit, increment the counter
    if (ipData.count < this.max) {
      ipData.count++;
      return true;
    }
    
    // Over the limit
    return false;
  }
};

// Simple HTML sanitization function
const sanitizeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export async function POST(request: NextRequest) {
  // Get client IP for rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(/, /)[0] : 'unknown';

  // Check rate limit
  if (!rateLimit.check(ip)) {
    const resetTime = rateLimit.store.get(ip)?.resetTime || Date.now() + 60000;
    const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
    
    return NextResponse.json(
      { error: 'Muitas requisições. Por favor, tente novamente mais tarde.' },
      { 
        status: 429, 
        headers: { 
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': rateLimit.max.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.floor(resetTime / 1000).toString()
        } 
      }
    );
  }

  try {
    const { name, email, phone, service, message, _honey, _csrf, recaptchaToken } = await request.json();
    
    // Check content type
    const contentType = request.headers.get('Content-Type');
    if (contentType !== 'application/json') {
      return NextResponse.json(
        { error: 'Content-Type inválido. Use application/json.' },
        { status: 400 }
      );
    }

    // Honeypot check
    if (_honey) {
      console.log('Bot detected - honeypot triggered');
      return NextResponse.json(
        { error: 'Erro ao processar o formulário.' },
        { status: 200 }
      );
    }

    // CSRF token check
    if (!_csrf || typeof _csrf !== 'string' || _csrf.length < 10) {
      return NextResponse.json(
        { error: 'Token de segurança inválido.' },
        { status: 403 }
      );
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Por favor, preencha todos os campos obrigatórios.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Por favor, insira um endereço de e-mail válido.' },
        { status: 400 }
      );
    }

    // Validate input lengths
    if (name.length > 100 || email.length > 255 || (phone && phone.length > 20) || 
        (service && service.length > 100) || message.length > 2000) {
      return NextResponse.json(
        { error: 'Dados de entrada muito longos.' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'Falha na verificação do reCAPTCHA.' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA with Google
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`,
      { method: 'POST' }
    );
    
    const recaptchaData = await recaptchaResponse.json();
    
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.log('reCAPTCHA verification failed:', recaptchaData);
      return NextResponse.json(
        { error: 'Falha na verificação de segurança. Por favor, tente novamente.' },
        { status: 400 }
      );
    }

    // Configurar o transportador de email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true para porta 465, false para outras portas
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeHtml(name),
      email: sanitizeHtml(email),
      phone: phone ? sanitizeHtml(phone) : '',
      service: service ? sanitizeHtml(service) : '',
      message: sanitizeHtml(message),
      ip: ip,
      userAgent: request.headers.get('User-Agent') || 'unknown',
      timestamp: new Date().toISOString()
    };

    // Configure email with sanitized data
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: `"${sanitizedData.name}" <${sanitizedData.email}>`,
      subject: `Novo contato do site - ${sanitizedData.name.substring(0, 30)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0061aa;">Nova Mensagem de Contato</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Nome:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Telefone:</strong> ${sanitizedData.phone || 'Não informado'}</p>
            <p><strong>Serviço de Interesse:</strong> ${sanitizedData.service || 'Não especificado'}</p>
            <p><strong>IP:</strong> ${sanitizedData.ip} (${sanitizedData.timestamp})</p>
            <hr style="border: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Mensagem:</strong></p>
            <p style="white-space: pre-wrap;">${sanitizedData.message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Esta mensagem foi enviada através do formulário de contato do site. User-Agent: ${sanitizedData.userAgent}
          </p>
        </div>
      `,
      text: `
        Nova Mensagem de Contato
        
        Nome: ${sanitizedData.name}
        Email: ${sanitizedData.email}
        Telefone: ${sanitizedData.phone || 'Não informado'}
        Serviço de Interesse: ${sanitizedData.service || 'Não especificado'}
        IP: ${sanitizedData.ip} (${sanitizedData.timestamp})
        
        Mensagem:
        ${sanitizedData.message}
        
        User-Agent: ${sanitizedData.userAgent}
      `,
    };

    // Enviar o email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email enviado com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar o formulário de contato:', {
      error,
      ip,
      userAgent: request.headers.get('User-Agent'),
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { error: 'Erro ao processar o formulário. Por favor, tente novamente mais tarde.' },
      { 
        status: 500,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'same-origin'
        }
      }
    );
  }
}
