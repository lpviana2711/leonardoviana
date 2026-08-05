"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // O Supabase usa o token que já está na URL (hash) automaticamente
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      // Redireciona para o login após 2 segundos
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-8 space-y-6">
        {!success ? (
          <>
            <h1 className="text-xl font-bold text-slate-800 text-center">Definir nova senha</h1>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required 
                  type="password" 
                  placeholder="Digite sua nova senha"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50/50"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Atualizar senha"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 animate-in fade-in">
            <CheckCircle2 className="mx-auto text-emerald-500" size={48} />
            <h2 className="text-xl font-bold text-slate-800">Senha atualizada com sucesso!</h2>
            <p className="text-sm text-slate-500">Redirecionando para o login...</p>
          </div>
        )}
      </div>
    </div>
  );
}