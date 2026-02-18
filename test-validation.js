// Teste de validação com Zod
// Execute com: node test-validation.js

// Simulação da validação (sem dependências)
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name) {
  return /^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(name);
}

function validateMessage(text) {
  if (!text || text.length < 1) return false;
  if (text.length > 1000) return false;
  if (/<script|javascript:|on\w+=/i.test(text)) return false;
  return true;
}

console.log('🧪 Teste de Validação de Entrada\n');

// Teste 1: Validação de email
console.log('📧 Testando validação de email...');
const emails = [
  'valid@email.com',
  'invalid-email',
  'test@domain',
  'user@company.com.br',
  '',
  'user@.com'
];

emails.forEach(email => {
  const isValid = validateEmail(email);
  console.log(`${isValid ? '✅' : '❌'} "${email}" - ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`);
});

// Teste 2: Validação de nome
console.log('\n👤 Testando validação de nome...');
const names = [
  'João Silva',
  'A',
  'John123',
  'Maria Santos',
  'Ana Maria da Silva',
  '',
  'User@Name'
];

names.forEach(name => {
  const isValid = validateName(name);
  console.log(`${isValid ? '✅' : '❌'} "${name}" - ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`);
});

// Teste 3: Validação de mensagem
console.log('\n💬 Testando validação de mensagem...');
const messages = [
  'Olá, tudo bem?',
  '',
  '<script>alert("xss")</script>',
  'javascript:alert("xss")',
  'Mensagem normal sem problemas',
  'a'.repeat(1001), // Mensagem muito longa
  'onclick="alert()"',
  'Texto com <b>HTML</b> seguro'
];

messages.forEach(msg => {
  const isValid = validateMessage(msg);
  const display = msg.length > 20 ? msg.substring(0, 20) + '...' : msg;
  console.log(`${isValid ? '✅' : '❌'} "${display}" - ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`);
});

// Teste 4: Validação completa de requisição
console.log('\n📋 Testando validação completa...');

function validateChatRequest(data) {
  if (!data.messages || !Array.isArray(data.messages)) {
    return { success: false, error: 'Mensagens são obrigatórias' };
  }
  
  if (data.messages.length < 1 || data.messages.length > 50) {
    return { success: false, error: 'Número de mensagens inválido' };
  }
  
  for (const msg of data.messages) {
    if (!msg.role || !['user', 'bot'].includes(msg.role)) {
      return { success: false, error: 'Role da mensagem inválido' };
    }
    
    if (!validateMessage(msg.text)) {
      return { success: false, error: 'Texto da mensagem inválido' };
    }
  }
  
  if (data.userData) {
    if (!validateName(data.userData.name)) {
      return { success: false, error: 'Nome do usuário inválido' };
    }
    
    if (!validateEmail(data.userData.email)) {
      return { success: false, error: 'Email do usuário inválido' };
    }
  }
  
  return { success: true };
}

const requests = [
  {
    messages: [{ role: 'user', text: 'Olá!' }],
    userData: { name: 'João Silva', email: 'joao@email.com' }
  },
  {
    messages: [{ role: 'user', text: '<script>alert()</script>' }],
    userData: { name: 'João', email: 'joao@email.com' }
  },
  {
    messages: [],
    userData: { name: 'João', email: 'invalid-email' }
  }
];

requests.forEach((req, index) => {
  const result = validateChatRequest(req);
  console.log(`\nRequisição ${index + 1}:`);
  console.log(`${result.success ? '✅' : '❌'} ${result.success ? 'VÁLIDA' : result.error}`);
});

console.log('\n🎉 Teste de validação concluído!');
console.log('\n📋 Validações implementadas:');
console.log('✅ Email com formato válido');
console.log('✅ Nome apenas com letras (2-50 caracteres)');
console.log('✅ Mensagem sem scripts maliciosos');
console.log('✅ Tamanho limitado das mensagens');
console.log('✅ Estrutura completa da requisição');
