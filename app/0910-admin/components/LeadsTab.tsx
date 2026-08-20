"use client";

import { useState, useTransition } from "react";
import { ChatBubbleLeftRightIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { deleteLeadAction } from "../actions";

import { AdminLead, AdminConversation } from "@/lib/admin/db";

interface LeadsTabProps {
  leads: AdminLead[];
}

export default function LeadsTab({ leads: initialLeads }: LeadsTabProps) {
  const [search, setSearch] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<AdminConversation | null>(null);
  const [isPending, startTransition] = useTransition();

  const leads = initialLeads;

  const filteredLeads = leads.filter((lead) => {
    const s = search.toLowerCase();
    return (
      (lead.name || "").toLowerCase().includes(s) ||
      (lead.email || "").toLowerCase().includes(s) ||
      (lead.whatsapp || "").toLowerCase().includes(s) ||
      (lead.project || "").toLowerCase().includes(s)
    );
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este lead e todo o seu histórico de conversas?")) {
      return;
    }
    startTransition(async () => {
      const result = await deleteLeadAction(id);
      if (!result.success) {
        alert(result.error);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Buscar leads por nome, email, whatsapp ou projeto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-md px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#36c2ac] focus:border-transparent transition-all"
        />
        <span className="text-sm text-white/50">
          Mostrando {filteredLeads.length} de {leads.length} leads
        </span>
      </div>

      {/* Table Card */}
      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#1d2b48]/60 backdrop-blur-sm shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-white/60 text-xs font-semibold uppercase tracking-wider bg-white/5">
              <th className="px-6 py-4">Data</th>
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">Contato</th>
              <th className="px-6 py-4">Serviço/Projeto</th>
              <th className="px-6 py-4">Conversas</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filteredLeads.map((lead) => {
              const mainConversation = lead.conversations[0];
              const hasMessages = mainConversation?.messages?.length > 0;
              return (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white/70">
                    {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {lead.name || "Sem Nome"}
                  </td>
                  <td className="px-6 py-4 text-white/70 space-y-1">
                    <div>{lead.email || "Sem Email"}</div>
                    {lead.whatsapp && (
                      <div className="text-[#61ce70] font-medium">{lead.whatsapp}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white/80 max-w-xs truncate">
                    {lead.project || "Não informado"}
                  </td>
                  <td className="px-6 py-4">
                    {hasMessages ? (
                      <button
                        onClick={() => setSelectedConversation(mainConversation)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#36c2ac]/10 text-[#36c2ac] border border-[#36c2ac]/20 hover:bg-[#36c2ac]/20 transition-all text-xs font-medium cursor-pointer"
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                        Histórico ({mainConversation.messages.length})
                      </button>
                    ) : (
                      <span className="text-white/40 text-xs">Sem interação</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(lead.id)}
                      disabled={isPending}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all disabled:opacity-50 cursor-pointer"
                      title="Excluir lead"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-white/40">
                  Nenhum lead encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Chat History Modal */}
      {selectedConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#1d2b48] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Histórico do Chat</h3>
                <p className="text-xs text-white/50 mt-1">ID: {selectedConversation.id}</p>
              </div>
              <button
                onClick={() => setSelectedConversation(null)}
                className="p-1.5 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable Chat) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#121b2d]/60">
              {selectedConversation.messages.map((message) => {
                const isAssistant = message.role === "assistant";
                return (
                  <div
                    key={message.id}
                    className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                        isAssistant
                          ? "bg-white/5 text-white border border-white/5"
                          : "bg-gradient-to-r from-[#36c2ac] to-[#0061aa] text-white"
                      }`}
                    >
                      <div className="font-semibold text-[10px] uppercase tracking-wider text-white/40 mb-1">
                        {isAssistant ? "Assistente IA" : "Lead / Visitante"}
                      </div>
                      <div className="whitespace-pre-wrap">{message.text}</div>
                    </div>
                    <span className="text-[10px] text-white/30 mt-1 px-2">
                      {new Date(message.createdAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}
              {selectedConversation.messages.length === 0 && (
                <p className="text-center text-white/40 py-8 text-sm">
                  Nenhuma mensagem registrada na conversa.
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedConversation(null)}
                className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
