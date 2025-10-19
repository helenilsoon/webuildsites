'use client'
// Componente de Botão Flutuante do WhatsApp
export default function WhatsAppButton() {
  const phoneNumber = '5592991805753'; // Seu número
  const message = 'Olá! Gostaria de solicitar um orçamento.'; // Mensagem padrão

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
      aria-label="Fale conosco pelo WhatsApp"
      title="Fale conosco pelo WhatsApp"
    >
      {/* Ícone do WhatsApp */}
      <i className="lab la-whatsapp text-4xl"></i>
      
      {/* Tooltip que aparece ao passar o mouse */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        Fale conosco!
      </span>
      
      {/* Badge de notificação (opcional) */}
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
        1
      </span>
    </button>
  );
}