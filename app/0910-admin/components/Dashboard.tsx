"use client";

import { useState, useTransition } from "react";
import {
  UserGroupIcon,
  EyeIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { logoutAction } from "../actions";
import StatsGrid from "./StatsGrid";
import LeadsTab from "./LeadsTab";
import VisitsTab from "./VisitsTab";
import ProposalsTab from "./ProposalsTab";

import { AdminStats, AdminLead, AdminVisit, AdminProposal } from "@/lib/admin/db";

interface DashboardProps {
  stats: AdminStats;
  leads: AdminLead[];
  visits: AdminVisit[];
  proposals: AdminProposal[];
}

export default function Dashboard({ stats, leads, visits, proposals }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"leads" | "visits" | "proposals">("leads");
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  const tabs = [
    { id: "leads", name: "Leads & Conversas", icon: UserGroupIcon },
    { id: "visits", name: "Registro de Visitas", icon: EyeIcon },
    { id: "proposals", name: "Propostas Comerciais", icon: DocumentTextIcon },
  ] as const;

  return (
    <div className="min-h-screen bg-[#121b2d] text-white">
      {/* Premium Header */}
      <header className="border-b border-white/5 bg-[#1d2b48]/35 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#36c2ac] to-[#0061aa] flex items-center justify-center font-bold text-white shadow-lg shadow-[#36c2ac]/10">
              W
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                Webuild<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#36c2ac] to-[#0061aa]">Sites</span>
              </h1>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                Painel Administrativo
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={isPending}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/10 hover:border-red-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Sair
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Tab Navigation */}
        <div className="flex border-b border-white/5 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 font-semibold text-sm transition-all cursor-pointer ${
                  isActive
                    ? "border-[#36c2ac] text-[#36c2ac]"
                    : "border-transparent text-white/60 hover:text-white/80 hover:border-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="py-2">
          {activeTab === "leads" && <LeadsTab leads={leads} />}
          {activeTab === "visits" && <VisitsTab visits={visits} />}
          {activeTab === "proposals" && <ProposalsTab proposals={proposals} />}
        </div>
      </main>
    </div>
  );
}
