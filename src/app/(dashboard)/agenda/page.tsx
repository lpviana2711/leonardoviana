"use client";

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Calendar as CalendarIcon,
  Loader2,
  X,
  Edit,
  Trash2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AgendaPage() {
  // ================= ESTADOS =================
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null); // NOVO: Controle de edição
  
  const [formData, setFormData] = useState({
    patient_id: '',
    appointment_date: '',
    appointment_time: '',
    appointment_type: 'Avaliação'
  });

  // ================= CALENDÁRIO LÓGICA =================
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); 
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // ================= BUSCA DE DADOS =================
  useEffect(() => {
    const fetchPatients = async () => {
      const { data } = await supabase.from('patients').select('id, name').order('name');
      if (data) setPatients(data);
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const startDate = new Date(year, month, 1).toISOString().split('T')[0];
      const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          appointment_date,
          appointment_time,
          appointment_type,
          patient_id,
          patients ( name )
        `)
        .gte('appointment_date', startDate)
        .lte('appointment_date', endDate)
        .order('appointment_time', { ascending: true });

      if (data) setAppointments(data);
      setLoading(false);
    };

    fetchAppointments();
  }, [year, month, refreshKey]); 

  // ================= AÇÕES =================
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  
  const handleDayClick = (day: number) => {
    const newSelectedDate = new Date(year, month, day);
    setSelectedDate(newSelectedDate);
    // Atualiza a data caso clique para adicionar um novo logo após trocar de dia
    if (!editingId) {
      setFormData(prev => ({ 
        ...prev, 
        appointment_date: newSelectedDate.toISOString().split('T')[0] 
      }));
    }
  };

  const handleOpenModal = () => {
    setEditingId(null); // Garante que é um novo agendamento
    setFormData({
      patient_id: '',
      appointment_date: selectedDate.toISOString().split('T')[0],
      appointment_time: '',
      appointment_type: 'Avaliação'
    });
    setIsModalOpen(true);
  };

  // NOVO: Função para abrir modal de edição
  const handleEdit = (app: any) => {
    setEditingId(app.id);
    setFormData({
      patient_id: app.patient_id || '',
      appointment_date: app.appointment_date,
      appointment_time: app.appointment_time.slice(0, 5), // Corta os segundos (HH:mm:ss -> HH:mm)
      appointment_type: app.appointment_type || 'Avaliação'
    });
    setIsModalOpen(true);
  };

  // NOVO: Função para excluir
  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este agendamento?")) {
      const { error } = await supabase.from('appointments').delete().eq('id', id);
      
      if (error) {
        alert("Erro ao excluir: " + error.message);
      } else {
        setRefreshKey(old => old + 1); // Recarrega a tela
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Erro: Você precisa estar logado para salvar.");
      setIsSubmitting(false);
      return;
    }

    let queryError;

    // Se tiver editingId, faz UPDATE. Se não, faz INSERT.
    if (editingId) {
      const { error } = await supabase.from('appointments').update({
        patient_id: formData.patient_id,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        appointment_type: formData.appointment_type,
      }).eq('id', editingId);
      
      queryError = error;
    } else {
      const { error } = await supabase.from('appointments').insert([
        {
          user_id: user.id,
          patient_id: formData.patient_id,
          appointment_date: formData.appointment_date,
          appointment_time: formData.appointment_time,
          appointment_type: formData.appointment_type,
        }
      ]);
      
      queryError = error;
    }

    setIsSubmitting(false);

    if (queryError) {
      alert("Erro ao salvar: " + queryError.message);
    } else {
      setIsModalOpen(false); 
      setFormData({ patient_id: '', appointment_date: '', appointment_time: '', appointment_type: 'Avaliação' }); 
      setEditingId(null);
      setRefreshKey(oldKey => oldKey + 1); 
    }
  };

  const selectedDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const dayAppointments = appointments.filter(app => app.appointment_date === selectedDateString);

  return (
    <div className="space-y-6 relative">
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Minha Agenda</h1>
          <p className="text-slate-500 text-sm">Organize seus horários e atendimentos.</p>
        </div>
        <button 
          onClick={handleOpenModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm text-sm"
        >
          <Plus size={18} />
          Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CALENDÁRIO MENSAL */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-700 flex items-center gap-2">
              <CalendarIcon size={18} className="text-indigo-600" />
              {monthNames[month]} de {year}
            </h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center border-b border-slate-100 bg-slate-50/50">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="py-3 text-xs font-bold text-slate-400 uppercase">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-slate-100 relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="animate-spin text-indigo-600" size={32} />
              </div>
            )}

            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="bg-slate-50 h-20 md:h-28" />
            ))}
            
            {days.map(day => {
              const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const hasAppointments = appointments.some(app => app.appointment_date === dateString);
              const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;

              return (
                <div 
                  key={day} 
                  onClick={() => handleDayClick(day)}
                  className={`bg-white h-20 md:h-28 p-2 transition-colors cursor-pointer hover:bg-indigo-50/30 group relative ${isSelected ? 'ring-2 ring-inset ring-indigo-600' : ''}`}
                >
                  <span className={`text-sm font-semibold ${isSelected ? 'bg-indigo-600 text-white w-7 h-7 flex items-center justify-center rounded-full' : 'text-slate-700'}`}>
                    {day}
                  </span>
                  
                  {hasAppointments && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* LISTA DO DIA */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
              Horários de Hoje
              <span className="text-xs font-normal text-slate-500">
                {selectedDate.getDate()} de {monthNames[selectedDate.getMonth()]}
              </span>
            </h3>

            <div className="space-y-3">
              {dayAppointments.length === 0 ? (
                <div className="text-center py-6 text-sm text-slate-500">
                  Nenhum agendamento para este dia.
                </div>
              ) : (
                dayAppointments.map((app) => (
                  <div key={app.id} className="group p-3 border border-slate-100 rounded-lg hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="p-2 bg-slate-100 rounded text-slate-600 group-hover:bg-white transition-colors">
                          <Clock size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">{app.appointment_time.slice(0, 5)}</p>
                          <p className="text-xs text-slate-500 font-medium">
                            {app.patients?.name || 'Paciente excluído'}
                          </p>
                        </div>
                      </div>
                      
                      {/* BOTÕES DE EDITAR E EXCLUIR */}
                      <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(app)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(app.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-[10px] bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full">
                        {app.appointment_type || 'Geral'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={handleOpenModal}
              className="w-full mt-4 py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm hover:border-indigo-300 hover:text-indigo-500 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Encaixar Horário
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL DE AGENDAMENTO (CRIAR E EDITAR) ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg">
                {editingId ? 'Editar Agendamento' : 'Novo Agendamento'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Paciente</label>
                <select 
                  required
                  value={formData.patient_id}
                  onChange={(e) => setFormData({...formData, patient_id: e.target.value})}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50"
                >
                  <option value="">Selecione um paciente...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Data</label>
                  <input 
                    required
                    type="date" 
                    value={formData.appointment_date}
                    onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Horário</label>
                  <input 
                    required
                    type="time" 
                    value={formData.appointment_time}
                    onChange={(e) => setFormData({...formData, appointment_time: e.target.value})}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tipo de Consulta</label>
                <select 
                  required
                  value={formData.appointment_type}
                  onChange={(e) => setFormData({...formData, appointment_type: e.target.value})}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-slate-50"
                >
                  <option value="Avaliação">Avaliação</option>
                  <option value="Sessão de Fisioterapia">Sessão de Fisioterapia</option>
                  <option value="Pilates">Pilates</option>
                  <option value="Reavaliação">Reavaliação</option>
                  <option value="Retorno">Retorno</option>
                </select>
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
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}