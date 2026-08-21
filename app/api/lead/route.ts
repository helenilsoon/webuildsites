import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateRequest, leadRequestSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  
  const rateLimitResult = await rateLimit(request, "lead", 5, 60 * 1000); // 5 cadastros por minuto
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { success: false, error: "Muitas solicitações. Por favor, tente novamente mais tarde." },
      { status: 429 }
    );
  }

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
      let lead = null;

      if (validation.data.email) {
        lead = await tx.lead.findFirst({
          where: { email: validation.data.email },
        });
      }

      if (!lead && validation.data.whatsapp) {
        lead = await tx.lead.findFirst({
          where: { whatsapp: validation.data.whatsapp },
        });
      }

      if (lead) {
        lead = await tx.lead.update({
          where: { id: lead.id },
          data: {
            name: validation.data.name || lead.name,
            email: validation.data.email || lead.email,
            whatsapp: validation.data.whatsapp || lead.whatsapp,
            project: validation.data.project || lead.project,
          },
        });
      } else {
        lead = await tx.lead.create({ data: validation.data });
      }

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