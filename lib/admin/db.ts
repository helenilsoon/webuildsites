import { prisma } from "@/lib/prisma";

export interface AdminStats {
  totalVisits: number;
  totalLeads: number;
  totalProposals: number;
  conversionRate: number;
}

export interface AdminMessage {
  id: string;
  conversationId: string;
  role: string;
  text: string;
  createdAt: Date;
}

export interface AdminProposal {
  id: string;
  conversationId: string;
  clientName: string;
  clientEmail: string;
  content: string;
  sentAt: Date;
  createdAt: Date;
}

export interface AdminConversation {
  id: string;
  leadId: string;
  messages: AdminMessage[];
  proposals: AdminProposal[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminLead {
  id: string;
  name: string | null;
  email: string | null;
  whatsapp: string | null;
  project: string | null;
  createdAt: Date;
  conversations: AdminConversation[];
}

export interface AdminVisit {
  id: string;
  ip: string | null;
  path: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  country: string | null;
  city: string | null;
  referer: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Obtém estatísticas gerais do painel
 */
export async function getAdminStats(): Promise<AdminStats> {
  try {
    const [totalVisits, totalLeads, totalProposals] = await Promise.all([
      prisma.visit.count(),
      prisma.lead.count(),
      prisma.proposal.count(),
    ]);

    const conversionRate = totalVisits > 0 ? (totalLeads / totalVisits) * 100 : 0;

    return {
      totalVisits,
      totalLeads,
      totalProposals,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
    };
  } catch (error) {
    console.error("Erro ao carregar estatísticas do admin:", error);
    return {
      totalVisits: 0,
      totalLeads: 0,
      totalProposals: 0,
      conversionRate: 0,
    };
  }
}

/**
 * Obtém as visitas mais recentes (limite de 500)
 */
export async function getAdminVisits(): Promise<AdminVisit[]> {
  try {
    return await prisma.visit.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });
  } catch (error) {
    console.error("Erro ao buscar visitas:", error);
    return [];
  }
}

/**
 * Obtém a lista de leads com conversas e propostas associadas
 */
export async function getAdminLeads(): Promise<AdminLead[]> {
  try {
    return await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        conversations: {
          include: {
            messages: {
              orderBy: { createdAt: "asc" },
            },
            proposals: {
              orderBy: { createdAt: "desc" },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Erro ao buscar leads:", error);
    return [];
  }
}

/**
 * Obtém todas as propostas comerciais geradas
 */
export async function getAdminProposals(): Promise<AdminProposal[]> {
  try {
    return await prisma.proposal.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erro ao buscar propostas:", error);
    return [];
  }
}
