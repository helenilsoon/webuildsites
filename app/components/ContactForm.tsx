'use client';

import { openWhatsApp } from "@/lib/whatsapp";

const steps = [
  {
    num: "1",
    title: "Clique no botão do chat",
    desc: "O chatbot abre no canto da tela, pronto para te atender.",
  },
  {
    num: "2",
    title: "Descreva seu projeto",
    desc: "Conte o que você precisa: site, e-commerce, landing page ou redesign.",
  },
  {
    num: "3",
    title: "Receba seu orçamento",
    desc: "Nossa equipe analisa e retorna com uma proposta personalizada rapidinho.",
  },
];

const features = ["Resposta imediata", "Sem formulário", "Orçamento rápido", "100% gratuito"];

export default function ContatoSection() {
  // 🔥 Dispara evento que o FloatingChat escuta para abrir
  function openChat() {
    window.dispatchEvent(new Event("open-floating-chat"));
  }

  return (
    <section id="contato" style={{ backgroundColor: "#1d2b48", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── Título ── */}
        <h2 className="section-title">
          Fale agora com nosso{" "}
          <span style={{ color: "#36c2ac" }}>assistente com IA</span>
        </h2>
        <p className="section-subtitle">
          Sem formulário. Sem espera. Nosso assistente responde na hora sobre
          orçamentos, prazos e serviços — 24 horas por dia.
        </p>

        {/* ── Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          alignItems: "center",
        }}>

          {/* ── ESQUERDA: passos ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", lineHeight: 1.35 }}>
                Como funciona o{" "}
                <span style={{ color: "#36c2ac" }}>nosso atendimento?</span>
              </h3>
              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                Em vez de preencher um formulário, você conversa diretamente
                com nosso assistente e já recebe as respostas que precisa — na hora!
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="card"
                  style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem 1.25rem" }}
                >
                  <div style={{
                    width: "2.25rem", height: "2.25rem", minWidth: "2.25rem",
                    borderRadius: "0.625rem",
                    background: "linear-gradient(180deg, #36c2ac 0%, #0061aa 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "0.875rem", color: "#fff",
                  }}>
                    {step.num}
                  </div>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.2rem" }}>
                      {step.title}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── DIREITA: card ── */}
          <div style={{ position: "relative" }}>
            {/* glow */}
            <div style={{
              position: "absolute", inset: 0, display: "flex",
              alignItems: "center", justifyContent: "center", pointerEvents: "none",
            }}>
              <div style={{
                width: "18rem", height: "18rem", borderRadius: "9999px",
                background: "#36c2ac", filter: "blur(80px)", opacity: 0.15,
              }} />
            </div>

            <div style={{
              position: "relative",
              backgroundColor: "#0061aa",
              borderRadius: "1.25rem",
              border: "1px solid rgba(54,194,172,0.3)",
              padding: "2.5rem 2rem",
              textAlign: "center",
              boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
            }}>

              {/* Ícone com pulso */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: "5rem", height: "5rem", borderRadius: "9999px",
                    background: "linear-gradient(180deg, #36c2ac 0%, #0061aa 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "chatPulse 2.5s infinite",
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                      <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                    </svg>
                  </div>
                  <span style={{
                    position: "absolute", bottom: "2px", right: "2px",
                    width: "1rem", height: "1rem", borderRadius: "9999px",
                    backgroundColor: "#36c2ac", border: "2px solid #0061aa",
                    boxShadow: "0 0 8px #36c2ac",
                    animation: "dotBlink 2s ease-in-out infinite",
                  }} />
                </div>
              </div>

              {/* Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                backgroundColor: "rgba(54,194,172,0.12)",
                border: "1px solid rgba(54,194,172,0.35)",
                borderRadius: "9999px", padding: "0.3rem 1rem",
                fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em",
                color: "#36c2ac", marginBottom: "1.25rem",
              }}>
                <span style={{
                  width: "0.45rem", height: "0.45rem", borderRadius: "9999px",
                  backgroundColor: "#36c2ac", boxShadow: "0 0 6px #36c2ac",
                  animation: "dotBlink 2s ease-in-out infinite",
                }} />
                Assistente Online Agora
              </div>

              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.2rem", lineHeight: 1.35, marginBottom: "0.75rem" }}>
                Prefere conversar ao invés<br />de preencher formulários?
              </h3>

              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Nosso chatbot responde na hora sobre orçamentos, serviços e
                prazos. É rápido, simples e sem burocracia!
              </p>

              {/* ── Botão que abre o FloatingChat ── */}
              <button
                onClick={openChat}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                  background: "linear-gradient(180deg, #36c2ac 0%, #0061aa 100%)",
                  color: "#fff", fontWeight: 600, fontSize: "0.95rem",
                  padding: "1rem 1.5rem", borderRadius: "0.75rem", border: "none",
                  cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase",
                  boxShadow: "0 1px 4px rgba(12,12,12,0.2), 0 0 20px rgba(54,194,172,0.25)",
                  transition: "all 0.3s", marginBottom: "1rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(54,194,172,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(12,12,12,0.2), 0 0 20px rgba(54,194,172,0.25)";
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
                Iniciar Conversa Agora
              </button>

              {/* WhatsApp secundário */}
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", marginBottom: "0.5rem" }}>
                Prefere o WhatsApp?{" "}
                <button
                  type="button"
                  onClick={() => openWhatsApp('Olá! Vim pelo site e gostaria de um orçamento.')}
                  style={{ color: "#61ce70", textDecoration: "none", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  Falar no WhatsApp Comercial →
                </button>
              </p>

              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
                Ou envie um e-mail para{" "}
                <a
                  href="mailto:contato@webuildsites.com.br"
                  style={{ color: "#36c2ac", textDecoration: "none", fontWeight: 500 }}
                >
                  contato@webuildsites.com.br
                </a>
              </p>

              {/* Chips */}
              <div style={{
                display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center",
                marginTop: "1.75rem", paddingTop: "1.25rem",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}>
                {features.map((f) => (
                  <span key={f} style={{
                    display: "inline-flex", alignItems: "center", gap: "0.35rem",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "9999px", padding: "0.3rem 0.75rem",
                    fontSize: "0.7rem", color: "rgba(255,255,255,0.65)",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="#36c2ac" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes chatPulse {
          0%   { box-shadow: 0 0 0 0    rgba(54,194,172,0.55); }
          70%  { box-shadow: 0 0 0 22px rgba(54,194,172,0);    }
          100% { box-shadow: 0 0 0 0    rgba(54,194,172,0);    }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1;   transform: scale(1);    }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}