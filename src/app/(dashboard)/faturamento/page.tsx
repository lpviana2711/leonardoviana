"use client";

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  FileCheck, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight,
  X,
  Loader2,
  User
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function FaturamentoPage() {
  // ================= ESTADOS =================
  const [lancamentos, setLancamentos] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados do Modal de Lançamento
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'receita',
    date: new Date().toISOString().split('T')[0],
    patient_id: ''
  });

  // ================= BUSCA DE DADOS =================
  const fetchData = async () => {
    setLoading(true);
    
    // Busca os lançamentos e faz o "join" com o nome do paciente
    const { data: transData } = await supabase
      .from('transactions')
      .select('*, patients(name)')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false });

    if (transData) setLancamentos(transData);

    // Busca a lista de pacientes para o Select do formulário
    const { data: patData } = await supabase
      .from('patients')
      .select('id, name')
      .order('name');
      
    if (patData) setPatients(patData);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= CÁLCULOS DO CAIXA =================
  const totais = lancamentos.reduce(
    (acc, curr) => {
      const valor = Number(curr.amount);
      if (curr.type === 'receita') {
        acc.receitas += valor;
      } else {
        acc.despesas += valor;
      }
      return acc;
    },
    { receitas: 0, despesas: 0 }
  );

  const saldo = totais.receitas - totais.despesas;

  // Formatação de Moeda e Data
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // ================= AÇÕES =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('transactions').insert([
      {
        user_id: user?.id,
        patient_id: formData.patient_id || null, // Se estiver vazio, envia nulo (lançamento avulso)
        description: formData.description,
        amount: parseFloat(formData.amount.replace(',', '.')),
        type: formData.type,
        date: formData.date,
        nf_issued: false
      }
    ]);

    setIsSubmitting(false);

    if (error) {
      alert("Erro ao salvar lançamento: " + error.message);
    } else {
      setIsModalOpen(false);
      setFormData({
        description: '',
        amount: '',
        type: 'receita',
        date: new Date().toISOString().split('T')[0],
        patient_id: ''
      });
      fetchData(); // Recarrega a tabela
    }
  };

  const emitirNotaSimulada = async (id: string) => {
    const { error } = await supabase
      .from('transactions')
      .update({ nf_issued: true })
      .eq('id', id);

    if (error) {
      alert("Erro ao emitir nota: " + error.message);
    } else {
      alert("Recibo/Nota gerado com sucesso!");
      fetchData(); // Atualiza a linha na tabela
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Controle de Caixa e Notas</h1>
          <p className="text-slate-500 text-sm">Gerencie o fluxo financeiro do consultório e emissões para Pessoa Física.</p>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm text-sm"
          >
            <Plus size={18} />
            Novo Lançamento
          </button>
        </div>
      </div>

      {/* METRICAS DE RESUMO DO CAIXA */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Entradas</span>
            <h3 className="text-xl md:text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(totais.receitas)}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <TrendingUp size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Saídas</span>
            <h3 className="text-xl md:text-2xl font-bold text-rose-600 mt-1">{formatCurrency(totais.despesas)}</h3>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
            <TrendingDown size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Saldo em Caixa</span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-1">{formatCurrency(saldo)}</h3>
          </div>
          <div className="p-3 bg-slate-50 text-slate-700 rounded-lg">
            <DollarSign size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* TABELA DE LIVRO CAIXA */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden relative">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Fluxo de Caixa</h2>
          </div>
          
          <div className="overflow-x-auto min-h-[200px]">
            {loading ? (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                <Loader2 className="animate-spin text-indigo-600" size={32} />
              </div>
            ) : lancamentos.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                Nenhum lançamento registrado ainda.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">
                    <th className="p-4">Data</th>
                    <th className="p-4">Paciente</th>
                    <th className="p-4">Descrição</th>
                    <th className="p-4">Valor</th>
                    <th className="p-4 text-center">Nota PF</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {lancamentos.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 text-slate-500 whitespace-nowrap">{formatDate(item.date)}</td>
                      <td className="p-4 font-medium text-slate-800">
                        {item.patients?.name ? (
                          <span className="flex items-center gap-1.5">
                            <User size={14} className="text-slate-400" /> {item.patients.name}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Avulso</span>
                        )}
                      </td>
                      <td className="p-4 text-slate-600">{item.description}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span className={`flex items-center gap-1 font-bold ${item.type === 'receita' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {item.type === 'receita' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {formatCurrency(Number(item.amount))}
                        </span>
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        {item.type === 'receita' ? (
                          item.nf_issued ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                              <FileCheck size={12} /> Emitida
                            </span>
                          ) : (
                            <button 
                              onClick={() => emitirNotaSimulada(item.id)}
                              className="text-xs font-semibold text-indigo-600 hover:bg-indigo-50 border border-indigo-200 hover:border-indigo-300 px-2.5 py-1 rounded-lg transition-all"
                            >
                              Gerar Nota
                            </button>
                          )
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ================= MODAL NOVO LANÇAMENTO ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg">Novo Lançamento</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'receita' })}
                  className={`p-3 rounded-lg border font-bold flex flex-col items-center gap-2 transition-all ${
                    formData.type === 'receita' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <TrendingUp size={24} /> Entrada
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'despesa' })}
                  className={`p-3 rounded-lg border font-bold flex flex-col items-center gap-2 transition-all ${
                    formData.type === 'despesa' 
                      ? 'bg-rose-50 border-rose-200 text-rose-700' 
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <TrendingDown size={24} /> Saída
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Vincular a um Paciente (Opcional)</label>
                <select 
                  value={formData.patient_id}
                  onChange={(e) => setFormData({...formData, patient_id: e.target.value})}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50"
                >
                  <option value="">Nenhum (Lançamento Avulso)</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Descrição</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Pagamento Sessão Fisioterapia"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Valor (R$)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Data</label>
                  <input 
                    required
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Salvar Lançamento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}