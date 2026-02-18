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
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Olá 👋 Sou o assistente da WebuildSites! Como posso ajudar?" },
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Escuta evento do botão na seção de contato
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-floating-chat", handleOpenChat);
    return () => window.removeEventListener("open-floating-chat", handleOpenChat);
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage: Message = { role: "user", text: message };
    const updatedMessages = [...messages, userMessage];

    const validation = chatRequestSchema.safeParse({
      messages: updatedMessages,
      userData: isIdentified ? userData : undefined,
    });

    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || "Dados inválidos";
      setMessages((prev) => [...prev, { role: "assistant", text: `⚠️ ${errorMessage}` }]);
      return;
    }

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);
    setIsSendingProposal(message.trim().toLowerCase() === "proposta");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, userData, conversationId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessages((prev) => [...prev, { role: "assistant", text: `❌ ${errorData.reply}` }]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Desculpe, ocorreu um erro. Tente novamente." }]);
    }

    setLoading(false);
  };

  const handleStartChat = async () => {
    setError("");
    if (!userData.name || !userData.email) { setError("Por favor, preencha nome e email"); return; }

    const validation = userDataSchema.safeParse(userData);
    if (!validation.success) { setError(validation.error.issues[0]?.message || "Dados inválidos"); return; }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) { const d = await res.json(); setError(d.error || "Erro ao cadastrar"); return; }

      const responseData = await res.json();
      setConversationId(responseData.conversationId);
      setIsIdentified(true);
      setError("");
      setMessages([{ role: "assistant", text: `Prazer, **${userData.name}**! 👋 Como posso ajudar você hoje com seu projeto?` }]);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    }
  };

  const handleReset = () => {
    setIsIdentified(false);
    setUserData({ name: "", email: "" });
    setMessages([{ role: "assistant", text: "Olá 👋 Sou o assistente da WebuildSites! Como posso ajudar?" }]);
    setError("");
    setMessage("");
    setConversationId(null);
  };

  return (
    <>
      <style>{`
        .wbs-chat-window {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 360px;
          height: 540px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          z-index: 9999;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(54,194,172,0.2);
          animation: chatSlideIn 0.3s cubic-bezier(.22,1,.36,1) both;
          font-family: inherit;
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }

        /* ── HEADER ── */
        .wbs-header {
          background: linear-gradient(135deg, #0061aa 0%, #1d2b48 100%);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(54,194,172,0.2);
          flex-shrink: 0;
        }
        .wbs-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #36c2ac, #0061aa);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(54,194,172,0.25);
        }
        .wbs-header-info { flex: 1; }
        .wbs-header-name { color: #fff; font-weight: 700; font-size: 14px; line-height: 1.2; }
        .wbs-header-status {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; color: rgba(255,255,255,0.65); margin-top: 2px;
        }
        .wbs-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #36c2ac;
          box-shadow: 0 0 6px #36c2ac;
          animation: statusBlink 2s ease-in-out infinite;
        }
        @keyframes statusBlink { 0%,100%{opacity:1} 50%{opacity:0.4} }

        .wbs-header-actions { display: flex; gap: 8px; align-items: center; }
        .wbs-btn-icon {
          width: 30px; height: 30px; border-radius: 8px; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7);
          transition: background 0.2s, color 0.2s; font-size: 13px;
        }
        .wbs-btn-icon:hover { background: rgba(255,255,255,0.2); color: #fff; }
        .wbs-btn-icon.danger:hover { background: rgba(239,68,68,0.3); color: #fca5a5; }

        /* ── IDENTIFY FORM ── */
        .wbs-identify {
          flex: 1;
          background: #1d2b48;
          display: flex; flex-direction: column; justify-content: center;
          padding: 28px 24px; gap: 0;
        }
        .wbs-identify-title {
          font-size: 17px; font-weight: 700; color: #fff;
          margin-bottom: 6px;
        }
        .wbs-identify-sub {
          font-size: 13px; color: rgba(255,255,255,0.55);
          margin-bottom: 24px; line-height: 1.5;
        }
        .wbs-field { margin-bottom: 14px; }
        .wbs-label {
          display: block; font-size: 11px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 6px;
        }
        .wbs-input {
          width: 100%; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 11px 14px;
          color: #fff; font-size: 14px; font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .wbs-input::placeholder { color: rgba(255,255,255,0.3); }
        .wbs-input:focus {
          border-color: #36c2ac;
          box-shadow: 0 0 0 3px rgba(54,194,172,0.15);
        }
        .wbs-error {
          background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3);
          border-radius: 8px; padding: 9px 12px;
          font-size: 12px; color: #fca5a5; margin-bottom: 14px;
        }
        .wbs-start-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(180deg, #36c2ac 0%, #0061aa 100%);
          border: none; border-radius: 10px; color: #fff;
          font-size: 14px; font-weight: 600; letter-spacing: 0.04em;
          cursor: pointer; transition: opacity 0.2s, transform 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 16px rgba(54,194,172,0.3);
          font-family: inherit;
        }
        .wbs-start-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .wbs-start-btn:active { transform: translateY(0); }

        /* ── MESSAGES ── */
        .wbs-messages {
          flex: 1; overflow-y: auto; padding: 16px;
          display: flex; flex-direction: column; gap: 12px;
          background: #1d2b48;
          scrollbar-width: thin;
          scrollbar-color: rgba(54,194,172,0.2) transparent;
        }
        .wbs-msg-row {
          display: flex; gap: 8px; align-items: flex-end;
          animation: msgAppear 0.3s cubic-bezier(.22,1,.36,1) both;
        }
        .wbs-msg-row.user { flex-direction: row-reverse; }
        @keyframes msgAppear {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .wbs-msg-avatar {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 14px;
        }
        .wbs-msg-avatar.bot {
          background: linear-gradient(135deg, #36c2ac, #0061aa);
        }
        .wbs-msg-avatar.user {
          background: rgba(255,255,255,0.08);
        }

        .wbs-bubble {
          max-width: 78%; padding: 10px 14px;
          font-size: 13.5px; line-height: 1.6; border-radius: 16px;
        }
        .wbs-bubble.bot {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.9);
          border-bottom-left-radius: 4px;
        }
        .wbs-bubble.user {
          background: linear-gradient(135deg, #36c2ac, #0061aa);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .wbs-bubble p { margin: 0; }
        .wbs-bubble strong { color: #fff; }
        .wbs-bubble code {
          background: rgba(0,0,0,0.25); border-radius: 4px;
          padding: 1px 5px; font-size: 12px;
        }

        /* ── INPUT ── */
        .wbs-input-area {
          padding: 12px 14px 14px;
          background: #1d2b48;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex; gap: 8px; align-items: center;
          flex-shrink: 0;
        }
        .wbs-msg-input {
          flex: 1; min-width: 0;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 11px 14px;
          color: #fff; font-size: 13.5px; font-family: inherit;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          resize: none;
        }
        .wbs-msg-input::placeholder { color: rgba(255,255,255,0.3); }
        .wbs-msg-input:focus {
          border-color: rgba(54,194,172,0.5);
          box-shadow: 0 0 0 3px rgba(54,194,172,0.1);
        }
        .wbs-send-btn {
          width: 40px; height: 40px; flex-shrink: 0;
          border-radius: 12px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #36c2ac, #0061aa);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 12px rgba(54,194,172,0.35);
        }
        .wbs-send-btn:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(54,194,172,0.5); }
        .wbs-send-btn:active { transform: scale(0.95); }
        .wbs-send-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

        /* ── FAB ── */
        .wbs-fab {
          position: fixed; bottom: 20px; right: 20px;
          width: 56px; height: 56px; border-radius: 50%; border: none;
          background: linear-gradient(135deg, #36c2ac, #0061aa);
          color: white; font-size: 22px; cursor: pointer; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 24px rgba(54,194,172,0.45);
          transition: transform 0.2s, box-shadow 0.2s;
          animation: fabPulse 3s infinite;
        }
        .wbs-fab:hover { transform: scale(1.1); box-shadow: 0 10px 32px rgba(54,194,172,0.55); }
        .wbs-fab:active { transform: scale(0.95); }
        @keyframes fabPulse {
          0%,100% { box-shadow: 0 6px 24px rgba(54,194,172,0.45); }
          50%      { box-shadow: 0 6px 32px rgba(54,194,172,0.7);  }
        }

        .wbs-fab-badge {
          position: absolute; top: -2px; right: -2px;
          width: 14px; height: 14px; border-radius: 50%;
          background: #36c2ac; border: 2px solid #1d2b48;
          box-shadow: 0 0 6px #36c2ac;
          animation: statusBlink 2s ease-in-out infinite;
        }

        @media (max-width: 400px) {
          .wbs-chat-window { width: calc(100vw - 24px); right: 12px; }
        }
      `}</style>

      {/* ── FAB ── */}
      <button className="wbs-fab" onClick={() => setIsOpen(!isOpen)} aria-label="Abrir chat">
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
        {!isOpen && <span className="wbs-fab-badge" />}
      </button>

      {/* ── JANELA DO CHAT ── */}
      {isOpen && (
        <div className="wbs-chat-window">

          {/* Header */}
          <div className="wbs-header">
            <div className="wbs-avatar">🧑‍💻</div>
            <div className="wbs-header-info">
              <div className="wbs-header-name">WebuildSites</div>
              <div className="wbs-header-status">
                <span className="wbs-status-dot" />
                Assistente online agora
              </div>
            </div>
            <div className="wbs-header-actions">
              {isIdentified && (
                <button
                  className="wbs-btn-icon danger"
                  onClick={handleReset}
                  title="Encerrar conversa"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                </button>
              )}
              <button
                className="wbs-btn-icon"
                onClick={() => setIsOpen(false)}
                title="Minimizar"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── TELA DE IDENTIFICAÇÃO ── */}
          {!isIdentified ? (
            <div className="wbs-identify">
              <div className="wbs-identify-title">Antes de começarmos 👋</div>
              <div className="wbs-identify-sub">
                Precisamos de algumas informações para personalizar seu atendimento.
              </div>

              <div className="wbs-field">
                <label className="wbs-label">Seu nome</label>
                <input
                  className="wbs-input"
                  type="text"
                  placeholder="Ex: João Silva"
                  value={userData.name}
                  onChange={(e) => { setUserData({ ...userData, name: e.target.value }); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleStartChat()}
                />
              </div>

              <div className="wbs-field">
                <label className="wbs-label">Seu e-mail</label>
                <input
                  className="wbs-input"
                  type="email"
                  placeholder="Ex: joao@email.com"
                  value={userData.email}
                  onChange={(e) => { setUserData({ ...userData, email: e.target.value }); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleStartChat()}
                />
              </div>

              {error && <div className="wbs-error">⚠️ {error}</div>}

              <button className="wbs-start-btn" onClick={handleStartChat}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
                Iniciar conversa
              </button>
            </div>
          ) : (
            <>
              {/* ── MENSAGENS ── */}
              <div className="wbs-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`wbs-msg-row ${msg.role}`}>
                    <div className={`wbs-msg-avatar ${msg.role}`}>
                      {msg.role === "assistant" ? "🧑‍💻" : "👤"}
                    </div>
                    <div className={`wbs-bubble ${msg.role}`}>
                      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="wbs-msg-row">
                    <div className="wbs-msg-avatar bot">🧑‍💻</div>
                    <div className="wbs-bubble bot">
                      <TypingIndicator isProposal={isSendingProposal} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ── INPUT ── */}
              <div className="wbs-input-area">
                <input
                  className="wbs-msg-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  className="wbs-send-btn"
                  onClick={sendMessage}
                  disabled={loading || !message.trim()}
                  aria-label="Enviar"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}