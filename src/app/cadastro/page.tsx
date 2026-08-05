"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, Lock, User, Shield, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // Ajuste conforme seu caminho

export default function CadastroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para os inputs
  const [formData, setFormData] = useState({ name: '', crefito: '', email: '', password: '' });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // 1. Criar o usuário na Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 2. Salvar nome e crefito na tabela 'profiles' usando o ID gerado na Auth
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: authData.user.id, 
            name: formData.name,
            // Nota: Se precisar salvar CREFITO, adicione essa coluna na sua tabela profiles
          }
        ]);

      if (profileError) {
        setError("Usuário criado, mas houve erro ao salvar o perfil: " + profileError.message);
      } else {
        alert("Conta criada com sucesso! Verifique seu e-mail.");
        router.push('/login');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mx-auto">
            <UserPlus size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Crie sua conta</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input required type="text" placeholder="Dr(a). Seu Nome" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50/50" 
                onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">CREFITO</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input required type="text" placeholder="XXXXX-F" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50/50"
                  onChange={(e) => setFormData({...formData, crefito: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input required type="email" placeholder="nome@provedor.com" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50/50"
                  onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input required type="password" placeholder="Mínimo 8 caracteres" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50/50"
                onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-indigo-100 disabled:opacity-70 text-sm"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Finalizar Cadastro"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Já possui cadastro?{' '}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-800">Fazer Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}