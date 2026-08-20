"use client";

import { useState, useTransition } from "react";
import { DocumentTextIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import { deleteProposalAction } from "../actions";

import { AdminProposal } from "@/lib/admin/db";

interface ProposalsTabProps {
  proposals: AdminProposal[];
}

export default function ProposalsTab({ proposals: initialProposals }: ProposalsTabProps) {
  const [search, setSearch] = useState("");
  const [selectedProposal, setSelectedProposal] = useState<AdminProposal | null>(null);
  const [isPending, startTransition] = useTransition();

  const proposals = initialProposals;

  const filteredProposals = proposals.filter((proposal) => {
    const s = search.toLowerCase();
    return (
      (proposal.clientName || "").toLowerCase().includes(s) ||
      (proposal.clientEmail || "").toLowerCase().includes(s) ||
      (proposal.content || "").toLowerCase().includes(s)
    );
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta proposta comercial?")) {
      return;
    }
    startTransition(async () => {
      const result = await deleteProposalAction(id);
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
          placeholder="Buscar propostas por nome ou email do cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-md px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#36c2ac] focus:border-transparent transition-all"
        />
        <span className="text-sm text-white/50">
          Mostrando {filteredProposals.length} de {proposals.length} propostas
        </span>
      </div>

      {/* Table Card */}
      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#1d2b48]/60 backdrop-blur-sm shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-white/60 text-xs font-semibold uppercase tracking-wider bg-white/5">
              <th className="px-6 py-4">Data de Envio</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Prévia da Proposta</th>
              <th className="px-6 py-4">Visualização</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filteredProposals.map((proposal) => {
              return (
                <tr key={proposal.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white/70">
                    {new Date(proposal.sentAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {proposal.clientName}
                  </td>
                  <td className="px-6 py-4 text-white/80">
                    {proposal.clientEmail}
                  </td>
                  <td className="px-6 py-4 text-white/50 max-w-xs truncate">
                    {proposal.content.substring(0, 60)}...
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedProposal(proposal)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#36c2ac]/10 text-[#36c2ac] border border-[#36c2ac]/20 hover:bg-[#36c2ac]/20 transition-all text-xs font-medium cursor-pointer"
                    >
                      <DocumentTextIcon className="w-4 h-4" />
                      Ver Documento
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(proposal.id)}
                      disabled={isPending}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all disabled:opacity-50 cursor-pointer"
                      title="Excluir proposta"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredProposals.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-white/40">
                  Nenhuma proposta gerada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Proposal Viewer Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-[#1d2b48] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Visualizador de Proposta Comercial</h3>
                <p className="text-xs text-white/50 mt-1">
                  Cliente: <span className="font-semibold text-[#36c2ac]">{selectedProposal.clientName}</span> ({selectedProposal.clientEmail})
                </p>
              </div>
              <button
                onClick={() => setSelectedProposal(null)}
                className="p-1.5 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable Rendered Markdown) */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#121b2d]/60 text-white/90">
              <div className="prose prose-invert max-w-none space-y-4">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="text-2xl font-bold text-[#36c2ac] border-b border-white/10 pb-2 mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-semibold text-white/95 mt-6 mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">{children}</h3>,
                    p: ({ children }) => <p className="text-sm text-white/80 leading-relaxed mb-4">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside space-y-1.5 text-sm text-white/80 mb-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside space-y-1.5 text-sm text-white/80 mb-4">{children}</ol>,
                    li: ({ children }) => <li className="text-sm text-white/85">{children}</li>,
                    hr: () => <hr className="border-white/10 my-6" />,
                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                  }}
                >
                  {selectedProposal.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedProposal(null)}
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
