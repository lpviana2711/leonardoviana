"use client";

import React, { useState, useEffect } from 'react';
import {
  Search, User, Clock, Plus, ChevronLeft,
  CheckCircle, Loader2, Activity, ChevronDown, ChevronUp, FileText, Stethoscope,
  Eye, X, Printer, Edit, Trash2, Bone, HardHat, Wind, Move, HeartPulse, Puzzle,
  Baby, HeartHandshake, Brain, Waves, Footprints
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

/* ======================================================================
   SISTEMA GENÉRICO DE FICHAS — ORIENTADO POR SCHEMA
   Para adicionar uma nova ficha: só acrescente um objeto novo no array
   FICHAS abaixo, seguindo o mesmo formato. Nenhum JSX precisa ser tocado.
====================================================================== */

type FieldType = 'text' | 'textarea' | 'radio' | 'checkbox';

interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
  colSpan?: 1 | 2 | 3; // em grid de 3 colunas
  rows?: number;
  placeholder?: string;
}

interface SectionDef {
  id: string;
  title: string;
  fields: FieldDef[];
}

interface FichaSchema {
  key: string;
  label: string;
  icon: any;
  color: string; // classe tailwind base: indigo, amber, sky, purple, rose...
  description: string;
  sections: SectionDef[];
  // Campos usados para popular as colunas legadas objetivos_ficha / procedimentos / reavaliacao
  summaryMap?: {
    objetivos?: string[];
    procedimentos?: string[];
    reavaliacao?: string[];
  };
}

const T = (id: string, label: string, colSpan: 1 | 2 | 3 = 1, placeholder = ''): FieldDef => ({ id, label, type: 'text', colSpan, placeholder });
const TA = (id: string, label: string, rows = 2, colSpan: 1 | 2 | 3 = 3): FieldDef => ({ id, label, type: 'textarea', rows, colSpan });
const CK = (id: string, label: string, options: string[], colSpan: 1 | 2 | 3 = 3): FieldDef => ({ id, label, type: 'checkbox', options, colSpan });
const RD = (id: string, label: string, options: string[], colSpan: 1 | 2 | 3 = 3): FieldDef => ({ id, label, type: 'radio', options, colSpan });
const SEC = (id: string, title: string, fields: FieldDef[]): SectionDef => ({ id, title, fields });

const FICHAS: FichaSchema[] = [
  // ============================= 1. TRAUMATO-ORTOPÉDICA =============================
  {
    key: 'Traumato-Ortopédica',
    label: 'Traumato-Ortopédica',
    icon: Bone,
    color: 'indigo',
    description: 'Ficha completa de avaliação e acompanhamento com foco em dor, ADM e força muscular.',
    summaryMap: {
      objetivos: ['objetivos'],
      procedimentos: ['cinesioterapia', 'terapiaManual', 'recursosEletrofisicos', 'treinoFuncional'],
      reavaliacao: ['evolucaoFisioterapeutica', 'observacoes'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('diagnosticoMedico', 'Diagnóstico Médico', 2),
        T('numeroSessao', 'Nº da Sessão', 1, 'Ex: 1/10'),
        T('diagnosticoFisio', 'Diagnóstico Fisioterapêutico', 3),
      ]),
      SEC('condicao', '2. Condição do Paciente', [
        TA('queixaPrincipal', 'Queixa principal no atendimento', 2, 3),
        RD('evolucao', 'Evolução desde a última sessão', ['Melhorou', 'Manteve-se estável', 'Piorou', 'Oscilação dos sintomas']),
        RD('intercorrencias', 'Intercorrências desde o último atendimento', ['Não', 'Sim']),
        T('intercorrenciasDescricao', 'Descrição da intercorrência', 3),
        RD('medicacao', 'Uso de medicação relacionada ao quadro', ['Não', 'Sim']),
        T('medicacaoQual', 'Qual medicação', 2),
      ]),
      SEC('dor', '3. Avaliação da Dor', [
        T('dorAntes', 'EVA Antes da sessão (0-10)', 1),
        T('dorApos', 'EVA Após a sessão (0-10)', 1),
        T('dorLocalizacao', 'Localização da dor', 1),
        RD('dorIrradiacao', 'Irradiação', ['Não', 'Sim']),
        T('dorIrradiacaoPara', 'Para', 2),
        RD('dorFrequencia', 'Frequência', ['Ausente', 'Contínua', 'Intermitente', 'Ao movimento', 'Ao esforço', 'Em repouso']),
        CK('caracteristicasDor', 'Características', ['Pontada', 'Queimação', 'Peso', 'Latejante', 'Choque', 'Formigamento', 'Dormência']),
        T('fatoresAgravantes', 'Fatores agravantes no momento', 3),
        T('fatoresAlivio', 'Fatores de alívio', 3),
      ]),
      SEC('fisicoFuncional', '4. Avaliação Físico-Funcional', [
        CK('inspecao', 'Inspeção', ['Sem alterações relevantes', 'Edema', 'Hematoma/Equimose', 'Atrofia muscular', 'Espasmo muscular', 'Alteração postural', 'Cicatriz', 'Deformidade', 'Alteração de temperatura', 'Alteração de coloração']),
        T('inspecaoObs', 'Local/Observações (Inspeção)', 3),
        CK('palpacao', 'Palpação', ['Sem alterações relevantes', 'Dor à palpação', 'Hipertonia', 'Hipotonia', 'Crepitação', 'Espasmo muscular', 'Ponto gatilho miofascial', 'Restrição de mobilidade tecidual']),
        T('palpacaoObs', 'Local/Observações (Palpação)', 3),
      ]),
      SEC('admForca', '5 e 6. ADM e Força Muscular', [
        RD('adm', 'Amplitude de Movimento (ADM)', ['Preservada', 'Reduzida', 'Dolorosa', 'Com bloqueio/restrição']),
        T('admSegmento', 'Segmento/Articulação avaliada (ADM)', 3),
        CK('forcaMuscular', 'Força Muscular', ['Preservada', 'Reduzida', 'Paresia', 'Parestesia', 'Plegia', 'Atrofia', 'Fadiga Muscular']),
        T('forcaMuscularSegmento', 'Segmento/Articulação avaliada (Força)', 3),
      ]),
      SEC('avaliacaoFuncional', '7. Avaliação Funcional', [
        CK('limitacaoFuncional', 'Limitação funcional atual', ['Sem limitação significativa', 'Dificuldade nas AVDs', 'Dificuldade para caminhar', 'Dificuldade para subir/descer escadas', 'Dificuldade para sentar/levantar', 'Dificuldade para permanecer em pé', 'Dificuldade para permanecer sentado', 'Dificuldade para elevar/movimentar o membro', 'Dificuldade para atividades laborais', 'Dificuldade para atividade física/esportiva']),
        RD('marcha', 'Marcha', ['Normal', 'Antálgica', 'Espástica', 'Claudicante', 'Festinação', 'Ceifante', 'Marcha Atáxica', 'Parkinsoniana', 'Marcha Escarvante', 'Marcha de Trendelemburg', 'Com auxílio']),
        RD('nivelFuncional', 'Nível funcional', ['Independente', 'Independente com dificuldade', 'Necessita auxílio parcial', 'Dependente']),
      ]),
      SEC('objetivos', '8. Objetivos Fisioterapêuticos da Sessão', [
        CK('objetivos', 'Objetivos', ['Reduzir dor', 'Reduzir edema', 'Controlar processo inflamatório', 'Reduzir espasmo muscular', 'Melhorar mobilidade articular', 'Aumentar amplitude de movimento', 'Melhorar flexibilidade', 'Melhorar força muscular', 'Melhorar resistência muscular', 'Melhorar estabilidade articular', 'Melhorar controle motor', 'Melhorar propriocepção', 'Melhorar equilíbrio', 'Correção postural', 'Melhorar padrão de marcha', 'Recuperar função do segmento acometido', 'Melhorar nas AVDs', 'Promover retorno às atividades laborais', 'Promover retorno à atividade física/esportiva', 'Prevenir recidivas e novas lesões']),
      ]),
      SEC('condutas', '9. Condutas Fisioterapêuticas Realizadas', [
        CK('cinesioterapia', 'Cinesioterapia', ['Mobilização passiva', 'Exercícios ativo-assistidos', 'Exercícios ativos', 'Exercícios resistidos', 'Alongamento muscular', 'Fortalecimento muscular', 'Exercícios isométricos', 'Exercícios isotônicos', 'Exercícios em cadeia cinética aberta', 'Exercícios em cadeia cinética fechada', 'Exercícios funcionais', 'Exercícios de controle motor', 'Exercícios de estabilização segmentar']),
        CK('terapiaManual', 'Terapia Manual', ['Mobilização articular', 'Mobilização de tecidos moles', 'Liberação miofascial', 'Massoterapia terapêutica', 'Técnicas para pontos gatilho', 'Alongamento manual', 'Tração articular', 'Técnicas de mobilização neural', 'Ajuste Quiroprático']),
        CK('recursosEletrofisicos', 'Recursos Eletrofísicos/Termoterápicos', ['TENS', 'FES', 'Corrente Russa', 'Corrente Interferencial', 'US terapêutico', 'Laser', 'Crioterapia', 'Hipertermoterapia']),
        CK('treinoFuncional', 'Treino Funcional', ['Treino proprioceptivo', 'Treino de equilíbrio', 'Treino de marcha', 'Treino de transferência', 'Treino de subir/descer degraus', 'Treino de AVDs', 'Treino de gesto laboral', 'Hipertrofia', 'Treino de gesto esportivo', 'Reeducação postural', 'Orientações domiciliares']),
      ]),
      SEC('resposta', '10. Resposta ao Tratamento', [
        RD('toleranciaSessao', 'Tolerância à sessão', ['Excelente', 'Boa', 'Regular', 'Ruim', 'Sessão interrompida']),
        CK('respostaImediata', 'Resposta imediata', ['Redução da dor', 'Aumento da ADM', 'Melhora da mobilidade', 'Melhora da força muscular', 'Melhora do padrão de movimento', 'Melhora funcional', 'Redução do edema', 'Redução da tensão muscular', 'Sem alteração significativa', 'Piora dos sintomas']),
        RD('intercorrenciasSessao', 'Intercorrências durante a sessão', ['Não', 'Sim']),
        T('intercorrenciasSessaoQual', 'Qual (intercorrência na sessão)', 2),
        T('condutaAdotada', 'Conduta adotada', 3),
      ]),
      SEC('evolucaoPlano', '11 e 12. Evolução e Plano', [
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 3, 3),
        CK('planoProximasSessoes', 'Plano para as próximas sessões', ['Manter conduta atual', 'Progredir amplitude de movimento', 'Progredir fortalecimento muscular', 'Progredir carga/resistência', 'Progredir treino proprioceptivo', 'Progredir treino funcional', 'Progredir treino de marcha', 'Intensificar controle da dor', 'Intensificar mobilidade articular', 'Reavaliar resposta ao tratamento', 'Preparar retorno às AVDs', 'Preparar retorno laboral', 'Preparar retorno esportivo', 'Orientar programa de exercícios domiciliares']),
      ]),
      SEC('orientacoes', '13 e 14. Orientações e Observações', [
        CK('orientacoesPaciente', 'Orientações ao paciente', ['Exercícios domiciliares', 'Cuidados posturais', 'Proteção do segmento acometido', 'Controle de carga/esforço', 'Uso adequado de órtese/dispositivo auxiliar', 'Orientação ergonômica', 'Retorno gradual às atividades']),
        TA('observacoes', 'Observações/Intercorrências', 2, 3),
      ]),
    ],
  },

  // ============================= 2. SAÚDE DO TRABALHADOR =============================
  {
    key: 'Saúde do Trabalhador',
    label: 'Saúde do Trabalhador',
    icon: HardHat,
    color: 'amber',
    description: 'Ficha ocupacional com avaliação ergonômica, funcional e condutas para LER/DORT.',
    summaryMap: {
      objetivos: ['queixaPrincipal'],
      procedimentos: ['terapiaManual', 'exerciciosTerapeuticos', 'recursosEletrofisicos', 'educacaoSaude'],
      reavaliacao: ['condutaProximaSessao', 'evolucaoFisioterapeutica'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('idade', 'Idade', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('horario', 'Horário', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 2),
        T('diagnosticoFisio', 'Diagnóstico Fisioterapêutico', 1),
      ]),
      SEC('avaliacaoPre', '2. Avaliação Pré-Atendimento', [
        RD('estadoClinico', 'Estado Clínico', ['1º Atendimento', 'Muito melhor', 'Melhor', 'Estável', 'Igual', 'Pior']),
        T('dorEva', 'Dor (EVA 0-10)', 1),
        T('dorLocalizacao', 'Localização da dor', 2),
        T('pa', 'PA (mmHg)', 1),
        T('fc', 'FC (bpm)', 1),
        T('fr', 'FR (irpm)', 1),
        T('spo2', 'SpO₂ (%)', 1),
        T('temp', 'Temp (Cº)', 1),
        CK('localizacaoDor', 'Localização da Dor', ['Cervical', 'Ombro', 'Cotovelo', 'Punho/Mão', 'Coluna Torácica', 'Coluna Lombar', 'Quadril', 'Joelho', 'Tornozelo']),
        CK('queixaPrincipal', 'Queixa Principal da Sessão', ['Cervicalgia', 'Lombalgia', 'Dorsalgia', 'Tendinite', 'Bursite', 'Epicondilite', 'LER/DORT', 'Síndrome do Túnel do Carpo', 'Síndrome Miofascial', 'Dor por sobrecarga ocupacional']),
      ]),
      SEC('funcional', '3. Avaliação Funcional', [
        RD('condicaoTrabalho', 'Condição para o Trabalho', ['Sem limitações', 'Limitação leve', 'Limitação moderada', 'Afastado do trabalho']),
        CK('impactoFuncional', 'Impacto Funcional', ['Trabalho', 'Atividades domésticas', 'Sono', 'Atividade física', 'Lazer', 'Vida social']),
        RD('mobilidade', 'Mobilidade', ['Preservada', 'Reduzida']),
        T('segmentoAcometido', 'Segmento acometido', 2),
        RD('forcaMuscular', 'Força Muscular', ['Preservada', 'Reduzida']),
        T('grupoMuscular', 'Grupo muscular', 2),
      ]),
      SEC('ergonomia', '4. Avaliação Ergonômica', [
        RD('posturaTrabalho', 'Postura de Trabalho', ['Adequada', 'Inadequada']),
        RD('movimentosRepetitivos', 'Movimentos Repetitivos', ['Sim', 'Não']),
        RD('levantamentoCargas', 'Levantamento de Cargas', ['Sim', 'Não']),
        T('pesoAproximado', 'Peso aproximado (Kg)', 1),
        RD('pausasLaborais', 'Pausas Laborais', ['Adequadas', 'Insuficientes', 'Inexistentes']),
      ]),
      SEC('exameFisico', '5. Exame Físico', [
        CK('exameFisico', 'Achados', ['Dor à palpação', 'Restrição de ADM', 'Hipotrofia muscular', 'Espasmo muscular', 'Pontos gatilho miofasciais', 'Alteração postural', 'Assimetria corporal', 'Rigidez muscular', 'Déficit de equilíbrio', 'Alteração da marcha', 'Edema']),
      ]),
      SEC('procedimentos', '6. Procedimentos Realizados', [
        CK('terapiaManual', 'Terapia Manual', ['Liberação miofascial', 'Mobilização articular', 'Mobilização neural', 'Tração articular', 'Massagem terapêutica', 'Liberação de pontos gatilho']),
        CK('exerciciosTerapeuticos', 'Exercícios Terapêuticos', ['Alongamentos', 'Fortalecimento muscular', 'Exercícios resistidos', 'Estabilização do Core', 'Exercícios posturais', 'Exercícios proprioceptivos', 'Treino funcional', 'Treino de equilíbrio', 'Exercícios laborais', 'Condicionamento físico', 'Exercícios respiratórios']),
        CK('recursosEletrofisicos', 'Recursos Eletrofísicos', ['TENS', 'FES', 'Ultrassom terapêutico', 'Laser/Fotobiomodulação', 'Hipertermoterapia', 'Crioterapia', 'Eletroestimulação']),
        CK('educacaoSaude', 'Educação em Saúde', ['Ergonomia ocupacional', 'Orientações posturais', 'Ajuste do posto de trabalho', 'Pausas ativas', 'Exercícios domiciliares', 'Alongamentos no ambiente laboral', 'Prevenção de LER/DORT', 'Educação em saúde']),
      ]),
      SEC('parametros', '7 e 8. Parâmetros e Evolução da Sessão', [
        T('tempoSessao', 'Tempo da sessão (min)', 1),
        RD('intensidade', 'Intensidade', ['Leve', 'Moderada', 'Intensa']),
        RD('tolerancia', 'Tolerância ao Tratamento', ['Excelente', 'Boa', 'Regular', 'Ruim']),
        CK('evolucaoSessao', 'Evolução da Sessão', ['Redução da dor', 'Melhora da mobilidade', 'Ganho de força muscular', 'Melhora postural', 'Redução da fadiga', 'Melhora da ergonomia', 'Melhora funcional', 'Retorno às atividades', 'Sem intercorrências']),
      ]),
      SEC('conduta', '9 e 10. Conduta e Evolução', [
        TA('condutaProximaSessao', 'Conduta para a próxima sessão', 2, 3),
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 3, 3),
      ]),
    ],
  },

  // ============================= 3. RESPIRATÓRIA =============================
  {
    key: 'Respiratória',
    label: 'Respiratória',
    icon: Wind,
    color: 'sky',
    description: 'Avaliação e condutas de fisioterapia respiratória com sinais vitais e escalas.',
    summaryMap: {
      objetivos: ['objetivosSessao'],
      procedimentos: ['higieneBronquica', 'reexpansaoPulmonar', 'exerciciosRespiratorios', 'condicionamentoFisico'],
      reavaliacao: ['evolucaoFisioterapeutica', 'observacoes'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('idade', 'Idade', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('horario', 'Horário', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 2),
        RD('estadoClinico', 'Estado Clínico', ['1º Atendimento', 'Muito melhor', 'Melhor', 'Estável', 'Igual', 'Pior']),
        T('diagnosticoFisio', 'Diagnóstico Fisioterapêutico', 3),
      ]),
      SEC('avaliacaoPre', '3. Avaliação Pré-Sessão', [
        T('pa', 'PA (mmHg)', 1),
        T('fc', 'FC (bpm)', 1),
        T('fr', 'FR (irpm)', 1),
        T('spo2', 'SpO₂ (%)', 1),
        T('temp', 'Temp (°C)', 1),
        CK('estadoRespiratorio', 'Estado Respiratório', ['Eupneico', 'Taquipneico', 'Bradipneico', 'Uso de musculatura acessória', 'Dispneia aos esforços', 'Dispneia em repouso', 'Tosse seca', 'Tosse produtiva']),
        RD('secrecao', 'Secreção', ['Ausente', 'Presente']),
        T('secrecaoAspecto', 'Aspecto da secreção', 1),
        RD('secrecaoQuantidade', 'Quantidade', ['Pequena', 'Moderada', 'Grande']),
        T('secrecaoCor', 'Cor', 1),
        T('borg', 'Borg (0-10)', 1),
        T('mrc', 'MRC Dispneia', 1),
        T('dorEva', 'Dor (EVA 0-10)', 1),
      ]),
      SEC('objetivos', '4. Objetivos da Sessão', [
        CK('objetivosSessao', 'Objetivos', ['Higiene brônquica', 'Reexpansão pulmonar', 'Melhora da ventilação pulmonar', 'Treino muscular inspiratório', 'Condicionamento físico', 'Melhora da capacidade funcional', 'Redução da dispneia', 'Aumento da saturação', 'Desobstrução de vias aéreas', 'Educação respiratória', 'Treino de economia de energia']),
      ]),
      SEC('procedimentos', '5. Procedimentos Realizados', [
        CK('higieneBronquica', 'Técnicas de Higiene Brônquica', ['AFE', 'ELTGOL', 'Drenagem Postural', 'Vibração', 'Vibrocompressão', 'Huffing', 'Tosse Assistida', 'Aspiração de vias aéreas']),
        CK('reexpansaoPulmonar', 'Reexpansão Pulmonar', ['Inspiração Fracionada', 'Inspiração Sustentada Máxima', 'Espirometria de Incentivo', 'Pressão Positiva', 'EPAP', 'CPAP', 'BIPAP']),
        CK('exerciciosRespiratorios', 'Exercícios Respiratórios', ['Respiração Diafragmática', 'Respiração Costal', 'Respiração com Lábios Fruncidos', 'Controle Respiratório', 'Exercícios de Expansão Torácica']),
        CK('condicionamentoFisico', 'Condicionamento Físico', ['Bicicleta', 'Esteira', 'Caminhada', 'Exercícios ativos', 'Exercícios resistidos']),
        CK('alongamentos', 'Alongamentos', ['Membros Superiores', 'Membros Inferiores', 'Tronco', 'Cadeia Respiratória']),
        CK('educacaoPaciente', 'Educação ao Paciente', ['Higiene brônquica domiciliar', 'Exercícios respiratórios', 'Uso correto de inaladores', 'Conservação de energia', 'Orientações posturais', 'Orientações ao cuidador']),
      ]),
      SEC('resposta', '6 e 7. Resposta e Reavaliação', [
        RD('respostaDuranteSessao', 'Durante a sessão', ['Excelente', 'Boa', 'Regular', 'Ruim']),
        CK('apresentou', 'Apresentou', ['Melhora da ventilação', 'Redução da dispneia', 'Melhora da saturação', 'Eliminação de secreção', 'Melhora da expansibilidade torácica', 'Sem intercorrências']),
        T('paPos', 'PA pós (mmHg)', 1),
        T('fcPos', 'FC pós (bpm)', 1),
        T('frPos', 'FR pós (irpm)', 1),
        T('spo2Pos', 'SpO₂ pós (%)', 1),
        T('borgPos', 'Borg pós', 1),
        T('mrcPos', 'MRC pós', 1),
        T('dorEvaPos', 'Dor EVA pós', 1),
      ]),
      SEC('evolucaoPlano', '8, 9 e 10. Evolução, Plano e Observações', [
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 3, 3),
        CK('planoProximaSessao', 'Plano para a próxima sessão', ['Manter conduta', 'Progressão dos exercícios', 'Reavaliar capacidade funcional', 'Ajustar carga do treino muscular', 'Introduzir novas técnicas']),
        TA('observacoes', 'Observações', 2, 3),
      ]),
    ],
  },

  // ============================= 4. QUIROPRAXIA =============================
  {
    key: 'Quiropraxia',
    label: 'Quiropraxia',
    icon: Move,
    color: 'purple',
    description: 'Avaliação funcional, testes clínicos e ajustes quiropráticos por segmento vertebral.',
    summaryMap: {
      objetivos: ['orientacoesPaciente'],
      procedimentos: ['ajustesCervical', 'ajustesToracica', 'ajustesLombar', 'tecnicasComplementares'],
      reavaliacao: ['evolucaoFisioterapeutica'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('idade', 'Idade', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('horario', 'Horário', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 3),
      ]),
      SEC('avaliacaoPre', '2. Avaliação Pré-Atendimento', [
        RD('estadoClinico', 'Estado Clínico', ['1º Atendimento', 'Muito melhor', 'Melhor', 'Estável', 'Igual', 'Pior']),
        CK('queixaPrincipal', 'Queixa Principal da Sessão', ['Cervical', 'Torácica', 'Lombar', 'Sacroilíaca', 'Ilíaco', 'Púbis', 'Cóccix', 'Ombro', 'Quadril']),
        T('dorEva', 'Dor EVA (0-10)', 1),
        T('dorLocal', 'Local', 2),
        CK('caracteristicas', 'Características', ['Pontada', 'Queimação', 'Peso', 'Choque', 'Rigidez', 'Parestesia', 'Formigamento']),
        RD('irradiacao', 'Irradiação', ['Não', 'Sim']),
        T('irradiacaoLocal', 'Local da irradiação', 2),
      ]),
      SEC('funcional', '3. Avaliação Funcional', [
        RD('adm', 'Amplitude de Movimento (ADM)', ['Normal', 'Reduzida', 'Dolorosa']),
        T('admObs', 'Observações (ADM)', 3),
        TA('motionPalpationObs', 'Motion Palpation / Quick Scanning - Observações', 2, 3),
        RD('tonusMuscular', 'Tônus Muscular', ['Normal', 'Hipertonia', 'Espasmo', 'Pontos gatilho']),
        RD('avaliacaoNeurologica', 'Avaliação Neurológica', ['Preservado', 'Alterado', 'Sensibilidade']),
        RD('dermatomos', 'Dermátomos', ['Normal', 'Alterado']),
        RD('parestesia', 'Parestesia', ['Não', 'Sim']),
        RD('reflexos', 'Reflexos', ['Normais', 'Alterados']),
      ]),
      SEC('testesClinicos', '4. Testes Clínicos Realizados', [
        CK('testesCervicais', 'Testes Cervicais', ['Kleyn', 'Spurling', 'Compressão Cervical', 'Adson', 'Wright', 'Éden', 'Estrela de Maigne', 'Motion Palpation', 'Quick Scanning']),
        CK('testesToracicos', 'Testes Torácicos', ['Adams', 'Stibor', 'Schober', 'Motion Palpation', 'Quick Scanning', 'Estrela de Maigne']),
        CK('testesLombares', 'Testes Lombares', ['Lasègue', 'Slump', 'Stibor', 'Schober', 'Motion Palpation', 'Quick Scanning', 'Estrela de Maigne']),
        CK('testesSacroiliacos', 'Testes Sacroilíacos/Pelve', ['Downing', 'Fanning', 'Polegares Ascendentes', 'Leg Check', 'Motion Palpation', 'Compressão do Púbis', 'Compressão Coccígea']),
        T('resultadoTestes', 'Resultado dos testes', 3),
      ]),
      SEC('ajustes', '5. Ajustes Quiropráticos Realizados', [
        CK('ajustesCervical', 'Cervical', ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']),
        CK('ajustesToracica', 'Torácica', ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']),
        CK('ajustesLombar', 'Lombar', ['L1', 'L2', 'L3', 'L4', 'L5']),
        CK('ajustesSacro', 'Sacro', ['S1', 'S2', 'S3', 'S4', 'S5']),
        CK('ajustesIliaco', 'Ilíaco', ['Ilíaco Direito', 'Ilíaco Esquerdo']),
        CK('ajustesPubisCoccix', 'Púbis e Cóccix', ['Púbis', 'Cóccix']),
      ]),
      SEC('tecnicasOrientacoes', '6 e 7. Técnicas Complementares e Orientações', [
        CK('tecnicasComplementares', 'Técnicas Complementares', ['Ajuste Cervical', 'Ajuste Torácico', 'Ajuste Lombar', 'Ajuste Sacro', 'Ajuste Ilíaco', 'Cóccix', 'Ventosaterapia', 'Dry Needling', 'Massoterapia', 'Alongamentos', 'Estabilização Segmentar', 'Exercícios Corretivos', 'Liberação Miofascial', 'Fortalecimento', 'Mobilização Articular', 'Treino Motor', 'Reeducação Postural', 'TENS', 'FES', 'RUSSA', 'Hipertermoterapia', 'Crioterapia']),
        CK('orientacoesPaciente', 'Orientações ao Paciente', ['Ergonomia', 'Correção Postural', 'Alongamentos Domiciliares', 'Exercícios Domiciliares', 'Crioterapia', 'Termoterapia', 'Hidratação', 'Retorno Gradual às Atividades', 'Evitar Sobrecargas']),
      ]),
      SEC('respostaPlano', '8, 9 e 10. Resposta, Plano e Evolução', [
        RD('respostaTratamento', 'Resposta ao Tratamento', ['Excelente', 'Boa', 'Regular', 'Sem alteração', 'Houve alívio imediato', 'Persistência da dor']),
        CK('planoProximaSessao', 'Plano para a Próxima Sessão', ['Reavaliação', 'Novo ajuste', 'Progressão de exercícios', 'Ganho de mobilidade', 'Controle da dor']),
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 3, 3),
      ]),
    ],
  },

  // ============================= 5. REUMATOLOGIA =============================
  {
    key: 'Reumatologia',
    label: 'Reumatologia',
    icon: Activity,
    color: 'rose',
    description: 'Ficha voltada para doenças reumáticas, rigidez, crises e sinais clínicos articulares.',
    summaryMap: {
      objetivos: ['sinaisClinicos'],
      procedimentos: ['terapiaManual', 'exerciciosTerapeuticos', 'treinoFuncional', 'recursosFisicos'],
      reavaliacao: ['observacoes', 'evolucaoFisioterapeutica'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('idade', 'Idade', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('horario', 'Horário', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 2),
        T('diagnosticoFisio', 'Diagnóstico Fisioterapêutico', 3),
      ]),
      SEC('avaliacaoPre', '2. Avaliação Pré-Atendimento', [
        RD('estadoClinico', 'Estado Clínico', ['1º Atendimento', 'Muito melhor', 'Melhor', 'Estável', 'Igual', 'Pior']),
        T('dorEva', 'Dor EVA (0-10)', 1),
        T('dorLocalizacao', 'Localização da dor', 2),
        RD('rigidezMatinal', 'Rigidez Matinal', ['Ausente', 'Menor que 30 minutos', 'Entre 30 e 60 minutos', 'Superior a 60 minutos']),
        RD('estadoClinicoAtual', 'Estado Clínico Atual', ['Sem crise', 'Crise leve', 'Crise moderada', 'Crise intensa']),
        RD('edemaArticular', 'Edema Articular', ['Ausente', 'Leve', 'Moderado', 'Importante']),
        T('edemaLocal', 'Local do edema', 2),
        RD('fadiga', 'Fadiga', ['Ausente', 'Leve', 'Moderada', 'Intensa']),
        RD('marcha', 'Marcha', ['Normal', 'Antálgica', 'Claudicante', 'Com auxílio', 'Cadeirante']),
        RD('dispositivoAuxiliar', 'Dispositivo Auxiliar', ['Nenhum', 'Bengala', 'Muleta', 'Andador']),
      ]),
      SEC('sinaisClinicos', '3. Sinais Clínicos Observados', [
        CK('sinaisClinicos', 'Sinais', ['Rigidez articular', 'Dor à palpação', 'Limitação de ADM', 'Crepitação', 'Instabilidade', 'Fraqueza muscular', 'Deformidades articulares', 'Hipotrofia muscular', 'Alteração postural', 'Sensibilidade aumentada', 'Calor articular', 'Edema', 'Limitação funcional']),
      ]),
      SEC('procedimentos', '4. Procedimentos Realizados', [
        CK('terapiaManual', 'Terapia Manual', ['Mobilização articular', 'Mobilização neural', 'Liberação miofascial', 'Quiropraxia', 'Massoterapia terapêutica', 'Tração articular', 'Técnicas analgésicas']),
        CK('exerciciosTerapeuticos', 'Exercícios Terapêuticos', ['ADM passiva', 'ADM ativo-assistida', 'ADM ativa', 'Alongamentos', 'Exercícios isométricos', 'Fortalecimento progressivo', 'Exercícios resistidos', 'Exercícios aeróbicos', 'Exercícios respiratórios', 'Exercícios proprioceptivos', 'Coordenação motora', 'Treino funcional', 'Condicionamento físico']),
        CK('treinoFuncional', 'Treino Funcional', ['Transferências', 'Sentar e levantar', 'Marcha', 'Escadas', 'Equilíbrio estático', 'Equilíbrio dinâmico', 'AVDs']),
        CK('recursosFisicos', 'Recursos Físicos', ['Calor superficial', 'Crioterapia', 'TENS', 'FES', 'Ultrassom terapêutico', 'Laserterapia', 'Fotobiomodulação', 'Magnetoterapia']),
        CK('educacaoPaciente', 'Educação do Paciente', ['Proteção articular', 'Conservação de energia', 'Ergonomia', 'Orientações domiciliares', 'Programa de exercícios domiciliares', 'Orientações sobre atividade física', 'Orientações sobre uso de órteses']),
      ]),
      SEC('parametros', '5 e 6. Parâmetros e Evolução', [
        T('tempoTotal', 'Tempo total (min)', 1),
        RD('intensidade', 'Intensidade dos exercícios', ['Leve', 'Moderada', 'Intensa']),
        RD('tolerancia', 'Tolerância ao tratamento', ['Excelente', 'Boa', 'Regular', 'Ruim']),
        CK('evolucaoSessao', 'Evolução da Sessão', ['Redução da dor', 'Redução do edema', 'Melhora da ADM', 'Melhora da marcha', 'Melhora do equilíbrio', 'Ganho de força', 'Melhora funcional', 'Sem intercorrências']),
      ]),
      SEC('condutaObs', '7, 8 e 9. Conduta, Observações e Evolução', [
        CK('condutaProximaSessao', 'Conduta para Próxima Sessão', ['Manter conduta', 'Progressão dos exercícios', 'Reavaliar capacidade funcional', 'Ajustar carga do treino muscular', 'Introduzir novas técnicas']),
        TA('observacoes', 'Observações', 3, 3),
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 2, 3),
      ]),
    ],
  },

  // ============================= 6. ONCOLÓGICA =============================
  {
    key: 'Oncológica',
    label: 'Oncológica',
    icon: HeartPulse,
    color: 'fuchsia',
    description: 'Ficha para acompanhamento oncológico com dados de tratamento, linfedema e resposta.',
    summaryMap: {
      objetivos: ['objetivosProximaSessao'],
      procedimentos: ['procedimentosRealizados'],
      reavaliacao: ['evolucaoFisioterapeutica', 'observacoes'],
    },
    sections: [
      SEC('identificacao', '1 a 4. Identificação e Estado Geral', [
        T('idade', 'Idade', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('horario', 'Horário', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 3),
        RD('humor', 'Humor', ['Ótimo', 'Bom', 'Regular', 'Ansioso', 'Triste', 'Irritado', 'Desmotivado', 'Exausto']),
        RD('estadoGeral', 'Estado Geral', ['Bom', 'Regular', 'Debilitado']),
        T('pa', 'PA', 1),
        T('fc', 'FC', 1),
        T('fr', 'FR', 1),
        T('spo2', 'SpO₂', 1),
        T('temp', 'Temp', 1),
        T('borg', 'Escala de Borg', 1),
        TA('queixaPrincipal', 'Queixa Principal do Dia', 2, 3),
      ]),
      SEC('dadosOncologicos', '5. Dados Oncológicos', [
        T('localizacaoNeoplasia', 'Localização da Neoplasia', 3),
        T('tempoDiagnostico', 'Tempo desde o Diagnóstico', 2),
        T('dataDiagnostico', 'Data do Diagnóstico', 1),
        T('estadiamento', 'Estadiamento', 2),
        RD('metastases', 'Metástases', ['Não', 'Sim']),
        T('metastasesLocal', 'Local(is)', 2),
        CK('tratamentoAtual', 'Tratamento Atual', ['Quimioterapia', 'Radioterapia', 'Hormonioterapia', 'Imunoterapia', 'Cirurgia', 'Cuidados Paliativos']),
      ]),
      SEC('estagio', '6. Estágio do Tratamento', [
        RD('estagioTratamento', 'Estágio', ['Pós-quimioterapia', 'Pós-radioterapia', 'Pós-operatório']),
        RD('mudancasDesdeUltima', 'Mudanças desde a última sessão', ['Melhorou', 'Estável', 'Piorou']),
        T('observacoesEstagio', 'Observações', 3),
      ]),
      SEC('avaliacaoClinica', '7. Avaliação Clínica', [
        RD('dorPresenca', 'Dor / Presença', ['Não', 'Sim']),
        T('dorLocal', 'Local da dor', 1),
        T('dorEva', 'EVA (0-10)', 1),
        CK('dorCaracteristicas', 'Características da Dor', ['Queimação', 'Pontada', 'Peso', 'Choque', 'Latejante', 'Neuropática']),
        RD('fadiga', 'Fadiga', ['Ausente', 'Leve', 'Moderada', 'Intensa']),
        T('escalaFadiga', 'Escala de Fadiga', 1),
        RD('linfedema', 'Linfedema', ['Não apresenta', 'Estável', 'Aumentou', 'Reduziu']),
        T('linfedemaLocal', 'Local', 2),
        RD('sinalGodet', 'Sinal de Godet', ['Negativo', 'Positivo']),
        RD('fibrose', 'Fibrose', ['Não', 'Sim']),
        RD('mobilidade', 'Mobilidade', ['Independente', 'Com supervisão', 'Necessita auxílio', 'Cadeirante', 'Acamado']),
        RD('marcha', 'Marcha', ['Normal', 'Alterada', 'Com dispositivo auxiliar']),
        RD('equilibrio', 'Equilíbrio', ['Preservado', 'Alterado', 'Risco de quedas']),
        RD('sensibilidade', 'Sensibilidade', ['Preservada', 'Alterada', 'Neuropatia periférica', 'Parestesia', 'Hipoestesia']),
      ]),
      SEC('respiratorio', 'Padrão Respiratório e Procedimentos', [
        RD('padraoRespiratorio', 'Padrão Respiratório', ['Diafragmático', 'Torácico', 'Misto']),
        RD('dispneia', 'Dispneia', ['Não', 'Sim']),
        CK('procedimentosRealizados', 'Procedimentos Realizados', ['Alongamentos', 'Mobilização articular', 'Liberação miofascial', 'Massagem cicatricial', 'Drenagem Linfática Manual', 'Bandagem Compressiva', 'Exercícios respiratórios', 'TENS', 'Exercícios de expansão pulmonar', 'Fortalecimento muscular', 'Exercícios aeróbicos', 'Treino funcional', 'Treino de marcha', 'Treino de equilíbrio', 'Exercícios proprioceptivos', 'Reeducação postural', 'Relaxamento', 'Dessensibilização', 'Terapia Manual', 'Educação em Saúde']),
      ]),
      SEC('resposta', '9 e 10. Resposta e Orientações', [
        RD('respostaSessao', 'Resposta à Sessão', ['Excelente', 'Boa', 'Regular', 'Houve fadiga', 'Houve dor', 'Houve tontura', 'Interrupção']),
        CK('orientacoesPaciente', 'Orientações ao Paciente', ['Exercícios domiciliares', 'Cuidados com cicatriz', 'Cuidados com linfedema', 'Hidratação', 'Cuidados com a pele', 'Conservação de energia', 'Orientação postural', 'Prevenção de quedas', 'Atividade física orientada']),
      ]),
      SEC('objetivosEvolucao', '11, 12 e 13. Objetivos, Evolução e Observações', [
        CK('objetivosProximaSessao', 'Objetivos para a Próxima Sessão', ['Controle da dor', 'Redução da fadiga', 'Ganho de força', 'Ganho de ADM', 'Redução do linfedema', 'Melhora respiratória', 'Melhora funcional', 'Melhora do equilíbrio', 'Treino de marcha', 'Independência nas AVDs', 'Melhora da qualidade de vida']),
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 3, 3),
        TA('observacoes', 'Observações', 3, 3),
      ]),
    ],
  },

  // ============================= 7. TEA =============================
  {
    key: 'TEA',
    label: 'TEA (Transtorno do Espectro Autista)',
    icon: Puzzle,
    color: 'cyan',
    description: 'Ficha para intervenção fisioterapêutica no Transtorno do Espectro Autista.',
    summaryMap: {
      objetivos: ['objetivosPsicomotricidade', 'objetivosEquilibrio', 'objetivosEsquemaCorporal', 'objetivosCoordenacaoFina', 'objetivosOrganizacaoEspacial', 'objetivosSensoriais'],
      procedimentos: ['atividadesCoordGlobal', 'atividadesCoordFina', 'planejamentoMotor', 'estimulosVestibular'],
      reavaliacao: ['evolucaoFisioterapeutica', 'planejamentoProximaSessao', 'observacoes'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('idade', 'Idade', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('horario', 'Horário', 1),
        T('diagnosticoFisio', 'Diagnóstico Fisioterapêutico', 3),
      ]),
      SEC('estadoGeral', '2. Estado Geral do Paciente', [
        RD('humor', 'Humor', ['Muito calmo', 'Calmo', 'Agitado', 'Irritável', 'Sonolento', 'Choroso', 'Ansioso', 'Desregulado']),
        RD('estadoAlerta', 'Estado de alerta', ['Adequado', 'Reduzido', 'Hiper alerta']),
        RD('contatoVisual', 'Contato visual', ['Adequado', 'Parcial', 'Ausente']),
        RD('comunicacao', 'Comunicação', ['Verbal', 'Não verbal', 'Comunicação Alternativa', 'Gestual']),
        RD('nivelAtencao', 'Nível de atenção', ['Adequado', 'Disperso', 'Hiperfoco', 'Oscilante']),
        RD('aceitacaoSessao', 'Aceitação da sessão', ['Excelente', 'Boa', 'Regular', 'Ruim']),
      ]),
      SEC('estimulosSensoriais', '3. Estímulos Sensoriais Utilizados', [
        CK('estimulosVestibular', 'Vestibular', ['Bola terapêutica', 'Balanço', 'Rolo', 'Plataforma', 'Plataforma instável', 'Giro controlado']),
        CK('estimulosProprioceptivo', 'Proprioceptivo', ['Compressão articular', 'Tração', 'Circuito motor', 'Escalada', 'Obstáculos', 'Saltos']),
        CK('estimulosTatil', 'Tátil', ['Texturas', 'Caixa sensorial', 'Massinha de modelar', 'Escovação', 'Areia', 'Bolinhas']),
        CK('estimulosVisual', 'Visual', ['Seguimento visual', 'Coordenação óculo-manual', 'Discriminação visual', 'PECs']),
        CK('estimulosAuditivo', 'Auditivo', ['Comandos verbais', 'Sons direcionados', 'Música', 'Ritmo']),
      ]),
      SEC('atividades', '4. Atividades Realizadas', [
        CK('atividadesCoordGlobal', 'Coordenação Motora Global', ['Caminhada', 'Corrida', 'Saltos', 'Circuito motor', 'Escadas', 'Equilíbrio', 'Obstáculos', 'Bola']),
        CK('atividadesCoordFina', 'Coordenação Motora Fina', ['Encaixes', 'Pinça', 'Blocos', 'Prendedor', 'Massinha', 'Recorte', 'Desenho']),
        CK('planejamentoMotor', 'Planejamento Motor', ['Sequências motoras', 'Imitação', 'Percurso funcional', 'Atividades dirigidas']),
        CK('funcionalidade', 'Funcionalidade', ['Alimentação', 'Vestir-se', 'Higiene', 'Organização corporal', 'Transferências']),
      ]),
      SEC('comportamento', '5 e 6. Comportamento e Reforçadores', [
        CK('comportamentoSessao', 'Comportamento Durante a Sessão', ['Participativo', 'Colaborativo', 'Necessitou de redirecionamento', 'Resistência às atividades', 'Comportamentos repetitivos', 'Estereotipias', 'Crise comportamental', 'Necessitou pausas', 'Boa tolerância aos estímulos', 'Hipersensibilidade sensorial', 'Hipossensibilidade sensorial']),
        T('observacoesComportamento', 'Observações', 3),
        CK('reforcadoresUtilizados', 'Reforçadores Utilizados', ['Brinquedo preferido', 'Bolhas de sabão', 'Música', 'Elogio verbal', 'Brincadeira funcional', 'Intervalo programado', 'Recompensa visual']),
      ]),
      SEC('resposta', '7. Resposta à Terapia', [
        RD('respostaTerapia', 'Resposta à Terapia', ['Excelente', 'Muito boa', 'Boa', 'Regular', 'Baixa']),
        CK('apresentouMelhoraEm', 'Apresentou melhora em', ['Coordenação', 'Equilíbrio', 'Atenção', 'Contato visual', 'Planejamento motor', 'Interação social', 'Organização corporal', 'Regulação sensorial', 'Funcionalidade']),
      ]),
      SEC('objetivosSessao', '8. Objetivos da Sessão', [
        CK('objetivosPsicomotricidade', 'Psicomotricidade Global', ['Estimulação motora global', 'Coordenação motora fina', 'Melhorar agilidade motora', 'Coordenação bilateral']),
        CK('objetivosEquilibrio', 'Equilíbrio e Controle Postural', ['Equilíbrio estático', 'Equilíbrio dinâmico', 'Planejamento motor (Praxia)', 'Melhorar alinhamento corporal']),
        CK('objetivosEsquemaCorporal', 'Esquema Corporal', ['Reconhecimento do corpo', 'Consciência corporal', 'Integração sensório-motora', 'Coordenação bilateral']),
        CK('objetivosCoordenacaoFina', 'Coordenação Motora Fina', ['Trabalhar pinça fina', 'Melhorar destreza manual', 'Trabalhar controle motor fino', 'Coordenação óculo-manual']),
        CK('objetivosOrganizacaoEspacial', 'Organização Espacial', ['Trabalhar noção espacial', 'Manipulação de objetos', 'Imitação motora', 'Melhora nas AVDs']),
        CK('objetivosSensoriais', 'Aspectos Sensoriais', ['Estimular propriocepção', 'Melhorar sistema vestibular', 'Melhorar integração sensorial', 'Melhorar percepção tátil']),
      ]),
      SEC('orientacoesEvolucao', '9, 10, 11 e 12. Orientações, Evolução, Planejamento e Observações', [
        CK('orientacoesResponsaveis', 'Orientações aos Responsáveis', ['Repetir atividades motoras em casa', 'Estimular brincadeiras funcionais', 'Incentivar equilíbrio', 'Incentivar coordenação motora fina', 'Treinar AVDs', 'Continuar rotina sensorial', 'Orientações posturais']),
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 2, 3),
        TA('planejamentoProximaSessao', 'Planejamento para a Próxima Sessão', 3, 3),
        TA('observacoes', 'Observações', 3, 3),
      ]),
    ],
  },

  // ============================= 8. SAÚDE DO HOMEM =============================
  {
    key: 'Saúde do Homem',
    label: 'Saúde do Homem',
    icon: User,
    color: 'blue',
    description: 'Ficha de fisioterapia pélvica e urológica masculina.',
    summaryMap: {
      objetivos: ['queixaPrincipal'],
      procedimentos: ['terapiaManual', 'exerciciosTerapeuticos', 'recursosEletrofisicos', 'educacaoSaude'],
      reavaliacao: ['condutaProximaSessao', 'evolucaoFisioterapeutica'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('idade', 'Idade', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('horario', 'Horário', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 2),
        T('diagnosticoFisio', 'Diagnóstico Fisioterapêutico', 1),
      ]),
      SEC('avaliacaoPre', '2. Avaliação Pré-Atendimento', [
        RD('estadoClinico', 'Estado Clínico', ['1º Atendimento', 'Muito melhor', 'Melhor', 'Estável', 'Igual', 'Pior']),
        T('dorEva', 'Dor EVA (0-10)', 1),
        T('dorLocalizacao', 'Localização da dor', 2),
        T('pa', 'PA', 1),
        T('fc', 'FC', 1),
        T('fr', 'FR', 1),
        T('spo2', 'SpO₂', 1),
        T('temp', 'Temp', 1),
        CK('queixaPrincipal', 'Queixa Principal da Sessão', ['Dor lombopélvica', 'Dor pélvica crônica', 'Incontinência urinária', 'Urgência miccional', 'Noctúria', 'Disfunção erétil', 'Dor pós-prostatectomia', 'Pós-operatório urológico', 'Fraqueza muscular', 'Alteração postural']),
      ]),
      SEC('funcional', '3. Avaliação Funcional', [
        CK('funcaoUrinaria', 'Função Urinária', ['Sem alterações', 'Frequência urinária aumentada', 'Urgência urinária', 'Noctúria', 'Jato urinário fraco', 'Esforço miccional', 'Incontinência urinária', 'Uso de absorvente']),
        CK('funcaoIntestinal', 'Função Intestinal', ['Normal', 'Constipação', 'Esforço evacuatório', 'Intestino solto', 'Incontinência fecal']),
        CK('funcaoSexual', 'Função Sexual', ['Sem alterações', 'Disfunção erétil', 'Dor durante relação sexual', 'Ejaculação precoce', 'Diminuição da libido']),
      ]),
      SEC('assoalhoPelvico', '4. Avaliação do Assoalho Pélvico', [
        T('forcaOxford', 'Força Muscular (Oxford /5)', 1),
        T('endurance', 'Endurance (segundos)', 1),
        T('contracoesRapidas', 'Contrações rápidas', 1),
        RD('conscienciaPerineal', 'Consciência Perineal', ['Preservada', 'Reduzida', 'Ausente']),
        RD('coordenacaoMuscular', 'Coordenação Muscular', ['Adequada', 'Alterada']),
        RD('dorPalpacao', 'Dor à Palpação', ['Não', 'Sim']),
        T('dorPalpacaoLocal', 'Local', 2),
      ]),
      SEC('exameFisico', '5. Exame Físico', [
        CK('exameFisico', 'Achados', ['Alteração postural', 'Dor à palpação', 'Restrição de ADM', 'Fraqueza muscular', 'Hipotrofia muscular', 'Alteração da marcha', 'Déficit de equilíbrio', 'Cicatriz cirúrgica', 'Edema', 'Restrição fascial']),
      ]),
      SEC('procedimentos', '6. Procedimentos Realizados', [
        CK('terapiaManual', 'Terapia Manual', ['Liberação miofascial', 'Terapia manual', 'Mobilização articular', 'Mobilização neural', 'Liberação cicatricial', 'Massagem terapêutica']),
        CK('exerciciosTerapeuticos', 'Exercícios Terapêuticos', ['Treino do assoalho pélvico', 'Exercícios de Kegel', 'Exercícios respiratórios', 'Alongamentos', 'Estabilização do Core', 'Fortalecimento muscular', 'Exercícios resistidos', 'Treino funcional', 'Exercícios proprioceptivos', 'Condicionamento cardiovascular', 'Correção postural']),
        CK('recursosEletrofisicos', 'Recursos Eletrofísicos', ['Biofeedback', 'Eletroestimulação', 'TENS', 'FES', 'Ultrassom terapêutico', 'Crioterapia', 'Laser/Fotobiomodulação', 'Termoterapia']),
        CK('educacaoSaude', 'Educação em Saúde', ['Orientações domiciliares', 'Programa de exercícios domiciliares', 'Reeducação miccional', 'Treinamento vesical', 'Ergonomia', 'Educação em saúde', 'Orientações sobre atividade física', 'Orientações pós-operatórias']),
      ]),
      SEC('parametros', '7 e 8. Parâmetros e Evolução', [
        T('tempoSessao', 'Tempo da sessão (min)', 1),
        RD('intensidade', 'Intensidade dos exercícios', ['Leve', 'Moderada', 'Intensa']),
        RD('tolerancia', 'Tolerância ao tratamento', ['Excelente', 'Boa', 'Regular', 'Ruim']),
        CK('evolucaoSessao', 'Evolução da Sessão', ['Redução da dor', 'Melhora da continência urinária', 'Melhora do fluxo urinário', 'Ganho de força do assoalho pélvico', 'Melhora da função sexual', 'Ganho de força muscular', 'Melhora da mobilidade', 'Melhora postural', 'Melhora funcional', 'Sem intercorrências']),
      ]),
      SEC('condutaObs', '9, 10 e 11. Conduta, Evolução e Observações', [
        TA('condutaProximaSessao', 'Conduta para Próxima Sessão', 2, 3),
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 2, 3),
        TA('observacoes', 'Observações', 2, 3),
      ]),
    ],
  },

  // ============================= 9. PSICOMOTRICIDADE =============================
  {
    key: 'Psicomotricidade',
    label: 'Psicomotricidade',
    icon: Baby,
    color: 'teal',
    description: 'Ficha infantil de psicomotricidade com comportamento, objetivos e recursos utilizados.',
    summaryMap: {
      objetivos: ['objetivosPsicomotricidadeGlobal', 'objetivosEquilibrio', 'objetivosCoordenacaoFina', 'objetivosOrganizacao', 'objetivosEsquemaCorporal', 'objetivosSensoriais'],
      procedimentos: ['recursosMateriaisPsicomotores', 'recursosEquilibrio', 'recursosSensoriais', 'recursosMotoresFinos'],
      reavaliacao: ['descricaoAtividades', 'observacoes', 'orientacoesResponsavel'],
    },
    sections: [
      SEC('dadosPaciente', 'Dados do Paciente/Criança', [
        T('nomeCrianca', 'Nome da criança', 3),
        T('dataNascimento', 'Data de nascimento', 1),
        T('idade', 'Idade', 1),
        T('responsavel', 'Responsável', 1),
        T('dataSessao', 'Data da sessão', 1),
      ]),
      SEC('comportamento', '1. Comportamento da Criança', [
        CK('comportamentoInicio', 'Início da Sessão', ['Feliz', 'Atenta', 'Ansiosa', 'Tímida', 'Dispersa', 'Irritada', 'Rígida', 'Sonolenta', 'Resistente às propostas', 'Redirecionamento constante']),
        CK('comportamentoFinal', 'Final da Sessão', ['Feliz', 'Atenta', 'Ansiosa', 'Tímida', 'Dispersa', 'Irritada', 'Rígida', 'Sonolenta', 'Resistente às propostas', 'Redirecionamento constante']),
      ]),
      SEC('participacao', '2. Participação Durante a Sessão', [
        RD('participacao', 'Participação', ['Excelente', 'Boa', 'Regular', 'Ruim', 'Prejudicada']),
        CK('comportamentoSessao', 'Comportamento', ['Colaborativa', 'Comunicativa', 'Agitada', 'Dispersa', 'Irritada']),
        CK('interacao', 'Interação', ['Boa interação', 'Boa resposta aos comandos', 'Pouco contato visual', 'Interação baixa', 'Interação ruim', 'Necessitou de comandos repetitivos']),
      ]),
      SEC('objetivos', '3. Objetivos Terapêuticos da Sessão', [
        CK('objetivosPsicomotricidadeGlobal', 'Psicomotricidade Global', ['Melhorar coordenação motora global', 'Trabalhar dissociação de cinturas', 'Estimular planejamento motor', 'Desenvolver praxia global', 'Melhorar agilidade motora', 'Desenvolver habilidades locomotoras', 'Estimular controle motor voluntário', 'Favorecer transições posturais']),
        CK('objetivosEquilibrio', 'Equilíbrio e Controle Postural', ['Trabalhar equilíbrio estático', 'Trabalhar equilíbrio dinâmico', 'Melhorar reações de proteção', 'Estimular ajustes posturais', 'Melhorar alinhamento corporal', 'Estimular descarga de peso adequada', 'Melhorar estabilidade de tronco', 'Melhorar transição de posições']),
        CK('objetivosCoordenacaoFina', 'Coordenação Motora Fina', ['Melhorar preensão palmar', 'Trabalhar pinça fina', 'Desenvolver coordenação óculo-manual', 'Melhorar destreza manual', 'Estimular manipulação de objetos', 'Trabalhar controle motor fino']),
        CK('objetivosOrganizacao', 'Organização Espacial e Temporal', ['Trabalhar noção espacial', 'Desenvolver coordenação óculo-manual', 'Melhorar destreza manual', 'Estimular manipulação de objetos']),
        CK('objetivosEsquemaCorporal', 'Esquema Corporal', ['Reconhecimento das partes do corpo', 'Consciência corporal', 'Imagem corporal', 'Integração sensório-motora', 'Coordenação bilateral']),
        CK('objetivosSensoriais', 'Aspectos Sensoriais', ['Estimular sistema proprioceptivo', 'Estimular sistema vestibular', 'Trabalhar integração sensorial', 'Reduzir hipersensibilidade tátil', 'Estimular percepção tátil']),
        TA('outrasObservacoesObjetivos', 'Outras observações', 2, 3),
      ]),
      SEC('recursos', '4. Recursos Utilizados Durante a Sessão', [
        CK('recursosMateriaisPsicomotores', 'Materiais Psicomotores', ['Circuito psicomotor', 'Escada de agilidade', 'Bambolês', 'Cones', 'Cordas', 'Túneis', 'Step terapêutico']),
        CK('recursosEquilibrio', 'Recursos de Equilíbrio', ['Disco de equilíbrio', 'Bosu', 'Prancha Proprioceptiva', 'Cama Elástica', 'Bola suíça', 'Plataforma instável', 'Obstáculos funcionais']),
        CK('recursosSensoriais', 'Recursos Sensoriais', ['Caixa tátil', 'Tapete Sensorial', 'Texturas diversas', 'Escova Sensorial', 'Materiais vibratórios', 'Recursos luminosos', 'Massa de modelar']),
        CK('recursosMotoresFinos', 'Recursos Motores Finos', ['Encaixes', 'Prendedores', 'Argolas', 'Blocos de montar', 'Jogos de coordenação Manual', 'Atividades gráficas']),
        CK('recursosCognitivosLudicos', 'Recursos Cognitivos e Lúdicos', ['Jogos educativos', 'Brinquedos interativos', 'Músicas', 'Atividades com comandos verbais', 'Brincadeiras simbólicas', 'Cartas ilustrativas']),
        CK('recursosFuncionais', 'Recursos Funcionais', ['Colchonetes', 'Faixa elástica', 'Espelho terapêutico', 'Banco terapêutico', 'Rolo terapêutico', 'Escada funcional']),
      ]),
      SEC('evolucaoObs', '5, 6, 7 e 8. Evolução, Descrição e Orientações', [
        CK('evolucaoObservada', 'Evolução Observada', ['Melhor estabilidade postural', 'Melhor coordenação motora', 'Maior independência', 'Melhor atenção nas atividades', 'Evolução no equilíbrio', 'Melhor tolerância às atividades', 'Redução de comportamentos inadequados', 'Sem evolução significativa observada']),
        TA('descricaoAtividades', 'Descrição das Atividades Realizadas', 3, 3),
        TA('observacoes', 'Observações', 3, 3),
        TA('orientacoesResponsavel', 'Orientações ao Responsável', 3, 3),
      ]),
    ],
  },

  // ============================= 10. SAÚDE DA MULHER =============================
  {
    key: 'Saúde da Mulher',
    label: 'Saúde da Mulher',
    icon: HeartHandshake,
    color: 'pink',
    description: 'Ficha de fisioterapia pélvica, obstétrica e ginecológica.',
    summaryMap: {
      objetivos: ['queixaPrincipal'],
      procedimentos: ['terapiaManual', 'exerciciosTerapeuticos', 'recursosEletrofisicos', 'educacaoSaude'],
      reavaliacao: ['condutaProximaSessao', 'evolucaoFisioterapeutica'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('idade', 'Idade', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('horario', 'Horário', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 2),
        T('diagnosticoFisio', 'Diagnóstico Fisioterapêutico', 1),
      ]),
      SEC('avaliacaoPre', '2. Avaliação Pré-Atendimento', [
        RD('estadoClinico', 'Estado Clínico', ['1º Atendimento', 'Muito melhor', 'Melhor', 'Estável', 'Igual', 'Pior']),
        T('dorEva', 'Dor EVA (0-10)', 1),
        T('dorLocalizacao', 'Localização', 2),
        CK('queixaPrincipal', 'Queixa Principal da Sessão', ['Dor pélvica', 'Dor lombar', 'Incontinência urinária', 'Incontinência fecal', 'Urgência miccional', 'Constipação', 'Dispareunia', 'Pós-parto', 'Diástase abdominal', 'Pós-operatório ginecológico', 'Linfedema']),
      ]),
      SEC('funcional', '3. Avaliação Funcional', [
        CK('funcaoUrinaria', 'Função Urinária', ['Sem alterações', 'Urgência', 'Frequência aumentada', 'Incontinência aos esforços', 'Incontinência por urgência', 'Incontinência contínua', 'Uso de absorvente']),
        CK('funcaoIntestinal', 'Função Intestinal', ['Normal', 'Constipação', 'Esforço evacuatório', 'Dor', 'Incontinência fecal']),
        CK('funcaoSexual', 'Função Sexual', ['Não avaliada', 'Sem alterações', 'Dispareunia', 'Redução da libido', 'Dificuldade de penetração']),
      ]),
      SEC('assoalhoPelvico', '4. Avaliação do Assoalho Pélvico', [
        T('forcaOxford', 'Força Muscular (Oxford /5)', 1),
        T('endurance', 'Endurance (segundos)', 1),
        T('contracoesRapidas', 'Contrações rápidas', 1),
        RD('tonus', 'Tônus', ['Normal', 'Hipotônico', 'Hipertônico']),
        RD('coordenacao', 'Coordenação', ['Preservada', 'Reduzida']),
        RD('diastaseAbdominal', 'Diástase Abdominal', ['Não', 'Sim']),
        T('diastaseCm', 'Cm', 1),
        RD('prolapso', 'Prolapso', ['Não', 'Sim']),
        T('prolapsoGrau', 'Grau', 1),
      ]),
      SEC('exameFisico', '5. Exame Físico', [
        CK('exameFisico', 'Achados', ['Alteração postural', 'Dor à palpação', 'Cicatriz cirúrgica', 'Edema', 'Restrição fascial', 'Linfedema', 'Hipotonia abdominal', 'Hipertonia muscular', 'Redução da mobilidade pélvica']),
      ]),
      SEC('procedimentos', '6. Procedimentos Realizados', [
        CK('terapiaManual', 'Terapia Manual', ['Liberação miofascial', 'Terapia manual pélvica', 'Liberação de cicatriz', 'Mobilização pélvica', 'Mobilização lombossacra', 'Massagem terapêutica', 'Drenagem linfática']),
        CK('exerciciosTerapeuticos', 'Exercícios Terapêuticos', ['Exercícios de Kegel', 'Treino do assoalho pélvico', 'Exercícios respiratórios', 'Estabilização do Core', 'Exercícios abdominais funcionais', 'Alongamentos', 'Fortalecimento global', 'Exercícios posturais', 'Treino funcional', 'Exercícios proprioceptivos', 'Exercícios para gestantes', 'Exercícios pós-parto']),
        CK('recursosEletrofisicos', 'Recursos Eletrofísicos', ['Biofeedback', 'TENS', 'FES', 'Ultrassom terapêutico', 'Laser/Fotobiomodulação', 'Termoterapia', 'Crioterapia']),
        CK('educacaoSaude', 'Educação em Saúde', ['Orientações posturais', 'Reeducação miccional', 'Controle da urgência urinária', 'Ergonomia', 'Treino intestinal', 'Orientações domiciliares', 'Programa de exercícios domiciliares', 'Educação perineal', 'Orientações para atividade física']),
      ]),
      SEC('parametros', '7 e 8. Parâmetros e Evolução', [
        T('tempoSessao', 'Tempo da sessão (min)', 1),
        RD('intensidade', 'Intensidade dos exercícios', ['Leve', 'Moderada', 'Intensa']),
        RD('tolerancia', 'Tolerância ao tratamento', ['Excelente', 'Boa', 'Regular', 'Ruim']),
        CK('evolucaoSessao', 'Evolução da Sessão', ['Redução da dor', 'Melhora da continência urinária', 'Melhora da continência fecal', 'Ganho de força do assoalho pélvico', 'Melhora da coordenação muscular', 'Melhora da postura', 'Redução da diástase', 'Redução do edema', 'Melhora funcional', 'Sem intercorrências']),
      ]),
      SEC('condutaEvolucao', '9 e 10. Conduta e Evolução', [
        CK('condutaProximaSessao', 'Conduta para a Próxima Sessão', ['Manter conduta', 'Progressão dos exercícios', 'Reavaliar capacidade funcional', 'Ajustar carga do treino muscular', 'Introduzir novas técnicas']),
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 3, 3),
      ]),
    ],
  },



// ============================= 11. NEUROFUNCIONAL =============================
  {
    key: 'Neurofuncional',
    label: 'Neurofuncional',
    icon: Brain,
    color: 'violet',
    description: 'Ficha para acompanhamento neurofuncional com tônus, técnicas e desempenho motor.',
    summaryMap: {
      objetivos: ['objetivosSessao'],
      procedimentos: ['mobilizacao', 'tecnicasNeurofuncionais', 'treinoFuncional', 'equilibrio', 'marcha'],
      reavaliacao: ['evolucaoFisioterapeutica', 'observacoes', 'condutaProximaSessao'],
    },
    sections: [
      SEC('identificacao', 'Identificação', [
        T('idade', 'Idade', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 2),
      ]),
      SEC('avaliacaoPre', '1. Avaliação Pré-Atendimento', [
        RD('estadoClinico', 'Estado Clínico', ['Estável', 'Melhorado em relação à última sessão', 'Sem alterações', 'Piora clínica']),
        RD('nivelConsciencia', 'Nível de Consciência', ['Lúcido', 'Acordado', 'Sonolento', 'Confuso', 'Obnubilado', 'Desorientado', 'Torporoso']),
        RD('comunicacao', 'Comunicação', ['Normal', 'Disartria', 'Afasia', 'Comunicação alternativa', 'Não verbal']),
        T('dorEva', 'Dor EVA (0-10)', 1),
        T('dorLocal', 'Local', 2),
        T('tonusMMSSD', 'Tônus MMSS Direito', 1),
        T('tonusMMSSE', 'Tônus MMSS Esquerdo', 1),
        T('tonusMMIID', 'Tônus MMII Direito', 1),
        T('tonusMMIIE', 'Tônus MMII Esquerdo', 1),
        T('pa', 'PA', 1),
        T('fc', 'FC', 1),
        T('fr', 'FR', 1),
        T('spo2', 'SpO₂', 1),
      ]),
      SEC('objetivos', '2. Objetivos da Sessão', [
        CK('objetivosSessao', 'Objetivos', ['Controle da espasticidade', 'Ganho de ADM', 'Fortalecimento muscular', 'Facilitação motora', 'Controle postural', 'Reações de equilíbrio', 'Reações de proteção', 'Coordenação motora', 'Treino de marcha', 'Treino funcional', 'Independência nas AVDs', 'Prevenção de quedas', 'Condicionamento físico']),
      ]),
      SEC('condutas', '3. Condutas Realizadas', [
        CK('mobilizacao', 'Mobilização', ['Passiva', 'Ativa Assistida', 'Ativa', 'Neural', 'Articular']),
        CK('tecnicasNeurofuncionais', 'Técnicas Neurofuncionais', ['Bobath', 'PNF', 'Brunnstrom', 'Rood', 'Integração Sensorial', 'TENS', 'FES', 'Facilitação Motora', 'Controle Inibitório da Espasticidade']),
        CK('treinoFuncional', 'Treino Funcional', ['Rolar', 'Ponte', 'Sedestação', 'Ortostatismo', 'Transferência', 'Sentar-Levantar', 'Alcance Funcional', 'Manipulação', 'Preensão', 'Liberação de objetos']),
        CK('equilibrio', 'Equilíbrio', ['Sentado', 'Em pé', 'Estático', 'Dinâmico', 'Transferência de peso', 'Apoio unipodal', 'Obstáculos']),
        CK('marcha', 'Marcha', ['Barras paralelas', 'Solo', 'Esteira', 'Escadas', 'Mudança de direção', 'Obstáculos', 'Marcha lateral', 'Marcha posterior', 'Dupla tarefa']),
        RD('dispositivoUtilizado', 'Dispositivo utilizado', ['Nenhum', 'Bengala', 'Andador', 'Muleta', 'Órtese', 'Cadeira de rodas']),
      ]),
      SEC('desempenho', '4. Desempenho Durante a Sessão', [
        RD('controlePostural', 'Controle Postural', ['Excelente', 'Bom', 'Regular', 'Ruim']),
        RD('coordenacao', 'Coordenação', ['Melhorou', 'Manteve', 'Piorou']),
        RD('equilibrioDesempenho', 'Equilíbrio', ['Melhorou', 'Manteve', 'Piorou']),
        RD('marchaDesempenho', 'Marcha', ['Melhorou', 'Manteve', 'Piorou']),
        RD('independenciaFuncional', 'Independência Funcional', ['Melhorou', 'Manteve', 'Piorou']),
        RD('toleranciaExercicio', 'Tolerância ao Exercício', ['Excelente', 'Boa', 'Regular', 'Ruim']),
        RD('fadiga', 'Fadiga', ['Ausente', 'Leve', 'Moderada', 'Intensa']),
      ]),
      SEC('intercorrenciasOrientacoes', '5 e 6. Intercorrências e Orientações', [
        CK('intercorrencias', 'Intercorrências', ['Não houve', 'Dor', 'Espasticidade aumentada', 'Fadiga excessiva', 'Tontura', 'Queda', 'Hipotensão', 'Hipertensão']),
        CK('orientacoes', 'Orientações ao Paciente/Cuidador', ['Posicionamento', 'Mudança de decúbito', 'Exercícios domiciliares', 'Alongamentos', 'Uso de órteses', 'Transferências seguras', 'Prevenção de quedas', 'Educação do cuidador']),
      ]),
      SEC('evolucaoConduta', '7, 8 e 9. Evolução, Observações e Conduta', [
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 3, 3),
        TA('observacoes', 'Observações', 3, 3),
        TA('condutaProximaSessao', 'Conduta para a Próxima Sessão', 2, 3),
      ]),
    ],
  },
// ============================= 12. TERAPIA INTENSIVA =============================
  {
    key: 'Terapia Intensiva',
    label: 'Terapia Intensiva (UTI)',
    icon: Activity,
    color: 'red',
    description: 'Ficha para fisioterapia em UTI com monitorização hemodinâmica, ventilatória e mobilização precoce.',
    summaryMap: {
      objetivos: ['objetivosSessao'],
      procedimentos: ['condutasRespiratorias', 'condutasMotoras'],
      reavaliacao: ['evolucaoFisioterapeutica', 'observacoes'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('diagnosticoMedico', 'Diagnóstico Médico', 2),
        T('diagnosticoFisio', 'Diagnóstico Fisioterapêutico', 1),
        T('unidadeSetor', 'Unidade/Setor', 1),
        T('leito', 'Leito', 1),
        T('horario', 'Horário', 1),
        T('diaInternacao', 'Dia de Internação', 1),
        T('diaUti', 'Dia de UTI', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 1),
      ]),
      SEC('condicaoClinica', '2. Condição Clínica no Início', [
        RD('nivelConsciencia', 'Nível de consciência', ['Alerta', 'Orientado', 'Sonolento', 'Confuso', 'Agitado', 'Sedado', 'Comatoso']),
        T('glasgow', 'Escala de Glasgow (/15)', 1),
        T('rass', 'RASS', 1),
        RD('dor', 'Dor', ['Ausente', 'Presente']),
        T('dorEva', 'EVA/END (0-10)', 1),
        RD('condicaoClinicaGeral', 'Condição clínica geral', ['Estável', 'Instável', 'Grave', 'Crítica', 'Em melhora', 'Sem alterações significativas']),
        T('observacoesCondicao', 'Observações', 3),
      ]),
      SEC('hemodinamica', '3. Monitorização Hemodinâmica', [
        T('paInicio', 'PA Início', 1),
        T('paFinal', 'PA Final', 1),
        T('fcInicio', 'FC Início', 1),
        T('fcFinal', 'FC Final', 1),
        T('frInicio', 'FR Início', 1),
        T('frFinal', 'FR Final', 1),
        RD('drogasVasoativas', 'Uso de drogas vasoativas', ['Não', 'Sim']),
        T('drogasVasoativasQuais', 'Quais/Vazão', 2),
        RD('respostaHemodinamica', 'Resposta hemodinâmica', ['Estável', 'Boa tolerância', 'Oscilações transitórias', 'Intolerância ao esforço']),
      ]),
      SEC('respiratoria', '4 e 5. Avaliação Respiratória e Suporte', [
        CK('padraoRespiratorio', 'Padrão respiratório', ['Eupneico', 'Taquipneico', 'Bradipneico', 'Dispneico', 'Uso de musculatura acessória', 'Respiração superficial', 'Respiração paradoxal']),
        CK('ausculta', 'Ausculta pulmonar', ['MV presente bilateralmente', 'MV diminuído', 'MV abolido', 'Roncos', 'Sibilos', 'Estertores/Crepitações']),
        RD('secrecao', 'Secreção', ['Ausente', 'Escassa', 'Moderada', 'Abundante']),
        RD('tosse', 'Tosse', ['Eficaz', 'Ineficaz', 'Ausente']),
        RD('viaAerea', 'Via aérea artificial', ['Nenhuma', 'TOT', 'Traqueostomia', 'Cricotireoidostomia']),
        RD('modoVentilatorio', 'Modo ventilatório', ['VCV', 'PCV', 'PSV', 'SIMV', 'CPAP', 'Ar ambiente', 'VNI']),
        T('fio2', 'FiO₂ (%)', 1),
        T('peep', 'PEEP (cmH₂O)', 1),
        T('frVent', 'FR (irpm)', 1),
      ]),
      SEC('funcionalMusculo', '6. Avaliação Funcional e Musculoesquelética', [
        RD('mobilidadeLeito', 'Mobilidade no leito', ['Independente', 'Assistência mínima', 'Assistência moderada', 'Assistência máxima', 'Dependente']),
        T('mrcForca', 'Força muscular / MRC (/60)', 1),
        RD('admFuncional', 'Amplitude de movimento', ['Preservada', 'Parcialmente reduzida', 'Reduzida']),
        CK('funcionalidadeRealizada', 'Funcionalidade realizada', ['Mobilização no leito', 'Mudança de decúbito', 'Sedestação leito', 'Sedestação beira do leito', 'Ortostatismo', 'Transferência leito-poltrona', 'Marcha estacionária', 'Deambulação', 'Não realizada por condição clínica']),
      ]),
      SEC('dispositivos', '7. Dispositivos e Cuidados', [
        CK('dispositivos', 'Dispositivos', ['CVC', 'Acesso venoso periférico', 'SNE', 'SNG', 'SVD', 'TOT', 'Traqueostomia', 'Dreno torácico', 'Estomia', 'Cateter arterial', 'Monitorização multiparamétrica']),
      ]),
      SEC('objetivosCondutas', '8 e 9. Objetivos e Condutas', [
        CK('objetivosSessao', 'Objetivos', ['Otimizar a ventilação pulmonar', 'Melhorar as trocas gasosas', 'Promover higiene brônquica', 'Favorecer expansão pulmonar', 'Prevenir/reduzir complicações respiratórias', 'Favorecer o desmame da ventilação mecânica', 'Prevenir fraqueza muscular adquirida na UTI', 'Promover mobilização precoce', 'Melhorar força e resistência muscular', 'Promover independência funcional', 'Progredir sedestação, ortostatismo e/ou marcha']),
        CK('condutasRespiratorias', 'Fisioterapia Respiratória', ['Posicionamento terapêutico', 'Higiene brônquica', 'Técnicas de expansão pulmonar', 'Estímulo à tosse', 'Tosse assistida', 'Aspiração de vias aéreas', 'Exercícios respiratórios', 'Treino muscular inspiratório', 'VNI', 'Participação no desmame ventilatório']),
        CK('condutasMotoras', 'Fisioterapia Motora e Funcional', ['Posicionamento funcional', 'Mudança de decúbito', 'Mobilização passiva', 'Mobilização ativo-assistida', 'Exercícios ativos', 'Exercícios resistidos', 'Sedestação no leito', 'Sedestação à beira do leito', 'Transferência para poltrona', 'Ortostatismo', 'Marcha estacionária', 'Treino de marcha', 'Mobilização precoce', 'Cicloergometria']),
      ]),
      SEC('respostaEvolucao', '10, 11, 12 e 13. Resposta, Evolução e Plano', [
        RD('toleranciaSessao', 'Tolerância à sessão', ['Excelente', 'Boa', 'Regular', 'Ruim', 'Sessão interrompida']),
        CK('intercorrencias', 'Intercorrências', ['Nenhuma', 'Dessaturação', 'Taquicardia', 'Bradicardia', 'Hipotensão', 'Hipertensão', 'Taquipneia', 'Dispneia', 'Arritmia', 'Dor', 'Alteração do nível de consciência']),
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 3, 3),
        CK('planoProximasSessoes', 'Plano para as próximas sessões', ['Manter conduta atual', 'Progredir mobilização', 'Progredir sedestação', 'Progredir ortostatismo', 'Progredir treino de marcha', 'Intensificar fortalecimento muscular', 'Manter higiene brônquica', 'Progredir desmame ventilatório', 'Reavaliar tolerância funcional']),
        TA('observacoes', 'Observações/Intercorrências', 3, 3),
      ]),
    ],
  },
// ============================= 13. GERONTOLOGIA =============================
  {
    key: 'Gerontologia',
    label: 'Gerontologia',
    icon: Footprints,
    color: 'orange',
    description: 'Ficha para atendimento fisioterapêutico geriátrico com foco em equilíbrio, marcha e prevenção de quedas.',
    summaryMap: {
      objetivos: ['objetivosSessao'],
      procedimentos: ['mobilidadeArticular', 'fortalecimentoMuscular', 'treinoEquilibrio', 'treinoMarcha', 'treinoFuncional'],
      reavaliacao: ['evolucaoFisioterapeutica', 'condutaProximaSessao'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('idade', 'Idade', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 2),
      ]),
      SEC('avaliacaoPre', '2. Avaliação Pré-Sessão', [
        RD('estadoGeral', 'Estado Geral', ['Excelente', 'Bom', 'Regular', 'Ruim']),
        RD('humor', 'Humor', ['Alegre', 'Calmo', 'Motivado', 'Ansioso', 'Triste', 'Irritado', 'Apático']),
        RD('nivelCognitivo', 'Nível Cognitivo', ['Orientado', 'Parcialmente orientado', 'Lúcido', 'Preservado', 'Obnubilado', 'Confuso', 'Desorientado', 'Alterado']),
        CK('queixasDia', 'Queixas do Dia', ['Sem queixas', 'Dor', 'Fraqueza', 'Fadiga', 'Tontura', 'Desequilíbrio', 'Rigidez', 'Falta de ar', 'Redução das AVDs']),
        T('dorEvaInicial', 'Escala de Dor (EVA) Inicial', 1),
        T('dorLocalizacao', 'Localização', 2),
        T('pa', 'PA', 1),
        T('fc', 'FC', 1),
        T('fr', 'FR', 1),
        T('spo2', 'SpO₂', 1),
        T('temp', 'Temp', 1),
      ]),
      SEC('objetivos', '4. Objetivos da Sessão', [
        CK('objetivosSessao', 'Objetivos', ['Controle da dor', 'Ganho de força muscular', 'Treino de marcha', 'Melhora do equilíbrio', 'Prevenção de quedas', 'Mobilidade funcional', 'Coordenação motora', 'Condicionamento físico', 'Reeducação postural', 'Independência nas AVDs', 'Treino respiratório', 'Estimulação cognitiva']),
      ]),
      SEC('condutas', '5. Condutas Realizadas', [
        CK('mobilidadeArticular', 'Mobilidade Articular', ['Cervical', 'Ombros', 'Tronco', 'Quadris', 'Joelhos', 'Tornozelos', 'Alongamentos globais']),
        CK('fortalecimentoMuscular', 'Fortalecimento Muscular', ['MMSS', 'MMII', 'Tronco', 'Sentado', 'Em pé', 'Faixa elástica', 'Halteres', 'Caneleiras']),
        CK('treinoEquilibrio', 'Treino de Equilíbrio', ['Estático', 'Dinâmico', 'Apoio unipodal', 'Alcance funcional', 'Obstáculos', 'Dupla tarefa', 'Transferência de peso']),
        CK('treinoMarcha', 'Treino de Marcha', ['Marcha livre', 'Marcha assistida', 'Marcha com dispositivo auxiliar', 'Mudança de direção', 'Obstáculos', 'Subida e descida de degraus']),
        CK('treinoFuncional', 'Treino Funcional', ['Sentar e levantar', 'Transferências', 'Vestir-se', 'Higiene pessoal', 'Simulação de AVDs', 'Alcance de objetos']),
        CK('exerciciosRespiratorios', 'Exercícios Respiratórios', ['Respiração diafragmática', 'Expansão pulmonar', 'Exercícios ventilatórios', 'Controle respiratório']),
      ]),
      SEC('tolerancia', '6 e 7. Tolerância e Segurança', [
        RD('execucao', 'Execução', ['Excelente', 'Boa', 'Regular', 'Ruim']),
        RD('fadiga', 'Fadiga', ['Ausente', 'Leve', 'Moderada', 'Intensa']),
        T('borgInicial', 'Escala de Borg Inicial', 1),
        T('borgFinal', 'Escala de Borg Final', 1),
        RD('riscoQuedas', 'Segurança e Risco de Quedas', ['Sem risco', 'Necessitou supervisão', 'Necessitou apoio físico', 'Utilizou dispositivo auxiliar']),
        RD('dispositivo', 'Dispositivo', ['Bengala', 'Andador', 'Muleta', 'Cadeira de rodas']),
      ]),
      SEC('avaliacaoPos', '8. Avaliação Pós-Sessão', [
        T('paPos', 'PA', 1),
        T('fcPos', 'FC', 1),
        T('frPos', 'FR', 1),
        T('spo2Pos', 'SpO₂', 1),
        T('dorEvaFinal', 'EVA Final', 1),
      ]),
      SEC('evolucaoFuncional', '9. Evolução Funcional', [
        RD('equilibrioEvolucao', 'Equilíbrio', ['Melhorou', 'Manteve', 'Piorou']),
        RD('marchaEvolucao', 'Marcha', ['Melhorou', 'Manteve', 'Piorou']),
        RD('forcaEvolucao', 'Força Muscular', ['Melhorou', 'Manteve', 'Piorou']),
        RD('independenciaEvolucao', 'Independência Funcional', ['Melhorou', 'Manteve', 'Piorou']),
      ]),
      SEC('orientacoesConduta', '10 a 13. Reforçadores, Evolução, Orientações e Conduta', [
        CK('reforcadores', 'Reforçadores e Motivação Utilizados', ['Elogios verbais', 'Metas funcionais', 'Atividades lúdicas', 'Música', 'Interação social', 'Participação familiar']),
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 3, 3),
        CK('orientacoesPaciente', 'Orientações ao Paciente/Cuidador', ['Prevenção de quedas', 'Exercícios domiciliares', 'Uso correto de dispositivo auxiliar', 'Hidratação', 'Atividade física regular', 'Mudanças posturais', 'Segurança domiciliar']),
        TA('condutaProximaSessao', 'Conduta para Próxima Sessão', 2, 3),
      ]),
    ],
  },
// ============================= 14. CARDIOVASCULAR =============================
  {
    key: 'Cardiovascular',
    label: 'Cardiovascular',
    icon: HeartPulse,
    color: 'red',
    description: 'Ficha de reabilitação cardiovascular com monitorização e controle de fatores de risco.',
    summaryMap: {
      objetivos: ['objetivosSessao'],
      procedimentos: ['exerciciosAerobicos', 'exerciciosResistidos', 'exerciciosRespiratorios', 'treinoFuncional'],
      reavaliacao: ['evolucaoFisioterapeutica', 'observacoes'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('idade', 'Idade', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('horario', 'Horário', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 2),
      ]),
      SEC('avaliacaoPre', '2 e 3. Avaliação Pré-Sessão', [
        RD('estadoGeral', 'Estado Geral', ['Excelente', 'Bom', 'Regular', 'Ruim']),
        CK('sintomasRelacionados', 'Sintomas Relacionados', ['Sem queixas', 'Palpitações', 'Dispneia', 'Tontura', 'Dor torácica', 'Edema', 'Fadiga', 'Tosse']),
        T('borgRepouso', 'Escala de Borg em Repouso', 1),
        T('dorEvaInicial', 'Dor EVA Inicial', 1),
        T('dorLocalizacao', 'Localização', 2),
        T('pa', 'PA', 1),
        T('fc', 'FC', 1),
        T('fr', 'FR', 1),
        T('spo2', 'SpO₂', 1),
        T('temp', 'Temperatura', 1),
        T('glicemia', 'Glicemia Capilar (mg/dL)', 1),
      ]),
      SEC('objetivos', '4. Objetivos da Sessão', [
        CK('objetivosSessao', 'Objetivos', ['Reabilitação cardiovascular', 'Aumento da capacidade funcional', 'Redução da dispneia', 'Melhora do condicionamento físico', 'Controle pressórico', 'Recondicionamento físico', 'Fortalecimento muscular', 'Treino de marcha', 'Educação em saúde', 'Controle dos fatores de risco', 'Retorno às AVD']),
      ]),
      SEC('condutas', '5. Condutas Realizadas', [
        CK('aquecimento', 'Aquecimento', ['Caminhada leve', 'Mobilidade articular', 'Alongamentos']),
        CK('exerciciosAerobicos', 'Exercícios Aeróbicos', ['Caminhada', 'Esteira', 'Bicicleta ergométrica', 'Circuito Funcional', 'Degraus']),
        CK('exerciciosResistidos', 'Exercícios Resistidos', ['MMSS', 'MMII', 'Tronco', 'Faixa elástica', 'Halteres', 'Peso corporal']),
        CK('exerciciosRespiratorios', 'Exercícios Respiratórios', ['Respiração diafragmática', 'Exercícios ventilatórios', 'Inspirometria de incentivo', 'Expansão pulmonar', 'Controle respiratório']),
        CK('treinoFuncional', 'Treino Funcional', ['Sentar e levantar', 'Transferências', 'Subir e descer degraus', 'Equilíbrio', 'Marcha']),
      ]),
      SEC('monitorizacao', '6 e 7. Monitorização e Intercorrências', [
        T('paDurante', 'PA Durante', 1),
        T('fcDurante', 'FC Durante', 1),
        T('spo2Durante', 'SpO₂ Durante', 1),
        T('borgDurante', 'Borg Durante', 1),
        CK('intercorrencias', 'Intercorrências', ['Nenhuma', 'Dispneia', 'Dor torácica', 'Palpitações', 'Tontura', 'Hipertensão', 'Hipotensão', 'Queda de saturação', 'Arritmia', 'Síncope']),
      ]),
      SEC('avaliacaoPos', '8 e 9. Avaliação Pós-Sessão e Tolerância', [
        T('paPos', 'PA', 1),
        T('fcPos', 'FC', 1),
        T('frPos', 'FR', 1),
        T('spo2Pos', 'SpO₂', 1),
        T('borgFinal', 'Borg Final', 1),
        T('dorEvaFinal', 'EVA Final', 1),
        RD('toleranciaExercicio', 'Tolerância ao Exercício', ['Excelente', 'Boa', 'Regular', 'Ruim', 'Sessão pausada', 'Sessão interrompida']),
        T('motivoInterrupcao', 'Motivo (se pausada/interrompida)', 3),
      ]),
      SEC('evolucaoOrientacoes', '10, 11, 12 e 13. Evolução, Observações, Orientações e Conduta', [
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 3, 3),
        TA('observacoes', 'Observações', 2, 3),
        CK('orientacoesFornecidas', 'Orientações Fornecidas', ['Controle da pressão arterial', 'Controle glicêmico', 'Atividade física regular', 'Hidratação', 'Uso correto das medicações', 'Controle do peso', 'Alimentação saudável', 'Prevenção de fatores de risco cardiovasculares']),
        TA('condutaProximaSessao', 'Conduta para Próxima Sessão', 2, 3),
      ]),
    ],
  },
// ============================= 15. AQUÁTICA =============================
  {
    key: 'Aquática',
    label: 'Aquática',
    icon: Waves,
    color: 'cyan',
    description: 'Ficha para hidrocinesioterapia com avaliação de segurança para entrada na piscina.',
    summaryMap: {
      objetivos: ['objetivosSessao'],
      procedimentos: ['recursosUtilizados', 'exerciciosRealizados', 'equilibrioAquatico', 'marchaAquatica'],
      reavaliacao: ['evolucaoFisioterapeutica', 'condutaProximaSessao'],
    },
    sections: [
      SEC('identificacao', '1. Identificação', [
        T('idade', 'Idade', 1),
        T('horario', 'Horário', 1),
        T('sessaoNumero', 'Sessão Nº', 1),
        T('fisioterapeuta', 'Fisioterapeuta', 3),
      ]),
      SEC('avaliacaoPre', '2. Avaliação Pré-Sessão', [
        T('pa', 'PA', 1),
        T('fc', 'FC', 1),
        T('fr', 'FR', 1),
        T('spo2', 'SpO₂', 1),
        T('temp', 'Temp', 1),
        T('dorEvaInicial', 'EVA Inicial (0-10)', 1),
        T('dorLocalizacao', 'Localização da dor', 2),
        RD('estadoGeral', 'Estado Geral', ['Excelente', 'Bom', 'Regular', 'Ruim']),
        CK('condicoesEntrada', 'Condições para Entrada na Piscina', ['Sem contraindicações', 'Sem feridas abertas', 'Sem sinais infecciosos', 'Sem febre', 'Sem tontura', 'Continência urinária/fecal preservada', 'Liberação para atividade aquática']),
        TA('observacoesEntrada', 'Observações', 2, 3),
      ]),
      SEC('objetivos', '3. Objetivos da Sessão', [
        CK('objetivosSessao', 'Objetivos', ['Analgesia', 'Relaxamento muscular', 'Ganho de ADM', 'Fortalecimento muscular', 'Melhora do equilíbrio', 'Treino de marcha', 'Condicionamento físico', 'Reeducação postural', 'Coordenação motora', 'Treino funcional', 'Treino respiratório', 'Reabilitação cardiovascular', 'Estímulo proprioceptivo']),
      ]),
      SEC('recursos', '4 e 5. Recursos e Equipamentos Utilizados', [
        CK('recursosUtilizados', 'Recursos Utilizados', ['Piscina aquecida', 'Hidrocinesioterapia', 'Exercícios ativos', 'Exercícios resistidos', 'Alongamentos', 'Mobilizações articulares', 'Relaxamento aquático', 'Técnicas respiratórias', 'Treino funcional', 'Treino de equilíbrio', 'Treino de marcha', 'Flutuação assistida', 'Exercícios aeróbicos']),
        CK('equipamentosUtilizados', 'Equipamentos Utilizados', ['Macarrão', 'Halteres aquáticos', 'Caneleiras flutuantes', 'Pranchas', 'Bola', 'Bastão', 'Step aquático', 'Tornozeleiras', 'Colete flutuador', 'Espaguete cervical']),
      ]),
      SEC('exercicios', '6. Exercícios Realizados', [
        CK('exerciciosRealizados', 'Exercícios', ['Caminhada leve na água', 'Flutuação assistida', 'Mobilização passiva aquática', 'Alongamentos globais', 'Exercícios respiratórios', 'Agachamento na piscina', 'Transferência de peso', 'Marcha com resistência', 'Polichinelo aquático', 'Circuito aquático', 'Dissociação de cinturas']),
      ]),
      SEC('treinoFuncionalAquatico', '7. Treino Funcional Aquático', [
        CK('equilibrioAquatico', 'Equilíbrio', ['Estático', 'Dinâmico', 'Transferência de peso', 'Apoio unipodal', 'Alcances funcionais']),
        CK('marchaAquatica', 'Marcha', ['Anterior', 'Posterior', 'Lateral', 'Com obstáculos', 'Com resistência da água']),
        CK('coordenacaoAquatica', 'Coordenação Motora', ['Membros Superiores', 'Membros Inferiores', 'Global']),
      ]),
      SEC('respostaSessao', '8 e 9. Resposta e Avaliação Pós-Sessão', [
        RD('toleranciaExercicio', 'Tolerância ao Exercício', ['Excelente', 'Boa', 'Regular', 'Ruim']),
        RD('fadiga', 'Fadiga', ['Ausente', 'Leve', 'Moderada', 'Intensa']),
        RD('dorSessao', 'Dor na Sessão', ['Não', 'Sim']),
        T('dorEvaSessao', 'EVA (se houve dor)', 1),
        CK('intercorrencias', 'Intercorrências', ['Nenhuma', 'Dor', 'Tontura', 'Cãibras', 'Dispneia']),
        T('paPos', 'PA Pós', 1),
        T('fcPos', 'FC Pós', 1),
        T('frPos', 'FR Pós', 1),
        T('spo2Pos', 'SpO₂ Pós', 1),
        T('tempPos', 'Temperatura Pós', 1),
        T('dorEvaFinal', 'EVA Final (0-10)', 1),
        T('borgFinal', 'Percepção de Esforço (Borg)', 1),
      ]),
      SEC('evolucaoConduta', '10 e 11. Evolução e Conduta', [
        TA('evolucaoFisioterapeutica', 'Evolução Fisioterapêutica', 3, 3),
        TA('condutaProximaSessao', 'Conduta para Próxima Sessão', 3, 3),
      ]),
    ],
  }];


// Cores tailwind usadas nos botões/badges de cada ficha (mapa estático p/ o compilador do Tailwind enxergar as classes)
const COLOR_MAP: Record<string, { bg: string; text: string; border: string; btnBg: string; btnHover: string }> = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'hover:border-indigo-400', btnBg: 'bg-indigo-600', btnHover: 'hover:bg-indigo-700' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'hover:border-amber-400', btnBg: 'bg-amber-600', btnHover: 'hover:bg-amber-700' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'hover:border-sky-400', btnBg: 'bg-sky-600', btnHover: 'hover:bg-sky-700' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'hover:border-purple-400', btnBg: 'bg-purple-600', btnHover: 'hover:bg-purple-700' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'hover:border-rose-400', btnBg: 'bg-rose-600', btnHover: 'hover:bg-rose-700' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'hover:border-emerald-400', btnBg: 'bg-emerald-600', btnHover: 'hover:bg-emerald-700' },
  fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'hover:border-fuchsia-400', btnBg: 'bg-fuchsia-600', btnHover: 'hover:bg-fuchsia-700' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'hover:border-cyan-400', btnBg: 'bg-cyan-600', btnHover: 'hover:bg-cyan-700' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'hover:border-blue-400', btnBg: 'bg-blue-600', btnHover: 'hover:bg-blue-700' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'hover:border-orange-400', btnBg: 'bg-orange-600', btnHover: 'hover:bg-orange-700' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'hover:border-teal-400', btnBg: 'bg-teal-600', btnHover: 'hover:bg-teal-700' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'hover:border-pink-400', btnBg: 'bg-pink-600', btnHover: 'hover:bg-pink-700' },
};

function getFicha(key: string): FichaSchema | undefined {
  return FICHAS.find(f => f.key === key);
}

function defaultDataForSchema(schema: FichaSchema): Record<string, any> {
  const data: Record<string, any> = {};
  schema.sections.forEach(sec => {
    sec.fields.forEach(f => {
      data[f.id] = f.type === 'checkbox' ? [] : '';
    });
  });
  return data;
}

function buildSummary(ids: string[] | undefined, data: Record<string, any>): string {
  if (!ids || ids.length === 0) return '';
  return ids
    .map(id => {
      const v = data[id];
      if (Array.isArray(v)) return v.join(', ');
      return v || '';
    })
    .filter(Boolean)
    .join(' | ');
}

const colSpanClass = { 1: 'md:col-span-1', 2: 'md:col-span-2', 3: 'md:col-span-3' } as const;

/* ======================================================================
   COMPONENTE PRINCIPAL
====================================================================== */

export default function AtendimentoPage() {
  // ================= ESTADOS DE NAVEGAÇÃO =================
  const [view, setView] = useState<'busca' | 'historico' | 'selecao_ficha' | 'formulario'>('busca');
  const [tipoFicha, setTipoFicha] = useState<string>('');

  // ================= ESTADOS DE DADOS =================
  const [patients, setPatients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [pastRecords, setPastRecords] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  const [viewingRecord, setViewingRecord] = useState<any | null>(null);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);

  // ================= ESTADO GENÉRICO DO FORMULÁRIO =================
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const activeSchema = getFicha(tipoFicha);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleCheckboxToggle = (fieldId: string, option: string) => {
    setFormData(prev => {
      const current: string[] = prev[fieldId] || [];
      return current.includes(option)
        ? { ...prev, [fieldId]: current.filter((item) => item !== option) }
        : { ...prev, [fieldId]: [...current, option] };
    });
  };

  // ================= BUSCA INICIAL =================
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      const { data } = await supabase.from('patients').select('id, name, cpf').order('name');
      if (data) setPatients(data);
      setLoading(false);
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || (p.cpf && p.cpf.includes(searchTerm))
  );

  const handleSelectPatient = async (patient: any) => {
    setSelectedPatient(patient);
    setView('historico');
    setLoading(true);

    const { data } = await supabase
      .from('records')
      .select('*')
      .eq('patient_id', patient.id)
      .order('created_at', { ascending: false });

    if (data) setPastRecords(data);
    setLoading(false);
  };

  // ================= AÇÕES (EDITAR, EXCLUIR, SALVAR) =================
  const handleEditRecord = (record: any) => {
    setEditingRecordId(record.id);
    const schema = getFicha(record.area_fisio);
    setTipoFicha(record.area_fisio || '');
    if (schema) {
      setFormData(record.ficha_completa || defaultDataForSchema(schema));
      const initialOpen: Record<string, boolean> = {};
      schema.sections.forEach(s => (initialOpen[s.id] = true));
      setOpenSections(initialOpen);
    } else {
      setFormData(record.ficha_completa || {});
    }
    setViewingRecord(null);
    setView('formulario');
  };

  const handleDeleteRecord = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta ficha de atendimento permanentemente?')) return;

    const { error } = await supabase.from('records').delete().eq('id', id);

    if (error) {
      alert('Erro ao excluir: ' + error.message);
    } else {
      alert('Atendimento excluído com sucesso.');
      setViewingRecord(null);
      handleSelectPatient(selectedPatient);
    }
  };

  const handleSaveRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('Erro de autenticação. Faça login novamente.');
      setSaving(false);
      return;
    }

    const schema = getFicha(tipoFicha);

    const recordData: any = {
      user_id: user.id,
      patient_id: selectedPatient.id,
      area_fisio: tipoFicha,
      ficha_completa: formData,
      objetivos_ficha: buildSummary(schema?.summaryMap?.objetivos, formData),
      procedimentos: buildSummary(schema?.summaryMap?.procedimentos, formData),
      reavaliacao: buildSummary(schema?.summaryMap?.reavaliacao, formData),
    };

    let error;

    if (editingRecordId) {
      const res = await supabase.from('records').update(recordData).eq('id', editingRecordId);
      error = res.error;
    } else {
      const res = await supabase.from('records').insert([recordData]);
      error = res.error;
    }

    setSaving(false);

    if (error) {
      alert('Erro ao salvar: ' + error.message);
    } else {
      alert(`Ficha ${editingRecordId ? 'atualizada' : 'salva'} com sucesso!`);
      setFormData({});
      setEditingRecordId(null);
      handleSelectPatient(selectedPatient);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  // ================= RENDER DE CAMPO GENÉRICO (FORMULÁRIO) =================
  const renderField = (field: FieldDef) => {
    const colClass = colSpanClass[field.colSpan || 3];

    if (field.type === 'text') {
      return (
        <div key={field.id} className={colClass}>
          <label className="block text-xs font-bold text-slate-500 mb-1">{field.label}</label>
          <input
            type="text"
            value={formData[field.id] ?? ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.id} className={colClass}>
          <label className="block text-xs font-bold text-slate-500 mb-1">{field.label}</label>
          <textarea
            rows={field.rows || 2}
            value={formData[field.id] ?? ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      );
    }

    if (field.type === 'radio') {
      return (
        <div key={field.id} className={colClass}>
          <label className="block text-xs font-bold text-slate-500 mb-2">{field.label}</label>
          <div className="flex flex-wrap gap-4">
            {field.options?.map(opt => (
              <label key={opt} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name={field.id}
                  checked={formData[field.id] === opt}
                  onChange={() => handleFieldChange(field.id, opt)}
                  className="accent-indigo-600"
                /> {opt}
              </label>
            ))}
          </div>
        </div>
      );
    }

    if (field.type === 'checkbox') {
      return (
        <div key={field.id} className={colClass}>
          <label className="block text-xs font-bold text-slate-500 mb-2">{field.label}</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {field.options?.map(opt => (
              <label key={opt} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer bg-slate-50 p-2 rounded border border-slate-100 hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={(formData[field.id] || []).includes(opt)}
                  onChange={() => handleCheckboxToggle(field.id, opt)}
                  className="rounded accent-indigo-600"
                /> {opt}
              </label>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  // ================= RENDER DE CAMPO GENÉRICO (VISUALIZAÇÃO) =================
  const renderViewField = (field: FieldDef, data: Record<string, any>) => {
    const value = data?.[field.id];
    const hasValue = Array.isArray(value) ? value.length > 0 : !!value;

    return (
      <div key={field.id}>
        <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{field.label}</span>
        {hasValue ? (
          Array.isArray(value) ? (
            <ul className="list-disc pl-5 text-sm text-slate-800 space-y-0.5">
              {value.map((v: string, i: number) => <li key={i}>{v}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-slate-800 whitespace-pre-wrap">{value}</p>
          )
        ) : (
          <p className="text-sm text-slate-400">Não informado</p>
        )}
      </div>
    );
  };

  return (
    <>
      {/* ================= CONTEÚDO DA PÁGINA ================= */}
      <div className={`space-y-6 ${viewingRecord ? 'print:hidden' : ''}`}>

        {/* CABEÇALHO */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            {view !== 'busca' && (
              <button
                onClick={() => {
                  if (view === 'formulario') {
                    setView('selecao_ficha');
                    setEditingRecordId(null);
                  } else if (view === 'selecao_ficha') setView('historico');
                  else if (view === 'historico') { setView('busca'); setSelectedPatient(null); }
                }}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                {view === 'busca' && 'Atendimentos'}
                {view === 'historico' && 'Histórico Clínico'}
                {view === 'selecao_ficha' && 'Novo Atendimento'}
                {view === 'formulario' && `${editingRecordId ? 'Editando' : 'Preenchendo'}: ${tipoFicha}`}
              </h1>
              <p className="text-slate-500 text-sm">
                {selectedPatient ? `Paciente: ${selectedPatient.name}` : 'Busque um paciente para iniciar.'}
              </p>
            </div>
          </div>
        </div>

        {/* TELA 1: BUSCA */}
        {view === 'busca' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar paciente por nome ou CPF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="p-2">
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-indigo-600" /></div>
              ) : filteredPatients.length === 0 ? (
                <div className="text-center p-8 text-slate-500">Nenhum paciente encontrado.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredPatients.map(patient => (
                    <button
                      key={patient.id}
                      onClick={() => handleSelectPatient(patient)}
                      className="w-full flex items-center justify-between p-4 hover:bg-indigo-50 transition-colors rounded-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-slate-100 group-hover:bg-indigo-100 text-slate-500 group-hover:text-indigo-600 rounded-full transition-colors">
                          <User size={20} />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-slate-800">{patient.name}</p>
                          <p className="text-xs text-slate-500">CPF: {patient.cpf || 'Não informado'}</p>
                        </div>
                      </div>
                      <ChevronLeft size={20} className="text-slate-300 rotate-180 group-hover:text-indigo-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TELA 2: HISTÓRICO */}
        {view === 'historico' && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setEditingRecordId(null);
                  setFormData({});
                  setView('selecao_ficha');
                }}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm"
              >
                <Plus size={18} /> Novo Atendimento
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center p-12"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>
            ) : pastRecords.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
                <Activity className="mx-auto text-slate-300 mb-3" size={48} />
                <h3 className="text-lg font-bold text-slate-700">Nenhum atendimento registrado</h3>
                <p className="text-slate-500 text-sm mb-4">Este paciente ainda não possui histórico clínico.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastRecords.map(record => (
                  <button
                    key={record.id}
                    onClick={() => setViewingRecord(record)}
                    className="w-full text-left bg-white border border-slate-200 hover:border-indigo-400 rounded-xl shadow-sm overflow-hidden transition-all group"
                  >
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex justify-between items-center group-hover:bg-indigo-50 transition-colors">
                      <div className="flex items-center gap-2 text-slate-600 font-semibold text-sm">
                        <Clock size={16} /> {formatDate(record.created_at)}
                      </div>
                      <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        {record.area_fisio || 'Atendimento Geral'}
                        {record.ficha_completa?.numeroSessao && ` (Sessão ${record.ficha_completa.numeroSessao})`}
                        {record.ficha_completa?.sessaoNumero && ` (Sessão ${record.ficha_completa.sessaoNumero})`}
                      </span>
                    </div>

                    <div className="p-5 flex items-center justify-between text-slate-500 group-hover:text-indigo-600 transition-colors">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Eye size={18} /> Visualizar Prontuário Completo
                      </div>
                      <ChevronLeft size={20} className="rotate-180" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TELA 3: SELEÇÃO DE FICHA */}
        {view === 'selecao_ficha' && (
          <div className="space-y-4 animate-in fade-in">
            <h2 className="text-lg font-bold text-slate-700 mb-4">Selecione o modelo de ficha para este atendimento:</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FICHAS.map(schema => {
                const Icon = schema.icon;
                const colors = COLOR_MAP[schema.color] || COLOR_MAP.indigo;
                return (
                  <button
                    key={schema.key}
                    onClick={() => {
                      setTipoFicha(schema.key);
                      setFormData(defaultDataForSchema(schema));
                      const initialOpen: Record<string, boolean> = {};
                      schema.sections.forEach(s => (initialOpen[s.id] = true));
                      setOpenSections(initialOpen);
                      setView('formulario');
                    }}
                    className={`bg-white border border-slate-200 ${colors.border} hover:shadow-md rounded-xl p-6 text-left transition-all group`}
                  >
                    <div className={`p-3 ${colors.bg} ${colors.text} rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1">{schema.label}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{schema.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TELA 4: FORMULÁRIO GENÉRICO */}
        {view === 'formulario' && activeSchema && (
          <form onSubmit={handleSaveRecord} className="space-y-4 animate-in slide-in-from-right-4 pb-12">
            {activeSchema.sections.map(section => (
              <div key={section.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 bg-slate-50 flex justify-between items-center font-bold text-slate-700"
                >
                  {section.title}
                  {openSections[section.id] !== false ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openSections[section.id] !== false && (
                  <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100">
                    {section.fields.map(field => renderField(field))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end gap-3 sticky bottom-4 z-10 p-4 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-lg">
              {!editingRecordId && (
                <button
                  type="button"
                  onClick={() => setView('selecao_ficha')}
                  className="px-6 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Trocar Ficha
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setView('historico');
                  setEditingRecordId(null);
                  setFormData({});
                }}
                className="px-6 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className={`flex items-center gap-2 text-white font-medium px-8 py-2.5 rounded-xl transition-colors shadow-md disabled:opacity-70 ${
                  (COLOR_MAP[activeSchema.color] || COLOR_MAP.indigo).btnBg
                } ${(COLOR_MAP[activeSchema.color] || COLOR_MAP.indigo).btnHover}`}
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle size={20} />}
                {editingRecordId ? 'Salvar Edição' : `Salvar ${tipoFicha}`}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ================= MODAL DE VISUALIZAÇÃO ================= */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in print:static print:bg-white print:p-0">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden relative print:shadow-none print:w-full print:max-w-full print:h-auto print:max-h-none print:overflow-visible">

            {/* Header do Modal */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 print:bg-white print:border-none print:p-0 print:mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {viewingRecord.area_fisio || 'Atendimento Geral'}
                </h2>
                <p className="text-sm text-slate-500">
                  Paciente: <span className="font-semibold text-slate-700">{selectedPatient?.name}</span> | Registrado em {formatDate(viewingRecord.created_at)}
                </p>
              </div>

              <div className="flex items-center gap-2 print:hidden">
                <button onClick={() => window.print()} className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors" title="Imprimir Prontuário">
                  <Printer size={20} />
                </button>
                <button onClick={() => handleEditRecord(viewingRecord)} className="p-2 hover:bg-indigo-100 rounded-lg text-indigo-600 transition-colors" title="Editar Ficha">
                  <Edit size={20} />
                </button>
                <button onClick={() => handleDeleteRecord(viewingRecord.id)} className="p-2 hover:bg-rose-100 rounded-lg text-rose-600 transition-colors" title="Excluir Ficha">
                  <Trash2 size={20} />
                </button>
                <div className="w-px h-6 bg-slate-200 mx-1"></div>
                <button onClick={() => setViewingRecord(null)} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Conteúdo do Modal — RENDER GENÉRICO */}
            <div className="p-6 overflow-y-auto space-y-6 print:overflow-visible print:p-0">
              {(() => {
                const schema = getFicha(viewingRecord.area_fisio);
                if (schema && viewingRecord.ficha_completa) {
                  return schema.sections.map(section => (
                    <div key={section.id}>
                      <h3 className="font-bold text-slate-700 border-b pb-2 mb-3">{section.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.fields.map(field => renderViewField(field, viewingRecord.ficha_completa))}
                      </div>
                    </div>
                  ));
                }
                return (
                  <div className="text-center p-8 text-slate-500 print:hidden">
                    Ficha salva em formato legado ou modelo não reconhecido. Sem dados estruturados disponíveis.
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
