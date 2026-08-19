"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, Printer, FileEdit, RefreshCw, Info, 
  Search, User, ChevronLeft, Plus, CheckCircle, Loader2, Clock, Eye, Trash2, Activity 
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const DOCUMENT_TEMPLATES = {
  // ==========================================
  // DOCUMENTOS ADMINISTRATIVOS
  // ==========================================
  contrato: {
    title: "Contrato de Prestação de Serviços",
    content: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS FISIOTERAPÊUTICOS

CONTRATANTE: [Nome do Paciente], portador do CPF nº [CPF do Paciente].
CONTRATADO: Dr. Leonardo Paula Viana, Fisioterapeuta, CREFITO nº 438289-F.

OBJETO: O presente contrato tem por objeto a prestação de serviços de fisioterapia clínica, conforme plano de tratamento estabelecido na avaliação inicial.

VALOR E PAGAMENTO: O contratante pagará o valor acordado por sessão ou pacote fechado, conforme termos da ficha financeira.

Por estarem justos e contratados, assinam o presente instrumento.

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },
  termo_acupuntura: {
    title: "TCLE - Acupuntura",
    content: `TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO (TCLE) - ACUPUNTURA

Eu, [Nome do Paciente], declaro estar ciente de que o tratamento por Acupuntura envolve a inserção de agulhas estéreis e descartáveis na pele.

Fui informado(a) sobre os benefícios e os riscos mínimos possíveis do procedimento, tais como pequenos hematomas, sangramento local leve, dor temporária ou tontura.

Tive a oportunidade de fazer perguntas e todas foram respondidas satisfatoriamente. Compreendo que posso revogar este consentimento a qualquer momento.

Assinatura do Paciente: ____________________________________

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },
  laudo: {
    title: "Laudo Fisioterapêutico Geral",
    content: `LAUDO FISIOTERAPÊUTICO

Atesto para os devidos fins que o(a) paciente [Nome do Paciente] encontra-se em acompanhamento fisioterapêutico nesta clínica.

Apresenta quadro clínico compatível com [Diagnóstico Clínico / CID], evoluindo com limitação funcional de [Especificar articulação/membro], déficit de força grau [X] e dor à mobilização.

Necessita manter o plano de reabilitação por tempo indeterminado, com frequência de [X] vezes por semana.

São Paulo, ${new Date().toLocaleDateString('pt-BR')}

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  // ==========================================
  // FICHAS DE ANAMNESE E AVALIAÇÃO COMPLETAS
  // ==========================================
  anamnese_traumato: {
    title: "Ficha - Traumato-Ortopedia",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
TRAUMATO-ORTOPEDIA

1. IDENTIFICAÇÃO DO PACIENTE
Nome: [Nome do Paciente] | Idade: _______

2. QUEIXA PRINCIPAL (QP) 
_____________________________________________________________________________________

3. HISTÓRIA DA DOENÇA ATUAL (HDA)
Início dos sintomas: __________________________________________________________________
Mecanismo da lesão: _________________________________________________________________
Tempo de evolução: __________________________________________________________________
Local da dor: _______________________________________________________________________
Irradiação: _________________________________________________________________________

Frequência da dor: ☐ Contínua   ☐ Intermitente
Intensidade da dor (EVA 0–10): ________
Classificação da dor: ☐ Nociceptiva (lesão direta)   ☐ Neuropática (sistema)   ☐ Neuropática (snc)

Tipo da dor:                       Fatores que pioram:
☐ Pontada                          ☐ Movimento
☐ Queimação                        ☐ Repouso
☐ Peso                             ☐ Caminhada
☐ Latejante                        ☐ Esforço
☐ Choque                           ☐ Alongamento
☐ Formigamento                     ☐ Permanecer em pé
☐ Dormência                        ☐ Permanecer sentado
☐ Outro: _________________         ☐ Outro: _________________

Fatores que aliviam:               Sintomas associados:
☐ Repouso                          ☐ Edema
☐ Medicação                        ☐ Formigamento
☐ Gelo                             ☐ Dormência
☐ Calor                            ☐ Fraqueza muscular
☐ Alongamento                      ☐ Instabilidade
☐ Manter estabilizado              ☐ Limitação funcional
☐ Massagem                         ☐ Crepitação
☐ Outro: _________________         ☐ Outro: _________________

4. HISTÓRICO CLÍNICO
Doenças associadas:
☐ HAS                ☐ Diabetes           ☐ Osteoporose        ☐ Artrite
☐ Artrose            ☐ Cardiopatias       ☐ Fibromialgia       ☐ Neoplasia
☐ Obesidade          ☐ Reumatológica      ☐ Outro: _________________

Cirurgias prévias: ___________________________________________________________________
Fraturas/Luxações anteriores: ________________________________________________________
Uso de medicamentos: _______________________________________________________________

Exames complementares:
☐ RX        ☐ RM        ☐ TC        ☐ Ultrassom        ☐ Outro: __________________
Diagnóstico médico: _________________________________________________________________

5. HÁBITOS DE VIDA
☐ Atividade física: Sim  ☐ Não  Qual? ________________________
☐ Tabagismo: Sim  ☐ Não
☐ Etilismo: Sim   ☐ Não
☐ Qualidade do sono: Boa  ☐ Regular  ☐ Ruim
☐ Água: Normal  ☐ Pouca  +/- ______ L
☐ Intestino: Normal  ☐ Solto  ☐ Preso

6. AVALIAÇÃO FUNCIONAL
Postura                                Marcha
☐ Cabeça anteriorizada                 ☐ Normal               ☐ Atáxia
☐ Hiperlordose                         ☐ Claudicante          ☐ Escarvante
☐ Hipercifose                          ☐ Antálgica            ☐ Parkinsoniana
☐ Ombros protusos                      ☐ Ceifante             ☐ Sem auxílio
☐ Assimetria pélvica                   ☐ Espática             ☐ Com auxílio
☐ Geno valgo
☐ Geno varo
☐ Pé plano
☐ Pé cavo

Observações: _______________________________________________________________________

7. INSPEÇÃO
☐ Edema               ☐ Hematoma               ☐ Atrofia muscular
☐ Espasmo muscular    ☐ Cicatriz               ☐ Deformidade
☐ Alteração de temperatura
Local: ___________________________________________________________________________

8. PALPAÇÃO
☐ Dor à palpação      ☐ Hipertonia             ☐ Hipotonia
☐ Crepitação          ☐ Trigger points         ☐ Nódulo

12. AVALIAÇÃO DA DOR
Escala Visual Analógica (EVA) 0 a 10. Valor referido: _______

9. AMPLITUDE DE MOVIMENTO (ADM)
Movimento        Ativa          Passiva        Dor
Flexão           __________     __________     __________
Extensão         __________     __________     __________
Abdução          __________     __________     __________
Adução           __________     __________     __________
Rot. Interna     __________     __________     __________
Rot. Externa     __________     __________     __________
Observações: ____________________________________________

10. FORÇA MUSCULAR (ESCALA MRC)
Grupo Muscular          D (Grau 0-5)     E (Grau 0-5)
___________________     ____________     ____________
___________________     ____________     ____________

11. TESTES ESPECIAIS
☐ Lasègue    ☐ Neer    ☐ Hawkins-Kennedy    ☐ Phalen    ☐ Tinel
☐ Gaveta anterior    ☐ McMurray    ☐ Apley    ☐ Trendelenburg    ☐ Outro: ____________

12. DIAGNÓSTICO FISIOTERAPÊUTICO
_____________________________________________________________________________________

13. OBJETIVOS TERAPÊUTICOS
☐ Analgesia                 ☐ Ganho de ADM             ☐ Fortalecimento muscular
☐ Melhora funcional         ☐ Correção postural        ☐ Treino de marcha
☐ Propriocepção             ☐ Retorno às AVDs          ☐ Retorno esportivo   ☐ Outros: _______

15. CONDUTA FISIOTERAPÊUTICA
☐ Cinesioterapia             ☐ Terapia manual          ☐ Alongamentos
☐ Fortalecimento             ☐ Mobilização articular   ☐ Eletroterapia
☐ Crioterapia                ☐ Termoterapia            ☐ Exercícios funcionais
☐ Treino proprioceptivo      ☐ Outros: _________________

16. EVOLUÇÃO / OBSERVAÇÕES
_____________________________________________________________________________________

17. DADOS DO PROFISSIONAL

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  anamnese_neuro: {
    title: "Ficha - Neurofuncional",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
FISIOTERAPIA NEUROFUNCIONAL

IDENTIFICAÇÃO
Nome: [Nome do Paciente]
Data de Nascimento: ___/___/____   Idade: ____   Sexo: ☐ M ☐ F
Estado Civil: ____________________ Profissão: _____________________________________________
Responsável/Cuidador: ________________________ Telefone: __________________________________
Data da Avaliação: ___/___/____   Diagnóstico Médico: _______________________________________
Encaminhado por: ________________________________________________________________________

QUEIXA PRINCIPAL (QP): ________________________________________________________________--
Tempo de evolução: _________________________ Objetivo do paciente/família: _________________

HISTÓRIA DA DOENÇA ATUAL (HDA):
Causa: Data início: ___/___/____
☐ AVC ☐ TCE ☐ Lesão Medular ☐ Paralisia Cerebral ☐ Esclerose Múltipla ☐ Parkinson ☐ Neuropatia ☐ Tumor ☐ Trombo ☐ Outro: __________
Lado acometido: ☐ Direito ☐ Esquerdo ☐ Bilateral | Internação prévia: ☐ Sim ☐ Não (Tempo: ____)
Cirurgias relacionadas: __________________________________________________________________

ANTECEDENTES PESSOAIS
☐ Hipertensão ☐ Diabetes ☐ Cardiopatias ☐ Epilepsia ☐ Doença Respiratória ☐ Doença Renal ☐ Doença Vascular ☐ Alt. Auditivas/Visuais | Outros: ____________________
Medicamentos em uso: ___________________________________________________________________

AVALIAÇÃO DA DOR: ☐ Presença de dor: Sim/Não | Local: ________________ | EVA (0-10): ____
Características: ☐ Queimação ☐ Pontada ☐ Choque ☐ Peso ☐ Outro: __________________________

AVALIAÇÃO FUNCIONAL
Mobilidade no Leito: ☐ Independente ☐ Supervisão ☐ Auxílio Parcial ☐ Dependente | Obs: ________
Transferências: ☐ Independente ☐ Supervisão ☐ Auxílio Parcial ☐ Dependente (Cama/Cad: __ Sentado/Pé: __)
Marcha: ☐ Independente ☐ Com auxílio ☐ Não deambula | Dispositivo: ☐ Bengala ☐ Muleta ☐ Andador ☐ Órtese ☐ Cadeira de rodas | Descrição: ________________________________

AVALIAÇÃO MOTORA
Tônus: ☐ Normal ☐ Hipertonia ☐ Hipotonia ☐ Flutuação | Ashworth: MMSS D:__ E:__ MMII D:__ E:__
Força (MRC): 
Ombro D:__ E:__ | Cotovelo D:__ E:__ | Punho D:__ E:__ | Mão D:__ E:__
Quadril D:__ E:__ | Joelho D:__ E:__ | Tornozelo D:__ E:__
ADM: ☐ Preservada ☐ Reduzida ☐ Contraturas (Local: ___________)

COORDENAÇÃO: ☐ Preservada ☐ Alterada (☐ Dedo-nariz ☐ Calcanhar-joelho ☐ Alternados rápidos)
EQUILÍBRIO: Sentado: ☐ Bom/Regular/Ruim | Em Pé: ☐ Bom/Regular/Ruim | Berg: __/56 | TUG: ___ seg
SENSIBILIDADE: ☐ Preservada ☐ Alterada (☐ Tátil ☐ Dolorosa ☐ Térmica ☐ Proprioceptiva ☐ Vibratória) | Local: ________________

REFLEXOS: Profundos: ☐ Normais/Diminuídos/Exaltados | Babinski: ☐ Ausente/Presente | Clônus: ☐ Ausente/Presente

COGNIÇÃO/COMUNICAÇÃO:
Nível consciência: ☐ Alerta ☐ Sonolento ☐ Confuso | Orientação: ☐ Tempo ☐ Espaço ☐ Pessoa
Memória: ☐ Preservada ☐ Alterada | Linguagem: ☐ Normal ☐ Disartria ☐ Afasia

AVDs: Alimentação(Ind/Dep)__ | Banho(Ind/Dep)__ | Vestuário(Ind/Dep)__ | Higiene(Ind/Dep)__ | Locomoção(Ind/Dep)__

DIAGNÓSTICO FISIOTERAPÊUTICO: ___________________________________________________________
OBJETIVOS: ☐ Dor ☐ Mobilidade ☐ Equilíbrio ☐ Coordenação ☐ Marcha ☐ Força ☐ Espasticidade ☐ Deformidades ☐ Independência AVDs
CONDUTAS: ☐ Cinesioterapia ☐ Marcha ☐ Equilíbrio ☐ Funcional ☐ Alongamento ☐ Fortalecimento ☐ Bobath ☐ PNF ☐ Sensorial ☐ Eletroest. ☐ Transferências ☐ Orientação

Frequência de atendimento: _______________ | Prognóstico: _________________________________

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA | CREFITO N° 438289-F`
  },

  anamnese_cardio: {
    title: "Ficha - Cardiovascular",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
FISIOTERAPIA CARDIOVASCULAR

1. IDENTIFICAÇÃO
Nome: [Nome do Paciente] | Idade: _______
Data de Nascimento: ___/___/____         Sexo: ☐ M  ☐ F
Estado Civil: ____________________       Telefone: __________________________________
Data da Avaliação: ___/___/____          Encaminhado por: ___________________________
Profissão/Grau de Instrução: ________________________________________________________
Contato de Emergência: ______________________________________________________________

2. QUEIXA PRINCIPAL (QP)
☐ Hipertensão Arterial Sistêmica         ☐ Doença Pulmonar
☐ Angina                                 ☐ Doença Renal
☐ Insuficiência Cardíaca                 ☐ Obesidade
☐ AVC                                    ☐ Outros: ________________________________

3. HISTÓRIA DA DOENÇA ATUAL (HDA)
Diagnóstico Médico: _________________________________________________________________
Início e principais dos sintomas: _______________________________________________________
Internações recentes: ☐ Não ☐ Sim | Motivo: ________________________________________
Cirurgia Cardíaca:    ☐ Não ☐ Sim | Procedimento/Data: _______________________________
Data do Diagnóstico: ___/___/____

4. ANTECEDENTES PESSOAIS
☐ Diabetes Mellitus                      ☐ Arritmias
☐ Dislipidemia                           ☐ Doença Arterial Coronariana
☐ Infarto Agudo do Miocárdio             ☐ AVC
☐ Outros: ___________________________________________________________________________

5. HISTÓRICO FAMILIAR
☐ Hipertensão                            ☐ Morte Súbita
☐ Diabetes                               ☐ Doenças vasculares
☐ Cardiopatias                           ☐ Dislipidemia
☐ AVC                                    ☐ Outros: ________________________________

6. MEDICAÇÕES EM USO
☐ Não ☐ Sim | Qual? ________________________________________________________________

7. DISPOSITIVOS CARDÍACOS / CIRURGIA CARDÍACA
☐ Não possui                             ☐ Stents
☐ Marcapasso                             ☐ P. De Safena
☐ CDI (Cardiodesfibrilador Implantável)  ☐ Outro: _________________________________
☐ Ressincronizador Cardíaco              Data do implante: ___/___/____

8. HÁBITOS DE VIDA
Tabagismo:        ☐ Não ☐ Sim    Quantidade: ________________
Etilismo:         ☐ Não ☐ Sim    Quantidade: ________________
Atividade Física: ☐ Sedentário ☐ Ocasional ☐ Regular ☐ Atleta   Atividade: _______________
Qualidade do sono:☐ Boa ☐ Regular ☐ Ruim       _______ h/noite

9. SINTOMAS ATUAIS
☐ Dispneia                               ☐ Fadiga
☐ Dor Torácica                           ☐ Tosse
☐ Palpitações                            ☐ Edema
☐ Tontura                                ☐ Intolerância ao Esforço
☐ Síncope                                ☐ Outros: ________________________________

10. AVALIAÇÃO DA DOR
Escala (EVA): ___/10  |  Localização: _________________________________________
Características: _____________________________________________________________________

11. AVALIAÇÃO DA DISPNEIA
Escala de Borg (0-10)     Repouso: _______    Pós-esforço: _______
Escala mMRC:              ☐ Grau 0 ☐ Grau 1 ☐ Grau 2 ☐ Grau 3 ☐ Grau 4

12. SINAIS VITAIS E DADOS ANTROPOMÉTRICOS (Em Repouso)
PA: ___x___ mmHg        FC: ___ bpm          FR: ___ irpm          SpO2: ___ %
Temperatura: ___ °C     Peso: ___ Kg         Altura: ___ cm        IMC: ___ %

13. AVALIAÇÃO DO EDEMA
☐ Ausente   ☐ Leve   ☐ Moderado   ☐ Grave      Localização: _______________________

14. EXAMES COMPLEMENTARES
Eletrocardiograma (ECG): _____________________________________________________________
Ecocardiograma / Fração de Ejeção (FEVE): ____________________________________________
Teste Ergométrico / Ergoespirometria: _________________________________________________
Exames Laboratoriais Relevantes: _____________________________________________________
Outros Exames: ______________________________________________________________________

15. ESTRATIFICAÇÃO DE RISCO CARDIOVASCULAR
☐ Baixo Risco     ☐ Moderado Risco     ☐ Alto Risco
Critérios/Observações: ______________________________________________________________

16. AVALIAÇÃO FUNCIONAL
Classe Funcional (NYHA):                 Capacidade para AVDs:
☐ Classe I                               ☐ Independente
☐ Classe II                              ☐ Parc. Dependente
☐ Classe III                             ☐ Dependente
☐ Classe IV

Testes Funcionais:
☐ Teste de caminhada de 6 min (TC6M)     Resultado: ______________________________
☐ Timed Up and Go (TUG)                  Resultado: ______________________________

17. METAS FUNCIONAIS DO PACIENTE
☐ Subir escadas sem limitação            ☐ Retornar ao trabalho
☐ Retornar às atividades esportivas      ☐ Melhorar qualidade de vida
☐ Caminhar sem cansaço                   ☐ Outros: ________________________________
☐ Melhorar condicionamento físico

18. SINAIS DE ALERTA DURANTE O ATENDIMENTO
☐ Dor torácica                           ☐ Arritmias
☐ Dispneia intensa                       ☐ Queda da SpO2
☐ Tontura                                ☐ Hipotensão
☐ Palidez                                ☐ Hipertensão
☐ Sudorese excessiva                     ☐ Outros: ________________________________

19. DIAGNÓSTICO FISIOTERAPÊUTICO
_____________________________________________________________________________________
_____________________________________________________________________________________

20. OBJETIVOS TERAPÊUTICOS
☐ Reabilitação cardiovascular            ☐ Controle dos fatores de risco
☐ Aumento da capacidade funcional        ☐ Educação em saúde
☐ Melhora do condic. cardiorrespiratório ☐ Recondicionamento físico
☐ Redução da dispneia                    ☐ Outros: ________________________________

21. CONDUTA FISIOTERAPÊUTICA
☐ Exercícios Resistidos                  ☐ Treino Propriocepção
☐ Treino de Marcha                       ☐ Condicionamento cardiorrespiratório
☐ Expansão pulmonar                      ☐ Recondicionamento físico
☐ Exercícios diafragmáticos              ☐ Fortalecimento MMSS
☐ Transferências                         ☐ Fortalecimento MMII
☐ Caminhada                              ☐ Educação em saúde
☐ Degraus                                ☐ Outros: ________________________________
☐ Treino Funcional                       ☐ PA, FC, FR e SpO2 monitorados
☐ Alongamentos globais

22. OBSERVAÇÕES GERAIS
_____________________________________________________________________________________
_____________________________________________________________________________________

23. EVOLUÇÃO
_____________________________________________________________________________________
_____________________________________________________________________________________

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  anamnese_aquatica: {
    title: "Ficha - Aquática",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
AQUÁTICA

1. IDENTIFICAÇÃO DO PACIENTE
Nome: [Nome do Paciente] | Idade: _______

2. QUEIXA PRINCIPAL (QP)
_____________________________________________________________________________________

3. HISTÓRIA DA DOENÇA ATUAL
Início dos sintomas: ____________________ Tempo de evolução: ____________________________
Causa:
☐ Traumática              ☐ Neurológica             ☐ Geriatria
☐ Degenerativa            ☐ Reumática               ☐ Pós-operatória
☐ Outra: _________________

Sintomas associados:
☐ Dor (EVA 0-10): _____   Frequência: ☐ Contínua ☐ Intermitente
☐ Fraqueza                ☐ Rigidez                 ☐ Espasmos
☐ Edema                   ☐ Instabilidade           ☐ Limitação funcional

Fatores de melhora: ____________________ Fatores de piora: ______________________________
Tratamentos anteriores: ______________________________________________________________
Cirurgias: ___________________________________________________________________________

4. ANTECEDENTES PESSOAIS
Patologias associadas:
☐ Hipertensão             ☐ Artrite                 ☐ Lesão medula
☐ Diabetes                ☐ Artrose                 ☐ Paralisia cerebral
☐ Cardiopatias            ☐ Fibromialgia            ☐ DPOC/Asma
☐ Osteoporose             ☐ Hérnia de disco         ☐ AVC
☐ Parkinson               ☐ Outras: __________________________________________________

Medicamentos em uso: _________________________________________________________________
Alergias: ☐ Não ☐ Sim (Qual?: ________________)
Histórico familiar relevante: __________________________________________________________

5. TRIAGEM PARA FISIOTERAPIA AQUÁTICA
Adaptação ao meio líquido
Sabe nadar? ☐ Sim ☐ Não | Medo de água? ☐ Sim ☐ Não
Já realizou hidroterapia? ☐ Sim ☐ Não | Necessita acompanhante? ☐ Sim ☐ Não

Contraindicações / Cuidados
☐ Feridas abertas         ☐ Infecções cutâneas       ☐ Febre
☐ Doença infectocontagiosa ☐ Insuf. cardíaca descompensada
☐ Hipertensão não controlada  ☐ Incontinência urinária/fecal
☐ Labirintite/tontura     ☐ Crises convulsivas não controladas
☐ Usa cateter/sonda       ☐ Nenhuma contraindicação

6. HÁBITOS DE VIDA
Atividade física: ☐ Sedentário ☐ Leve ☐ Regular ☐ Moderada ☐ Intensa
Tabagismo: ☐ Não ☐ Sim | Etilismo: ☐ Não ☐ Sim
Qualidade do sono: ☐ Boa ☐ Regular ☐ Ruim (____ horas/dia)

7. AVALIAÇÃO FÍSICA
Sinais Vitais: PA: ___ mmHg | FC: ___ bpm | FR: ___ irpm | SpO2: ___ % | Temp: ___ °C
Postura: ☐ Sem alteração ☐ Escoliose ☐ Hipercifose ☐ Hiperlordose ☐ Anterversão pélvica ☐ Retificação
Marcha: ☐ Independente ☐ Claudicante ☐ Parkinsoniana ☐ Ceifante ☐ Com auxílio ☐ Não deambula
Força Muscular: ☐ Bom ☐ Regular ☐ Ruim (Escala: ____)
Tônus: ☐ Normal ☐ Hipertonia ☐ Hipotonia
Sensibilidade: ☐ Preservada ☐ Alterada | Coordenação: ☐ Preservada ☐ Alterada
Dor: Local: _________________ | EVA (0-10): ____

8. AVALIAÇÃO FUNCIONAL
Limitações nas AVDs: ☐ Independente ☐ Auxílio parcial ☐ Reduzida ☐ Dependente
Capacidade funcional: ☐ Boa ☐ Moderada ☐ Reduzida
Tolerância ao exercício: ☐ Boa ☐ Regular ☐ Ruim

9. TESTES FUNCIONAIS
☐ TUG Resultado: _______ | ☐ Teste de caminhada Resultado: _______
☐ Escala de Berg Resultado: _______ | ☐ Outros: ____________________

10. DIAGNÓSTICO E OBJETIVOS TERAPÊUTICOS
Diagnóstico: ________________________________________________________________________
Objetivos: ☐ Analgesia ☐ Relaxamento muscular ☐ Ganho de ADM ☐ Fortalecimento muscular
☐ Melhora equilíbrio ☐ Treino de marcha ☐ Condicionamento físico ☐ Reeducação postural
☐ Reabilitação funcional ☐ Melhora respiratória ☐ Reabilitação Cardíaca ☐ Outros: ________

11. CONDUTA FISIOTERAPÊUTICA
☐ Alongamentos globais        ☐ Técnicas de relaxamento
☐ Aumento da resistência      ☐ Aumento da flexibilidade
☐ Exercícios ativos           ☐ Mobilizações passivas
☐ Redução de impacto articular ☐ Estímulo Proprioceptivo

12. ACESSÓRIOS E EQUIPAMENTOS
☐ Halteres Aquático ☐ Caneleiras flutuantes ☐ Pranchas ☐ Macarrões ☐ Exercícios isotônicos ☐ Bolas ☐ Prancha curta

13. EVOLUÇÃO / OBSERVAÇÕES
_____________________________________________________________________________________

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  anamnese_uti: {
    title: "Ficha - Terapia Intensiva (UTI)",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
TERAPIA INTENSIVA (UTI)

1. IDENTIFICAÇÃO DO PACIENTE
Nome: [Nome do Paciente] | Idade: _______
Sexo: ☐ Adulto ☐ Infantil ☐ Neonatal
Diagnóstico Médico: _________________________________________________________________
Data de Internação: ___/___/___ | Motivo da Internação: _________________________________

2. HISTÓRIA CLÍNICA
Comorbidades:
☐ HAS ☐ DM ☐ DPOC ☐ PNM ☐ ICC ☐ AVC ☐ Doença Renal ☐ TCE ☐ Traumatismo ☐ Doença Vascular
☐ Cirurgia Qual? _________________________________ ☐ Outras: ___________________________
Cirurgias recentes: ☐ Não ☐ Sim | Qual? _________________________________________________
Alergias: ☐ Não ☐ Sim | Qual? __________________________________________________________
Medicamentos relevantes: ______________________________________________________________

3. AVALIAÇÃO HEMODINÂMICA
Sinais vitais: FC: ___ bpm | PA: ___x___ mmHg | FR: ___ irpm | SpO2: ___ % | Temp: ___ °C | PAM: ___ mmHg
Uso de drogas vasoativas: ☐ Não ☐ Sim
☐ Adrenalina ☐ Noradrenalina ☐ Vasopressina ☐ Nitroprusseto de sódio
☐ Dobutamina ☐ Nitroglicerina ☐ Amiodarona ☐ Dopamina

4. AVALIAÇÃO RESPIRATÓRIA
Padrão Respiratório: ☐ Eupneico ☐ Taquipneico ☐ Bradipneico ☐ Dispneico ☐ Kussmaul ☐ Cheye-Stokes
Ausculta Pulmonar:  ☐ MV Presente ☐ Roncos ☐ Sibilos ☐ Estertores ☐ MV Diminuído
Secreção:           ☐ Ausente ☐ Escassa ☐ Moderada | Aspecto: ☐ Fluída ☐ Escassa ☐ Purulenta ☐ Hemoptoica
Localização Ausculta: _________________________________________________________________

5. SUPORTE VENTILATÓRIO
Oxigenoterapia:
☐ Ar ambiente ☐ Cateter nasal ☐ Cateter tipo óculos ☐ Máscara simples ☐ Máscara de Venturi
☐ Macronebulização ☐ Nebulização ☐ Alto fluxo (Fluxo: ___ L/min)
Broncodilatador: _________________ | Corticoide: _________________

Ventilação Mecânica: ☐ Não ☐ Extubado ☐ Sim (Data entub.: ___/___/___ | Data extub.: ___/___/___)
Modo Ventilatório: ☐ VCV ☐ PCV ☐ PSV ☐ SIMV ☐ CPAP
Parâmetros: Peso Predito: ___ | PS: ___ | FiO2: ___% | PEEP: ___ | VC: ___mL | FR: ___irpm | Vol Min: ___
Pressões: P.Pico: ___ | P. Platô: ___ | Gasometria: Ph: ___ pCO2: ___ pO2: ___ BE: ___ HCO3: ___
Via aérea: ☐ TOT ☐ Traqueostomia ☐ cricotireoidostomia

6. AVALIAÇÃO NEUROLÓGICA
Nível de Consciência: ☐ Alerta ☐ Sonolento ☐ Sedado ☐ Comatoso
Escala de Glasgow: ___/15 | Escala de Rass: ____
Sedativos: ☐ Não ☐ Sim (☐ Midazolam ☐ Fentanila ☐ Roncurônio ☐ Dexmedetomidina ☐ Escetamina ☐ Diazepam)

7. AVALIAÇÃO MUSCULOESQUELÉTICA
Mobilidade no Leito:  ☐ Independente ☐ Assistência parcial ☐ Assistência total
Funcionalidade: Sedestação ☐ Sim ☐ Não | Ortostatismo ☐ Sim ☐ Não | Marcha ☐ Sim ☐ Não
Força Muscular: MSD: __/5 | MSE: __/5 | MID: __/5 | MIE: __/5 | Total MRC: __/60

9. DISPOSITIVOS INVASIVOS
☐ CVC ☐ Acesso periférico ☐ SNE/SNG ☐ SVD ☐ TOT ☐ Dreno torácico ☐ Traqueostomia ☐ Estomia ☐ Outros: ______

10. DIAGNÓSTICO FISIOTERAPÊUTICO
_____________________________________________________________________________________

11. OBJETIVOS TERAPÊUTICOS
☐ Melhorar ventilação pulmonar    ☐ Otimizar trocas gasosas      ☐ Favorecer higiene brônquica
☐ Prevenir complicações respiratórias    ☐ Prevenir perda de força muscular
☐ Promover mobilização precoce    ☐ Melhorar capacidade funcional    ☐ Facilitar desmame

12. CONDUTAS FISIOTERAPÊUTICAS
☐ Aspiração de vias aéreas        ☐ Posicionamento terapêutico     ☐ Higiene brônquica
☐ Mobilização passiva             ☐ Reexpansão pulmonar            ☐ Mobilização ativo-assistida
☐ Exercícios ativos               ☐ Treino de marcha               ☐ Sedestação à beira leito
☐ Treino muscular respiratório    ☐ Ortostatismo                   ☐ Ajustes/Monitorização VM

13. EVOLUÇÃO:
_____________________________________________________________________________________

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  anamnese_tea: {
    title: "Ficha - TEA",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
TRANSTORNO DO ESPECTRO AUTISTA (TEA)

1. IDENTIFICAÇÃO
Nome: [Nome do Paciente] | Idade: ___ Sexo: ___
Data de Nascimento: ___/___/___ | Data da Avaliação: ___/___/___
Nome do Responsável: ______________________________ Parentesco: _____________ Tel: ____________

2. QUEIXA PRINCIPAL
Motivo do encaminhamento: ___________________________________________________________
Principais dificuldades observadas: ____________________________________________________

3. HISTÓRIA CLÍNICA
Diagnóstico de TEA: ☐ Sim ☐ Não | Idade diagnóstico: ___ | Nível suporte: ☐ Nível 1 ☐ Nível 2 ☐ Nível 3
Comorbidades: ☐ TDAH ☐ Def. Intelectual ☐ Dist. Sono ☐ Dispraxia ☐ Epilepsia ☐ Ansiedade ☐ TOD ☐ Síndrome Genética
Uso de Medicamentos: ☐ Não ☐ Sim (Qual? ________________) | Alergias: ☐ Não ☐ Sim (Qual? ________)

4. HISTÓRICO DO DESENVOLVIMENTO NEUROPSICOMOTOR
Marcos: Sustentou cabeça (___), Sentou (___), Engatinhou (___), Andou (___), Correu (___).
Gestação: ☐ Sem intercorrências ☐ Hipertensão ☐ Diabetes Gestacional ☐ Infecções ☐ Prematuridade
Parto: ☐ Normal ☐ Cesárea | IG: ___ semanas | Apgar: ___/___ | Peso: ___ Kg | Altura: ___ cm

5. AVALIAÇÃO SENSORIAL
Auditiva:     ☐ Normal ☐ Hipersensibilidade ☐ Hipossensibilidade
Tátil:        ☐ Normal ☐ Hipersensibilidade ☐ Hipossensibilidade
Visual:       ☐ Normal ☐ Hipersensibilidade ☐ Hipossensibilidade
Vestibular:   ☐ Normal ☐ Alterada
Propriocepção:☐ Normal ☐ Alterada

6. COMUNICAÇÃO, INTERAÇÃO E COMPORTAMENTO
Comunicação:  ☐ Verbal ☐ Não verbal ☐ Comunicação alternativa
Contato Visual:☐ Adequado ☐ Reduzido ☐ Ausente
Interação Social:☐ Adequada ☐ Dificultada ☐ Restrita
Comportamento:
Estereotipias: ☐ Ausentes ☐ Presentes (Quais? ___________________)
Crises:        ☐ Não ☐ Sim | Atenção: ☐ Adequado ☐ Disperso ☐ Hiperfoco

7. AVALIAÇÃO MOTORA E FUNCIONAL
Tônus:        ☐ Normal ☐ Hipotonia ☐ Hipertonia
Coordenação:  ☐ Adequada ☐ Alterada ☐ Inapropriada
Equilíbrio:   ☐ Adequado ☐ Alterado
Planejamento Motor (Praxia): ☐ Adequado ☐ Alterado
Marcha:       ☐ Normal ☐ Alterada

AVDs (Independente/Auxílio):
Alimentação: ☐ ☐ | Vestir-se: ☐ ☐ | Higiene: ☐ ☐ | Banho: ☐ ☐ | Sanitário: ☐ ☐
Mobilidade (Corre, Salta, Escadas, Chuta): (Sim/Não): ______________________________________

8. PARTICIPAÇÃO ESCOLAR E RECURSOS
Frequenta escola? ☐ Não ☐ Sim | Dificuldades motoras? ☐ Não ☐ Sim
Terapias: ☐ Fisioterapia ☐ T.O. ☐ Fonoaudiologia ☐ Psicomotricidade ☐ Psicopedagogia

9. DIAGNÓSTICO, OBJETIVOS E CONDUTAS
Diagnóstico: ________________________________________________________________________
Objetivos: ☐ Melhorar coordenação ☐ Aprimorar equilíbrio ☐ Planejamento motor ☐ Integração sensorial ☐ Aumentar independência funcional ☐ Participação escolar
Condutas:
☐ Treino de equilíbrio              ☐ Circuitos motores
☐ Treino de coordenação motora      ☐ Integração sensorial
☐ Estimulação psicomotora           ☐ Exercícios proprioceptivos
☐ Treino funcional                  ☐ Exercícios lúdicos
☐ Treino de marcha                  ☐ Orientação familiar

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA | CREFITO N° 438289-F

OBS: EDM (Rosa Neto), Teste Equilíbrio Pediátrico, TUG Pediátrico, TGMD-3.`
  },

  anamnese_trabalhador: {
    title: "Ficha - Saúde do Trabalhador",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
SAÚDE DO TRABALHADOR

1. IDENTIFICAÇÃO
Nome: [Nome do Paciente] | Idade: ___ Sexo: ___
Data de Nascimento: ___/___/____   Empresa: _________________________________________
Setor/Função: ___________________ Tempo na Função: ________ Grau de Instrução: ________
Telefone: _______________________ Data da Avaliação: ___/___/____

2. QUEIXA PRINCIPAL (QP)
Motivo da consulta: _________________________________________________________________
Início dos sintomas: ☐ Súbito ☐ Gradual | Data aproximada: ___/___/____
Relaciona os sintomas ao trabalho? ☐ Sim ☐ Não

3. HISTÓRIA DA DOENÇA ATUAL (HDA)
Local da dor/desconforto: ____________________________________________________________
Intensidade da dor (EVA 0-10): ____
Frequência: ☐ Diária ☐ Semanal ☐ Esporádica
Horário de maior intensidade: ☐ Início da jornada ☐ Durante o trabalho ☐ Final da jornada ☐ À noite
Fatores que pioram: _________________________________________________________________
Fatores que aliviam: _________________________________________________________________

4. HISTÓRICO OCUPACIONAL
Função Atual: ______________________________________________________________________
Principais Atividades Realizadas:
☐ Digitação                 ☐ Atendimento ao público
☐ Trabalho administrativo   ☐ Movimentos repetitivos
☐ Levantamento de cargas    ☐ Transporte de cargas
☐ Permanência em pé         ☐ Permanência sentado
☐ Trabalho acima da cabeça  ☐ Uso de ferramentas
☐ Direção veicular          ☐ Outros: ________________________
Jornada Horas/dia: ____ | Turno: ☐ Manhã ☐ Tarde ☐ Noite | Escala: ______________
Pausas Durante o Trabalho: ☐ Sim ☐ Não

5. HISTÓRICO PROFISSIONAL
Já exerceu outras funções? ☐ Sim ☐ Não | Quais? ______________________________________
Tempo total de trabalho: _______
Afastamentos anteriores por motivo de saúde? ☐ Sim ☐ Não | Motivo: _____________________
Tempo de pausa: ________

6. HISTÓRIA CLÍNICA
Doenças Associadas:
☐ Fibromialgia    ☐ Tendinites    ☐ Hipertensão     ☐ Diabetes
☐ Obesidade       ☐ Artrite       ☐ Artrose         ☐ Hérnia de Disco
☐ Outras: __________________________________________________________________________
Cirurgias: __________________________________________________________________________
Uso de Medicamentos? ☐ Não ☐ Sim | Qual? ____________________________________________

7. HÁBITOS DE VIDA
Atividade Física: ☐ Regular ☐ Eventual ☐ Sedentário
Qualidade do Sono: ☐ Boa ☐ Regular ☐ Ruim
Tabagismo: ☐ Não ☐ Sim (Quant: ______)
Consumo de Alcool: ☐ Não ☐ Sim (Quantidade: ______)

8. AVALIAÇÃO ERGONÔMICA
Postura de Trabalho: ☐ Adequada ☐ Inadequada
Mobiliário: ☐ Adequado ☐ Inadequado
Movimentos Repetitivos: ☐ Sim ☐ Não
Organização do Posto de Trabalho: ☐ Adequado ☐ Inadequado
Levantamento de Cargas: ☐ Sim (Peso médio: ____ Kg) ☐ Não

9. AVALIAÇÃO FISIOTERAPÊUTICA
Dor EVA: ____/10
Localização: ☐ Cervical ☐ Ombro ☐ Cotovelo ☐ Punho/Mão ☐ Coluna Torácica ☐ Coluna Lombar ☐ Quadril ☐ Joelho ☐ Tornozelo
Inspeção Postural: ☐ Cabeça anteriorizada ☐ Ombros protrusos ☐ Hipercifose ☐ Hiperlordose ☐ Escoliose ☐ Assimetria

Amplitude de Movimento (ADM): (Segmento/Normal/Reduzida): ______________________________
Força Muscular (Grau): MMSS: ___/5 | MMII: ___/5 | Tronco: ___/5
Flexibilidade: ☐ Adequada ☐ Reduzida
Grupos musculares comprometidos / Observações: ________________________________________

10. TESTES ESPECIAIS
Coluna: ☐ Schober ☐ Lasègue ☐ Slump
Ombro: ☐ Neer ☐ Hawkins-Kennedy ☐ Jobe
Punho/Mão: ☐ Phalen ☐ Tinel ☐ Finkelstein
Funcionais: ☐ Sentar-Levantar ☐ TUG ☐ Teste de Alcance Funcional
Resultados: ________________________________________________________________________

11. IMPACTO FUNCIONAL
Os sintomas interferem em: ☐ Trabalho ☐ Sono ☐ Atividades domésticas ☐ Atividade física ☐ Lazer ☐ Vida social

12. DIAGNÓSTICO FISIOTERAPÊUTICO
_____________________________________________________________________________________

13. OBJETIVOS TERAPÊUTICOS
☐ Reduzir dor ☐ Melhorar mobilidade articular ☐ Aumentar força muscular ☐ Melhorar postura
☐ Melhorar ergonomia ocupacional ☐ Prevenir lesões relacionadas ao trabalho ☐ Melhorar resistência física
☐ Promover retorno seguro ao trabalho ☐ Prevenir recidivas ☐ Outros: ______________

14. CONDUTAS FISIOTERAPÊUTICAS
☐ Cinesioterapia ☐ Alongamentos ☐ Exercícios laborais ☐ Terapia manual ☐ Treino funcional
☐ Orientações domiciliares ☐ Educação em saúde ☐ Fortalecimento muscular ☐ Treinamento postural

15. EVOLUÇÃO FISIOTERAPÊUTICA / OBSERVAÇÕES:
_____________________________________________________________________________________
_____________________________________________________________________________________

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  anamnese_homem: {
    title: "Ficha - Saúde do Homem",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
FISIOTERAPIA NA SAÚDE DO HOMEM

1. IDENTIFICAÇÃO
Nome: [Nome do Paciente] | Idade: ___
Data de nascimento: ___/___/___ | Data da avaliação: ___/___/___
Orientação sexual: ________________ Profissão: ________________ Estado Civil: ________

2. QUEIXA PRINCIPAL (QP):
_____________________________________________________________________________________

3. HISTÓRIA DA DOENÇA ATUAL (HDA)
Início dos sintomas: ___________________ Tempo de evolução: _________________
Localização: __________________________ Intensidade da dor (EVA 0-10): _____
Fatores que pioram: ____________________ Fatores que aliviam: ________________
Tratamentos realizados: __________________________________________________
Uso de medicamentos: ____________________________________________________

4. HISTÓRICO CLÍNICO
Doenças associadas:
☐ Hipertensão    ☐ Diabetes      ☐ Obesidade      ☐ Cardiopatias
☐ Dislipidemia   ☐ Doença resp.  ☐ Câncer próstata ☐ Disfunção erétil
☐ Incontinência  ☐ Artrose       ☐ Neoplasia      ☐ IST
☐ Ansiedade/Depressão            ☐ Outras: ___________________
Cirurgias: ☐ Não ☐ Sim (Qual? ________________) | Internações: ☐ Não ☐ Sim (Qual? ______)
Histórico familiar: _______________________________________________________

5. HÁBITOS DE VIDA
Sono:           ☐ Bom ☐ Regular ☐ Ruim (Horas: ____)
Atividade física:☐ Sedentário ☐ Ativo ☐ Atleta (Qual? ______)
Tabagismo:      ☐ Não ☐ Sim (Há quanto tempo? ______)
Etilismo:       ☐ Não ☐ Social ☐ Frequente
Alimentação:    ☐ Adequado ☐ Irregular | Nível de estresse: ☐ Baixo ☐ Moderado ☐ Alto

6. SAÚDE UROLÓGICA E PÉLVICA
Sintomas urinários: ☐ Normal ☐ Disúria ☐ Anúria ☐ Urgência urinária ☐ Frequência aumentada ☐ Noctúria ☐ Jato fraco ☐ Esforço miccional ☐ Incontinência urinária ☐ Oligúria
Função intestinal: ☐ Normal ☐ Constipação ☐ Esforço evacuatório ☐ Intestino solto
Saúde sexual: ☐ Sem alterações ☐ Disfunção erétil ☐ Dor durante relação ☐ Ejaculação precoce ☐ Diminuição libido
Cirurgia prostática: ☐ Não ☐ Sim (Qual e quando? ____________________________)

7. AVALIAÇÃO FISIOTERAPÊUTICA
Sinais Vitais: PA: ___ mmHg | FC: ___ bpm | FR: ___ irpm | SpO2: ___ %
Antropometria: Peso: ___ Kg | Altura: ___ cm | IMC: ___ | Postura: ☐ Normal ☐ Escoliose ☐ Hipercifose ☐ Hiperlordose ☐ Ombros protusos
Dor EVA: ___/10 | Local: ________________

8. AVALIAÇÃO FUNCIONAL
Força Muscular (Oxford 0-5): MMSS: ____ | MMII: ____ | Core: ____ | Assoalho pélvico: ____
ADM: ☐ Preservado ☐ Alterado | Equilíbrio: ☐ Preservado ☐ Alterado | Marcha: ☐ Normal ☐ Claudicante ☐ Ceifante ☐ Parkinsoniana

9. AVALIAÇÃO DO ASSOALHO PÉLVICO
Consciência perineal: ☐ Preservada ☐ Reduzida
Contração voluntária: ☐ Adequada ☐ Fraca ☐ Ausente
Resistência muscular: ☐ Adequada ☐ Fraca ☐ Ausente
Coordenação muscular: ☐ Adequada ☐ Alterada | Dor à palpação: ☐ Não ☐ Sim (Local: _____)

10. TESTES FISIOTERAPÊUTICOS
Funcionais: () TUG () Caminhada 6 min () Sentar e levantar
Saúde pélvica: () Escala PERFECT () Pad Test () Diário miccional
Dor/Funcionalidade: () SF-36 () Índice Incapacidade () ICIQ-SF () IPSS () IIEF-5

11. DIAGNÓSTICO E OBJETIVOS
Diagnóstico: ___________________________________________________________________
Objetivos: () Reduzir dor () Melhorar funcionalidade () Melhorar força () Melhorar equilíbrio/postura () Reeducação assoalho pélvico () Reduzir perdas urinárias () Melhorar função sexual

12. CONDUTAS FISIOTERAPÊUTICAS
() Cinesioterapia () Exercícios resistidos () Treino funcional () Alongamentos () Treino respiratório () Treino assoalho pélvico () Biofeedback () Eletroestimulação () Terapia manual () Liberação miofascial () Treino postural () Orientações domiciliares () Educação em saúde

13. EVOLUÇÃO
Data: ___/___/___ | Evolução: ________________________________________________________

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  anamnese_mulher: {
    title: "Ficha - Saúde da Mulher",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
FISIOTERAPIA NA SAÚDE DA MULHER

1. IDENTIFICAÇÃO
Nome: [Nome do Paciente] | Idade: ____ anos
Data de Nascimento: ___/___/____   Profissão/Grau de Instrução: ________________________
Estado Civil: ____________________ Telefone: _________________ Data Avaliação: ___/___/____
Encaminhado por: ____________________________________________________________________

2. QUEIXA PRINCIPAL (QP)
Motivo da consulta: _________________________________________________________________
Início dos sintomas: ____________________ Intensidade (EVA 0-10): ____

3. HISTÓRIA DA DOENÇA ATUAL (HDA)
Diagnóstico médico: _________________________________________________________________
Tempo de duração: _____________________ Tratamentos anteriores: _______________________
Uso de medicamentos: __________________ Exames complementares: _______________________

4. ANTECEDENTES PESSOAIS
☐ Hipertensão ☐ Diabetes ☐ Cardiopatia ☐ Doença respiratória ☐ Doença neurológica
☐ Endometriose ☐ SOP (Sínd. Ovários Pol.) ☐ Câncer ginecológico/mamário
Cirurgias prévias: ______________________ Alergias: ____________________________________

5. HISTÓRICO FAMILIAR
☐ Hipertensão ☐ Diabetes ☐ Cardiopatias ☐ Neoplasia ☐ Doenças vascular ☐ Dislipidemia ☐ AVC

6. HISTÓRICO GINECOLÓGICO E OBSTÉTRICO
Menarca: ___ anos | Ciclo: ☐ Regular ☐ Irregular | Fluxo: ☐ Leve ☐ Moderado ☐ Intenso
Dor menstrual: ☐ Sim ☐ Não | Menopausa: ☐ Não ☐ Sim (Idade: ___)
Uso de Contraceptivos: ☐ Não ☐ Sim (Qual? ________________) | Gestações: ___ | Partos: ___ | Abortos: ___
Último preventivo: ___/___/____ | Alterações: _________________________________________
Durante gestação apresentou: ☐ Diabetes gest. ☐ Hipertensão gest. ☐ Dor lombar ☐ Dor pélvica ☐ Incontinência
Pós-parto: ☐ Imediato ☐ Tardio ☐ Sem intercorrências

7. HÁBITOS DE VIDA
Atividade física: ☐ Sim ☐ Não (Qual/Freq: __________) | Tabagismo: ☐ Sim ☐ Não
Etilismo: ☐ Sim ☐ Não | Ingestão hídrica: ____ L/dia | Sono: ☐ Boa ☐ Regular ☐ Ruim

8. FUNÇÃO URINÁRIA
Frequência: ____ vezes/dia | Noctúria: ☐ Sim ☐ Não | Disúria/Ardência: ☐ Sim ☐ Não
Uso de absorvente: ☐ Sim ☐ Não
Perdas urinárias: ☐ Não ☐ Ao tossir/espirrar ☐ Ao correr/exercício ☐ Por urgência ☐ Contínua

9. FUNÇÃO INTESTINAL
Frequência/dia: ____ | Constipação: ☐ Sim ☐ Não | Esforço evacuatório: ☐ Sim ☐ Não
Incontinência fecal: ☐ Sim ☐ Não | Dor: ☐ Sim ☐ Não

10. FUNÇÃO SEXUAL
Vida sexual ativa: ☐ Sim ☐ Não | Dispareunia: ☐ Sim ☐ Não
Dificuldade penetração: ☐ Sim ☐ Não | Redução da libido: ☐ Sim ☐ Não
Alterações relatadas: _________________________________________________________________

11. AVALIAÇÃO FUNCIONAL
Dor (Local/EVA): ______________________ | Postura: ☐ Sem alt. ☐ Alterações
Mobilidade: ☐ Normal ☐ Reduzida | Força: ☐ Preservada ☐ Reduzida
Diástese: ☐ Não ☐ Sim (____ cm) | Cicatrizes/Edema: ___________________________________

12. AVALIAÇÃO DO ASSOALHO PÉLVICO
Inspeção: ☐ Normal | Força Muscular (Oxford): ____/5
Tônus: ☐ Normal ☐ Hipotônico ☐ Hipertônico | Coordenação: ☐ Preservada ☐ Alterada
Endurance: ____ seg | Contrações rápidas: ____ | Prolapsos: ☐ Não ☐ Sim (Grau: ____)

13. OBJETIVOS E DIAGNÓSTICO
Diagnóstico Fisioterapêutico: _________________________________________________________
Objetivos: ☐ Redução dor ☐ Controle incontinência ☐ Fortalecimento assoalho pélvico ☐ Melhora função sexual ☐ Pós-parto ☐ Correção diástase ☐ Melhora postura ☐ Qualidade vida

14. CONDUTA FISIOTERAPÊUTICA
☐ Treinamento assoalho pélvico ☐ Exercícios respiratórios ☐ Treinamento abdominal funcional
☐ Biofeedback ☐ Eletroterapia ☐ Liberação miofascial ☐ Terapia manual ☐ Reeducação miccional

15. RECURSOS UTILIZADOS
☐ Biofeedback Perineal ☐ Exercícios de Kegel ☐ Faixas elásticas ☐ Ultrassom terapêutico
☐ Laser ☐ Estabilização Core ☐ Bola Suíça ☐ Massagem terapêutica

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  anamnese_reumato: {
    title: "Ficha - Reumatologia",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
REUMATOLOGIA

1. IDENTIFICAÇÃO DO PACIENTE
Nome: [Nome do Paciente] | Idade: ___ ☐ ADULTO ☐ CRIANÇA

2. QUEIXA PRINCIPAL (QP)
Início dos sintomas: __________________________________________________________________
Mecanismo da lesão: _________________________________________________________________
Tempo de evolução: __________________________________________________________________
Local da dor: _______________________________________________________________________
Diagnóstico principal: ________________________________________________________________

3. HISTÓRIA DA DOENÇA ATUAL (HDA)
Data do diagnóstico e Médico: _________________________________________________________
Doença em atividade? ☐ Sim ☐ Não
Frequência da dor: ☐ Contínua ☐ Intermitente
Período de maior intensidade: ☐ Manhã ☐ Tarde ☐ Noite | Intensidade da dor (EVA 0-10): ____
Classificação da dor: ☐ Nociceptiva (lesão direta) ☐ Neuropática (sistema) ☐ Neuropática (snc)

Tipo da dor:                       Fatores que pioram:
☐ Pontada                          ☐ Movimento
☐ Queimação                        ☐ Repouso
☐ Peso                             ☐ Caminhada
☐ Latejante                        ☐ Esforço
☐ Choque                           ☐ Alongamento
☐ Formigamento                     ☐ Permanecer em pé
☐ Dormência                        ☐ Permanecer sentado
☐ Outro: ____________              ☐ Outro: ____________

Fatores que aliviam:               Sintomas associados:
☐ Repouso                          ☐ Edema
☐ Medicação                        ☐ Formigamento
☐ Gelo                             ☐ Dormência
☐ Calor                            ☐ Fraqueza muscular
☐ Alongamento                      ☐ Instabilidade
☐ Manter estabilizado              ☐ Limitação funcional
☐ Massagem                         ☐ Crepitação
☐ Outro: ____________              ☐ Outro: ____________

Crises/Reagudizações: Frequência: __________ Fatores desencadeantes: ____________________
Necessidade de internações: ___________________________________________________________

4. ANTECEDENTES PESSOAIS
Doenças Associadas: ☐ HAS ☐ Diabetes ☐ Osteoporose ☐ Obesidade ☐ Cardiopatias ☐ Doenças respiratórias ☐ Outras: ________
Histórico Familiar: ☐ Doenças reumatológicas ☐ Doenças autoimunes ☐ Osteoporose ☐ Artrite
Cirurgias e Internações: _______________________________________________________________

5. MEDICAMENTOS EM USO
☐ AINES ☐ Corticoides ☐ Imunossupressores ☐ Analgésico ☐ Biológicos (Quais? ________)
Outros: _____________________________________________________________________________
Efeitos Colaterais: ________________________________________________________________--

6. HÁBITOS DE VIDA
Atividade física: ☐ Sedentário ☐ Regular ☐ Ocasional | Frequência semanal: ____
Tabagismo: ☐ Não ☐ Sim | Etilismo: ☐ Não ☐ Sim
Sono: ☐ Bom ☐ Regular ☐ Ruim ☐ Péssimo | Horas/dia: ____
Alimentação: ☐ Saudável ☐ Regular ☐ Ruim ☐ Péssimo
Ingesta hídrica: ☐ Bastante ☐ Normal ☐ Pouca | Intestino: ☐ Preso ☐ Normal ☐ Solto
Nível de estresse: ☐ Baixo ☐ Moderado ☐ Alto

7. AVALIAÇÃO FUNCIONAL (AVDs)
Atividade          Indep.    Parc. Dep.    Dependente
Banho              ☐         ☐             ☐
Vestir-se          ☐         ☐             ☐
Alimentação        ☐         ☐             ☐
Higiene pessoal    ☐         ☐             ☐
Locomoção          ☐         ☐             ☐
Atividades Instrumentais (Trabalho, Domésticas, Lazer, Direção, Transporte): _________________

8. EXAME FÍSICO
Inspeção / Postura: ☐ Deformidades articulares | Palpação: ☐ Dor ☐ Temp. Articular ☐ Nódulos ☐ Edema ☐ Pontos dolorosos ☐ Atrofias ☐ Alt. cutâneas

9. AVALIAÇÃO DA MARCHA E EQUILÍBRIO
Marcha: ☐ Normal ☐ Antálgica ☐ Claudicante | Auxílio: ☐ Bengala ☐ Muleta ☐ Andador ☐ Dispositivo
Equilíbrio: ☐ Estático ☐ Dinâmico | Dor (EVA): ___/10 | Funcionalidade (Barthel): ____

10. TESTES E ESCALAS
Qualidade de vida (SF-36): ____ | Equilíbrio (Berg): ____ | Fadiga (Escala): ____

11. DIAGNÓSTICO FISIOTERAPÊUTICO
Alterações: ☐ Dor ☐ Rigidez articular ☐ Alteração postural ☐ Redução de ADM ☐ Fraqueza muscular ☐ Déficit de equilíbrio ☐ Déficit funcional ☐ Alteração da marcha ☐ Fadiga
Descrição: __________________________________________________________________________

12. OBJETIVOS TERAPÊUTICOS
Curto Prazo: ☐ Controle da dor ☐ Redução edema ☐ Melhora mobilidade
Médio Prazo: ☐ Ganho força muscular ☐ Melhora equilíbrio ☐ Diminuição rigidez
Longo Prazo: ☐ Independência funcional ☐ Melhora Marcha ☐ Aumento resistência

13. CONDUTA FISIOTERAPÊUTICA
☐ Mobilização articular ☐ Exercícios de ADM ☐ Alongamentos ☐ Fortalecimento progressivo ☐ Exercícios aeróbicos ☐ Treino funcional/equilíbrio ☐ Hidroterapia ☐ Termoterapia ☐ Eletroterapia ☐ Conservação energia ☐ Orientação domiciliar ☐ Educação proteção articular

14. EVOLUÇÃO / OBSERVAÇÕES
_____________________________________________________________________________________

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  anamnese_respiratoria: {
    title: "Ficha - Respiratória",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
RESPIRATÓRIA

1. IDENTIFICAÇÃO DO PACIENTE
Nome: [Nome do Paciente] | Idade: _______

2. QUEIXA PRINCIPAL (QP)
_____________________________________________________________________________________

3. HISTÓRIA DA DOENÇA ATUAL (HDA)
Início dos sintomas: ____________________ Tempo de evolução: ____________________________
Frequência dos sintomas: ______________________________________________________________
Período de piora: ☐ Manhã ☐ Tarde ☐ Noite ☐ Esforço
Fatores desencadeantes: ☐ Poeira ☐ Frio ☐ Exercício ☐ Fumaça ☐ Outros: ____________
Fatores de melhora: __________________________________________________________________
Internações respiratórias: ☐ Não ☐ Sim (Quantas? ____)
Histórico de intubação: ☐ Não ☐ Sim (Quantas vezes e dias? _________________)
Oxigenoterapia: ☐ Não ☐ Sim (Tipo e Fluxo: ________________________________________)
Exames realizados: ☐ RX ☐ Tomografia ☐ Espirometria ☐ Outros: ______________________

4. ANTECEDENTES PESSOAIS E FAMILIARES
Patologias associadas:
☐ DPOC ☐ Bronquite ☐ Asma ☐ Enfisema ☐ Pneumonia recorrente
☐ Tuberculose ☐ COVID-19 ☐ Apneia do sono ☐ Refluxo gastroesofágico
☐ Hipertensão ☐ Diabetes ☐ Cardiopatias ☐ Obesidade ☐ Ansiedade ☐ Outras: ________
Histórico familiar: ☐ Doenças crônicas ☐ Neoplasias
Cirurgias prévias: ☐ Não ☐ Sim (Qual? ________________)
Alergias: ☐ Não ☐ Sim (Qual? ________________)
Vacinação: ☐ Influenza ☐ COVID-19 ☐ Pneumocócica

5. HÁBITOS DE VIDA
Tabagismo: ☐ Não ☐ Sim | Ex-Tabagista: ☐ Não ☐ Sim (____ maços/dia por ____ anos | Parou há: ____ anos)
Etilismo: ☐ Não ☐ Sim
Atividade física: ☐ Sedentário ☐ Leve ☐ Regular ☐ Moderada ☐ Intensa
Qualidade do sono: ☐ Boa ☐ Regular ☐ Ruim (Horas de sono/noite: ____)
Medicamento em uso: _________________________________________________________________

6. AVALIAÇÃO RESPIRATÓRIA
Sinais Vitais: PA: ___ mmHg | FC: ___ bpm | FR: ___ irpm | SpO2: ___ % | Temp: ___ °C
Estado Geral: ☐ Bom ☐ Regular ☐ Comprometido
Padrão Respiratório: ☐ Eupneico ☐ Taquipneico ☐ Bradipneico ☐ Dispneico
Tipo Respiratório: ☐ Torácico ☐ Abdominal ☐ Misto | Uso de musculatura acessória: ☐ Não ☐ Sim
Tosse: ☐ Ausente ☐ Seca ☐ Produtiva (Aspecto/Cor: ________________________)
Dispnéia: ☐ Ausente ☐ Presente ☐ Aos esforços ☐ Em repouso
Edema: ☐ Não ☐ Sim (Local: ________________) | Deformidades torácicas: ☐ Não ☐ Sim
Ausculta Pulmonar:
Murmúrio vesicular: ☐ Presente ☐ Diminuído ☐ Ausente
Ruídos Adventícios: ☐ Roncos ☐ Sibilos ☐ Estertores grossos ☐ Estertores finos ☐ Crepitações ☐ Estridor
Palpação/Percussão: ☐ Normal ☐ Frêmito alterado ☐ Som claro ☐ Hipersonoridade ☐ Submacicez ☐ Macicez

7. AVALIAÇÃO FUNCIONAL
Escalas: Borg: ____ | MRC Dispneia: ____
Capacidade funcional: () Independente () Dependência parcial () Dependência total
Limitações nas AVDs: _________________________________________________________________
Tolerância ao esforço: () Boa () Regular () Ruim

9. TESTES E MEDIDAS
() Pico de fluxo expiratório (Peak Flow): _______
() Manovacuometria: Plmáx: _______ PEmáx: _______
() Espirometria: _____________________________________________________________________
() Teste de caminhada de 6 minutos: Distância: _______ SpO2 inicial/final: _______

10. DIAGNÓSTICO FISIOTERAPÊUTICO
_____________________________________________________________________________________

11. OBJETIVOS FISIOTERAPÊUTICOS
() Higiene brônquica () Reexpansão pulmonar () Treino muscular respiratório () Melhora ventilatória () Condicionamento físico () Redução da dispneia () Melhora da oxigenação () Educação respiratória () Outros: ________

12. CONDUTA FISIOTERAPÊUTICA
_____________________________________________________________________________________

13. EVOLUÇÃO / OBSERVAÇÕES
_____________________________________________________________________________________

Fisioterapeuta: LEONARDO PAULA VIANA | CREFITO: 438289-F | Assinatura: ________________`
  },

  anamnese_quiro: {
    title: "Ficha - Quiroprática",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
FISIOTERAPIA QUIROPRÁTICA

1. IDENTIFICAÇÃO
Nome: [Nome do Paciente] | Idade: ___ Sexo: ☐ M ☐ F
Data de Nascimento: ___/___/____ | Data da Avaliação: ___/___/____
Profissão: ________________________________ | Telefone: _________________

2. QUEIXA PRINCIPAL (QP)
_____________________________________________________________________________________

3. HISTÓRIA DA DOENÇA ATUAL (HDA)
Mecanismo: ☐ Trauma ☐ Queda ☐ Acidente auto ☐ Esforço repetitivo ☐ Sem causa aparente
Local da dor: ☐ Cervical ☐ Torácica ☐ Lombar ☐ Sacroilíaca ☐ Cóccix ☐ Ombro ☐ Quadril ☐ MMSS ☐ MMII
Características: ☐ Pontada ☐ Queimação ☐ Peso ☐ Choque ☐ Latejante ☐ Rigidez ☐ Parestesia
Intensidade (EVA 0-10): ____ | Frequência: ☐ Constante ☐ Intermitente
Duração: ☐ < 03 meses ☐ > 03 meses | Irradiação: ☐ Não ☐ Sim (Local: _______________)
Fatores agravantes: _______________________ Fatores de melhora: _________________________

4. HISTÓRICO PATOLOGIA PREGRESSA (HPP)
☐ HAS ☐ Diabetes ☐ Osteoporose ☐ Hérnia Disco ☐ Artrose ☐ Escoliose ☐ Fraturas ☐ Neoplasia
Cirurgias: ___________________________________________________________________________
Medicamentos: ________________________________________________________________________

5. SINAIS DE ALERTA (RED FLAGS)
☐ Perda peso ☐ Febre ☐ Histórico câncer ☐ Trauma recente ☐ Anestesia em sela ☐ Alterações urinárias/intestinais ☐ Dor noturna ☐ Perda de força progressiva

6. INSPEÇÃO POSTURAL
Vista Anterior: ☐ Cabeça inclinada ☐ Ombros desnivelados ☐ Joelhos valgos/varos
Vista Lateral: ☐ Anteriorização cabeça ☐ Hipercifose ☐ Hiperlordose ☐ Retificação cerv./lombar
Vista Posterior: ☐ Rotação pélvica ☐ Ombros desnivelados ☐ Escápulas Assimétricas ☐ Cristas desniveladas

7. AVALIAÇÃO COLUNA CERVICAL
Testes: Dekleyn ( ) | Adson ( ) | Éden ( ) | Wright ( ) | Spurling ( ) | Compressão ( )
Motion Palpation: Segmentos Restritos: _________________________________________________
Quick Scanning: ______________________________________________________________________
Estrela de Maigne (F/E/IE/ID/RE/RI): ___________________________________________________

8. AVALIAÇÃO COLUNA TORÁCICA
Testes: Adams ( ) | Adson ( ) | Stibor ( ) | Área Zona Plana: _________________
Motion Palpation: Segmentos Restritos: _________________________________________________
Quick Scanning: ______________________________________________________________________
Estrela de Maigne (F/E/IE/ID/RE/RI): ___________________________________________________

9. AVALIAÇÃO COLUNA LOMBAR
Stibor (Inicial/Final): _______ | Schober (Inicial/Final): _______ | Slump ( ): Lasègue ( ):
Motion Palpation: Segmentos Restritos: _________________________________________________
Quick Scanning: ______________________________________________________________________
Estrela de Maigne (F/E/IE/ID/RE/RI): ___________________________________________________

10. AVALIAÇÃO SACROILÍACA E PÉLVICA
Leg Check (Simétrica/Curta D/Curta E): _________________________________________________
Downing Test: _______________________ | Fanning Test: _______________________
Cristas Ilíacas: ☐ Niveladas ☐ Desniveladas | EIPS: ☐ Simétricas ☐ Assimétricas
Motion Palpation Ilíaca: ______________________________________________________________

11. AVALIAÇÃO PÚBIS E CÓCCIX
Púbis: ☐ Palpação (Sem dor/Dor) | Mobilidade: ☐ Normal ☐ Restrita ☐ Dolorosa
Cóccix: ☐ Palpação (Sem dor/Dor) | Mobilidade: ☐ Normal ☐ Restrita ☐ Dolorosa

12. DISFUNÇÕES ENCONTRADAS
Cervical: (C0-C7): ___________________________________________________________________
Torácica: (T1-T12): __________________________________________________________________
Lombar: (L1-S1): _____________________________________________________________________

13. RELAÇÕES BIOMECÂNICAS
Restrições: ☐ Pelve/Sacro ☐ Cervical ☐ Torácica ☐ Lombar ☐ Disfunção SI
Cadeias: ☐ Muscular Ant. ☐ Muscular Post. ☐ Alteração Fascial
Observações: ________________________________________________________________________

14. DIAGNÓSTICO E CONDUTA
Objetivos: ☐ Redução dor ☐ Correção biomecânica ☐ Melhora mobilidade ☐ Estabilização
Condutas:
☐ Ajuste Cervical ☐ Ajuste Torácico ☐ Ajuste Lombar ☐ Ajuste Sacral ☐ Ajuste Ilíaco ☐ Ajuste Cóccix
☐ Liberação Miofascial ☐ Mobilização Articular ☐ Tração ☐ Exercícios Corretivos

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  anamnese_onco: {
    title: "Ficha - Oncológica",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
FISIOTERAPIA ONCOLÓGICA

1. IDENTIFICAÇÃO
Nome: [Nome do Paciente] | Idade: ____ anos Sexo: ☐M ☐F
Data de Nascimento: ___/___/____ | Data da Avaliação: ___/___/____
Telefone: _________________ Estado Civil: ________________ Profissão: _________________
Contato de Emergência: ______________________________________________________________

2. QUEIXA PRINCIPAL (QP)
Motivo da consulta: _________________________________________________________________
Tempo de início dos sintomas: ________________________________________________________

3. HISTÓRIA DA DOENÇA ATUAL (HDA)
Diagnóstico oncológico: ___________________________ Localização do tumor: ______________
Data diagnóstico: ___/___/____ | Estadiamento: _________________
Metástases: ☐ Não ☐ Sim (Localização: _____________________)
Principais sintomas atuais: ☐ Dor ☐ Fadiga ☐ Fraqueza ☐ Edema/Linfedema ☐ Dispneia ☐ Limitação movimento ☐ Alteração postural ☐ Equilíbrio ☐ Náuseas ☐ Outros: ______

4. HISTÓRICO ONCOLÓGICO
Cirurgia: ☐ Não ☐ Sim (Procedimento: ________________ Data: ___/___/____)
Quimioterapia: ☐ Não ☐ Sim (Protocolo: ____________ Início: ___/___ Término: ___/___)
Radioterapia: ☐ Não ☐ Sim (Região: ______________ Sessões: _____)
Imunoterapia: ☐ Não ☐ Sim | Hormonioterapia: ☐ Não ☐ Sim
Cirurgias anteriores: ________________________________________________________________
Medicamentos em uso: __________________________ Alergias: ___________________________

5. ANTECEDENTES PESSOAIS E FAMILIARES
Antecedentes: ☐ Hipertensão ☐ Diabetes ☐ Cardiopatias ☐ Pneumopatias ☐ Osteoporose ☐ Doenças neurológicas ☐ Linfedema prévio ☐ Outros: ________________
Histórico Familiar: ☐ Câncer ☐ Hipertensão ☐ Diabetes ☐ Cardiopatias ☐ Outros: __________

6. HÁBITOS DE VIDA
Atividade física: ☐ Sedentário ☐ Levemente ativo ☐ Moderadamente ativo ☐ Muito ativo
Sono: ☐ Boa ☐ Ruim | Ingestão hídrica: ____ L/dia | Intestino: ☐ Normal ☐ Solto ☐ Prisão
Tabagismo: ☐ Não ☐ Sim (Qtde: ____) | Etilismo: ☐ Não ☐ Sim (Qtde: ____)

7. AVALIAÇÃO DA DOR
Presença de dor: ☐ Não ☐ Sim (Local: ________________ | EVA: ___/10)
Características: ☐ Queimação ☐ Pontada ☐ Peso ☐ Choque ☐ Latejante ☐ Outra: __________

8. AVALIAÇÃO FUNCIONAL E EXAME FÍSICO
Mobilidade: ☐ Independente ☐ Necessita auxílio ☐ Dependente ☐ Acamado
Marcha: ☐ Normal ☐ Alterada ☐ Uso de dispositivo auxiliar
AVDs: ☐ Independente ☐ Parcialmente dependente ☐ Dependente
Sinais Vitais: PA: ___/___ mmHg | FC: ___ bpm | FR: ___ irpm | SpO2: ___ % | Temp: ___ ºC
Inspeção: ☐ Alt. posturais ☐ Linfedema ☐ Fibrose ☐ Alt. cutâneas ☐ Cicatrizes ☐ Edema

9. AVALIAÇÃO FÍSICA ESPECÍFICA
ADM (MSD/MSE): ____/____ | ADM (MID/MIE): ____/____
Força Muscular (Escala 0-5): ____
Sensibilidade: ☐ Preservada ☐ Alterada (☐ Hipoestesia ☐ Parestesia ☐ Neuropatia)
Equilíbrio: ☐ Preservado ☐ Alterado ☐ Risco quedas
Respiratório: ☐ Diafragmático ☐ Torácico ☐ Misto | Dispneia (Borg): ____

10. AVALIAÇÃO DE LINFEDEMA
Perimetria (D/E): ____________________ | Sinais: ☐ Godet ☐ Fibrose ☐ Peso ☐ Limitação

11. ESCALAS FUNCIONAIS
☐ Karnofsky: ____% | ECOG: ____ | Fadiga: ____ | Barthel: ____ | TUG: ____ seg.

12. DIAGNÓSTICO E OBJETIVOS FISIOTERAPÊUTICOS
Diagnóstico: ________________________________________________________________________
Objetivos: ☐ Controle dor ☐ Redução fadiga ☐ Prevenção complicação ☐ Ganho força ☐ Melhora funcional ☐ Linfedema ☐ Reabilitação respiratória ☐ Qualidade vida

13. PLANO DE TRATAMENTO E CONDUTAS
☐ Cinesioterapia ☐ Exercícios aeróbicos ☐ Fortalecimento ☐ Alongamentos ☐ Treino funcional/marcha ☐ Terapia descongestiva ☐ Drenagem linfática ☐ Bandagem compressiva ☐ Respiração ☐ Reeducação postural ☐ TENS/FES ☐ Orientações domiciliares

14. CONDUTAS ESPECÍFICAS
☐ Alongamento muscular ☐ Drenagem linfática manual ☐ Mobilização articular ☐ Treino marcha ☐ Exercícios diafragma/expansão ☐ Relaxamento ☐ Reeducação respiratória ☐ Terapia manual ☐ Propriocepção ☐ Liberação miofascial ☐ Exercícios resistidos ☐ Prevenção linfedema ☐ Massagem cicatricial ☐ Orientações diárias

15. OBSERVAÇÕES:
_____________________________________________________________________________________

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  anamnese_geronto: {
    title: "Ficha - Gerontologia",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO DE FISIOTERAPIA
FISIOTERAPIA EM GERONTOLOGIA

1. IDENTIFICAÇÃO DO PACIENTE
Nome: [Nome do Paciente] | Idade: ____ anos
Data de nascimento: ___/___/____ | Data da avaliação: ___/___/____

2. QUEIXA PRINCIPAL (QP):
_____________________________________________________________________________________

3. HISTÓRIA DA DOENÇA ATUAL (HDA)
Início dos sintomas: __________________________________________________________________
Escala de Dor (EVA 0-10): ____ | Limitações funcionais: __________________________________
Histórico de quedas: __________________________________________________________________

4. ANTECEDENTES PESSOAIS
Patologias associadas:
☐ HAS ☐ Cardiopatias ☐ Dislipidemia ☐ Diabetes ☐ Osteoporose ☐ Artrose ☐ Fraturas (Qual: ______)
☐ Parkinson ☐ AVC (Lado: ______) ☐ Alzheimer/Demência ☐ Pneumopatias ☐ Incontinência urinária
☐ Infecções ☐ Neoplasia (Qual: ______) ☐ Outras: _______________________________________
Medicamentos em uso: _________________________________________________________________
Hábitos de vida: Atividade física: ☐ Sim ☐ Não | Sono: ☐ Bom ☐ Regular ☐ Ruim
Etilismo: ☐ Não ☐ Sim | Tabagismo: ☐ Não ☐ Sim (Quanto: ______)

5. AVALIAÇÃO FUNCIONAL
Marcha: ☐ Independente ☐ Com auxílio ☐ Não deambula
Dispositivo auxiliar: ☐ Nenhum ☐ Bengala ☐ Andador ☐ Muleta ☐ Cadeira de rodas
AVDs (Banho/Vestir-se/Alimentação/Higiene/Locomoção):
Atividade: (Banho: ☐Ind/☐Parc/☐Dep) | (Vestir: ☐Ind/☐Parc/☐Dep) | (Alimentação: ☐Ind/☐Parc/☐Dep) | (Higiene: ☐Ind/☐Parc/☐Dep) | (Locomoção: ☐Ind/☐Parc/☐Dep)

6. AVALIAÇÃO FÍSICA
Sinais Vitais: PA: ___/___ mmHg | FC: ___ bpm | FR: ___ irpm | SpO2: ___ %
Postura: ☐ Preservado ☐ Alterado | ADM: ☐ Preservado ☐ Alterado
Força Muscular: ☐ Preservado ☐ Alterado | Equilíbrio: ☐ Preservado ☐ Alterado | Coordenação: ☐ Preservado ☐ Alterado

7. TESTES FUNCIONAIS
TUG (Tempo): _______ segundos | Berg: ____/56
Sentar/Levantar (30s): ____ repetições | Marcha (Velocidade): ____ metros em ____ segundos
EVA: ____/10 | Katz (Pontuação): ____ | MEEM (Cognitivo): ____/30 | Obs: ______________________

8. AVALIAÇÃO COGNITIVA E EMOCIONAL
Memória: ☐ Preservada ☐ Alterada | Orientação (Temp/Espaço): ☐ Preservada ☐ Alterada
Humor: ☐ Adequado/Alegre ☐ Deprimido/Ansioso ☐ Agitado/Agressivo
Estado geral: ☐ Lúcido/Orientado ☐ Obnubilado/Torporoso ☐ Senil

9. DIAGNÓSTICO FISIOTERAPÊUTICO
☐ Déficit de equilíbrio com risco de quedas ☐ Redução da mobilidade funcional
☐ Diminuição força muscular (MMII) ☐ Alteração da marcha ☐ Limitação AVDs
☐ Fadiga aos esforços ☐ Déficit neurodegenerativo ☐ Alteração postural ☐ Outros: ________

10. OBJETIVOS TERAPÊUTICOS
☐ Redução da dor ☐ Ganho de força ☐ Melhora do equilíbrio ☐ Prevenção de quedas ☐ Independência funcional ☐ Melhora da mobilidade ☐ Treino de marcha ☐ Condicionamento físico ☐ Autonomia/Qualidade vida ☐ Melhora capacidade respiratória ☐ Outros: ________________

11. CONDUTAS FISIOTERAPÊUTICAS
☐ Treino de marcha em solo ☐ Treino funcional (sentar/levantar) ☐ Relaxamento muscular
☐ Exercícios respiratórios ☐ Técnicas analgésicas ☐ Exercícios mobilidade articular
☐ Condicionamento cardiorrespiratório ☐ Estimulação equilíbrio ☐ Treino de degraus
☐ Educação em saúde/autocuidado ☐ Reeducação postural ☐ Treino de dupla tarefa

12. OBSERVAÇÕES
_____________________________________________________________________________________

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO N° 438289-F`
  },

  anamnese_psicomoto: {
    title: "Ficha - Psicomotricidade",
    content: `ESPAÇO SENSORIAL ADRIANA LISBOA - ESAL
ANAMNESE EM PSICOMOTRICIDADE CLÍNICA
PROFISSIONAL: FISIOTERAPEUTA LEONARDO VIANA

1. DADOS PESSOAIS E RESPONSÁVEIS
Criança: [Nome do Paciente] | Data Nasc: ___/___/___ Idade: ___
Endereço: _________________________________________________________________
Genitora: ___________________________ Profissão/Escolaridade: _______________
Genitor: ____________________________ Profissão/Escolaridade: _______________

2. HISTÓRIA GESTACIONAL E PARTO
Gestação: ☐ Planejada ☐ Risco ☐ Diabetes ☐ Hypertension ☐ Infecções ☐ Uso Medicação ☐ Tabagismo ☐ Etilismo
Parto: ☐ Normal ☐ Cesárea ☐ Fórceps | Tempo gest.: ___ sem. | Peso/Alt: ___kg/___cm | APGAR: ___
UTI Neonatal: ☐ Não ☐ Sim | Intercorrências: __________________________________________

3. DOENÇAS, TRATAMENTOS E ACOMPANHAMENTO
Laudo: ____________________________________________________________________
Suspeita diagnóstica: _______________________________________________________
Doenças/Alergias: __________________________________________________________
Medicações: _______________________________________________________________
Convulsões: ☐ Não ☐ Sim (Motivo/Frequência: ________________________________)
Distúrbio sono: ________________ | Cirurgias: ________________________________
Terapeutas: ☐ Fisioterapeuta ☐ T.O. ☐ Psicólogo ☐ Psicopedagogo ☐ Fono ☐ Musicoterapeuta

4. COMUNICAÇÃO, SOCIALIZAÇÃO E LUDICIDADE
Atende ao nome? ☐ Sim ☐ Não | Pede ajuda? ☐ Sim ☐ Parcial ☐ Não
Comunicação: ☐ Verbal fluente ☐ Verbal objetivo ☐ Não verbal (aponta) ☐ Não verbal (leva pessoa)
Fenômenos Eco: ☐ Ecolalia ☐ Ecopraxia ☐ Ecomimia
Brincadeiras: ☐ Brinca com pares ☐ Brinca dando função ☐ Divide brinquedos ☐ Interesse em pares
Brinquedos favoritos: _______________________________________________________

5. MEMÓRIA, ATENÇÃO, PERCEPÇÃO E AUTONOMIA
Memória: ☐ Boa ☐ Normal ☐ Ruim | Velocidade aprendizado: ☐ Bom ☐ Normal ☐ Ruim
Atenção: ☐ Boa ☐ Normal ☐ Se dispersa rápido
Diferencia: ☐ Cores ☐ Formas ☐ Letras ☐ Números ☐ Texturas ☐ Notas musicais
Autonomia: (Banho/Vestir/Comer/Sanitário - Indep/Dep/Aux): _______________________

6. PERSONALIDADE E SISTEMA SENSORIAL
Adaptabilidade: ☐ Rigidez cognitiva ☐ Flexibilidade cognitiva
Reação contrariado: ☐ Aceita ☐ Confronta e acata ☐ Revolta
Agressividade: ☐ Se morde ☐ Morde outro ☐ Se bate ☐ Bate outro ☐ Joga objetos
Sensibilidade: ☐ Sons ☐ Toque ☐ Luz ☐ Busca movimento ☐ Seletividade alimentar ☐ Paladar

7. PERFIL PSICOMOTOR E OBJETIVOS
Perfil: ☐ Eupráxico ☐ Agitação motora ☐ Lentificação ☐ Inibição
Tônus: ☐ Bom ☐ Normal ☐ Ruim (Hipotonus)
Flexibilidade/Equilíbrio: ☐ Hipermobilidade ☐ Normal ☐ Hipomobilidade ☐ Ruim
Esquema corporal: ☐ Completo ☐ Incompleto
Objetivos: ☐ Coordenação global/fina ☐ Equilíbrio ☐ Lateralidade ☐ Atenção/Concentração ☐ Planejamento motor ☐ Organização corporal ☐ Independência funcional

_____________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA | CREFITO-2 438289-F`
  },
  anamnese_pilates: {
    title: "Ficha - Pilates",
    content: `FICHA DE ANAMNESE E AVALIAÇÃO FISIOTERAPÊUTICA
PILATES

1. IDENTIFICAÇÃO DO ALUNO
Nome: [Nome do Paciente] | Idade: _________
Data de nascimento: _____ / ____ /_______ Telefone / WhatsApp: __________________________ 
Profissão: ________________________

2. OBJETIVO PRINCIPAL E HISTÓRICO
Objetivo principal com o Pilates: ______________________________________________________
Frequência desejada: __________________________ Experiência prévia: ___________________
Atividade física atual: __________________________ Nível percebido: _____________________
O que espera melhorar? _____________________________________________________________
__________________________________________________________________________________

3. HISTÓRIA DA CONDIÇÃO ATUAL
Início dos sintomas / queixa: _________________________________________________________
Mecanismo / origem da queixa: _______________________________________________________
Tempo de evolução: ________________________________________________________________
Localização dos sintomas: ___________________________________________________________
Irradiação / sintomas associados: _____________________________________________________

Frequência: ☐ Contínua ☐ Intermitente | Intensidade EVA (0–10): _______
Tipo da dor: 
☐ Pontada ☐ Queimação ☐ Peso ☐ Latejante ☐ Formigamento 
☐ Dormência ☐ Choque ☐ Outro: _________________________________________________

Fatores que pioram: 
☐ Movimento ☐ Caminhada ☐ Esforço ☐ Alongamento ☐ Em pé 
☐ Sentado ☐ Outro: ______________________________________________________________

Fatores que aliviam: 
☐ Repouso ☐ Medicação ☐ Gelo ☐ Calor ☐ Alongamento 
☐ Massagem ☐ Outro: _____________________________________________________________

Sintomas associados: 
☐ Edema ☐ Formigamento ☐ Dormência ☐ Fraqueza ☐ Instabilidade 
☐ Limitação funcional ☐ Outro: ______________________________________________________

4. TRIAGEM DE SAÚDE E SEGURANÇA
Queixas apresentadas: ☐ Dor no peito ☐ Desconforto aos esforços ☐ Falta de ar ☐ Tontura
☐ Desmaio ☐ Hipertensão 

Doenças/Comorbidades: 
☐ Diabetes ☐ Doença respiratória ☐ Cirurgia recente ☐ Fratura / trauma
☐ Osteoporose ☐ Doença neurológica ☐ Doença reumatológica ☐ Gestação / pós-parto 
☐ Alteração importante de equilíbrio ☐ Outra condição relevante: _____________________________

Medicamentos relevantes: ___________________________________________________________
Alergias / restrições: ________________________________________________________________ 

5. HÁBITOS DE VIDA
Atividade física: ☐ Sim ☐ Não Qual? ________________________________________________
Tabagismo: ☐ Sim ☐ Não | Etilismo: ☐ Sim ☐ Não | Água: ☐ Normal ☐ Pouca +/- ____ L
Qualidade do sono: ☐ Boa ☐ Regular ☐ Ruim | Intestino: ☐ Normal ☐ Solto ☐ Preso

6. AVALIAÇÃO POSTURAL E FUNCIONAL
Postura: 
☐ Cabeça anteriorizada ☐ Hipercifose ☐ Hiperlordose ☐ Ombros protraídos 
☐ Assimetria pélvica ☐ Escoliose ☐ Geno valgo ☐ Geno varo ☐ Pé plano ☐ Pé cavo
Obs: ______________________________________________________________________________

Movimento/função: 
☐ Agachamento ☐ Sentar/levantar ☐ Apoio unipodal ☐ Controle de tronco
☐ Controle pélvico ☐ Controle escapular ☐ Coordenação ☐ Compensações ☐ Limita. Funcional
Obs: ______________________________________________________________________________

Marcha: 
☐ Normal ☐ Antálgica ☐ Atáxica ☐ Claudicante ☐ Escarvante ☐ Sem auxílio ☐ Com auxílio
Observações: ______________________________________________________________________

7. INSPEÇÃO
☐ Edema _______________ ☐ Hematoma _______________ ☐ Atrofia muscular _____________ 
☐ Espasmo muscular _____________ ☐ Cicatriz ______________ ☐ Deformidade ____________ 
☐ Alteração de temperatura ____________________ ☐ Assimetria corporal _____________________
☐ Alteração de alinhamento ____________________ ☐ Alteração de movimento ________________
Obs: ______________________________________________________________________________

8. PALPAÇÃO
☐ Dor à palpação ______________ ☐ Hipertonia ______________ ☐ Hipotonia ______________ 
☐ Crepitação ________________ ☐ Trigger points _____________ ☐ Nódulo ________________
☐ Sensibilidade alterada ____________________ ☐ Outro: ________________________________
Local / observações: _________________________________________________________________

9. AVALIAÇÃO DA DOR
Escala Visual Analógica (EVA) 0 a 10. Valor referido: ________
Local principal: _____________________________________________________________________ 
Pior momento: _____________________________________________________________________ 
Melhor momento: ___________________________________________________________________ 

10. MOBILIDADE, AMPLITUDE E FLEXIBILIDADE
Movimento / segmento    Direito     Esquerdo    Dor / limitação
Cervical                _________   _________   _______________________________
Ombros                  _________   _________   _______________________________
Coluna torácica         _________   _________   _______________________________
Coluna lombar           _________   _________   _______________________________
Quadril                 _________   _________   _______________________________
Joelhos                 _________   _________   _______________________________
Tornozelos              _________   _________   ______________________________
Cadeia posterior        _________   _________   _______________________________
Observações: _______________________________________________________________________

11. FORÇA, CONTROLE MOTOR E ESTABILIDADE
MMSS — D: ______ E: ______ Observações: ____________________________________________
MMII — D: ______ E: ______ Observações: ___________________________________________
Controle de tronco: _________________________ Estabilidade pélvica: _______________________
Estabilidade escapular: ______________________ Ativação de core: _________________________
Controle de joelho: _________________________ Controle de quadril: ________________________
Coordenação: _____________________________ Resistência muscular: ______________________
Testes realizados / resultados: __________________________________________________________

12. EQUILÍBRIO, COORDENAÇÃO E FUNCIONALIDADE
Equilíbrio estático: ☐ Normal ☐ Alterado | Equilíbrio dinâmico: ☐ Normal ☐ Alterado
Marcha: ☐ Normal ☐ Alterada | Apoio unipodal: ☐ Normal ☐ Alterado
Agachamento: ☐ Adequado ☐ Compensações | Sentar/levantar: ☐ Adequado ☐ Compensações
Outro teste funcional: _______________________________________________________________
Resultados / compensações / limitações: _______________________________________________

13. RESPIRAÇÃO
☐ Respiração torácica ☐ Respiração abdominal ☐ Padrão alterado ☐ Dificuldade respiração
☐ Eupneico ☐ Taquipneico ☐ Dispneico

14. CONSCIÊNCIA CORPORAL
☐ Boa percepção corporal ☐ Treino de consciência corporal ☐ Boa dissociação 
☐ Treino de dissociação
Observações: ______________________________________________________________________ 

15. AVALIAÇÃO FUNCIONAL E PERCEPÇÃO
Condicionamento percebido (0–10): ________ Limitação funcional (0–10): ________
Confiança para movimentos (0–10): ________ Dor aceitável no exercício (0–10): ________
Atividades que deseja melhorar ou voltar a realizar: _________________________________________

16. OBJETIVOS TERAPÊUTICOS / DO PILATES
☐ Redução da dor ☐ Ganho de mobilidade ☐ Fortalecimento ☐ Melhora funcional
☐ Consciência/correção postural ☐ Equilíbrio ☐ Propriocepção ☐ Respiração
☐ Condicionamento ☐ Retorno às AVDs ☐ Retorno esportivo 
☐ Outros: __________________________________________________________________________

17. PLANEJAMENTO E CONDUTA
Classificação: ☐ Apto conforme avaliação ☐ Apto com adaptações ☐ Apto com restrições 
☐ Avaliação complementar ☐ Encaminhamento ☐ Liberação
Modalidade: ☐ Individual ☐ Pequeno grupo | Nível: ☐ Básico ☐ Intermediário ☐ Avançado
Frequência: __________ Duração: __________ 
Restrições / cuidados específicos: ____________________________________________________
 
18. OBJETIVOS E CONDUTAS
OBJETIVO                REGIÃO TRABALHADA        APARELHO
☐ Mobilidade            ☐ Cintura escapular      ☐ Reformer
☐ Estabilidade          ☐ Tronco / Coluna        ☐ Chair
☐ Alongamento           ☐ Quadril                ☐ Barrel
☐ Fortalecimento        ☐ MMSS                   ☐ Cadillac
☐ Melhora postural      ☐ MMII                   ☐ Solo

Objetivo geral: _____________________________________________________________________
Condutas / exercícios prioritários / progressões: ________________________________________

19. OBSERVAÇÕES 
__________________________________________________________________________________
__________________________________________________________________________________

__________________________________________________
LEONARDO PAULA VIANA
FISIOTERAPEUTA
CREFITO Nº 438289-F`
  }
};

type DocType = keyof typeof DOCUMENT_TEMPLATES;

export default function AvaliacaoPage() {
  const [view, setView] = useState<'busca' | 'historico' | 'selecao_modelo' | 'editor'>('busca');
  const [patients, setPatients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [pastRecords, setPastRecords] = useState<any[]>([]);
  
  const [selectedDoc, setSelectedDoc] = useState<DocType>('anamnese_traumato');
  const [docContent, setDocContent] = useState('');

  // Carrega pacientes
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
    loadPatientRecords(patient.id);
  };

  const loadPatientRecords = async (patientId: string) => {
    setLoading(true);
    const { data } = await supabase
      .from('records')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (data) setPastRecords(data);
    setLoading(false);
  };

  const handleSelectTemplate = (type: DocType) => {
    setSelectedDoc(type);
    let templateText = DOCUMENT_TEMPLATES[type].content;
    if (selectedPatient) {
      templateText = templateText.replace('[Nome do Paciente]', selectedPatient.name);
    }
    setDocContent(templateText);
    setView('editor');
  };

  const handleSaveToDatabase = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !selectedPatient) {
      alert('Erro de autenticação ou paciente não selecionado.');
      setSaving(false);
      return;
    }

    const { error } = await supabase.from('records').insert([{
      user_id: user.id,
      patient_id: selectedPatient.id,
      area_fisio: DOCUMENT_TEMPLATES[selectedDoc].title,
      ficha_completa: { texto_livre: docContent }
    }]);

    setSaving(false);

    if (error) {
      alert('Erro ao salvar avaliação: ' + error.message);
    } else {
      alert('Avaliação salva com sucesso!');
      loadPatientRecords(selectedPatient.id);
      setView('historico');
    }
  };

  // Função para excluir uma avaliação salva
  const handleDeleteRecord = async (recordId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliação permanentemente?')) return;

    const { error } = await supabase.from('records').delete().eq('id', recordId);

    if (error) {
      alert('Erro ao excluir: ' + error.message);
    } else {
      alert('Avaliação excluída com sucesso.');
      loadPatientRecords(selectedPatient.id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #area-de-impressao, #area-de-impressao * {
            visibility: visible;
          }
          #area-de-impressao {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif !important;
          }
          html, body, #__next, main, div {
            height: auto !important;
            min-height: auto !important;
            overflow: visible !important;
            background: white !important;
          }
          @page { margin: 1.5cm; }
        }
      `}} />

      <div className="space-y-6">
        
        {/* HEADER DA PÁGINA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4 print:hidden">
          <div className="flex items-center gap-3">
            {view !== 'busca' && (
              <button
                onClick={() => {
                  if (view === 'editor') setView('selecao_modelo');
                  else if (view === 'selecao_modelo') setView('historico');
                  else if (view === 'historico') { setView('busca'); setSelectedPatient(null); }
                }}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                {view === 'busca' && '1ª Avaliação / Anamnese'}
                {view === 'historico' && 'Histórico de Avaliações'}
                {view === 'selecao_modelo' && 'Escolher Modelo de Ficha'}
                {view === 'editor' && `Editando: ${DOCUMENT_TEMPLATES[selectedDoc]?.title}`}
              </h1>
              <p className="text-slate-500 text-sm">
                {selectedPatient ? `Paciente: ${selectedPatient.name}` : 'Busque o paciente para iniciar a avaliação.'}
              </p>
            </div>
          </div>

          {view === 'editor' && (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button 
                onClick={handleSaveToDatabase}
                disabled={saving}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm text-sm cursor-pointer disabled:opacity-70"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                Salvar no Prontuário
              </button>
              <button 
                onClick={handlePrint}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm text-sm cursor-pointer"
              >
                <Printer size={18} />
                Imprimir / PDF
              </button>
            </div>
          )}
        </div>

        {/* TELA 1: BUSCA DE PACIENTE */}
        {view === 'busca' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar paciente por nome ou CPF para a avaliação..."
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
                <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto">
                  {filteredPatients.map(patient => (
                    <button
                      key={patient.id}
                      onClick={() => handleSelectPatient(patient)}
                      className="w-full flex items-center justify-between p-4 hover:bg-indigo-50 transition-colors rounded-lg group cursor-pointer"
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
                      <span className="flex items-center gap-2 text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        Selecionar para Avaliação <ChevronLeft size={16} className="rotate-180" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TELA 2: HISTÓRICO DE AVALIAÇÕES */}
        {view === 'historico' && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="font-bold text-slate-700">Fichas e Laudos Salvos</h3>
                <p className="text-xs text-slate-500">Histórico de avaliações e documentos deste paciente.</p>
              </div>
              <button
                onClick={() => setView('selecao_modelo')}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer text-sm"
              >
                <Plus size={18} /> Nova Avaliação / Ficha
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center p-12"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>
            ) : pastRecords.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
                <Activity className="mx-auto text-slate-300 mb-3" size={48} />
                <h3 className="text-lg font-bold text-slate-700">Nenhuma avaliação registrada</h3>
                <p className="text-slate-500 text-sm mb-4">Clique no botão acima para criar a primeira anamnese ou laudo.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pastRecords.map(record => (
                  <div
                    key={record.id}
                    className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex justify-between items-center"
                  >
                    <div>
                      <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        {record.area_fisio}
                      </span>
                      <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                        <Clock size={14} /> Registrado em {formatDate(record.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setDocContent(record.ficha_completa?.texto_livre || JSON.stringify(record.ficha_completa));
                          setView('editor');
                        }}
                        className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye size={16} /> Visualizar
                      </button>
                      <button
                        onClick={() => handleDeleteRecord(record.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Excluir Avaliação"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TELA 3: SELEÇÃO DE MODELOS (TODAS AS ANAMNESES E DOCUMENTOS) */}
        {view === 'selecao_modelo' && (
          <div className="space-y-4 animate-in fade-in">
            <h2 className="text-lg font-bold text-slate-700 mb-4">Selecione o modelo de laudo, contrato ou anamnese:</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.keys(DOCUMENT_TEMPLATES) as DocType[]).map((key) => {
                const doc = DOCUMENT_TEMPLATES[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectTemplate(key)}
                    className="bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md rounded-xl p-6 text-left transition-all group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                      </div>
                      <h3 className="font-bold text-slate-800 text-base mb-1">{doc.title}</h3>
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 mt-4 flex items-center gap-1">
                      Selecionar ficha &rarr;
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TELA 4: EDITOR E IMPRESSÃO DO DOCUMENTO */}
        {view === 'editor' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[75vh]">
            
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50/50 print:hidden shrink-0 gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <FileEdit size={14} />
                  Editor de Texto
                </span>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Info size={12} />
                  Preencha os campos e clique em Salvar no Prontuário
                </span>
              </div>
              <button 
                onClick={() => handleSelectTemplate(selectedDoc)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw size={12} />
                Resetar Modelo
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto overflow-x-auto flex-1">
              
              {/* TEXTAREA PARA EDIÇÃO */}
              <textarea
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                className="w-full h-full min-h-[800px] p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 leading-relaxed text-sm font-mono whitespace-pre bg-slate-50/20 resize-none print:hidden"
                wrap="off"
              />

              {/* ÁREA DE IMPRESSÃO PURA */}
              <div id="area-de-impressao" className="hidden print:block w-full">
                <pre className="font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-black w-full break-words">
                  {docContent}
                </pre>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
}