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
  // ── Leitura inicial do sessionStorage ──
  const [isOpen, setIsOpen] = useState(false);
  const [isIdentified, setIsIdentified] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("wbs_identified") || "false"); } catch { return false; }
  });
  const [isSendingProposal, setIsSendingProposal] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(() => {
    try { return sessionStorage.getItem("wbs_conv_id"); } catch { return null; }
  });
  const [userData, setUserData] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("wbs_user") || "{}") || { name: "", email: "", whatsapp: "" }; } catch { return { name: "", email: "", whatsapp: "" }; }
  });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = sessionStorage.getItem("wbs_messages");
      return saved ? JSON.parse(saved) : [{ role: "assistant", text: "Olá 👋 Sou o assistente da WebuildSites! Como posso ajudar você hoje?" }];
    } catch {
      return [{ role: "assistant", text: "Olá 👋 Sou o assistente da WebuildSites! Como posso ajudar você hoje?" }];
    }
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const wasLoadingRef = useRef(false);

  // ── Sincronização com sessionStorage ──
  useEffect(() => {
    try { sessionStorage.setItem("wbs_identified", JSON.stringify(isIdentified)); } catch {}
  }, [isIdentified]);

  useEffect(() => {
    try { sessionStorage.setItem("wbs_user", JSON.stringify(userData)); } catch {}
  }, [userData]);

  useEffect(() => {
    try { sessionStorage.setItem("wbs_messages", JSON.stringify(messages)); } catch {}
  }, [messages]);

  useEffect(() => {
    try {
      if (conversationId) sessionStorage.setItem("wbs_conv_id", conversationId);
    } catch {}
  }, [conversationId]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Detecta quando a IA terminou de escrever com o chat fechado → mostra toast
  useEffect(() => {
    if (wasLoadingRef.current && !loading && !isOpen) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.role === "assistant") {
        setToastMessage("💬 Nova mensagem do Assistente!");
        setShowToast(true);
        setUnreadCount((c) => c + 1);
      }
    }
    wasLoadingRef.current = loading;
  }, [loading, isOpen, messages]);

  // Escuta evento do botão na seção de contato
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setShowToast(false);
    };
    window.addEventListener("open-floating-chat", handleOpenChat);
    return () => window.removeEventListener("open-floating-chat", handleOpenChat);
  }, []);

  // Notificação de desengajamento quando o usuário troca de aba do navegador
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isOpen) {
        if (isIdentified || messages.length > 1) {
          setToastMessage(
            userData.name
              ? `💬 ${userData.name}, continue seu orçamento!`
              : "👋 Estamos online! Clique para continuar seu orçamento."
          );
          setShowToast(true);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isOpen, isIdentified, messages.length, userData.name]);

  const handleToggleChat = () => {
    if (isOpen) {
      handleMinimize();
    } else {
      setIsOpen(true);
      setShowToast(false);
      setUnreadCount(0);
    }
  };

  const handleMinimize = () => {
    setIsOpen(false);
    if (isIdentified || messages.length > 1) {
      setToastMessage(
        userData.name
          ? `💬 ${userData.name}, continue seu orçamento!`
          : "💬 Clique para continuar seu orçamento!"
      );
      setShowToast(true);
    }
  };

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

  const handleQuickReply = (quickText: string) => {
    if (loading) return;
    const userMessage: Message = { role: "user", text: quickText };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);
    setIsSendingProposal(quickText.trim().toLowerCase() === "proposta");

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages, userData, conversationId }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          setMessages((prev) => [...prev, { role: "assistant", text: `❌ ${errorData.reply}` }]);
        } else {
          const data = await res.json();
          setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
        }
      })
      .catch(() => {
        setMessages((prev) => [...prev, { role: "assistant", text: "Desculpe, ocorreu um erro. Tente novamente." }]);
      })
      .finally(() => setLoading(false));
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
      setMessages([{ role: "assistant", text: `Prazer, **${userData.name}**! 👋 Como posso ajudar você hoje com seu projeto digital?` }]);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    }
  };

  const handleReset = () => {
    setIsIdentified(false);
    setUserData({ name: "", email: "", whatsapp: "" });
    setMessages([{ role: "assistant", text: "Olá 👋 Sou o assistente da WebuildSites! Como posso ajudar?" }]);
    setError("");
    setMessage("");
    setConversationId(null);
    try {
      sessionStorage.removeItem("wbs_identified");
      sessionStorage.removeItem("wbs_user");
      sessionStorage.removeItem("wbs_messages");
      sessionStorage.removeItem("wbs_conv_id");
    } catch {}
  };

  return (
    <>
      <style>{`
        .wbs-chat-window {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 400px;
          height: 580px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          z-index: 9999;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(54,194,172,0.2);
          animation: chatSlideIn 0.3s cubic-bezier(.22,1,.36,1) both;
          font-family: inherit;
          transition: width 0.35s cubic-bezier(.22,1,.36,1), height 0.35s cubic-bezier(.22,1,.36,1), max-width 0.35s ease, max-height 0.35s ease;
        }
        .wbs-chat-window.in-chat {
          width: 500px;
          height: 700px;
          max-width: calc(100vw - 32px);
          max-height: calc(100vh - 110px);
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }

        /* ── TOAST NOTIFICAÇÃO ── */
        .wbs-toast-notification {
          position: fixed;
          bottom: 86px;
          right: 20px;
          background: rgba(21, 34, 56, 0.95);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(54, 194, 172, 0.45);
          box-shadow: 0 12px 32px rgba(0,0,0,0.4), 0 0 16px rgba(54,194,172,0.25);
          border-radius: 14px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #fff;
          font-size: 12.5px;
          font-weight: 500;
          z-index: 9998;
          cursor: pointer;
          animation: toastSlideIn 0.35s cubic-bezier(.22,1,.36,1) both;
          transition: transform 0.2s, border-color 0.2s;
        }
        .wbs-toast-notification:hover {
          border-color: #36c2ac;
          transform: translateY(-2px);
        }
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .wbs-toast-close {
          background: transparent; border: none;
          color: rgba(255,255,255,0.5); cursor: pointer;
          padding: 2px; display: flex; align-items: center; justify-content: center;
          border-radius: 4px; transition: color 0.2s; font-size: 12px;
        }
        .wbs-toast-close:hover { color: #fff; }

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
          padding: 24px 20px; gap: 0;
        }
        .wbs-identify-title {
          font-size: 17px; font-weight: 700; color: #fff;
          margin-bottom: 4px;
        }
        .wbs-identify-sub {
          font-size: 12.5px; color: rgba(255,255,255,0.55);
          margin-bottom: 18px; line-height: 1.4;
        }
        .wbs-field { margin-bottom: 12px; }
        .wbs-label {
          display: block; font-size: 10.5px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 5px;
        }
        .wbs-input {
          width: 100%; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 10px 12px;
          color: #fff; font-size: 13.5px; font-family: inherit;
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
          border-radius: 8px; padding: 8px 12px;
          font-size: 12px; color: #fca5a5; margin-bottom: 12px;
        }
        .wbs-start-btn {
          width: 100%; padding: 12px;
          background: linear-gradient(180deg, #36c2ac 0%, #0061aa 100%);
          border: none; border-radius: 10px; color: #fff;
          font-size: 13.5px; font-weight: 600; letter-spacing: 0.04em;
          cursor: pointer; transition: opacity 0.2s, transform 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 16px rgba(54,194,172,0.3);
          font-family: inherit;
        }
        .wbs-start-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .wbs-start-btn:active { transform: translateY(0); }
        .wbs-lgpd-note {
          font-size: 11px; color: rgba(255,255,255,0.45);
          text-align: center; margin-top: 10px;
          display: flex; align-items: center; justify-content: center; gap: 4px;
        }

        /* ── MESSAGES ── */
        .wbs-messages {
          flex: 1; overflow-y: auto; padding: 18px 16px;
          display: flex; flex-direction: column; gap: 14px;
          background: 
            radial-gradient(circle at 15% 15%, rgba(54,194,172,0.08) 0%, transparent 40%),
            radial-gradient(circle at 85% 85%, rgba(0,97,170,0.14) 0%, transparent 45%),
            #152238;
          scrollbar-width: thin;
          scrollbar-color: rgba(54,194,172,0.3) transparent;
        }
        .wbs-msg-row {
          display: flex; gap: 10px; align-items: flex-end;
          animation: msgAppear 0.35s cubic-bezier(.22,1,.36,1) both;
        }
        .wbs-msg-row.user { flex-direction: row-reverse; }
        @keyframes msgAppear {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .wbs-msg-avatar {
          width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }
        .wbs-msg-avatar.bot {
          background: linear-gradient(135deg, #36c2ac 0%, #0061aa 100%);
          border: 1px solid rgba(54,194,172,0.4);
          color: #fff;
        }
        .wbs-msg-avatar.user {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.9);
        }

        .wbs-bubble {
          max-width: 82%; padding: 11px 15px;
          font-size: 13.5px; line-height: 1.6; border-radius: 18px;
        }
        .wbs-bubble.bot {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.95);
          border-bottom-left-radius: 4px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .wbs-bubble.user {
          background: linear-gradient(135deg, #36c2ac 0%, #0061aa 100%);
          color: #fff;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 16px rgba(54,194,172,0.25);
        }
        .wbs-bubble p { margin: 0 0 6px 0; }
        .wbs-bubble p:last-child { margin-bottom: 0; }
        .wbs-bubble strong { color: #36c2ac; font-weight: 600; }
        .wbs-bubble.user strong { color: #fff; }
        .wbs-bubble ul, .wbs-bubble ol { margin: 6px 0; padding-left: 18px; }
        .wbs-bubble li { margin-bottom: 4px; }
        .wbs-bubble code {
          background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px; padding: 2px 6px; font-size: 12px; color: #36c2ac;
        }

        /* ── CHIPS DE OPÇÕES RÁPIDAS ── */
        .wbs-chips-container {
          display: flex; overflow-x: auto; gap: 6px;
          padding: 10px 14px; background: rgba(21, 34, 56, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255,255,255,0.06);
          scrollbar-width: none;
        }
        .wbs-chips-container::-webkit-scrollbar { display: none; }
        .wbs-chip {
          background: rgba(54,194,172,0.08);
          border: 1px solid rgba(54,194,172,0.3);
          color: #36c2ac; border-radius: 20px;
          padding: 6px 12px; font-size: 11px; font-weight: 500;
          cursor: pointer; transition: all 0.2s ease;
          white-space: nowrap; flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .wbs-chip:hover {
          background: #36c2ac; color: #1d2b48;
          border-color: #36c2ac; transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(54,194,172,0.35);
        }

        /* ── INPUT ── */
        .wbs-input-area {
          padding: 12px 14px 14px;
          background: #152238;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; gap: 8px; align-items: center;
          flex-shrink: 0;
        }
        .wbs-msg-input {
          flex: 1; min-width: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 11px 14px;
          color: #fff; font-size: 13.5px; font-family: inherit;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          resize: none;
        }
        .wbs-msg-input::placeholder { color: rgba(255,255,255,0.35); }
        .wbs-msg-input:focus {
          border-color: #36c2ac;
          box-shadow: 0 0 0 3px rgba(54,194,172,0.15);
        }
        .wbs-send-btn {
          width: 40px; height: 40px; flex-shrink: 0;
          border-radius: 12px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #36c2ac, #0061aa);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 12px rgba(54,194,172,0.35);
        }
        .wbs-send-btn:hover { transform: scale(1.06); box-shadow: 0 6px 20px rgba(54,194,172,0.5); }
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
          min-width: 14px; height: 14px; border-radius: 50%;
          background: #36c2ac; border: 2px solid #1d2b48;
          box-shadow: 0 0 6px #36c2ac;
          animation: statusBlink 2s ease-in-out infinite;
        }
        .wbs-fab-unread {
          position: absolute; top: -6px; right: -6px;
          min-width: 20px; height: 20px; border-radius: 10px;
          background: #ef4444; border: 2px solid #1d2b48;
          box-shadow: 0 0 8px rgba(239,68,68,0.7);
          animation: chatSlideIn 0.3s cubic-bezier(.22,1,.36,1) both;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: #fff; padding: 0 3px;
        }

        .wbs-toast-notification.new-msg {
          border-color: rgba(54,194,172,0.7);
          box-shadow: 0 12px 32px rgba(0,0,0,0.4), 0 0 24px rgba(54,194,172,0.4);
        }

        @media (max-width: 520px) {
          .wbs-chat-window { width: calc(100vw - 24px); right: 12px; bottom: 80px; }
          .wbs-chat-window.in-chat { width: calc(100vw - 24px); height: calc(100vh - 100px); }
        }
      `}</style>

      {/* ── NOTIFICAÇÃO TOAST AO MINIMIZAR / NOVA MENSAGEM ── */}
      {showToast && !isOpen && (
        <div
          className={`wbs-toast-notification ${unreadCount > 0 ? "new-msg" : ""}`}
          onClick={() => { setIsOpen(true); setShowToast(false); setUnreadCount(0); }}
        >
          {unreadCount > 0 && (
            <span style={{
              background: "linear-gradient(135deg, #36c2ac, #0061aa)",
              borderRadius: "10px",
              padding: "2px 7px",
              fontSize: "10px",
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}>
              +{unreadCount}
            </span>
          )}
          <span>{toastMessage}</span>
          <button
            type="button"
            className="wbs-toast-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowToast(false);
            }}
            title="Fechar notificação"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── FAB ── */}
      <button className="wbs-fab" onClick={handleToggleChat} aria-label="Abrir chat">
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
        {!isOpen && unreadCount > 0 ? (
          <span className="wbs-fab-unread">{unreadCount}</span>
        ) : !isOpen ? (
          <span className="wbs-fab-badge" />
        ) : null}
      </button>

      {/* ── JANELA DO CHAT ── */}
      {isOpen && (
        <div className={`wbs-chat-window ${isIdentified ? "in-chat" : ""}`}>

          {/* Header */}
          <div className="wbs-header">
            <div className="wbs-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
                <rect x="4" y="8" width="16" height="12" rx="2"/>
                <circle cx="9" cy="13" r="1"/>
                <circle cx="15" cy="13" r="1"/>
              </svg>
            </div>
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
                onClick={handleMinimize}
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
                <label className="wbs-label">Seu nome *</label>
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
                <label className="wbs-label">Seu e-mail *</label>
                <input
                  className="wbs-input"
                  type="email"
                  placeholder="Ex: joao@email.com"
                  value={userData.email}
                  onChange={(e) => { setUserData({ ...userData, email: e.target.value }); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleStartChat()}
                />
              </div>

              <div className="wbs-field">
                <label className="wbs-label">Seu WhatsApp (Opcional)</label>
                <input
                  className="wbs-input"
                  type="tel"
                  placeholder="Ex: (92) 99999-9999"
                  value={userData.whatsapp}
                  onChange={(e) => { setUserData({ ...userData, whatsapp: e.target.value }); setError(""); }}
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

              <div className="wbs-lgpd-note">
                🔒 Seus dados estão seguros e não enviamos spam.
              </div>
            </div>
          ) : (
            <>
              {/* ── MENSAGENS ── */}
              <div className="wbs-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`wbs-msg-row ${msg.role}`}>
                    <div className={`wbs-msg-avatar ${msg.role}`}>
                      {msg.role === "assistant" ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
                          <rect x="4" y="8" width="16" height="12" rx="4"/>
                          <circle cx="9" cy="13" r="1.5" fill="currentColor"/>
                          <circle cx="15" cy="13" r="1.5" fill="currentColor"/>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      )}
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
                    <div className="wbs-msg-avatar bot">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
                        <rect x="4" y="8" width="16" height="12" rx="4"/>
                        <circle cx="9" cy="13" r="1.5" fill="currentColor"/>
                        <circle cx="15" cy="13" r="1.5" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="wbs-bubble bot">
                      <TypingIndicator isProposal={isSendingProposal} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ── CHIPS DE OPÇÕES RÁPIDAS ── */}
              <div className="wbs-chips-container">
                <button type="button" className="wbs-chip" onClick={() => handleQuickReply("Quero criar um site institucional")}>
                  🌐 Site Institucional
                </button>
                <button type="button" className="wbs-chip" onClick={() => handleQuickReply("Preciso de uma Landing Page")}>
                  ⚡ Landing Page
                </button>
                <button type="button" className="wbs-chip" onClick={() => handleQuickReply("Quero criar um E-commerce")}>
                  🛒 Loja Virtual
                </button>
                <button type="button" className="wbs-chip" onClick={() => handleQuickReply("Quais os valores dos serviços?")}>
                  💰 Tabela de Preços
                </button>
                {(messages.length >= 4 || messages.some((m) => m.text.toUpperCase().includes("PROPOSTA"))) && (
                  <button type="button" className="wbs-chip" onClick={() => handleQuickReply("PROPOSTA")}>
                    📄 Solicitar Proposta
                  </button>
                )}
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