"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import TypingIndicator from "./TypingIndicator";
import { chatRequestSchema, userDataSchema } from "@/lib/validation";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isIdentified, setIsIdentified] = useState(false);
  const [isSendingProposal, setIsSendingProposal] = useState(false);



  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Olá 👋 Sou o assistente da WebuildSites! Como posso ajudar?",
    },
  ]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 ENVIA MENSAGEM COM HISTÓRICO
  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage: Message = { role: "user", text: message };
    const updatedMessages = [...messages, userMessage];

    // 🔍 Validação no frontend antes de enviar
    const validation = chatRequestSchema.safeParse({
      messages: updatedMessages,
      userData: isIdentified ? userData : undefined
    });

    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Dados inválidos';
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `⚠️ Erro de validação: ${errorMessage}`,
        },
      ]);
      return;
    }

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    // 🔥 Detecta se é pedido de proposta
    const isProposalRequest = message.trim().toLowerCase() === "proposta";
    setIsSendingProposal(isProposalRequest);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, userData }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: `❌ Erro: ${errorData.reply}`,
          },
        ]);
        setLoading(false);
        return;
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Desculpe, ocorreu um erro. Tente novamente.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleStartChat = async () => {
    setError(""); // Limpa erro anterior
    
    if (!userData.name || !userData.email) {
      setError("Por favor, preencha nome e email");
      return;
    }

    // 🔍 Validação dos dados do usuário
    const validation = userDataSchema.safeParse(userData);
    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Dados inválidos';
      setError(errorMessage);
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || 'Erro ao cadastrar');
        return;
      }

      setIsIdentified(true);
      setError(""); // Limpa erro em caso de sucesso

      setMessages([
        {
          role: "assistant",
          text: `Prazer ${userData.name}! 👋 Como posso ajudar você hoje com seu projeto?`,
        },
      ]);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-violet-600 text-white text-2xl shadow-lg flex items-center justify-center z-[9999] hover:bg-violet-700 transition"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-5 w-80 h-[480px] bg-white rounded-xl shadow-2xl flex flex-col z-[9999] border">

          {/* Header com botão sair somente se identificado */}
<div className="bg-violet-600 text-white p-4 font-semibold rounded-t-xl flex justify-between items-center">
  <span>WebuildSites</span>
  {isIdentified && (
    <button
      onClick={() => {
        setIsIdentified(false);
        setUserData({ name: "", email: "" });
        setMessages([
          { role: "assistant", text: "Olá 👋 Sou o assistente da WebuildSites! Como posso ajudar?" }
        ]);
        setError("");
        setMessage("");
      }}
      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
    >
      Sair
    </button>
  )}
</div>


          {!isIdentified ? (
            <div className="flex-1 p-5 flex flex-col justify-center gap-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Antes de começarmos 👋
              </h2>

              <input
                type="text"
                placeholder="Seu nome"
                value={userData.name}
                onChange={(e) => {
                  setUserData({ ...userData, name: e.target.value });
                  setError(""); // Limpa erro ao digitar
                }}
                className="border rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <input
                type="email"
                placeholder="Seu email"
                value={userData.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                  setError(""); // Limpa erro ao digitar
                }}
                className="border rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-2 rounded-md">
                  {error}
                </div>
              )}

              <button
                onClick={handleStartChat}
                className="bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition"
              >
                Iniciar conversa 🚀
              </button>
            </div>
          ) : (
            <>
              {/* Mensagens */}
              <div className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-2 text-sm">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                      }`}
                  >
                    {/* Icone */}
                    {msg.role === "assistant" && (
                      <span className="text-2xl mr-2">🧑‍💻</span>
                    )}
                    {msg.role === "user" && (
                      <span className="text-2xl ml-2">🥷🏻</span>
                    )}
                    <div
                      className={`px-3 py-2 rounded-lg max-w-[80%] ${msg.role === "user"
                        ? "bg-violet-600 text-white"
                        : "bg-gray-200 text-gray-800"
                        }`}
                    >
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>


                    </div>
                  </div>
                ))}

                {loading && <TypingIndicator isProposal={isSendingProposal} />}



                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 min-w-0 border rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="shrink-0 bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition disabled:opacity-50"
                >
                  ➤
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
