// Teste manual de rate limiting
// Execute com: node test-rate-limit.js

const { rateLimit } = require('./lib/rateLimit.ts');

// Mock NextRequest
function createMockRequest(ip) {
  return {
    headers: {
      get: (name) => {
        if (name === 'x-forwarded-for') return ip;
        if (name === 'x-real-ip') return ip;
        if (name === 'x-client-ip') return ip;
        return null;
      }
    }
  };
}

console.log('🧪 Iniciando teste manual de rate limiting...\n');

// Teste 1: Verificar limite de 10 requisições
console.log('📊 Testando limite de 10 requisições...');
const req1 = createMockRequest('192.168.1.100');
let successCount = 0;
let blockedCount = 0;

for (let i = 0; i < 15; i++) {
  const result = rateLimit(req1);
  if (result.success) {
    successCount++;
    console.log(`✅ Requisição ${i + 1}: PERMITIDA`);
  } else {
    blockedCount++;
    console.log(`🚫 Requisição ${i + 1}: BLOQUEADA`);
    console.log(`   ⏰ Reset em: ${new Date(result.resetTime).toLocaleTimeString()}`);
  }
}

console.log(`\n📈 Resultado:`);
console.log(`✅ Permitidas: ${successCount}/10`);
console.log(`🚫 Bloqueadas: ${blockedCount}/5`);

// Teste 2: Verificar IPs diferentes
console.log('\n🔄 Testando IPs diferentes...');
const req2 = createMockRequest('192.168.1.200');
const result2 = rateLimit(req2);
console.log(`📍 IP diferente permitido: ${result2.success ? 'SIM ✅' : 'NÃO ❌'}`);

// Teste 3: Verificar reset do contador
console.log('\n⏰ Testando comportamento do reset...');
const req3 = createMockRequest('192.168.1.300');
console.log('Fazendo 10 requisições para IP 192.168.1.300...');
for (let i = 0; i < 10; i++) {
  rateLimit(req3);
}
const result3 = rateLimit(req3);
console.log(`11ª requisição bloqueada: ${result3.success ? 'NÃO ❌' : 'SIM ✅'}`);
if (!result3.success) {
  const timeUntilReset = Math.ceil((result3.resetTime - Date.now()) / 1000);
  console.log(`⏱️  Tempo até reset: ${timeUntilReset} segundos`);
}

console.log('\n🎉 Teste manual concluído!');
console.log('\n📋 Resumo da implementação:');
console.log('- Limite: 10 requisições por minuto por IP');
console.log('- Bloqueio: HTTP 429 quando excedido');
console.log('- Reset: Automático após 1 minuto');
console.log('- Isolamento: Cada IP tem seu próprio contador');
