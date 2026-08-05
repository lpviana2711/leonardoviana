"use client";

import React, { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, Loader2, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [totalPatients, setTotalPatients] = useState(0);
  const [monthAppointmentsCount, setMonthAppointmentsCount] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      const todayStr = new Date().toISOString().split('T')[0]; // Ex: "2026-08-05"
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth(); // 0 a 11

      const startOfMonth = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0];
      const endOfMonth = new Date(currentYear, currentMonth + 1, 0).toISOString().split('T')[0];

      // 1. Total de Pacientes
      const { count: patCount } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true });
      if (patCount !== null) setTotalPatients(patCount);

      // 2. Consultas do Mês
      const { count: appCount } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .gte('appointment_date', startOfMonth)
        .lte('appointment_date', endOfMonth);
      if (appCount !== null) setMonthAppointmentsCount(appCount);

      // 3. Faturamento Mensal (Entradas do mês na tabela transactions)
      const { data: transData } = await supabase
        .from('transactions')
        .select('amount, type')
        .eq('type', 'receita')
        .gte('date', startOfMonth)
        .lte('date', endOfMonth);

      if (transData) {
        const revenue = transData.reduce((acc, curr) => acc + Number(curr.amount), 0);
        setMonthlyRevenue(revenue);
      }

      // 4. Agenda de Hoje (Consultas marcadas para o dia atual)
      const { data: todayData } = await supabase
        .from('appointments')
        .select('id, appointment_time, appointment_type, patients(name)')
        .eq('appointment_date', todayStr)
        .order('appointment_time', { ascending: true });

      if (todayData) setTodayAppointments(todayData);

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const stats = [
    { title: 'Total de Pacientes', value: totalPatients.toString(), icon: Users, color: 'text-blue-600 bg-blue-50' },
    { title: 'Consultas este Mês', value: monthAppointmentsCount.toString(), icon: Calendar, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'Faturamento Mensal', value: formatCurrency(monthlyRevenue), icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Bem-vindo de volta!</h1>
        <p className="text-slate-500 text-sm">Aqui está o resumo do seu consultório hoje.</p>
      </div>

      {/* CARDS INDICADORES RESPONSIVOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-2">
                <span className="text-sm text-slate-500 font-medium">{stat.title}</span>
                {loading ? (
                  <div className="h-8 w-16 bg-slate-100 animate-pulse rounded"></div>
                ) : (
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{stat.value}</h3>
                )}
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* PRÓXIMAS CONSULTAS DO DIA */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Agenda de Hoje</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-indigo-600" size={28} />
          </div>
        ) : todayAppointments.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-lg">
            Nenhum paciente agendado para hoje.
          </div>
        ) : (
          <div className="space-y-3">
            {todayAppointments.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{app.patients?.name || 'Paciente não identificado'}</p>
                    <span className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                      {app.appointment_type || 'Consulta'}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-indigo-600">
                  {app.appointment_time.slice(0, 5)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}