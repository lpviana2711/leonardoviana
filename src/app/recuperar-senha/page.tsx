"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { KeyRound, Mail, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // Ajuste conforme seu caminho

export default function RecuperarSenhaPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // O redirectTo deve ser a página onde o usuário vai definir a nova senha
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8 space-y-6">
        
        {!success ? (
          <>
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mx-auto">
                <KeyRound size={32} />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Recupere sua senha</h1>
              <p className="text-slate-500 text-sm">Enviaremos um link de redefinição para o seu e-mail.</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">E-mail de acesso</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="exemplo@fisioterapia.com" 
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50/50" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-indigo-100 disabled:opacity-70 text-sm"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Enviar link de recuperação"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-4 animate-in fade-in duration-300">
            <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-2xl mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Verifique seu e-mail</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Enviamos um link de redefinição para <strong className="text-slate-700">{email}</strong>. 
              Siga as instruções para criar uma nova senha.
            </p>
          </div>
        )}

        <div className="text-center pt-2 border-t border-slate-100">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={16} />
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}