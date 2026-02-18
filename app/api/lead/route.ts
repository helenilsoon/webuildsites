import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { validateRequest, leadRequestSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  
  try {
    const data = await request.json();

    const validation = validateRequest(leadRequestSchema, data);
    if (!validation.success) {
      return Response.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const lead = await tx.lead.create({ data: validation.data });
      const conversation = await tx.conversation.create({
        data: { leadId: lead.id }
      });
      return { lead, conversation };
    });

    return Response.json({
      success: true,
      conversationId: result.conversation.id
    });

  } catch (error) {
    console.error("Error creating lead:", error);
    return Response.json(
      { success: false, error: "Erro ao processar solicitação" },
      { status: 500 }
    );
  }
}