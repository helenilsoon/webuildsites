import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {

  try {
        
    const { name, email, phone, service, message } = await request.json();
      const contentType = request.headers.get('Content-Type');
      console.log(contentType);
      const userAgent = request.headers.get('User-Agent');
      console.log(userAgent);
    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Por favor, preencha todos os campos obrigatórios.' },
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

    // Configurar o email
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `Novo contato do site - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0061aa;">Nova Mensagem de Contato</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
            <p><strong>Serviço de Interesse:</strong> ${service || 'Não especificado'}</p>
            <hr style="border: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Mensagem:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Esta mensagem foi enviada através do formulário de contato do site.
          </p>
        </div>
      `,
      text: `
        Nova Mensagem de Contato
        
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone || 'Não informado'}
        Serviço de Interesse: ${service || 'Não especificado'}
        
        Mensagem:
        ${message}
      `,
    };

    // Enviar o email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email enviado com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar email. Por favor, tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
