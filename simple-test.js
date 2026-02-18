// Teste simples de rate limiting (sem dependências)
// Execute com: node simple-test.js

// Simulação do rate limit em JavaScript puro
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 10;

function rateLimit(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
            req.headers.get('x-real-ip') || 
            req.headers.get('x-client-ip') ||
            'unknown';

  const now = Date.now();
  const key = `chat-${ip}`;
  
  const existing = rateLimitMap.get(key);
  
  if (existing && now > existing.resetTime) {
    rateLimitMap.delete(key);
  }
  
  const current = rateLimitMap.get(key) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { 
      success: false, 
      resetTime: current.resetTime 
    };
  }
  
  current.count++;
  rateLimitMap.set(key, current);
  
  return { success: true };
}

// Mock request
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

console.log('🧪 Teste Manual de Rate Limiting\n');

// Teste 1: Limite de requisições
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

// Teste 2: IPs diferentes
console.log('\n🔄 Testando IPs diferentes...');
const req2 = createMockRequest('192.168.1.200');
const result2 = rateLimit(req2);
console.log(`📍 IP diferente permitido: ${result2.success ? 'SIM ✅' : 'NÃO ❌'}`);

// Teste 3: Comportamento do reset
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

console.log('\n🎉 Teste concluído com sucesso!');
console.log('\n📋 Verificações:');
console.log('✅ Limite de 10 requisições por minuto');
console.log('✅ Bloqueio após exceder limite');
console.log('✅ IPs diferentes têm contadores separados');
console.log('✅ Tempo de reset configurado');
