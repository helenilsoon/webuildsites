import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { validateRequest, leadRequestSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 🔍 Validação de entrada
    const validation = validateRequest(leadRequestSchema, data);
    if (!validation.success) {
      return Response.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    await prisma.lead.create({
      data: validation.data
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error creating lead:', error);
    return Response.json(
      { success: false, error: 'Erro ao processar solicitação' },
      { status: 500 }
    );
  }
}
