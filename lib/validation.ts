import { z } from 'zod';

// Schema para validação de mensagens do chat
export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  text: z.string()
    .min(1, 'Mensagem não pode estar vazia')
    .max(1000, 'Mensagem muito longa (máximo 1000 caracteres)')
    .refine(text => !/<script|javascript:|on\w+=/i.test(text), {
      message: 'Conteúdo não permitido'
    })
});

// Schema para validação de dados do usuário
export const userDataSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome muito longo (máximo 50 caracteres)')
    .refine(name => /^[a-zA-ZÀ-ÿ\s]+$/.test(name), {
      message: 'Nome deve conter apenas letras'
    }),
  email: z.string()
    .email('Email inválido')
    .max(100, 'Email muito longo')
});

// Schema principal para validação da requisição do chat
export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema)
    .min(1, 'Pelo menos uma mensagem é obrigatória')
    .max(50, 'Número máximo de mensagens excedido'),
  userData: userDataSchema.optional()
});

// Schema para validação de lead
export const leadRequestSchema = userDataSchema.extend({
  whatsapp: z.string().nullable().optional(),
  project: z.string().nullable().optional()
});

// Type inference para TypeScript
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type UserData = z.infer<typeof userDataSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type LeadRequest = z.infer<typeof leadRequestSchema>;

// Função de validação helper
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
} {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues[0]?.message || 'Dados inválidos';
      return { success: false, error: errorMessage };
    }
    return { success: false, error: 'Erro de validação' };
  }
}
