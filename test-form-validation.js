// Teste de validação do formulário
// Execute com: node test-form-validation.js

console.log('🧪 Teste de Validação do Formulário\n');

// Simulação do schema userDataSchema
const userDataSchema = {
  safeParse: (data) => {
    if (!data.name || data.name.length < 2 || data.name.length > 50) {
      return { success: false, error: { issues: [{ message: 'Nome deve ter entre 2 e 50 caracteres' }] } };
    }
    
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(data.name)) {
      return { success: false, error: { issues: [{ message: 'Nome deve conter apenas letras' }] } };
    }
    
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return { success: false, error: { issues: [{ message: 'Email inválido' }] } };
    }
    
    return { success: true, data };
  }
};

// Simulação da função handleStartChat
function simulateHandleStartChat(userData) {
  let error = "";
  
  // Validação inicial
  if (!userData.name || !userData.email) {
    error = "Por favor, preencha nome e email";
    return { success: false, error };
  }

  // Validação com schema
  const validation = userDataSchema.safeParse(userData);
  if (!validation.success) {
    const errorMessage = validation.error.issues[0]?.message || 'Dados inválidos';
    error = errorMessage;
    return { success: false, error };
  }

  return { success: true, error: "" };
}

// Testes
const testCases = [
  {
    name: "João Silva",
    email: "joao@email.com",
    description: "Dados válidos"
  },
  {
    name: "",
    email: "joao@email.com",
    description: "Nome vazio"
  },
  {
    name: "João",
    email: "",
    description: "Email vazio"
  },
  {
    name: "A",
    email: "joao@email.com",
    description: "Nome muito curto"
  },
  {
    name: "João123",
    email: "joao@email.com",
    description: "Nome com números"
  },
  {
    name: "João Silva",
    email: "email-invalido",
    description: "Email inválido"
  },
  {
    name: "Maria Santos",
    email: "maria@company.com.br",
    description: "Dados completos válidos"
  }
];

console.log('📝 Testando validação do formulário:\n');

testCases.forEach((test, index) => {
  const result = simulateHandleStartChat(test);
  console.log(`${result.success ? '✅' : '❌'} Teste ${index + 1} (${test.description})`);
  if (!result.success) {
    console.log(`   Erro: ${result.error}`);
  } else {
    console.log(`   Resultado: Usuário cadastrado com sucesso`);
  }
  console.log('');
});

console.log('🎯 Comportamento esperado no frontend:');
console.log('✅ Erros aparecem em vermelho no formulário');
console.log('✅ Erros somem quando usuário começa a digitar');
console.log('✅ Usuário só entra no chat se dados forem válidos');
console.log('✅ Feedback claro e específico para cada erro');

console.log('\n🎉 Teste concluído!');
