"use client";

import React, { useState } from 'react';
import { 
  FileText, Printer, ChevronLeft, Calendar, Clock, User, 
  FileBadge, Activity, CheckCircle2, Share2, FileCheck, FileSpreadsheet,
  ClipboardList, FileBarChart2, Camera, Stethoscope, ShieldCheck,
  UserCheck, Syringe
} from 'lucide-react';
import Image from "next/image";

export default function DocumentosPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  
  // ---------------------------------------------------------------------------
  // 1. ATESTADO DE REPOUSO
  // ---------------------------------------------------------------------------
  const [formDataRepouso, setFormDataRepouso] = useState({
    nome: '', cpf: '', endereco: '', horaInicio: '', horaFim: '', data: '', diasRepouso: ''
  });
  const handleInputRepouso = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataRepouso(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 2. ATESTADO FISIOTERAPÊUTICO
  // ---------------------------------------------------------------------------
  const [formDataFisio, setFormDataFisio] = useState({
    nome: '', cpf: '', sessoes: '', duracao: '', periodo: '', cidAutorizado: 'nao', cid: '', data: '', hora: '', dataAssinatura: ''
  });
  const handleInputFisio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataFisio(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 3. DECLARAÇÃO DE ATENDIMENTO
  // ---------------------------------------------------------------------------
  const [formDataDeclaracao, setFormDataDeclaracao] = useState({
    nome: '', cpf: '', dataAtendimento: '', horaInicio: '', horaFim: '', dataAssinatura: ''
  });
  const handleInputDeclaracao = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataDeclaracao(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 4. ENCAMINHAMENTO PARA ESPECIALIDADES
  // ---------------------------------------------------------------------------
  const [formDataEncaminhamento, setFormDataEncaminhamento] = useState({
    profissionalPara: '', especialidade: '', nomePaciente: '', avaliacaoConduta: '', 
    quadro: '', resumoCaso: '', motivoEncaminhamento: '', condutaAtual: '', data: ''
  });
  const handleInputEncaminhamento = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataEncaminhamento(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 5. RELATÓRIO DE ALTA
  // ---------------------------------------------------------------------------
  const [formDataAlta, setFormDataAlta] = useState({
    nome: '', cpf: '', rg: '', diagMedico: '', diagFisio: '',
    dataInicio: '', dataFim: '', motivoAlta: 'reabilitacao_atingida', dataAlta: ''
  });
  const handleInputAlta = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataAlta(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 6. CONTRATO DE PRESTAÇÃO DE SERVIÇOS
  // ---------------------------------------------------------------------------
  const [formDataContrato, setFormDataContrato] = useState({
    cNome: '', cNacionalidade: 'Brasileiro(a)', cEstadoCivil: '', cProfissao: '',
    cRg: '', cCpf: '', cRua: '', cNumero: '', cComplemento: '', cBairro: '', cCidade: '', cCep: '', cEstado: 'SP',
    objeto: 'Atendimento Fisioterapêutico', diasAtendimento: '', horarioAtendimento: '',
    localAtendimento: 'consultorio', enderecoAtendimento: '', antecedenciaDesmarcar: '24',
    valorAtendimento: '', valorExtenso: '', formaPagamento: 'final_atendimento', diaUtilPagamento: '',
    cidadeForo: 'Guarulhos', localAssinatura: 'Guarulhos - SP', dataAssinatura: '',
    testemunha1Nome: '', testemunha1Cpf: '', testemunha2Nome: '', testemunha2Cpf: ''
  });
  const handleInputContrato = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataContrato(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 7. RELATÓRIO FISIOTERAPÊUTICO (MANUTENÇÃO / CBDF)
  // ---------------------------------------------------------------------------
  const [formDataRelatorioManutencao, setFormDataRelatorioManutencao] = useState({
    nome: '', dataNascimento: '', cpf: '', profissional: 'Leonardo Paula Viana',
    diagMedico: '', quadroClinico: '', exameFisico: '', diagCBDF: '',
    objetivos: '', planoTratamento: '', dataAssinatura: ''
  });
  const handleInputRelatorioManutencao = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataRelatorioManutencao(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 8. RELATÓRIO FISIOTERAPÊUTICO (ESTRUTURADO EM 6 ETAPAS)
  // ---------------------------------------------------------------------------
  const [formDataRelatorioCompleto, setFormDataRelatorioCompleto] = useState({
    nome: '', dataNascimento: '', cpf: '', dataInicio: '', quadroIntroducao: '',
    avaliacaoInicial: '', evolucao: '', condutaTerapeutica: '',
    resultadosObtidos: '', conclusao: '', dataAssinatura: ''
  });
  const handleInputRelatorioCompleto = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataRelatorioCompleto(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 9. TERMO DE AUTORIZAÇÃO DO USO DE IMAGEM
  // ---------------------------------------------------------------------------
  const [formDataImagem, setFormDataImagem] = useState({
    nome: '', nacionalidade: 'Brasileiro(a)', estadoCivil: '', profissao: '',
    rg: '', cpf: '', rua: '', numero: '', cidade: 'Guarulhos',
    fisioterapeuta: 'Leonardo Paula Viana', enderecoClinica: '', cidadeClinica: 'Guarulhos',
    cidadeTermo: 'Guarulhos', dataAssinatura: ''
  });
  const handleInputImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataImagem(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 10. SOLICITAÇÃO DE EXAMES COMPLEMENTARES
  // ---------------------------------------------------------------------------
  const [formDataExames, setFormDataExames] = useState({
    nome: '', dataNascimento: '', cpf: '', especialidade: 'Fisioterapia',
    exameSolicitado: '', data: ''
  });
  const handleInputExames = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataExames(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 11. TCLE PARA ACUPUNTURA SISTÊMICA
  // ---------------------------------------------------------------------------
  const [formDataAcupuntura, setFormDataAcupuntura] = useState({
    nome: '', dataNascimento: '', idade: '', prontuario: '', hd: '',
    autorizacao: 'sim', rg: '', telefone: '', endereco: '',
    responsavelNome: '', responsavelRg: '', responsavelTelefone: '',
    cidadeTermo: 'Guarulhos', dataAssinatura: ''
  });
  const handleInputAcupuntura = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataAcupuntura(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 12. TCLE FISIOTERAPIA INDIVIDUALIZADA
  // ---------------------------------------------------------------------------
  const [formDataIndividualizada, setFormDataIndividualizada] = useState({
    nome: '', nacionalidade: 'Brasileiro(a)', estadoCivil: '', profissao: '',
    rg: '', cpf: '', rua: '', numero: '', cidade: 'Guarulhos', idade: '',
    fisioterapeuta: 'Leonardo Paula Viana', crefito: '438289-F', dataAssinatura: '',
    testemunha1Nome: '', testemunha1Cpf: '', testemunha2Nome: '', testemunha2Cpf: ''
  });
  const handleInputIndividualizada = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataIndividualizada(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // 13. TCLE DRY NEEDLING (AGULHAMENTO SECO)
  // ---------------------------------------------------------------------------
  const [formDataDryNeedling, setFormDataDryNeedling] = useState({
    nome: '', dataNascimento: '', idade: '', prontuario: '', hd: '',
    autorizacao: 'sim', rg: '', cidadeTermo: 'Guarulhos', dataAssinatura: ''
  });
  const handleInputDryNeedling = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataDryNeedling(prev => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  // ===========================================================================
  // TELA 1: LISTAGEM DE DOCUMENTOS
  // ===========================================================================
  if (!selectedDoc) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-600" />
          Central de Documentos
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <button 
            onClick={() => setSelectedDoc('atestado-repouso')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100">
              <FileBadge className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">Atestado de Repouso</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Afastamento temporário para pacientes</p>
          </button>

          {/* Card 2 */}
          <button 
            onClick={() => setSelectedDoc('atestado-fisioterapeutico')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-100">
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">Atestado Fisioterapêutico</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Declaração de tratamento em andamento</p>
          </button>

          {/* Card 3 */}
          <button 
            onClick={() => setSelectedDoc('declaracao-atendimento')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">Declaração de Atendimento</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Comprovante de comparecimento à sessão</p>
          </button>

          {/* Card 4 */}
          <button 
            onClick={() => setSelectedDoc('encaminhamento-especialidades')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-purple-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-100">
              <Share2 className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">Encaminhamento</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Remessa para avaliação médica</p>
          </button>

          {/* Card 5 */}
          <button 
            onClick={() => setSelectedDoc('relatorio-alta')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-teal-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-100">
              <FileCheck className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">Relatório de Alta</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Encerramento do plano de reabilitação</p>
          </button>

          {/* Card 6 */}
          <button 
            onClick={() => setSelectedDoc('relatorio-manutencao')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-rose-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-100">
              <ClipboardList className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">Relatório Clínico (CBDF)</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Laudo de evolução e diagnóstico</p>
          </button>

          {/* Card 7 */}
          <button 
            onClick={() => setSelectedDoc('relatorio-completo')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-cyan-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-100">
              <FileBarChart2 className="w-6 h-6 text-cyan-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">Relatório Completo (6 Etapas)</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Laudo detalhado de evolução clínica</p>
          </button>

          {/* Card 8 */}
          <button 
            onClick={() => setSelectedDoc('solicitacao-exames')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-sky-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-sky-100">
              <Stethoscope className="w-6 h-6 text-sky-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">Solicitação de Exames</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Pedido de exame com justificativa</p>
          </button>

          {/* Card 9 */}
          <button 
            onClick={() => setSelectedDoc('autorizacao-imagem')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-violet-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-violet-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-violet-100">
              <Camera className="w-6 h-6 text-violet-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">Uso de Imagem</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Autorização para redes sociais</p>
          </button>

          {/* Card 10 */}
          <button 
            onClick={() => setSelectedDoc('consentimento-individualizada')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-lime-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-lime-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-lime-100">
              <UserCheck className="w-6 h-6 text-lime-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">TCLE Individualizada</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Res. COFFITO nº 424/2013</p>
          </button>

          {/* Card 11 */}
          <button 
            onClick={() => setSelectedDoc('consentimento-dry-needling')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-orange-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-100">
              <Syringe className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">TCLE Dry Needling</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Agulhamento Seco Musculoesquelético</p>
          </button>

          {/* Card 12 */}
          <button 
            onClick={() => setSelectedDoc('consentimento-acupuntura')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-red-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-100">
              <ShieldCheck className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">TCLE Acupuntura</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Consentimento Livre e Esclarecido</p>
          </button>

          {/* Card 13 */}
          <button 
            onClick={() => setSelectedDoc('contrato-servicos')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-amber-300 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-100">
              <FileSpreadsheet className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700 text-center">Contrato de Prestação</h2>
            <p className="text-xs text-gray-500 mt-2 text-center">Instrumento jurídico de serviços</p>
          </button>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // TELA 2: VISÃO COMPARTILHADA (HEADER) E RENDERIZAÇÃO CONDICIONAL
  // ===========================================================================
    return (
    <div className="p-6 max-w-4xl mx-auto">
  <div className="print-area">
    <div className="print-background hidden print:block" aria-hidden="true">
  <img
    src="/modelo-para-marca-d_água.jpg"
    alt=""
    className="w-full h-full object-cover"
  />
</div>

    <div className="print-content">
      {/* HEADER NÃO IMPRESSO */}
      <div className="print:hidden flex items-center justify-between mb-8">
        <button 
          onClick={() => setSelectedDoc(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar aos Documentos
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Printer className="w-4 h-4" />
          Imprimir Documento
        </button>
      </div>
      

      {/* -------------------------------------------------------------------- */}
      {/* 1. ATESTADO DE REPOUSO */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'atestado-repouso' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Dados do Atestado de Repouso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do(a) Paciente</label>
                <input type="text" name="nome" value={formDataRepouso.nome} onChange={handleInputRepouso} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input type="text" name="cpf" value={formDataRepouso.cpf} onChange={handleInputRepouso} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="000.000.000-00" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                <input type="text" name="endereco" value={formDataRepouso.endereco} onChange={handleInputRepouso} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Rua, Número, Bairro, Cidade" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data do Atendimento</label>
                <input type="date" name="data" value={formDataRepouso.data} onChange={handleInputRepouso} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora Início</label>
                  <input type="time" name="horaInicio" value={formDataRepouso.horaInicio} onChange={handleInputRepouso} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fim</label>
                  <input type="time" name="horaFim" value={formDataRepouso.horaFim} onChange={handleInputRepouso} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dias de Repouso</label>
                <input type="number" name="diasRepouso" value={formDataRepouso.diasRepouso} onChange={handleInputRepouso} min="1" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: 2" />
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:bg-transparent print:shadow-none print:border-none print:p-0 min-h-[800px] flex flex-col relative text-gray-800">
            <div className="text-center mb-16 pt-8">
              <h1 className="text-2xl font-bold uppercase tracking-widest underline">Atestado de Repouso</h1>
            </div>
            <div className="flex-1 text-justify text-lg leading-loose">
              <p className="indent-12">
                Atesto para os devidos fins que o (a) Sr(a) <strong className="uppercase border-b border-gray-400 px-2 min-w-[300px] inline-block text-center">{formDataRepouso.nome || '_______________________________________'}</strong>, 
                CPF <strong className="border-b border-gray-400 px-2 min-w-[150px] inline-block text-center">{formDataRepouso.cpf || '_________________________'}</strong>, 
                residente e domiciliado (a) à <span className="border-b border-gray-400 px-2 min-w-[300px] inline-block text-center">{formDataRepouso.endereco || '_________________________________________________________________________'}</span> 
                esteve sob tratamento fisioterapêutico neste consultório, no período das <strong className="border-b border-gray-400 px-2">{formDataRepouso.horaInicio || '____ :____'}</strong> h às <strong className="border-b border-gray-400 px-2">{formDataRepouso.horaFim || '____ :____'}</strong> h 
                do dia <strong className="border-b border-gray-400 px-2">{formDataRepouso.data ? formDataRepouso.data.split('-').reverse().join('/') : '_____/ _____/ _____'}</strong>, 
                necessitando o (a) mesmo (a) de <strong className="border-b border-gray-400 px-2 text-center min-w-[50px] inline-block">{formDataRepouso.diasRepouso || '____'}</strong> dia (s) de repouso.
              </p>
            </div>
            <div className="mt-32 mb-16 flex flex-col items-center justify-center text-center">
              <div className="w-80 border-t border-gray-800 mb-2"></div>
              <p className="font-bold">Leonardo Paula Viana</p>
              <p>Fisioterapeuta</p>
              <p>CREFITO Nº 438289-F</p>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 2. ATESTADO FISIOTERAPÊUTICO */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'atestado-fisioterapeutico' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Dados do Atestado Fisioterapêutico</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do(a) Paciente</label>
                <input type="text" name="nome" value={formDataFisio.nome} onChange={handleInputFisio} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input type="text" name="cpf" value={formDataFisio.cpf} onChange={handleInputFisio} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="000.000.000-00" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sessões / Semana</label>
                  <input type="number" name="sessoes" value={formDataFisio.sessoes} onChange={handleInputFisio} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Ex: 2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duração (minutos)</label>
                  <input type="number" name="duracao" value={formDataFisio.duracao} onChange={handleInputFisio} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Ex: 50" />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Período de Tratamento Previsto</label>
                <input type="text" name="periodo" value={formDataFisio.periodo} onChange={handleInputFisio} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Ex: 30 dias, 6 meses..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Autorização CID</label>
                <select name="cidAutorizado" value={formDataFisio.cidAutorizado} onChange={handleInputFisio} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option value="nao">Não autorizado pelo paciente</option>
                  <option value="sim">Autorizado pelo paciente</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código CID 10/11</label>
                <input type="text" name="cid" value={formDataFisio.cid} onChange={handleInputFisio} disabled={formDataFisio.cidAutorizado === 'nao'} className="w-full px-3 py-2 border rounded-md disabled:bg-gray-100 outline-none" placeholder="Ex: M54.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Emissão</label>
                <input type="date" name="data" value={formDataFisio.data} onChange={handleInputFisio} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora Emissão</label>
                <input type="time" name="hora" value={formDataFisio.hora} onChange={handleInputFisio} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Assinatura</label>
                <input type="date" name="dataAssinatura" value={formDataFisio.dataAssinatura} onChange={handleInputFisio} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:bg-transparent print:shadow-none print:border-none print:p-0 min-h-[800px] flex flex-col relative text-gray-800">
            <div className="text-center mb-16 pt-8">
              <h1 className="text-2xl font-bold uppercase tracking-widest underline">Atestado Fisioterapêutico</h1>
            </div>
            <div className="flex-1 text-justify text-lg leading-loose">
              <p className="indent-12">
                Atesto para os devidos fins, que o (a) paciente <strong className="uppercase border-b border-gray-400 px-2 min-w-[300px] inline-block text-center">{formDataFisio.nome || '______________________________________________________'}</strong>, 
                portador (a) do CPF <strong className="border-b border-gray-400 px-2 min-w-[150px] inline-block text-center">{formDataFisio.cpf || '___________________'}</strong> 
                encontra-se em tratamento fisioterapêutico, estimando a necessidade de <strong className="border-b border-gray-400 px-2 text-center min-w-[50px] inline-block">{formDataFisio.sessoes || '______'}</strong> sessões / semanais, 
                com duração de <strong className="border-b border-gray-400 px-2 text-center min-w-[50px] inline-block">{formDataFisio.duracao || '_____'}</strong> minutos, por cada sessão.
              </p>
              <div className="mt-8 mb-8 flex items-center">
                <span>Período de tratamento previsto: </span>
                <span className="ml-2 flex-1 border-b border-gray-400 px-2">
                  <strong className="block text-center">{formDataFisio.periodo || ''}</strong>
                </span>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border border-gray-800 flex items-center justify-center font-bold pb-1">{formDataFisio.cidAutorizado === 'nao' ? 'x' : ''}</div>
                  <span>CID 10/11 Não autorizado pelo paciente.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border border-gray-800 flex items-center justify-center font-bold pb-1">{formDataFisio.cidAutorizado === 'sim' ? 'x' : ''}</div>
                  <span>CID 10/11 Autorizado pelo paciente. CID <strong className="border-b border-gray-400 px-2 min-w-[150px] inline-block text-center">{formDataFisio.cidAutorizado === 'sim' ? formDataFisio.cid : ''}</strong></span>
                </div>
              </div>
              <div className="mt-8 flex gap-8">
                <div><span>Data: </span><strong className="border-b border-gray-400 px-2">{formDataFisio.data ? formDataFisio.data.split('-').reverse().join(' / ') : '____ / ____ / _____'}</strong></div>
                <div><span>Hora: </span><strong className="border-b border-gray-400 px-2">{formDataFisio.hora || '___ : ___'}</strong> h</div>
              </div>
              <div className="mt-16"><span>Assinatura: _____________________________________________________________</span></div>
              <div className="mt-4"><span>Data: </span><strong className="border-b border-gray-400 px-2">{formDataFisio.dataAssinatura ? formDataFisio.dataAssinatura.split('-').reverse().join(' / ') : '_____ / _____ / ______'}</strong></div>
            </div>
            <div className="mt-20 flex flex-col items-center justify-center text-center">
              <div className="w-80 border-t border-gray-800 mb-2"></div>
              <p className="font-bold">Leonardo Paula Viana</p>
              <p>Fisioterapeuta</p>
              <p>CREFITO Nº 438289-F</p>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 3. DECLARAÇÃO DE ATENDIMENTO */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'declaracao-atendimento' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Dados da Declaração de Atendimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do(a) Paciente</label>
                <input type="text" name="nome" value={formDataDeclaracao.nome} onChange={handleInputDeclaracao} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input type="text" name="cpf" value={formDataDeclaracao.cpf} onChange={handleInputDeclaracao} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="000.000.000-00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data do Atendimento</label>
                <input type="date" name="dataAtendimento" value={formDataDeclaracao.dataAtendimento} onChange={handleInputDeclaracao} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora Início</label>
                <input type="time" name="horaInicio" value={formDataDeclaracao.horaInicio} onChange={handleInputDeclaracao} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fim</label>
                <input type="time" name="horaFim" value={formDataDeclaracao.horaFim} onChange={handleInputDeclaracao} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Data da Assinatura</label>
                <input type="date" name="dataAssinatura" value={formDataDeclaracao.dataAssinatura} onChange={handleInputDeclaracao} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:bg-transparent print:shadow-none print:border-none print:p-0 min-h-[800px] flex flex-col relative text-gray-800">
            <div className="text-center mb-16 pt-8">
              <h1 className="text-2xl font-bold uppercase tracking-widest underline">Declaração de Atendimento</h1>
            </div>
            <div className="flex-1 text-justify text-lg leading-loose">
              <p className="indent-12">
                Declaro para os devidos fins que o (a) Sr (a) <strong className="uppercase border-b border-gray-400 px-2 min-w-[300px] inline-block text-center">{formDataDeclaracao.nome || '____________________________________'}</strong> 
                portador(a) do CPF <strong className="border-b border-gray-400 px-2 min-w-[150px] inline-block text-center">{formDataDeclaracao.cpf || '__________________________'}</strong>, 
                compareceu a este atendimento de fisioterapia no dia <strong className="border-b border-gray-400 px-2">{formDataDeclaracao.dataAtendimento ? formDataDeclaracao.dataAtendimento.split('-').reverse().join(' / ') : '_____ / _____ / ______'}</strong>, 
                no horário de <strong className="border-b border-gray-400 px-2">{formDataDeclaracao.horaInicio || '____ : ____'}</strong> h às <strong className="border-b border-gray-400 px-2">{formDataDeclaracao.horaFim || '____ : ____'}</strong> h, 
                para realização de sessão de fisioterapia.
              </p>
              <p className="mt-6">Por ser verdade, firmo a presente declaração.</p>
              <p className="mt-6">
                Data: <strong className="border-b border-gray-400 px-2">{formDataDeclaracao.dataAssinatura ? formDataDeclaracao.dataAssinatura.split('-').reverse().join(' / ') : '_____ / _____ / ______'}</strong>
              </p>
            </div>
            <div className="mt-32 mb-16 flex flex-col items-center justify-center text-center">
              <div className="w-80 border-t border-gray-800 mb-2"></div>
              <p className="font-bold">Leonardo Paula Viana</p>
              <p>Fisioterapeuta</p>
              <p>CREFITO Nº 438289-F</p>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 4. ENCAMINHAMENTO PARA ESPECIALIDADES */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'encaminhamento-especialidades' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Dados do Encaminhamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Encaminhar Para (Profissional)</label>
                <input type="text" name="profissionalPara" value={formDataEncaminhamento.profissionalPara} onChange={handleInputEncaminhamento} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Nome do profissional" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                <input type="text" name="especialidade" value={formDataEncaminhamento.especialidade} onChange={handleInputEncaminhamento} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Ex: Ortopedia, Neurologia" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do(a) Paciente</label>
                <input type="text" name="nomePaciente" value={formDataEncaminhamento.nomePaciente} onChange={handleInputEncaminhamento} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avaliação e Conduta em</label>
                <input type="text" name="avaliacaoConduta" value={formDataEncaminhamento.avaliacaoConduta} onChange={handleInputEncaminhamento} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Área ou região" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Devido ao seguinte quadro</label>
                <input type="text" name="quadro" value={formDataEncaminhamento.quadro} onChange={handleInputEncaminhamento} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Quadro clínico" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Resumo do Caso</label>
                <textarea name="resumoCaso" rows={2} value={formDataEncaminhamento.resumoCaso} onChange={handleInputEncaminhamento} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Breve resumo..." />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Motivo do Encaminhamento</label>
                <textarea name="motivoEncaminhamento" rows={2} value={formDataEncaminhamento.motivoEncaminhamento} onChange={handleInputEncaminhamento} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Motivo..." />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Conduta Fisioterapêutica Atual</label>
                <textarea name="condutaAtual" rows={2} value={formDataEncaminhamento.condutaAtual} onChange={handleInputEncaminhamento} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="O que está sendo feito..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input type="date" name="data" value={formDataEncaminhamento.data} onChange={handleInputEncaminhamento} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:bg-transparent print:shadow-none print:border-none print:p-0 min-h-[800px] flex flex-col relative text-gray-800">
            <div className="text-center mb-12 pt-8">
              <h1 className="text-2xl font-bold uppercase tracking-widest underline">Encaminhamento para Especialidades</h1>
            </div>
            <div className="flex-1 text-base leading-relaxed space-y-4">
              <p>De: Leonardo Paula Viana - Fisioterapeuta</p>
              <p>Para: <strong className="border-b border-gray-400 px-2 min-w-[250px] inline-block">{formDataEncaminhamento.profissionalPara || '_________________________________________'}</strong></p>
              <p>Especialidade: <strong className="border-b border-gray-400 px-2 min-w-[250px] inline-block">{formDataEncaminhamento.especialidade || '__________________________________'}</strong></p>
              <p className="pt-2">
                Encaminho o (a) paciente <strong className="uppercase border-b border-gray-400 px-2 min-w-[300px] inline-block">{formDataEncaminhamento.nomePaciente || '__________________________________________________'}</strong>,
                para avaliação e conduta em <strong className="border-b border-gray-400 px-2 min-w-[200px] inline-block">{formDataEncaminhamento.avaliacaoConduta || '________________________________________________'}</strong>,
                devido ao seguinte quadro: <strong className="border-b border-gray-400 px-2 min-w-[200px] inline-block">{formDataEncaminhamento.quadro || '_________________________________________________'}</strong>.
              </p>
              
              <div className="pt-2">
                <p className="font-bold">RESUMO DO CASO:</p>
                <p className="border-b border-gray-300 min-h-[1.8rem]">{formDataEncaminhamento.resumoCaso}</p>
                <p className="border-b border-gray-300 min-h-[1.8rem]"></p>
              </div>

              <div className="pt-2">
                <p className="font-bold">MOTIVO DO ENCAMINHAMENTO:</p>
                <p className="border-b border-gray-300 min-h-[1.8rem]">{formDataEncaminhamento.motivoEncaminhamento}</p>
                <p className="border-b border-gray-300 min-h-[1.8rem]"></p>
              </div>

              <div className="pt-2">
                <p className="font-bold">CONDUTA FISIOTERAPÊUTICA ATUAL:</p>
                <p className="border-b border-gray-300 min-h-[1.8rem]">{formDataEncaminhamento.condutaAtual}</p>
                <p className="border-b border-gray-300 min-h-[1.8rem]"></p>
              </div>

              <p className="pt-4">Agradeço a atenção e fico à disposição.</p>
              <p className="pt-2">
                Data: <strong className="border-b border-gray-400 px-2">{formDataEncaminhamento.data ? formDataEncaminhamento.data.split('-').reverse().join(' / ') : '_____ / _____ / ______'}</strong>
              </p>
            </div>
            <div className="mt-16 flex flex-col items-center justify-center text-center">
              <div className="w-80 border-t border-gray-800 mb-2"></div>
              <p className="font-bold">Leonardo Paula Viana</p>
              <p>Fisioterapeuta</p>
              <p>CREFITO Nº 438289-F</p>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 5. RELATÓRIO DE ALTA */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'relatorio-alta' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Dados do Relatório de Alta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do(a) Paciente</label>
                <input type="text" name="nome" value={formDataAlta.nome} onChange={handleInputAlta} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input type="text" name="cpf" value={formDataAlta.cpf} onChange={handleInputAlta} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="000.000.000-00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RG</label>
                <input type="text" name="rg" value={formDataAlta.rg} onChange={handleInputAlta} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="00.000.000-0" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnóstico Médico</label>
                <input type="text" name="diagMedico" value={formDataAlta.diagMedico} onChange={handleInputAlta} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Descrição do diagnóstico médico..." />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Classificação Brasileira de Diagnóstico Fisioterapêutico (CBDF)</label>
                <textarea name="diagFisio" rows={2} value={formDataAlta.diagFisio} onChange={handleInputAlta} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Descrição do diagnóstico fisioterapêutico..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Início do Tratamento</label>
                <input type="date" name="dataInicio" value={formDataAlta.dataInicio} onChange={handleInputAlta} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Término do Tratamento</label>
                <input type="date" name="dataFim" value={formDataAlta.dataFim} onChange={handleInputAlta} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Motivo da Alta / Situação</label>
                <select name="motivoAlta" value={formDataAlta.motivoAlta} onChange={handleInputAlta} className="w-full px-3 py-2 border rounded-md outline-none">
                  <option value="reabilitacao_atingida">Término do programa de reabilitação, com objetivos atingidos</option>
                  <option value="reabilitacao_parcial">Término do programa de reabilitação, com objetivos parcialmente atingidos</option>
                  <option value="reabilitacao_nao_atingida">Término do programa de reabilitação, com os objetivos não atingidos</option>
                  <option value="abandono">Abandono</option>
                  <option value="intercorrencia">Intercorrência Clínica / Social</option>
                  <option value="desistencia">Desistência à pedido</option>
                  <option value="obito">Óbito</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data da Alta</label>
                <input type="date" name="dataAlta" value={formDataAlta.dataAlta} onChange={handleInputAlta} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:bg-transparent print:shadow-none print:border-none print:p-0 min-h-[800px] flex flex-col relative text-gray-800">
            <div className="text-center mb-14 pt-8">
              <h1 className="text-2xl font-bold uppercase tracking-widest underline">Relatório de Alta</h1>
            </div>
            <div className="flex-1 text-justify text-base leading-relaxed space-y-4">
              <p className="leading-loose">
                Declaro que o (a) Sr (a) <strong className="uppercase border-b border-gray-400 px-2 min-w-[280px] inline-block text-center">{formDataAlta.nome || '_____________________________________________________'}</strong>, 
                CPF: <strong className="border-b border-gray-400 px-2 min-w-[140px] inline-block text-center">{formDataAlta.cpf || '_________________________'}</strong>, 
                R.G. <strong className="border-b border-gray-400 px-2 min-w-[130px] inline-block text-center">{formDataAlta.rg || '_______________________'}</strong>, 
                com Diagnóstico Médico de <span className="border-b border-gray-400 px-2 min-w-[250px] inline-block">{formDataAlta.diagMedico || '______________________________________________________________'}</span> e 
                Classificação Brasileira de Diagnóstico Fisioterapêutica <span className="border-b border-gray-400 px-2 min-w-[250px] inline-block">{formDataAlta.diagFisio || '_________________________________________________________________________'}</span>, 
                participou de um programa de tratamento fisioterapêutico de <strong className="border-b border-gray-400 px-2">{formDataAlta.dataInicio ? formDataAlta.dataInicio.split('-').reverse().join(' / ') : '______ / _____ / _______'}</strong> à <strong className="border-b border-gray-400 px-2">{formDataAlta.dataFim ? formDataAlta.dataFim.split('-').reverse().join(' / ') : '______ / ______ / ______'}</strong>.
              </p>

              <div className="pt-4">
                <p className="mb-3 font-semibold">E durante este período de tratamento, por apresentar:</p>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border border-gray-800 flex items-center justify-center font-bold text-sm pb-0.5">
                      {formDataAlta.motivoAlta === 'reabilitacao_atingida' ? 'X' : ''}
                    </div>
                    <span>Término do programa de reabilitação, com objetivos atingidos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border border-gray-800 flex items-center justify-center font-bold text-sm pb-0.5">
                      {formDataAlta.motivoAlta === 'reabilitacao_parcial' ? 'X' : ''}
                    </div>
                    <span>Término do programa de reabilitação, com objetivos parcialmente atingidos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border border-gray-800 flex items-center justify-center font-bold text-sm pb-0.5">
                      {formDataAlta.motivoAlta === 'reabilitacao_nao_atingida' ? 'X' : ''}
                    </div>
                    <span>Término do programa de reabilitação, com os objetivos não atingidos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border border-gray-800 flex items-center justify-center font-bold text-sm pb-0.5">
                      {formDataAlta.motivoAlta === 'abandono' ? 'X' : ''}
                    </div>
                    <span>Abandono</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border border-gray-800 flex items-center justify-center font-bold text-sm pb-0.5">
                      {formDataAlta.motivoAlta === 'intercorrencia' ? 'X' : ''}
                    </div>
                    <span>Intercorrência Clínica / Social</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border border-gray-800 flex items-center justify-center font-bold text-sm pb-0.5">
                      {formDataAlta.motivoAlta === 'desistencia' ? 'X' : ''}
                    </div>
                    <span>Desistência à pedido</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border border-gray-800 flex items-center justify-center font-bold text-sm pb-0.5">
                      {formDataAlta.motivoAlta === 'obito' ? 'X' : ''}
                    </div>
                    <span>Óbito</span>
                  </div>
                </div>
              </div>

              <p className="pt-6 leading-loose">
                Foi alcançado ao (a) senhor (a) <strong className="uppercase border-b border-gray-400 px-2 min-w-[260px] inline-block text-center">{formDataAlta.nome || '_______________________________________________'}</strong> ALTA Fisioterapêutica na data de <strong className="border-b border-gray-400 px-2">{formDataAlta.dataAlta ? formDataAlta.dataAlta.split('-').reverse().join(' / ') : '_____ / _____ / ______'}</strong>.
              </p>

              <p className="pt-4">Fico à disposição para esclarecimentos.</p>
            </div>
            
            <div className="mt-24 mb-12 flex flex-col items-center justify-center text-center">
              <div className="w-96 border-t border-gray-800 mb-2"></div>
              <p className="font-bold">Leonardo Paula Viana</p>
              <p>Fisioterapeuta</p>
              <p>CREFITO Nº 438289-F</p>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 6. CONTRATO DE PRESTAÇÃO DE SERVIÇOS */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'contrato-servicos' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 space-y-6">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Dados do Contrato de Prestação de Serviço</h2>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">1. Dados do Contratante</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nome Completo</label>
                  <input type="text" name="cNome" value={formDataContrato.cNome} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Nome do contratante" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nacionalidade</label>
                  <input type="text" name="cNacionalidade" value={formDataContrato.cNacionalidade} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Estado Civil</label>
                  <input type="text" name="cEstadoCivil" value={formDataContrato.cEstadoCivil} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Ex: Solteiro(a)" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Profissão</label>
                  <input type="text" name="cProfissao" value={formDataContrato.cProfissao} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Ex: Autônomo" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">RG</label>
                  <input type="text" name="cRg" value={formDataContrato.cRg} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="00.000.000-0" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">CPF</label>
                  <input type="text" name="cCpf" value={formDataContrato.cCpf} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="000.000.000-00" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Rua / Logradouro</label>
                  <input type="text" name="cRua" value={formDataContrato.cRua} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Ex: Av. Tiradentes" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Número</label>
                  <input type="text" name="cNumero" value={formDataContrato.cNumero} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="123" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Complemento</label>
                  <input type="text" name="cComplemento" value={formDataContrato.cComplemento} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Apto 42" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Bairro</label>
                  <input type="text" name="cBairro" value={formDataContrato.cBairro} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Centro" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Cidade</label>
                  <input type="text" name="cCidade" value={formDataContrato.cCidade} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Guarulhos" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">CEP</label>
                  <input type="text" name="cCep" value={formDataContrato.cCep} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="00000-000" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Estado (UF)</label>
                  <input type="text" name="cEstado" value={formDataContrato.cEstado} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="SP" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">2. Objeto e Agendamentos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Objeto do Contrato</label>
                  <textarea name="objeto" rows={2} value={formDataContrato.objeto} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Ex: Prestação de serviços de fisioterapia motora e respiratória" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Dias de Atendimento</label>
                  <input type="text" name="diasAtendimento" value={formDataContrato.diasAtendimento} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Ex: Segundas e Quartas" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Horário de Atendimento</label>
                  <input type="text" name="horarioAtendimento" value={formDataContrato.horarioAtendimento} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Ex: 14:00 às 15:00" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Local</label>
                  <select name="localAtendimento" value={formDataContrato.localAtendimento} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm">
                    <option value="consultorio">Consultório / Clínica</option>
                    <option value="residencia">Residência do Contratante</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Endereço do Local (se consultório)</label>
                  <input type="text" name="enderecoAtendimento" value={formDataContrato.enderecoAtendimento} onChange={handleInputContrato} disabled={formDataContrato.localAtendimento === 'residencia'} className="w-full px-3 py-2 border rounded-md outline-none text-sm disabled:bg-gray-100" placeholder="Rua, nº, Bairro, Cidade - UF" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Antecedência mínima para desmarcar (horas)</label>
                  <input type="number" name="antecedenciaDesmarcar" value={formDataContrato.antecedenciaDesmarcar} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="24" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">3. Preço, Pagamento e Foro</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Valor por Atendimento (R$)</label>
                  <input type="text" name="valorAtendimento" value={formDataContrato.valorAtendimento} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Ex: 150,00" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Valor por Extenso</label>
                  <input type="text" name="valorExtenso" value={formDataContrato.valorExtenso} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Ex: cento e cinquenta reais" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Forma / Termo de Pagamento</label>
                  <select name="formaPagamento" value={formDataContrato.formaPagamento} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm">
                    <option value="final_atendimento">No final de cada atendimento</option>
                    <option value="final_semana">No final de cada semana</option>
                    <option value="dia_util">Em dia útil específico do mês</option>
                  </select>
                </div>
                {formDataContrato.formaPagamento === 'dia_util' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Qual dia útil?</label>
                    <input type="text" name="diaUtilPagamento" value={formDataContrato.diaUtilPagamento} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Ex: 5º" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Comarca do Foro</label>
                  <input type="text" name="cidadeForo" value={formDataContrato.cidadeForo} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Guarulhos" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Data de Assinatura</label>
                  <input type="date" name="dataAssinatura" value={formDataContrato.dataAssinatura} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">4. Testemunhas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Testemunha 1 - Nome</label>
                  <input type="text" name="testemunha1Nome" value={formDataContrato.testemunha1Nome} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Nome completo" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Testemunha 1 - CPF</label>
                  <input type="text" name="testemunha1Cpf" value={formDataContrato.testemunha1Cpf} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="000.000.000-00" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Testemunha 2 - Nome</label>
                  <input type="text" name="testemunha2Nome" value={formDataContrato.testemunha2Nome} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Nome completo" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Testemunha 2 - CPF</label>
                  <input type="text" name="testemunha2Cpf" value={formDataContrato.testemunha2Cpf} onChange={handleInputContrato} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="000.000.000-00" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:shadow-none print:border-none print:p-0 text-gray-900 text-sm leading-relaxed space-y-4">
            <div className="text-center mb-8 pt-4">
              <h1 className="text-xl font-bold uppercase tracking-wider underline">Contrato de Prestação de Serviço de Fisioterapia</h1>
            </div>

            <p className="text-justify indent-8">
              <strong>CONTRATANTE:</strong> <strong className="uppercase">{formDataContrato.cNome || '________________________________________________'}</strong>, 
              Nacionalidade: <span>{formDataContrato.cNacionalidade || '_____________'}</span>, 
              Estado Civil: <span>{formDataContrato.cEstadoCivil || '_____________'}</span>, 
              Profissão: <span>{formDataContrato.cProfissao || '________________'}</span>, 
              R.G. nº <span>{formDataContrato.cRg || '___________________'}</span> e no CPF nº <span>{formDataContrato.cCpf || '__________________'}</span>, 
              residente e domiciliado na Rua <span>{formDataContrato.cRua || '__________________________________'}</span>, nº <span>{formDataContrato.cNumero || '____'}</span>, 
              Complemento <span>{formDataContrato.cComplemento || '__________'}</span>, Bairro <span>{formDataContrato.cBairro || '______________'}</span>, 
              Cidade <span>{formDataContrato.cCidade || '______________________'}</span>, CEP <span>{formDataContrato.cCep || '______________'}</span> no Estado de <span>{formDataContrato.cEstado || '____'}</span>;
            </p>

            <p className="text-justify indent-8">
              <strong>CONTRATADO:</strong> <strong>LEONARDO PAULA VIANA</strong>, Nacionalidade: <span>Brasileiro</span>, Estado Civil: <span>Casado</span>, 
              FISIOTERAPEUTA inscrito no <strong>CREFITO sob o nº 438289-F</strong> e no CPF sob o nº <span>____________________</span>, com endereço profissional de atendimento.
            </p>

            <p className="text-justify indent-8">
              As partes acima identificadas têm entre si justo e acertado o presente Contrato de Prestação de Serviços de Fisioterapia, que se regerá pelas cláusulas seguintes e pelas condições de prestação de serviço, preço, forma e termo de pagamento descritas no presente instrumento contratual:
            </p>

            <h4 className="font-bold uppercase pt-2">DO OBJETO DO CONTRATO</h4>
            <p className="text-justify">
              <strong>CLÁUSULA PRIMEIRA:</strong> O serviço de Fisioterapia ora contratado terá por objeto {formDataContrato.objeto ? <strong>{formDataContrato.objeto}</strong> : '___________________________________________________________________________________________________________________________________________________________________________'}.
            </p>

            <p className="text-justify indent-6">
              <strong>Parágrafo Primeiro.</strong> O serviço contratado será prestado nos dias <strong>{formDataContrato.diasAtendimento || '_____________________'}</strong>, às <strong>{formDataContrato.horarioAtendimento || '__________'}</strong> horas, {formDataContrato.localAtendimento === 'residencia' ? 'na própria residência do CONTRATANTE.' : `no seguinte endereço: ${formDataContrato.enderecoAtendimento || 'Rua ____________________________, nº ______, Bairro ______, na cidade de ________________, no Estado de __________.'}`}
            </p>

            <p className="text-justify indent-6">
              <strong>Parágrafo Segundo.</strong> Caso qualquer das partes não possa comparecer no horário determinado, este será obrigado a desmarcar com antecedência mínima de <strong>{formDataContrato.antecedenciaDesmarcar || '______'}</strong> horas, sob pena de, caso a falta seja do CONTRATANTE, pagar o preço do atendimento de fisioterapia, vigente à época da falta, e, caso seja do(a) CONTRATADO(A), o mesmo deverá abater o preço do atendimento no vencimento do mês subsequente à falta, ou repor o atendimento em dia e horário combinado entre CONTRATANTE E CONTRATADO(A).
            </p>

            <p className="text-justify indent-6">
              <strong>Parágrafo Terceiro.</strong> Caso haja necessidade de prolongar a prestação do serviço, além do horário estipulado, deverá o CONTRATANTE pagar, no mesmo dia, o preço do atendimento, proporcional às horas suplementares.
            </p>

            <p className="text-justify">
              <strong>CLÁUSULA SEGUNDA.</strong> O serviço que será prestado pelo(a) CONTRATADO(A) abrangerá a consulta, diagnóstico e elaboração do plano de tratamento, sequência e modo de sua execução.
            </p>

            <p className="text-justify indent-6">
              <strong>Parágrafo Primeiro.</strong> O CONTRATADO(A) poderá solicitar ao CONTRATANTE a realização de exames que se façam necessários para o seu diagnóstico fisioterapêutico, cuja recusa por parte do CONTRATANTE prejudicará a prestação dos serviços contratados, ficando este ciente.
            </p>

            <p className="text-justify indent-6">
              <strong>Parágrafo Segundo.</strong> O custeio dos exames ficará a cargo exclusivo do CONTRATANTE, não estando incluído no presente contrato.
            </p>

            <h4 className="font-bold uppercase pt-2">OBRIGAÇÕES DO CONTRATANTE</h4>
            <p className="text-justify">
              <strong>CLÁUSULA TERCEIRA.</strong> O CONTRATANTE deverá realizar todas as atividades que lhe forem prescritas conforme as determinações do CONTRATADO(A), inclusive, fazendo os exames solicitados, ficando ciente que a não realização destes poderá interferir na evolução do tratamento.
            </p>

            <p className="text-justify indent-6">
              <strong>Parágrafo Único.</strong> Compromete-se o CONTRATANTE a seguir as eventuais recomendações e orientações domiciliares prescritas pelo CONTRATADO visando o melhor resultado do tratamento.
            </p>

            <p className="text-justify">
              <strong>CLÁUSULA QUARTA.</strong> O CONTRATANTE deverá efetuar o pagamento na forma e condições estabelecidas neste contrato.
            </p>

            <p className="text-justify">
              <strong>CLÁUSULA QUINTA.</strong> O CONTRATANTE deverá comparecer ao tratamento, nos dias e horas marcados e com trajes adequados para execução das atividades e atendimentos.
            </p>

            <h4 className="font-bold uppercase pt-2">OBRIGAÇÕES DO CONTRATADO</h4>
            <p className="text-justify">
              <strong>CLÁUSULA SEXTA.</strong> É dever do(a) CONTRATADO(A) prestar o serviço de fisioterapia de acordo com as necessidades do CONTRATANTE, determinadas após consulta e diagnóstico fisioterapêutico, mantendo consigo prontuário próprio com a descrição e evolução do tratamento.
            </p>

            <p className="text-justify indent-6">
              <strong>Parágrafo Primeiro.</strong> O CONTRATADO está obrigado a prestar seus serviços utilizando o melhor material e as técnicas que julgar adequadas ao tratamento do paciente observando particularidades deste (limitação de idade, peso, condições clínicas e de saúde), em ambiente adequado ao atendimento fisioterapêutico.
            </p>

            <p className="text-justify indent-6">
              <strong>Parágrafo Segundo.</strong> Sendo o objeto do presente contrato uma obrigação de meio, não responde o CONTRATADO por expectativas de resultados, sendo que a responsabilidade eventual do CONTRATADO somente será apurada mediante a verificação de culpa.
            </p>

            <p className="text-justify">
              <strong>CLÁUSULA SÉTIMA.</strong> O(A) CONTRATADO(A) obriga-se a manter sigilo sobre todas as informações que tenha conhecimento em razão da prestação de serviço aqui estabelecida.
            </p>

            <h4 className="font-bold uppercase pt-2">DO PREÇO E DAS CONDIÇÕES DE PAGAMENTO</h4>
            <p className="text-justify">
              <strong>CLÁUSULA OITAVA.</strong> O serviço contratado no presente instrumento será remunerado pelo valor de <strong>R$ {formDataContrato.valorAtendimento || '______,____'} ({formDataContrato.valorExtenso || '________________________'})</strong> por atendimento, que deverá ser pago {formDataContrato.formaPagamento === 'dia_util' ? `todo o ${formDataContrato.diaUtilPagamento || '_____'}º dia útil de cada mês.` : formDataContrato.formaPagamento === 'final_semana' ? 'no final de cada semana.' : 'no final de cada atendimento prestado.'}
            </p>

            <h4 className="font-bold uppercase pt-2">DO INADIMPLEMENTO</h4>
            <p className="text-justify">
              <strong>CLÁUSULA NONA.</strong> Em caso de inadimplemento por parte do CONTRATANTE quanto ao pagamento estipulado na cláusula anterior, incidirá sobre o valor a ser pago, multa pecuniária de 2%, juros de mora de 1% ao mês e correção monetária considerando-se desde logo como índice a média do INPC/IGPDI, aplicado pela Justiça Estadual.
            </p>

            <h4 className="font-bold uppercase pt-2">DA RESCISÃO</h4>
            <p className="text-justify">
              <strong>CLÁUSULA DÉCIMA.</strong> O presente contrato poderá ser rescindido unilateralmente por qualquer uma das partes, desde que haja comunicação formal por escrito por qualquer meio que garanta a ciência inequívoca por parte do comunicado com antecedência mínima de 15 (quinze) dias.
            </p>

            <p className="text-justify">
              <strong>CLÁUSULA DÉCIMA PRIMEIRA.</strong> O CONTRATADO(A) se compromete, no caso de impossibilidade à continuidade do tratamento a indicar outro profissional para dar continuidade.
            </p>

            <h4 className="font-bold uppercase pt-2">DO FORO</h4>
            <p className="text-justify">
              <strong>CLÁUSULA DÉCIMA SEGUNDA.</strong> Para dirimir quaisquer controvérsias oriundas do presente contrato, as partes elegem o foro da comarca de <strong>{formDataContrato.cidadeForo || '___________________'}</strong>.
            </p>

            <p className="text-justify pt-2">
              Por estarem assim justos e contratados, CONTRATANTE E CONTRATADO firmam o presente instrumento, em duas vias de igual teor, juntamente com 2 (duas) testemunhas.
            </p>

            <div className="text-center pt-4">
              <p>
                {formDataContrato.localAssinatura || '___________________________'}, {formDataContrato.dataAssinatura ? formDataContrato.dataAssinatura.split('-').reverse().join(' de ') : '_____ de __________________ de ______'}
              </p>
            </div>

            <div className="pt-10 grid grid-cols-2 gap-8 text-center">
              <div>
                <div className="border-t border-gray-800 mx-auto w-4/5 mb-1"></div>
                <p className="font-bold uppercase text-xs">{formDataContrato.cNome || 'CONTRATANTE'}</p>
                <p className="text-xs">CONTRATANTE</p>
              </div>
              <div>
                <div className="border-t border-gray-800 mx-auto w-4/5 mb-1"></div>
                <p className="font-bold uppercase text-xs">LEONARDO PAULA VIANA</p>
                <p className="text-xs">CONTRATADO - CREFITO Nº 438289-F</p>
              </div>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-8 text-xs">
              <div className="space-y-1">
                <p>Testemunha 1: ___________________________________</p>
                <p>Nome: <strong>{formDataContrato.testemunha1Nome || '____________________________________'}</strong></p>
                <p>CPF: <strong>{formDataContrato.testemunha1Cpf || '____________________________________'}</strong></p>
              </div>
              <div className="space-y-1">
                <p>Testemunha 2: ___________________________________</p>
                <p>Nome: <strong>{formDataContrato.testemunha2Nome || '____________________________________'}</strong></p>
                <p>CPF: <strong>{formDataContrato.testemunha2Cpf || '____________________________________'}</strong></p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 7. RELATÓRIO FISIOTERAPÊUTICO (MANUTENÇÃO / CBDF) */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'relatorio-manutencao' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Dados do Relatório Fisioterapêutico (Manutenção)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do(a) Paciente</label>
                <input type="text" name="nome" value={formDataRelatorioManutencao.nome} onChange={handleInputRelatorioManutencao} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                <input type="date" name="dataNascimento" value={formDataRelatorioManutencao.dataNascimento} onChange={handleInputRelatorioManutencao} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input type="text" name="cpf" value={formDataRelatorioManutencao.cpf} onChange={handleInputRelatorioManutencao} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="000.000.000-00" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Profissional Responsável</label>
                <input type="text" name="profissional" value={formDataRelatorioManutencao.profissional} onChange={handleInputRelatorioManutencao} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Leonardo Paula Viana" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnóstico Médico</label>
                <input type="text" name="diagMedico" value={formDataRelatorioManutencao.diagMedico} onChange={handleInputRelatorioManutencao} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Diagnóstico do médico..." />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Quadro Clínico Observado</label>
                <textarea name="quadroClinico" rows={2} value={formDataRelatorioManutencao.quadroClinico} onChange={handleInputRelatorioManutencao} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="De acordo com o quadro clínico, observou-se..." />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ao Exame Físico Apresentou</label>
                <textarea name="exameFisico" rows={2} value={formDataRelatorioManutencao.exameFisico} onChange={handleInputRelatorioManutencao} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Achados do exame físico..." />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnóstico Funcional CBDF</label>
                <textarea name="diagCBDF" rows={2} value={formDataRelatorioManutencao.diagCBDF} onChange={handleInputRelatorioManutencao} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Classificação Brasileira de Diagnóstico Fisioterapêutico..." />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Objetivos Propostos</label>
                <textarea name="objetivos" rows={2} value={formDataRelatorioManutencao.objetivos} onChange={handleInputRelatorioManutencao} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Objetivos do tratamento..." />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Plano de Tratamento Proposto</label>
                <textarea name="planoTratamento" rows={2} value={formDataRelatorioManutencao.planoTratamento} onChange={handleInputRelatorioManutencao} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Plano e condutas propostas..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Emissão / Assinatura</label>
                <input type="date" name="dataAssinatura" value={formDataRelatorioManutencao.dataAssinatura} onChange={handleInputRelatorioManutencao} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:bg-transparent print:shadow-none print:border-none print:p-0 min-h-[800px] flex flex-col relative text-gray-800">
            <div className="text-center mb-10 pt-6">
              <h1 className="text-2xl font-bold uppercase tracking-widest underline">Relatório Fisioterapêutico</h1>
            </div>

            <div className="flex-1 text-justify text-base leading-relaxed space-y-4">
              <div className="border-b border-gray-300 pb-3 mb-4 flex flex-wrap justify-between gap-y-2">
                <div>Paciente: <strong className="uppercase border-b border-gray-400 px-2 min-w-[320px] inline-block">{formDataRelatorioManutencao.nome || '________________________________________________'}</strong></div>
                <div>Data de Nasc.: <strong className="border-b border-gray-400 px-2">{formDataRelatorioManutencao.dataNascimento ? formDataRelatorioManutencao.dataNascimento.split('-').reverse().join(' / ') : '_____ / _____ / ______'}</strong></div>
                <div>CPF: <strong className="border-b border-gray-400 px-2">{formDataRelatorioManutencao.cpf || '_______________________'}</strong></div>
              </div>

              <p className="leading-loose">
                Declaro que o (a) Sr (a) <strong className="uppercase border-b border-gray-400 px-2 min-w-[280px] inline-block text-center">{formDataRelatorioManutencao.nome || '_____________________________________________________'}</strong>, 
                admitido para atendimento fisioterapêutico, com o profissional <strong className="border-b border-gray-400 px-2 min-w-[200px] inline-block text-center">{formDataRelatorioManutencao.profissional || 'Leonardo Paula Viana'}</strong>, 
                Diagnóstico médico <span className="border-b border-gray-400 px-2 min-w-[250px] inline-block">{formDataRelatorioManutencao.diagMedico || '_______________________________________________________'}</span>, 
                De acordo com o quadro clinico, observou-se <span className="border-b border-gray-400 px-2 min-w-[250px] inline-block">{formDataRelatorioManutencao.quadroClinico || '________________________________________________________________________________________________'}</span>, 
                Ao exame físico apresentou: <span className="border-b border-gray-400 px-2 min-w-[250px] inline-block">{formDataRelatorioManutencao.exameFisico || '________________________________________________________________________________________________'}</span>, 
                Apresenta como diagnóstico funcional CBDF: <span className="border-b border-gray-400 px-2 min-w-[250px] inline-block">{formDataRelatorioManutencao.diagCBDF || '_________________________________________________________________________________________'}</span>.
              </p>

              <div className="pt-2">
                <p>Os objetivos propostos foram: <span className="border-b border-gray-400 px-2 inline-block min-w-[300px]">{formDataRelatorioManutencao.objetivos || '_________________________________________________________________________________________'}</span></p>
              </div>

              <div className="pt-2">
                <p>Plano de tratamento proposto: <span className="border-b border-gray-400 px-2 inline-block min-w-[300px]">{formDataRelatorioManutencao.planoTratamento || '________________________________________________________________________________________'}</span>.</p>
              </div>

              <p className="pt-4 font-semibold">
                Evoluiu com persistência do quadro clinico descrito acima, sendo necessário manter o tratamento fisioterapêutico.
              </p>

              {formDataRelatorioManutencao.dataAssinatura && (
                <p className="pt-2 text-right">
                  Data: <strong className="border-b border-gray-400 px-2">{formDataRelatorioManutencao.dataAssinatura.split('-').reverse().join(' / ')}</strong>
                </p>
              )}
            </div>

            <div className="mt-20 mb-10 flex flex-col items-center justify-center text-center">
              <div className="w-80 border-t border-gray-800 mb-2"></div>
              <p className="font-bold">Leonardo Paula Viana</p>
              <p>Fisioterapeuta</p>
              <p>CREFITO Nº 438289-F</p>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 8. RELATÓRIO FISIOTERAPÊUTICO COMPLETO (6 ETAPAS) */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'relatorio-completo' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Dados do Relatório Fisioterapêutico Completo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do(a) Paciente</label>
                <input type="text" name="nome" value={formDataRelatorioCompleto.nome} onChange={handleInputRelatorioCompleto} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                <input type="date" name="dataNascimento" value={formDataRelatorioCompleto.dataNascimento} onChange={handleInputRelatorioCompleto} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input type="text" name="cpf" value={formDataRelatorioCompleto.cpf} onChange={handleInputRelatorioCompleto} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="000.000.000-00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. Acompanhamento Desde</label>
                <input type="date" name="dataInicio" value={formDataRelatorioCompleto.dataInicio} onChange={handleInputRelatorioCompleto} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">1. Quadro Apresentado (Introdução)</label>
                <input type="text" name="quadroIntroducao" value={formDataRelatorioCompleto.quadroIntroducao} onChange={handleInputRelatorioCompleto} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Quadro de..." />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">2. Avaliação Inicial</label>
                <textarea name="avaliacaoInicial" rows={2} value={formDataRelatorioCompleto.avaliacaoInicial} onChange={handleInputRelatorioCompleto} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Descrição da avaliação inicial..." />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">3. Evolução</label>
                <textarea name="evolucao" rows={2} value={formDataRelatorioCompleto.evolucao} onChange={handleInputRelatorioCompleto} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Evolução do quadro..." />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">4. Conduta Terapêutica</label>
                <textarea name="condutaTerapeutica" rows={2} value={formDataRelatorioCompleto.condutaTerapeutica} onChange={handleInputRelatorioCompleto} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Condutas e técnicas aplicadas..." />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">5. Resultados Obtidos</label>
                <textarea name="resultadosObtidos" rows={2} value={formDataRelatorioCompleto.resultadosObtidos} onChange={handleInputRelatorioCompleto} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Resultados quantitativos e qualitativos..." />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">6. Conclusão</label>
                <textarea name="conclusao" rows={2} value={formDataRelatorioCompleto.conclusao} onChange={handleInputRelatorioCompleto} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Parecer final e orientações..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data do Relatório</label>
                <input type="date" name="dataAssinatura" value={formDataRelatorioCompleto.dataAssinatura} onChange={handleInputRelatorioCompleto} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:bg-transparent print:shadow-none print:border-none print:p-0 min-h-[800px] flex flex-col relative text-gray-800">
            <div className="text-center mb-8 pt-4">
              <h1 className="text-2xl font-bold uppercase tracking-widest underline">Relatório Fisioterapêutico</h1>
            </div>

            <div className="border-b border-gray-300 pb-3 mb-6 flex flex-wrap justify-between gap-y-2 text-sm">
              <div>Paciente: <strong className="uppercase border-b border-gray-400 px-2 min-w-[300px] inline-block">{formDataRelatorioCompleto.nome || '________________________________________________'}</strong></div>
              <div>Data de Nasc.: <strong className="border-b border-gray-400 px-2">{formDataRelatorioCompleto.dataNascimento ? formDataRelatorioCompleto.dataNascimento.split('-').reverse().join(' / ') : '_____ / _____ / ______'}</strong></div>
              <div>CPF: <strong className="border-b border-gray-400 px-2">{formDataRelatorioCompleto.cpf || '_______________________'}</strong></div>
            </div>

            <div className="flex-1 text-justify text-sm leading-relaxed space-y-4">
              <div>
                <h4 className="font-bold uppercase text-xs text-gray-700">1. INTRODUÇÃO</h4>
                <p className="leading-normal pt-1">
                  O (A) paciente acima identificado (a) encontra-se em acompanhamento fisioterapêutico desde <strong className="border-b border-gray-400 px-2">{formDataRelatorioCompleto.dataInicio ? formDataRelatorioCompleto.dataInicio.split('-').reverse().join(' / ') : '_____ / _____ / ______'}</strong>, 
                  apresentando quadro de <span className="border-b border-gray-400 px-2 min-w-[200px] inline-block">{formDataRelatorioCompleto.quadroIntroducao || '________________________________________________________________________'}</span>.
                </p>
              </div>

              <div>
                <h4 className="font-bold uppercase text-xs text-gray-700">2. AVALIAÇÃO INICIAL</h4>
                <p className="border-b border-gray-300 min-h-[1.6rem] pt-1">{formDataRelatorioCompleto.avaliacaoInicial}</p>
                <p className="border-b border-gray-300 min-h-[1.6rem]"></p>
              </div>

              <div>
                <h4 className="font-bold uppercase text-xs text-gray-700">3. EVOLUÇÃO</h4>
                <p className="border-b border-gray-300 min-h-[1.6rem] pt-1">{formDataRelatorioCompleto.evolucao}</p>
                <p className="border-b border-gray-300 min-h-[1.6rem]"></p>
              </div>

              <div>
                <h4 className="font-bold uppercase text-xs text-gray-700">4. CONDUTA TERAPÊUTICA</h4>
                <p className="border-b border-gray-300 min-h-[1.6rem] pt-1">{formDataRelatorioCompleto.condutaTerapeutica}</p>
                <p className="border-b border-gray-300 min-h-[1.6rem]"></p>
              </div>

              <div>
                <h4 className="font-bold uppercase text-xs text-gray-700">5. RESULTADOS OBTIDOS</h4>
                <p className="border-b border-gray-300 min-h-[1.6rem] pt-1">{formDataRelatorioCompleto.resultadosObtidos}</p>
                <p className="border-b border-gray-300 min-h-[1.6rem]"></p>
              </div>

              <div>
                <h4 className="font-bold uppercase text-xs text-gray-700">6. CONCLUSÃO</h4>
                <p className="border-b border-gray-300 min-h-[1.6rem] pt-1">{formDataRelatorioCompleto.conclusao}</p>
                <p className="border-b border-gray-300 min-h-[1.6rem]"></p>
              </div>

              <p className="pt-2">Agradeço a atenção e fico à disposição.</p>
              <p className="pt-1">
                Data: <strong className="border-b border-gray-400 px-2">{formDataRelatorioCompleto.dataAssinatura ? formDataRelatorioCompleto.dataAssinatura.split('-').reverse().join(' / ') : '_____ / _____ / ______'}</strong>
              </p>
            </div>

            <div className="mt-14 mb-8 flex flex-col items-center justify-center text-center">
              <div className="w-80 border-t border-gray-800 mb-2"></div>
              <p className="font-bold">Leonardo Paula Viana</p>
              <p>Fisioterapeuta</p>
              <p>CREFITO Nº 438289-F</p>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 9. TERMO DE AUTORIZAÇÃO DO USO DE IMAGEM */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'autorizacao-imagem' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Dados da Autorização de Uso de Imagem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input type="text" name="nome" value={formDataImagem.nome} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Nome da pessoa que autoriza" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nacionalidade</label>
                <input type="text" name="nacionalidade" value={formDataImagem.nacionalidade} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado Civil</label>
                <input type="text" name="estadoCivil" value={formDataImagem.estadoCivil} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Ex: Solteiro(a)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profissão</label>
                <input type="text" name="profissao" value={formDataImagem.profissao} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Ex: Autônomo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RG</label>
                <input type="text" name="rg" value={formDataImagem.rg} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="00.000.000-0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input type="text" name="cpf" value={formDataImagem.cpf} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="000.000.000-00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rua / Endereço</label>
                <input type="text" name="rua" value={formDataImagem.rua} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Rua..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                <input type="text" name="numero" value={formDataImagem.numero} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="123" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade (Residência)</label>
                <input type="text" name="cidade" value={formDataImagem.cidade} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Guarulhos" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço da Clínica / Consultório</label>
                <input type="text" name="enderecoClinica" value={formDataImagem.enderecoClinica} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Rua do consultório..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade da Clínica</label>
                <input type="text" name="cidadeClinica" value={formDataImagem.cidadeClinica} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Guarulhos" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade do Termo</label>
                <input type="text" name="cidadeTermo" value={formDataImagem.cidadeTermo} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Guarulhos" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data da Assinatura</label>
                <input type="date" name="dataAssinatura" value={formDataImagem.dataAssinatura} onChange={handleInputImagem} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:shadow-none print:border-none print:p-0 min-h-[800px] flex flex-col relative text-gray-800 text-sm leading-relaxed">
            <div className="text-center mb-10 pt-6">
              <h1 className="text-xl font-bold uppercase tracking-wider underline">Termo de Autorização do Uso de Imagem</h1>
            </div>

            <div className="flex-1 text-justify space-y-4">
              <p className="indent-8 leading-loose">
                Eu, <strong className="uppercase border-b border-gray-400 px-2 min-w-[280px] inline-block text-center">{formDataImagem.nome || '__________________________________________'}</strong>, 
                Nacionalidade: <span className="border-b border-gray-400 px-2">{formDataImagem.nacionalidade || '_____________'}</span>, 
                Estado civil: <span className="border-b border-gray-400 px-2">{formDataImagem.estadoCivil || '_______________'}</span>, 
                profissão: <span className="border-b border-gray-400 px-2">{formDataImagem.profissao || '____________'}</span>, 
                RG: <strong className="border-b border-gray-400 px-2 min-w-[120px] inline-block text-center">{formDataImagem.rg || '___________________'}</strong>, 
                CPF <strong className="border-b border-gray-400 px-2 min-w-[120px] inline-block text-center">{formDataImagem.cpf || '________________'}</strong>, 
                residente à Rua <span className="border-b border-gray-400 px-2 min-w-[200px] inline-block">{formDataImagem.rua || '_____________________________________'}</span> nº <span className="border-b border-gray-400 px-2">{formDataImagem.numero || '______'}</span>, 
                na cidade <span className="border-b border-gray-400 px-2 min-w-[120px] inline-block">{formDataImagem.cidade || '___________________'}</span>, 
                <strong> AUTORIZO</strong> o uso de minha imagem em todo e qualquer material entre fotos, Redes Sociais, exames e outros meios de comunicação, para ser utilizada pela(o) fisioterapeuta <strong className="border-b border-gray-400 px-2">{formDataImagem.fisioterapeuta || 'Leonardo Paula Viana'}</strong>, 
                situada na Rua <span className="border-b border-gray-400 px-2 min-w-[200px] inline-block">{formDataImagem.enderecoClinica || '________________________________________'}</span>, 
                Cidade <span className="border-b border-gray-400 px-2 min-w-[100px] inline-block">{formDataImagem.cidadeClinica || '_______________'}</span>, 
                sejam essas destinadas à divulgação ao público em geral e/ou apenas para uso interno desta instituição, desde que não haja desvirtuamento da sua finalidade.
              </p>

              <p className="indent-8 leading-normal">
                A presente autorização é concedida a título gratuito, abrangendo o uso da imagem acima mencionada em todo território nacional e no exterior, em todas as suas modalidades e, em destaque, das seguintes formas: 
                (I) folhetos em geral (encartes, mala direta, catálogo, etc.); 
                (II) folder de apresentação; 
                (III) anúncios em revistas e jornais em geral; 
                (IV) home page; 
                (V) cartazes; 
                (VI) mídia eletrônica e apresentações públicas (painéis, vídeo-tapes, televisão, data show, cinema, programa para rádio, entre outros).
              </p>

              <p className="indent-8 leading-normal">
                Por esta ser a expressão da minha vontade declaro que autorizo o uso acima descrito sem que nada haja a ser reclamado a título de direitos conexos à minha imagem ou a qualquer outro, e assino a presente autorização em 02 (duas) vias de igual teor e forma.
              </p>

              <div className="text-center pt-8">
                <p>
                  <span>{formDataImagem.cidadeTermo || '_______________________'}</span>, <span>{formDataImagem.dataAssinatura ? formDataImagem.dataAssinatura.split('-').reverse().join(' de ') : '_______ de _____________________ de 20___'}</span>
                </p>
              </div>

              <div className="pt-16 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="border-t border-gray-800 mx-auto w-4/5 mb-1"></div>
                  <p className="font-bold uppercase">{formDataImagem.nome || 'Nome da pessoa que autorizou o uso da imagem'}</p>
                  <p>Autorizador(a)</p>
                </div>
                <div>
                  <div className="border-t border-gray-800 mx-auto w-4/5 mb-1"></div>
                  <p className="font-bold">Leonardo Paula Viana</p>
                  <p>Fisioterapeuta - CREFITO Nº 438289-F</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 10. SOLICITAÇÃO DE EXAMES COMPLEMENTARES */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'solicitacao-exames' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Dados da Solicitação de Exame</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do(a) Paciente</label>
                <input type="text" name="nome" value={formDataExames.nome} onChange={handleInputExames} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                <input type="date" name="dataNascimento" value={formDataExames.dataNascimento} onChange={handleInputExames} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input type="text" name="cpf" value={formDataExames.cpf} onChange={handleInputExames} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="000.000.000-00" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                <input type="text" name="especialidade" value={formDataExames.especialidade} onChange={handleInputExames} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Fisioterapia" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Exame(s) Complementar(es) Solicitado(s)</label>
                <textarea name="exameSolicitado" rows={3} value={formDataExames.exameSolicitado} onChange={handleInputExames} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Ex: Ressonância Magnética da Coluna Lombar, Radiografia Simples..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input type="date" name="data" value={formDataExames.data} onChange={handleInputExames} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:shadow-none print:border-none print:p-0 min-h-[800px] flex flex-col relative text-gray-800 text-sm leading-relaxed">
            <div className="text-center mb-12 pt-8">
              <h1 className="text-2xl font-bold uppercase tracking-widest underline">Solicitação de Exame Complementar Fisioterapêutico</h1>
            </div>

            <div className="flex-1 space-y-6">
              <div className="border-b border-gray-300 pb-4 space-y-2">
                <p>Paciente: <strong className="uppercase border-b border-gray-400 px-2 min-w-[320px] inline-block">{formDataExames.nome || '____________________________________________________________'}</strong></p>
                <div className="flex gap-8">
                  <p>Data de Nascimento: <strong className="border-b border-gray-400 px-2">{formDataExames.dataNascimento ? formDataExames.dataNascimento.split('-').reverse().join(' / ') : '_____ / _____ / ______'}</strong></p>
                  <p>CPF: <strong className="border-b border-gray-400 px-2">{formDataExames.cpf || '________________________'}</strong></p>
                </div>
                <p>Especialidade: <strong className="border-b border-gray-400 px-2 min-w-[200px] inline-block">{formDataExames.especialidade || '_______________________________________________________'}</strong></p>
              </div>

              <div className="pt-2">
                <p className="font-semibold mb-2">Solicito a realização do seguinte exame complementar:</p>
                <div className="border border-gray-300 rounded-md p-4 min-h-[120px] bg-gray-50/50">
                  <p className="whitespace-pre-wrap font-medium">{formDataExames.exameSolicitado || '____________________________________________________________________________________________________________________________________________________________________________________________________________________'}</p>
                </div>
              </div>

              <div className="pt-4 space-y-2 text-justify">
                <p className="font-bold text-xs uppercase tracking-wider text-gray-700">JUSTIFICATIVA / OBJETIVO:</p>
                <p className="leading-relaxed">
                  Solicitação destinada à avaliação e investigação complementar do quadro apresentado pelo(a) paciente, com a finalidade de subsidiar a avaliação e o diagnóstico fisioterapêutico, bem como auxiliar na definição, acompanhamento ou adequação da conduta fisioterapêutica.
                </p>
              </div>

              <p className="pt-6">
                Data: <strong className="border-b border-gray-400 px-2">{formDataExames.data ? formDataExames.data.split('-').reverse().join(' / ') : '_____ / _____ / ______'}</strong>
              </p>
            </div>

            <div className="mt-20 mb-12 flex flex-col items-center justify-center text-center">
              <div className="w-80 border-t border-gray-800 mb-2"></div>
              <p className="font-bold">Leonardo Paula Viana</p>
              <p>Fisioterapeuta</p>
              <p>CREFITO Nº 438289-F</p>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 11. TCLE FISIOTERAPIA INDIVIDUALIZADA */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'consentimento-individualizada' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Dados do TCLE para Assistência Fisioterapêutica Individualizada</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo do Cliente</label>
                <input type="text" name="nome" value={formDataIndividualizada.nome} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                <input type="number" name="idade" value={formDataIndividualizada.idade} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Ex: 35" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nacionalidade</label>
                <input type="text" name="nacionalidade" value={formDataIndividualizada.nacionalidade} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado Civil</label>
                <input type="text" name="estadoCivil" value={formDataIndividualizada.estadoCivil} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Ex: Casado(a)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profissão</label>
                <input type="text" name="profissao" value={formDataIndividualizada.profissao} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Ex: Engenheiro" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RG</label>
                <input type="text" name="rg" value={formDataIndividualizada.rg} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="00.000.000-0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input type="text" name="cpf" value={formDataIndividualizada.cpf} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="000.000.000-00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                <input type="text" name="cidade" value={formDataIndividualizada.cidade} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Guarulhos" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rua / Endereço</label>
                <input type="text" name="rua" value={formDataIndividualizada.rua} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Rua..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                <input type="text" name="numero" value={formDataIndividualizada.numero} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="123" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data da Assinatura</label>
                <input type="date" name="dataAssinatura" value={formDataIndividualizada.dataAssinatura} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>

              {/* Testemunhas */}
              <div className="md:col-span-3 border-t pt-3">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Testemunhas</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Testemunha 1 - Nome</label>
                    <input type="text" name="testemunha1Nome" value={formDataIndividualizada.testemunha1Nome} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Nome completo" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Testemunha 1 - CPF</label>
                    <input type="text" name="testemunha1Cpf" value={formDataIndividualizada.testemunha1Cpf} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="000.000.000-00" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Testemunha 2 - Nome</label>
                    <input type="text" name="testemunha2Nome" value={formDataIndividualizada.testemunha2Nome} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Nome completo" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Testemunha 2 - CPF</label>
                    <input type="text" name="testemunha2Cpf" value={formDataIndividualizada.testemunha2Cpf} onChange={handleInputIndividualizada} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="000.000.000-00" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:shadow-none print:border-none print:p-0 min-h-[800px] flex flex-col relative text-gray-800 text-sm leading-relaxed">
            <div className="text-center mb-10 pt-6">
              <h1 className="text-base font-bold uppercase tracking-wider underline">
                Termo de Consentimento Esclarecido do Cliente para Assistência Fisioterapêutica Individualizada
              </h1>
            </div>

            <div className="flex-1 text-justify space-y-4 leading-loose">
              <p className="indent-8">
                Eu, <strong className="uppercase border-b border-gray-400 px-2 min-w-[280px] inline-block text-center">{formDataIndividualizada.nome || '__________________________________________'}</strong>, 
                Nacionalidade: <span className="border-b border-gray-400 px-2">{formDataIndividualizada.nacionalidade || '_____________'}</span>, 
                Estado civil: <span className="border-b border-gray-400 px-2">{formDataIndividualizada.estadoCivil || '_______________'}</span>, 
                profissão: <span className="border-b border-gray-400 px-2">{formDataIndividualizada.profissao || '____________'}</span>, 
                RG: <strong className="border-b border-gray-400 px-2 min-w-[120px] inline-block text-center">{formDataIndividualizada.rg || '___________________'}</strong>, 
                CPF: <strong className="border-b border-gray-400 px-2 min-w-[120px] inline-block text-center">{formDataIndividualizada.cpf || '________________'}</strong>, 
                residente à Rua <span className="border-b border-gray-400 px-2 min-w-[200px] inline-block">{formDataIndividualizada.rua || '_____________________________________'}</span> nº <span className="border-b border-gray-400 px-2">{formDataIndividualizada.numero || '______'}</span>, 
                na cidade <span className="border-b border-gray-400 px-2 min-w-[120px] inline-block">{formDataIndividualizada.cidade || '___________________'}</span>, 
                nesta data com <strong className="border-b border-gray-400 px-2 min-w-[40px] inline-block text-center">{formDataIndividualizada.idade || '_____'}</strong> anos de idade, 
                <strong> DECLARO</strong> estando em pleno gozo de minhas faculdades mentais, que fui previamente informado por meu/minha Fisioterapeuta, Dr(a). <strong className="border-b border-gray-400 px-2">{formDataIndividualizada.fisioterapeuta || 'Leonardo Paula Viana'}</strong>, 
                registrado(a) no CREFITO sob o nº <strong className="border-b border-gray-400 px-2">{formDataIndividualizada.crefito || '438289-F'}</strong>, 
                acerca do meu estado de saúde funcional, bem como declaro, também, que recebi deste(a) todos os esclarecimentos necessários no que se refere ao diagnóstico fisioterapêutico e/ou os objetivos da assistência fisioterapêutica para o tratamento ao qual irei me submeter, tendo este cumprido o dever que lhe é imposto no art. 14, inciso V, da Res. COFFITO nº 424/2013.
              </p>

              <p className="indent-8">
                Declaro, ainda, ter sido informado (a), de forma clara acerca da finalidade, riscos e benefícios de referido tratamento, bem como dos efeitos colaterais e outras anormalidades e intercorrências que poderão advir do mesmo.
              </p>

              <p className="indent-8 font-semibold">
                Assim sendo, concordo em me submeter INDIVIDUALMENTE ao tratamento proposto e, para tanto, assino o presente documento na presença de duas testemunhas.
              </p>

              <div className="pt-8 space-y-1">
                <p>Assinatura: __________________________________________________________________</p>
                <p>Nome: <strong className="uppercase">{formDataIndividualizada.nome || '___________________________________________'}</strong></p>
                <p>CPF: <strong>{formDataIndividualizada.cpf || '_______________________'}</strong> &nbsp;&nbsp;&nbsp;&nbsp; R.G.: <strong>{formDataIndividualizada.rg || '________________'}</strong></p>
              </div>

              <div className="pt-8 grid grid-cols-2 gap-8 text-xs">
                <div className="space-y-1">
                  <p>Testemunha 1: ___________________________________</p>
                  <p>Nome: <strong>{formDataIndividualizada.testemunha1Nome || '_____________________________'}</strong></p>
                  <p>CPF: <strong>{formDataIndividualizada.testemunha1Cpf || '_____________________________'}</strong></p>
                </div>
                <div className="space-y-1">
                  <p>Testemunha 2: ___________________________________</p>
                  <p>Nome: <strong>{formDataIndividualizada.testemunha2Nome || '_____________________________'}</strong></p>
                  <p>CPF: <strong>{formDataIndividualizada.testemunha2Cpf || '_____________________________'}</strong></p>
                </div>
              </div>

              {formDataIndividualizada.dataAssinatura && (
                <p className="pt-4 text-center">
                  Data: <strong className="border-b border-gray-400 px-2">{formDataIndividualizada.dataAssinatura.split('-').reverse().join(' / ')}</strong>
                </p>
              )}
            </div>

            <div className="mt-14 mb-8 flex flex-col items-center justify-center text-center">
              <div className="w-80 border-t border-gray-800 mb-2"></div>
              <p className="font-bold">Leonardo Paula Viana</p>
              <p>Fisioterapeuta</p>
              <p>CREFITO Nº 438289-F</p>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 12. TCLE DRY NEEDLING (AGULHAMENTO SECO) */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'consentimento-dry-needling' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Dados do TCLE para Dry Needling (Agulhamento Seco)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do(a) Paciente</label>
                <input type="text" name="nome" value={formDataDryNeedling.nome} onChange={handleInputDryNeedling} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                <input type="date" name="dataNascimento" value={formDataDryNeedling.dataNascimento} onChange={handleInputDryNeedling} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                <input type="text" name="idade" value={formDataDryNeedling.idade} onChange={handleInputDryNeedling} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Ex: 28 anos" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nº Prontuário</label>
                <input type="text" name="prontuario" value={formDataDryNeedling.prontuario} onChange={handleInputDryNeedling} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="12345" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RG</label>
                <input type="text" name="rg" value={formDataDryNeedling.rg} onChange={handleInputDryNeedling} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="00.000.000-0" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hipótese Diagnóstica (HD)</label>
                <input type="text" name="hd" value={formDataDryNeedling.hd} onChange={handleInputDryNeedling} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Hipótese diagnóstica ou queixa principal..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Autorização</label>
                <select name="autorizacao" value={formDataDryNeedling.autorizacao} onChange={handleInputDryNeedling} className="w-full px-3 py-2 border rounded-md outline-none">
                  <option value="sim">Autorizo a realização do tratamento</option>
                  <option value="nao">Não autorizo a realização do tratamento</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade do Termo</label>
                <input type="text" name="cidadeTermo" value={formDataDryNeedling.cidadeTermo} onChange={handleInputDryNeedling} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Guarulhos" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data da Assinatura</label>
                <input type="date" name="dataAssinatura" value={formDataDryNeedling.dataAssinatura} onChange={handleInputDryNeedling} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:shadow-none print:border-none print:p-0 text-gray-900 text-xs leading-relaxed space-y-3">
            <div className="text-center mb-4 pt-2">
              <h1 className="text-base font-bold uppercase tracking-wider underline">
                Termo de Consentimento Livre e Esclarecido para Dry Needling – Agulhamento Seco
              </h1>
            </div>

            <div className="border border-gray-300 p-3 rounded space-y-1">
              <div className="flex flex-wrap justify-between gap-y-1">
                <p>Nome: <strong className="uppercase border-b border-gray-400 px-1 min-w-[250px] inline-block">{formDataDryNeedling.nome || '________________________________________________'}</strong></p>
                <p>Nasc.: <strong className="border-b border-gray-400 px-1">{formDataDryNeedling.dataNascimento ? formDataDryNeedling.dataNascimento.split('-').reverse().join(' / ') : '____ / ____ / ____'}</strong></p>
                <p>Idade: <strong className="border-b border-gray-400 px-1">{formDataDryNeedling.idade || '________'}</strong></p>
                <p>Prontuário: <strong className="border-b border-gray-400 px-1">{formDataDryNeedling.prontuario || '_______'}</strong></p>
              </div>
              <p>HD: <strong className="border-b border-gray-400 px-1 min-w-[300px] inline-block">{formDataDryNeedling.hd || '_____________________________________________________________________'}</strong></p>
            </div>

            <p className="font-semibold pt-1">DRY NEEDLING – AGULHAMENTO SECO</p>

            <p><strong>Declaro que fui claramente informado(a) sobre:</strong></p>
            <ol className="list-decimal pl-5 space-y-1 text-justify">
              <li>Minha responsabilidade pelas informações fornecidas, especialmente no que diz respeito às minhas condições de saúde geral, não tendo omitido nenhum dado referente a doenças pré-existentes ou outras condições de saúde de meu conhecimento. Estou ciente de que a omissão de informações sobre minha saúde e sobre o uso de medicamentos poderá interferir negativamente na segurança, no planejamento e no andamento do tratamento fisioterapêutico;</li>
              <li>O Dry Needling (Agulhamento Seco) é uma técnica fisioterapêutica que utiliza agulhas filiformes estéreis e apropriadas para o procedimento, inseridas através da pele em estruturas musculoesqueléticas previamente avaliadas pelo fisioterapeuta. A técnica tem como objetivo terapêutico auxiliar na redução da dor, diminuição da tensão muscular, melhora da mobilidade, função muscular e movimento, conforme a avaliação e o plano de tratamento fisioterapêutico;</li>
              <li>Para maior segurança, devo informar previamente ao fisioterapeuta em caso de gestação ou suspeita de gravidez, alterações na coagulação sanguínea, uso de anticoagulantes ou outros medicamentos que possam interferir na coagulação, diabetes, doenças ou alterações da pele na região a ser tratada, doenças infectocontagiosas, alergias, cirurgias recentes, presença de implantes ou dispositivos, bem como o uso de medicamentos, suplementos ou qualquer outra informação de saúde que possa ser pertinente;</li>
              <li>De acordo com a estratégia de tratamento definida, podem acontecer algumas reações e/ou efeitos adversos durante ou após cada atendimento, tais como: dor ou desconforto no local da aplicação, pequenos sangramentos, hematomas ou equimoses, sensibilidade ou dor muscular temporária, vermelhidão ou irritação local, sensação de peso, lipotimia (desmaio), alteração transitória da sensibilidade, sonolência ou fadiga, tontura ou mal-estar, náuseas e/ou piora temporária dos sintomas.</li>
            </ol>

            <p className="text-justify pt-1">
              Declaro, portanto, que fui devidamente informado(a) quanto ao procedimento que será realizado, assim como seus objetivos, benefícios esperados, riscos, contraindicações, limitações e principais efeitos adversos relacionados, sendo-me concedida a oportunidade de esclarecer todas as dúvidas antes da assinatura deste documento. Estou ciente de que não há garantia de resultado específico e de que, a qualquer momento, posso mudar de opinião e desistir da realização do procedimento.
            </p>

            <div className="pt-2 flex gap-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-gray-800 flex items-center justify-center font-bold text-xs pb-0.5">
                  {formDataDryNeedling.autorizacao === 'sim' ? 'X' : ''}
                </div>
                <span>Autorizo a realização do tratamento proposto.</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-gray-800 flex items-center justify-center font-bold text-xs pb-0.5">
                  {formDataDryNeedling.autorizacao === 'nao' ? 'X' : ''}
                </div>
                <span>Não autorizo a realização do tratamento proposto.</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between gap-4">
              <p>Nome do paciente: <strong className="uppercase border-b border-gray-400 px-1">{formDataDryNeedling.nome || '________________________________________'}</strong></p>
              <p>RG: <strong className="border-b border-gray-400 px-1">{formDataDryNeedling.rg || '______________'}</strong></p>
            </div>

            <div className="pt-2 border-t border-gray-300">
              <p className="font-bold text-xs uppercase mb-1">Declaração do Profissional</p>
              <p className="text-[11px] text-justify leading-relaxed">
                Afirmo, para os devidos fins, que expliquei detalhadamente todas as informações necessárias sobre o procedimento de Dry Needling (Agulhamento Seco), incluindo seus objetivos, benefícios esperados, riscos, contraindicações, possíveis efeitos adversos e alternativas terapêuticas. Declaro que respondi às perguntas formuladas pelo(a) paciente e/ou responsável legal e certifiquei-me de que houve compreensão das informações apresentadas, estando o(a) paciente e/ou responsável ciente de que, a qualquer momento, poderá mudar de opinião e desistir da realização do procedimento.
              </p>
            </div>

            <div className="pt-3 flex justify-between items-end">
              <div>
                <p>{formDataDryNeedling.cidadeTermo || '____________________________'}, {formDataDryNeedling.dataAssinatura ? formDataDryNeedling.dataAssinatura.split('-').reverse().join(' de ') : '_______ de _______________ de 20___'}</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-800 w-64 mb-1"></div>
                <p className="font-bold">Leonardo Paula Viana</p>
                <p className="text-[10px]">Fisioterapeuta - CREFITO Nº 438289-F</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 13. TCLE ACUPUNTURA SISTÊMICA */}
      {/* -------------------------------------------------------------------- */}
      {selectedDoc === 'consentimento-acupuntura' && (
        <>
          <div className="print:hidden bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 space-y-6">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Dados do TCLE para Acupuntura Sistêmica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do(a) Paciente</label>
                <input type="text" name="nome" value={formDataAcupuntura.nome} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                <input type="date" name="dataNascimento" value={formDataAcupuntura.dataNascimento} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                <input type="text" name="idade" value={formDataAcupuntura.idade} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Ex: 34 anos" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nº Prontuário</label>
                <input type="text" name="prontuario" value={formDataAcupuntura.prontuario} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="12345" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RG do Paciente</label>
                <input type="text" name="rg" value={formDataAcupuntura.rg} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="00.000.000-0" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hipótese Diagnóstica (HD)</label>
                <input type="text" name="hd" value={formDataAcupuntura.hd} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Hipótese diagnóstica..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input type="text" name="telefone" value={formDataAcupuntura.telefone} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="(11) 90000-0000" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Residencial</label>
                <input type="text" name="endereco" value={formDataAcupuntura.endereco} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Rua, número, bairro, cidade" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Autorização</label>
                <select name="autorizacao" value={formDataAcupuntura.autorizacao} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none">
                  <option value="sim">Autorizo a realização do tratamento</option>
                  <option value="nao">Não autorizo a realização do tratamento</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade do Termo</label>
                <input type="text" name="cidadeTermo" value={formDataAcupuntura.cidadeTermo} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none" placeholder="Guarulhos" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data da Assinatura</label>
                <input type="date" name="dataAssinatura" value={formDataAcupuntura.dataAssinatura} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>

              {/* Responsável Legal (Opcional) */}
              <div className="md:col-span-3 border-t pt-3">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Dados do Responsável Legal (se aplicável)</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nome do Responsável</label>
                    <input type="text" name="responsavelNome" value={formDataAcupuntura.responsavelNome} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="Nome completo" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">RG do Responsável</label>
                    <input type="text" name="responsavelRg" value={formDataAcupuntura.responsavelRg} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="00.000.000-0" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Telefone do Responsável</label>
                    <input type="text" name="responsavelTelefone" value={formDataAcupuntura.responsavelTelefone} onChange={handleInputAcupuntura} className="w-full px-3 py-2 border rounded-md outline-none text-sm" placeholder="(11) 90000-0000" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-gray-200 rounded-lg shadow-sm print:shadow-none print:border-none print:p-0 text-gray-900 text-xs leading-relaxed space-y-3">
            <div className="text-center mb-4 pt-2">
              <h1 className="text-base font-bold uppercase tracking-wider underline">Termo de Consentimento Livre e Esclarecido para Acupuntura Sistêmica</h1>
            </div>

            <div className="border border-gray-300 p-3 rounded space-y-1">
              <div className="flex flex-wrap justify-between gap-y-1">
                <p>Nome: <strong className="uppercase border-b border-gray-400 px-1 min-w-[250px] inline-block">{formDataAcupuntura.nome || '________________________________________________'}</strong></p>
                <p>Nasc.: <strong className="border-b border-gray-400 px-1">{formDataAcupuntura.dataNascimento ? formDataAcupuntura.dataNascimento.split('-').reverse().join(' / ') : '____ / ____ / ____'}</strong></p>
                <p>Idade: <strong className="border-b border-gray-400 px-1">{formDataAcupuntura.idade || '________'}</strong></p>
                <p>Prontuário: <strong className="border-b border-gray-400 px-1">{formDataAcupuntura.prontuario || '_______'}</strong></p>
              </div>
              <p>HD: <strong className="border-b border-gray-400 px-1 min-w-[300px] inline-block">{formDataAcupuntura.hd || '_____________________________________________________________________'}</strong></p>
            </div>
            </div>
            
                          </>
      )}
          </div>
  </div>
</div>
      
  );
}