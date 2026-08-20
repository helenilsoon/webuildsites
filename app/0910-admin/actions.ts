"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { verifyCredentials, signToken, verifyToken } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

// Helper para verificar se o usuário está autenticado no Server Action
async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function loginAction(prevState: unknown, formData: FormData) {
  try {
    const rawUsername = formData.get("username");
    const rawPassword = formData.get("password");

    const validated = loginSchema.safeParse({
      username: rawUsername,
      password: rawPassword,
    });

    if (!validated.success) {
      return { success: false, error: "Preencha todos os campos corretamente." };
    }

    const { username, password } = validated.data;

    const isValid = verifyCredentials(username, password);
    if (!isValid) {
      return { success: false, error: "Usuário ou senha incorretos." };
    }

    const token = signToken({ username });
    
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 2 * 60 * 60, // 2 horas
    });

    revalidatePath("/0910-admin");
    return { success: true };
  } catch (error) {
    console.error("Erro no loginAction:", error);
    return { success: false, error: "Ocorreu um erro interno no servidor." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  revalidatePath("/0910-admin");
  return { success: true };
}

export async function deleteLeadAction(leadId: string) {
  if (!(await isAuthenticated())) {
    return { success: false, error: "Não autorizado." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Busca todas as conversas desse lead
      const conversations = await tx.conversation.findMany({
        where: { leadId },
        select: { id: true },
      });

      const conversationIds = conversations.map((c) => c.id);

      if (conversationIds.length > 0) {
        // 2. Deleta as mensagens associadas a essas conversas
        await tx.message.deleteMany({
          where: { conversationId: { in: conversationIds } },
        });

        // 3. Deleta as propostas associadas a essas conversas
        await tx.proposal.deleteMany({
          where: { conversationId: { in: conversationIds } },
        });

        // 4. Deleta as conversas
        await tx.conversation.deleteMany({
          where: { id: { in: conversationIds } },
        });
      }

      // 5. Deleta o lead
      await tx.lead.delete({
        where: { id: leadId },
      });
    });

    revalidatePath("/0910-admin");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar lead:", error);
    return { success: false, error: "Erro ao excluir o lead e suas conversas do banco." };
  }
}

export async function deleteProposalAction(proposalId: string) {
  if (!(await isAuthenticated())) {
    return { success: false, error: "Não autorizado." };
  }

  try {
    await prisma.proposal.delete({
      where: { id: proposalId },
    });

    revalidatePath("/0910-admin");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar proposta:", error);
    return { success: false, error: "Erro ao excluir a proposta comercial do banco." };
  }
}
