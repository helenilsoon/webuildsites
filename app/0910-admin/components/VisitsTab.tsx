"use client";

import { useState } from "react";
import { DevicePhoneMobileIcon, ComputerDesktopIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

import { AdminVisit } from "@/lib/admin/db";

interface VisitsTabProps {
  visits: AdminVisit[];
}

export default function VisitsTab({ visits: initialVisits }: VisitsTabProps) {
  const [search, setSearch] = useState("");

  const visits = initialVisits;

  const filteredVisits = visits.filter((visit) => {
    const s = search.toLowerCase();
    return (
      (visit.ip || "").toLowerCase().includes(s) ||
      (visit.path || "").toLowerCase().includes(s) ||
      (visit.browser || "").toLowerCase().includes(s) ||
      (visit.os || "").toLowerCase().includes(s) ||
      (visit.country || "").toLowerCase().includes(s) ||
      (visit.city || "").toLowerCase().includes(s) ||
      (visit.referer || "").toLowerCase().includes(s)
    );
  });

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Buscar visitas por IP, página, navegador, país, referer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-md px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#36c2ac] focus:border-transparent transition-all"
        />
        <span className="text-sm text-white/50">
          Mostrando {filteredVisits.length} de {visits.length} visitas recentes
        </span>
      </div>

      {/* Table Card */}
      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#1d2b48]/60 backdrop-blur-sm shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-white/60 text-xs font-semibold uppercase tracking-wider bg-white/5">
              <th className="px-6 py-4">Data/Hora</th>
              <th className="px-6 py-4">IP</th>
              <th className="px-6 py-4">Localização</th>
              <th className="px-6 py-4">Dispositivo / SO / Browser</th>
              <th className="px-6 py-4">Página</th>
              <th className="px-6 py-4">Origem (Referer)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filteredVisits.map((visit) => {
              const isMobile = visit.device?.toLowerCase() === "mobile" || visit.device?.toLowerCase() === "tablet";
              return (
                <tr key={visit.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white/70">
                    {new Date(visit.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-white/90">
                    {visit.ip || "unknown"}
                  </td>
                  <td className="px-6 py-4 text-white/80 space-y-0.5">
                    {visit.city || visit.country ? (
                      <div className="flex items-center gap-1.5">
                        <GlobeAltIcon className="w-4 h-4 text-[#36c2ac]" />
                        <span>
                          {visit.city && `${visit.city}, `}
                          {visit.country || "Desconhecido"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-white/40">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white/70">
                    <div className="flex items-center gap-2">
                      {isMobile ? (
                        <DevicePhoneMobileIcon className="w-4 h-4 text-white/50" />
                      ) : (
                        <ComputerDesktopIcon className="w-4 h-4 text-white/50" />
                      )}
                      <span>
                        {visit.os || "Desconhecido"} • {visit.browser || "Desconhecido"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-white/90">
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[#36c2ac]">
                      {visit.path || "/"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/50 max-w-xs truncate" title={visit.referer || "direct"}>
                    {visit.referer || "Acesso Direto"}
                  </td>
                </tr>
              );
            })}
            {filteredVisits.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-white/40">
                  Nenhuma visita encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
