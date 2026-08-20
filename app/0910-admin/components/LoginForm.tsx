"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#121b2d] via-[#1d2b48] to-[#0061aa] px-4 relative overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#36c2ac]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0061aa]/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Área Administrativa
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Acesse o painel para gerenciar a WebuildSites
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Usuário
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1d2b48]/60 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#36c2ac] focus:border-transparent transition-all"
              placeholder="Digite seu usuário"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Senha
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1d2b48]/60 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#36c2ac] focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {state?.error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm text-center">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#36c2ac] to-[#0061aa] hover:from-[#36c2ac]/90 hover:to-[#0061aa]/90 shadow-lg shadow-[#36c2ac]/20 transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Entrando...
              </>
            ) : (
              "Entrar no Painel"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
