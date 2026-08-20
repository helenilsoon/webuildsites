import { EyeIcon, UserPlusIcon, DocumentTextIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { AdminStats } from "@/lib/admin/db";

interface StatsGridProps {
  stats: AdminStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const items = [
    {
      name: "Total de Visitas",
      value: stats.totalVisits,
      icon: EyeIcon,
      color: "from-[#0061aa]/10 to-[#0061aa]/30",
      textColor: "text-blue-400",
    },
    {
      name: "Leads Capturados",
      value: stats.totalLeads,
      icon: UserPlusIcon,
      color: "from-[#61ce70]/10 to-[#61ce70]/30",
      textColor: "text-emerald-400",
    },
    {
      name: "Propostas Emitidas",
      value: stats.totalProposals,
      icon: DocumentTextIcon,
      color: "from-[#36c2ac]/10 to-[#36c2ac]/30",
      textColor: "text-[#36c2ac]",
    },
    {
      name: "Taxa de Conversão",
      value: `${stats.conversionRate}%`,
      icon: ChartBarIcon,
      color: "from-purple-500/10 to-purple-500/30",
      textColor: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.name}
            className={`p-6 rounded-2xl border border-white/5 bg-gradient-to-br ${item.color} shadow-lg backdrop-blur-sm hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                  {item.name}
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {item.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-white/5 ${item.textColor}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
