"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign,
  ClipboardType, 
  Stethoscope, 
  Menu, 
  Book,
  Search,
  X,
  LogOut,
  Loader2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Validação de segurança no carregamento do layout
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setCheckingAuth(false);
      }
    };

    checkSession();
  }, [router]);

  const menuItems = [
    { name: 'Painel', href: '/painel', icon: LayoutDashboard },
    { name: 'Pacientes', href: '/pacientes', icon: Users },
    { name: '1ª Avaliação/Anamnese', href: '/avaliacao', icon: ClipboardType },
    { name: 'Atendimentos', href: '/atendimento', icon: Stethoscope },
    { name: 'Agenda', href: '/agenda', icon: Calendar },
    { name: 'Formularios', href: '/formularios', icon: Book },
    { name: 'Testes', href: '/testes', icon: Search },
    { name: 'Notas Fiscais', href: '/faturamento', icon: DollarSign },
  ];

  // Função real de Logout no Supabase
  const handleLogout = async () => {
    if (confirm("Deseja realmente sair do sistema?")) {
      setIsSidebarOpen(false);
      await supabase.auth.signOut();
      router.push('/login');
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* HEADER MOBILE (Apenas o botão de abrir) */}
      <header className="bg-white border-b print:hidden border-slate-200 p-4 flex justify-between items-center md:hidden sticky top-0 z-50">
       <button 

          onClick={() => setIsSidebarOpen(!isSidebarOpen)}

          className="text-slate-600 focus:outline-none"

        >

          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}

        </button>

      </header>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 bg-white border-r print:hidden border-slate-200 w-64 p-5 z-40 transform transition-transform duration-200 ease-in-out flex flex-col justify-between
        md:relative md:transform-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* PARTE DE CIMA DA SIDEBAR */}
        <div className="space-y-6">
          
          {/* TOPO DA SIDEBAR: LOGO + BOTÃO DE FECHAR NO MOBILE */}
          <div className="flex items-center justify-between">
            <div className="w-full">
               <img src="/logo.png" alt="Logo" className="object-contain" />
            </div>
            {/* Botão de Fechar visível apenas em telas mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* PARTE DE BAIXO DA SIDEBAR: BOTÃO DE SAIR */}
        <div className="pt-4 border-t border-slate-100 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
          >
            <LogOut size={20} />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* OVERLAY PARA MOBILE */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden w-full max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}