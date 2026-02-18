export default function TypingIndicator({ isProposal }: { isProposal?: boolean }) {
  return (
    <div className="text-gray-500 text-xs flex items-center gap-2">
      {isProposal ? (
        <>
          <span>Aguarde um minuto, preparando e enviando a proposta</span>
          <span className="animate-spin-slow text-yellow-500 text-lg">⏳</span>
          <span className="flex space-x-1">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-0"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300"></span>
          </span>
        </>
      ) : (
        <>
          <span>Assistente está digitando</span>
          <span className="flex space-x-1">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-0"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300"></span>
          </span>
        </>
      )}
    </div>
  );
}
