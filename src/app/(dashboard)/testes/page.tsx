"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, ExternalLink, Search, Waves, HeartPulse, Brain, Users, Dumbbell, Baby, Briefcase, Venus, Mars, Bone, Hand, Hospital, Puzzle, Activity } from "lucide-react";

type Teste = {
  nome: string;
  objetivo: string;
  paciente: string;
  fisioterapeuta: string;
  execucao: string[];
  interpretacao: string;
  precaucoes: string;
};

type Area = {
  id: string;
  nome: string;
  icone: React.ReactNode;
  testes: Teste[];
};

const base = (
  nome: string,
  objetivo: string,
  paciente: string,
  execucao: string[],
  interpretacao: string,
  precaucoes: string,
): Teste => ({
  nome,
  objetivo,
  paciente,
  fisioterapeuta: "Ao lado ou atrás do paciente, garantindo segurança, padronização e observação dos movimentos.",
  execucao,
  interpretacao,
  precaucoes,
});

const testesComuns = {
  tug: base(
    "Timed Up and Go (TUG)",
    "Avaliar mobilidade funcional, equilíbrio dinâmico e desempenho durante levantar, caminhar, virar e sentar.",
    "Sentado em cadeira firme, com percurso de 3 metros demarcado.",
    ["Explicar e demonstrar o percurso.", "Ao comando, levantar.", "Caminhar até a marca, virar e retornar.", "Sentar novamente.", "Registrar o tempo, dispositivo, pausas e necessidade de assistência."],
    "Menor tempo geralmente indica melhor mobilidade funcional, mas o ponto de corte depende da população e do protocolo.",
    "Padronizar cadeira, distância, calçado, instruções e dispositivo. Proteger contra quedas.",
  ),
  tc6: base(
    "Teste de Caminhada de 6 Minutos (TC6 / 6MWT)",
    "Avaliar a capacidade funcional submáxima pela distância percorrida em seis minutos.",
    "Em pé no início de corredor plano e demarcado, usando o dispositivo habitual quando necessário.",
    ["Registrar sinais e sintomas basais.", "Explicar a caminhada com instruções padronizadas.", "Iniciar o cronômetro.", "Permitir pausas quando previstas, mantendo o cronômetro.", "Registrar distância, pausas, sintomas e recuperação."],
    "Maior distância geralmente indica melhor capacidade funcional. A interpretação deve considerar população, sintomas e protocolo.",
    "Padronizar corredor, incentivo, equipamentos e critérios de interrupção. Monitorar sinais vitais conforme o risco.",
  ),
  berg: base(
    "Escala de Berg – Equilíbrio",
    "Avaliar equilíbrio funcional estático e dinâmico por tarefas padronizadas.",
    "Sentado, em pé e realizando transferências, alcance, giros e apoio unipodal conforme cada item.",
    ["Explicar cada tarefa.", "Aplicar os itens na ordem oficial.", "Observar tempo, estabilidade e necessidade de apoio.", "Pontuar cada item conforme os critérios oficiais.", "Somar o escore e registrar as dificuldades."],
    "Maior pontuação indica melhor desempenho de equilíbrio funcional.",
    "Utilizar o protocolo oficial, cadeira e materiais padronizados. Manter proteção próxima nas tarefas de maior risco.",
  ),
  preensao: base(
    "Dinamometria de Preensão Manual",
    "Quantificar a força máxima de preensão manual como indicador de força periférica e desempenho funcional.",
    "Sentado, com ombro, cotovelo, antebraço e punho posicionados de forma padronizada.",
    ["Ajustar a empunhadura.", "Demonstrar a contração máxima.", "Solicitar preensão durante o tempo definido.", "Realizar as tentativas previstas com repouso.", "Registrar o melhor valor ou a média, conforme o protocolo."],
    "Maior força indica melhor desempenho de preensão. Valores reduzidos devem ser interpretados com dor, lesões, edema e dominância manual.",
    "Padronizar aparelho, posição, incentivo e número de tentativas. Interromper diante de dor importante ou sintomas.",
  ),
  thomas: base(
    "Teste de Thomas",
    "Avaliar o comprimento funcional dos flexores do quadril e possíveis limitações de extensão.",
    "Decúbito dorsal, próximo à extremidade da maca.",
    ["Aproximar um joelho ao tórax.", "Observar a posição da coxa contralateral.", "Avaliar extensão do quadril, joelho e possíveis compensações pélvicas.", "Comparar os dois lados e registrar sintomas."],
    "Alterações na posição do membro contralateral podem sugerir limitação de flexibilidade dos flexores do quadril.",
    "Controlar a pelve e evitar compensações lombares. Não forçar amplitudes dolorosas.",
  ),
  romberg: base(
    "Teste de Romberg",
    "Avaliar estabilidade postural com redução da informação visual.",
    "Em pé, com os pés juntos e braços posicionados conforme o protocolo.",
    ["Posicionar o paciente.", "Observar com os olhos abertos.", "Solicitar fechamento dos olhos.", "Registrar oscilações, perda de equilíbrio e tempo em cada condição."],
    "Perda de equilíbrio após fechar os olhos pode indicar maior dependência visual para manutenção postural.",
    "Não determina sozinho a causa do desequilíbrio. Manter proteção contra queda durante todo o teste.",
  ),
};

const AREAS: Area[] = [
  {
    id: "aquatica",
    nome: "Fisioterapia Aquática",
    icone: <Waves className="w-5 h-5" />,
    testes: [
      base("Ai Chi – Avaliação do Equilíbrio", "Avaliar controle postural e equilíbrio durante movimentos lentos e controlados na água.", "Em pé dentro da piscina, com profundidade segura e postura confortável.", ["Familiarizar o paciente com a água.", "Orientar postura ereta e respiração controlada.", "Realizar movimentos lentos de membros, tronco e membros inferiores.", "Registrar oscilações, compensações, necessidade de apoio e perda de estabilidade."], "Deve-se registrar as variáveis observadas; o Ai Chi não é um teste diagnóstico isolado e não possui ponto de corte universal.", "Padronizar sequência, profundidade e condições das reavaliações. Supervisionar continuamente."),
      base("Aquatic Functional Mobility Scale (AFMS)", "Avaliar mobilidade funcional dentro da água, incluindo marcha, transferências, mudanças de direção e deslocamentos.", "A posição varia conforme a tarefa funcional avaliada.", ["Explicar a tarefa.", "Verificar profundidade e condições da piscina.", "Solicitar a tarefa funcional.", "Observar independência, velocidade, equilíbrio e assistência.", "Registrar o nível de auxílio e a pontuação da versão utilizada."], "A interpretação deve seguir a versão validada da escala e seus critérios de pontuação.", "Não criar pontos de corte próprios. Manter posição de segurança durante a tarefa."),
      base("Aquatic Independence Measure (AIM)", "Avaliar o grau de independência funcional no meio aquático.", "As posições variam conforme verticalidade, flutuação, mudanças de posição e deslocamento.", ["Avaliar adaptação inicial.", "Observar manutenção do posicionamento.", "Avaliar mudanças de posição e controle durante flutuação.", "Registrar contato físico e nível de independência.", "Calcular a pontuação conforme a versão oficial."], "Não é uma avaliação genérica de natação; deve ser aplicada conforme o instrumento adotado.", "As versões AIM e AIM-2 podem ter diferenças. Usar formulário e critérios correspondentes."),
      base("Halliwick – Avaliação dos 10 Pontos", "Avaliar progressivamente adaptação, controle corporal, equilíbrio e independência no meio aquático.", "A posição varia conforme o ponto do programa: verticalidade, flutuação, rotações e deslocamento.", ["Avaliar adaptação mental.", "Avaliar desligamento e controles de rotação.", "Avaliar empuxo e equilíbrio em repouso.", "Avaliar deslizamento turbulento.", "Avaliar progressão simples."], "É uma estrutura progressiva de aprendizagem e independência aquática, não um teste diagnóstico convencional.", "Registrar os pontos alcançados e o nível de assistência. Reduzir o suporte gradualmente e com segurança."),
      base("Teste de Marcha Aquática", "Avaliar padrão de marcha na água, equilíbrio, velocidade, comprimento e simetria dos passos.", "Em ortostatismo dentro da piscina, com profundidade definida.", ["Definir distância e velocidade.", "Solicitar caminhada em linha reta.", "Observar apoio dos pés, ritmo, comprimento e simetria.", "Registrar controle de tronco, assistência e dispositivo."], "Profundidade, correnteza e propriedades da água modificam o resultado; comparar apenas condições padronizadas.", "Padronizar profundidade, percurso e assistência. Manter supervisão próxima."),
    ],
  },
  {
    id: "cardiovascular",
    nome: "Fisioterapia Cardiovascular",
    icone: <HeartPulse className="w-5 h-5" />,
    testes: [
      testesComuns.preensao,
      base("Escala de Borg CR10", "Quantificar a percepção subjetiva de esforço, dispneia ou fadiga.", "Sentado ou em exercício, conforme o momento de aplicação.", ["Explicar a escala e seus descritores.", "Definir se será avaliado esforço, dispneia ou fadiga.", "Solicitar o número correspondente à percepção.", "Registrar valor e momento da medida."], "Permite acompanhar a resposta subjetiva à carga e auxiliar no controle da intensidade do exercício.", "Usar a versão correta sem sugerir respostas. Registrar a condição de aplicação."),
      base("Teste de Bruce em Esteira", "Avaliar capacidade funcional e resposta cardiovascular por protocolo escalonado em esteira.", "Em pé na esteira, com calçado adequado e equipamento de segurança.", ["Registrar medidas basais.", "Iniciar o estágio previsto.", "Aumentar velocidade e inclinação a cada estágio.", "Monitorar FC, PA, ECG, sintomas e esforço.", "Encerrar conforme critérios clínicos ou do protocolo e monitorar recuperação."], "Permite avaliar capacidade funcional e resposta cardiovascular; pode auxiliar na estimativa da capacidade aeróbica.", "Exige triagem, monitorização, equipe treinada e critérios de interrupção definidos pelo serviço."),
      testesComuns.tc6,
      base("Teste de Caminhada Incremental em Vaivém (ISWT)", "Avaliar capacidade funcional por caminhada incremental em percurso de 10 metros.", "Em pé em uma extremidade do corredor demarcado.", ["Demarcar 10 metros.", "Explicar que o paciente deve acompanhar os sinais sonoros.", "Iniciar na velocidade prevista.", "Aumentar progressivamente a velocidade.", "Registrar estágio final, distância e respostas fisiológicas."], "A capacidade é interpretada pelo nível ou distância atingida, considerando o protocolo e a população.", "Usar áudio e distância padronizados. Monitorar sintomas e interromper conforme critérios de segurança."),
    ],
  },
  {
    id: "neurofuncional",
    nome: "Fisioterapia Neurofuncional",
    icone: <Brain className="w-5 h-5" />,
    testes: [
      base("Avaliação de Fugl-Meyer", "Avaliar comprometimento motor e recuperação sensório-motora, especialmente após AVC.", "A posição varia conforme o domínio: sentado, deitado ou em pé.", ["Aplicar os itens na ordem do protocolo.", "Avaliar reflexos, movimentos voluntários e sensibilidade.", "Avaliar equilíbrio, amplitude articular e dor quando previsto.", "Pontuar cada item de acordo com a execução.", "Somar os domínios."], "Maior pontuação indica melhor desempenho e menor comprometimento dentro do domínio avaliado.", "É uma escala extensa; usar a versão oficial e não improvisar critérios de pontuação."),
      testesComuns.berg,
      base("Dynamic Gait Index (DGI)", "Avaliar a capacidade de adaptar e controlar a marcha diante de mudanças de velocidade, direção, obstáculos e escadas.", "Em pé no percurso e caminhando durante os itens.", ["Caminhar em velocidade habitual.", "Modificar a velocidade.", "Girar a cabeça horizontal e verticalmente.", "Realizar giro e parada.", "Passar e contornar obstáculos.", "Subir ou descer escadas e pontuar os itens."], "Pontuação menor indica maior comprometimento da marcha dinâmica.", "Não confundir com FGA. Usar a escala oficial e proteger contra quedas."),
      base("Escala de Ashworth Modificada", "Graduar a resistência ao movimento passivo associada ao aumento do tônus.", "O posicionamento varia conforme o músculo, com o segmento relaxado.", ["Posicionar e estabilizar o segmento.", "Solicitar relaxamento.", "Realizar movimento passivo na velocidade padronizada.", "Perceber resistência ou captura.", "Atribuir o grau conforme a escala."], "Maior grau indica maior resistência ao movimento passivo; a escala não mede exclusivamente espasticidade.", "Padronizar velocidade, posição e amplitude. Interpretar junto à rigidez e às propriedades dos tecidos."),
      testesComuns.romberg,
    ],
  },
  {
    id: "pilates",
    nome: "Fisioterapia em Pilates",
    icone: <Dumbbell className="w-5 h-5" />,
    testes: [
      base("Avaliação Postural", "Identificar alterações de alinhamento e possíveis compensações relevantes para o movimento.", "Em pé, descalço quando possível, em postura habitual.", ["Observar cabeça e cervical.", "Avaliar cintura escapular, coluna e pelve.", "Observar joelhos e pés nos planos anterior, posterior e lateral.", "Registrar assimetrias e compensações."], "Auxilia na definição de objetivos de controle postural, mas uma alteração isolada não constitui diagnóstico.", "Considerar calçado, superfície, fadiga e tarefa. Não concluir causalidade somente pela postura."),
      testesComuns.thomas,
      base("Teste de Schober", "Avaliar mobilidade de flexão da coluna lombar.", "Em pé, com os pés confortavelmente posicionados.", ["Localizar e marcar os pontos anatômicos.", "Medir a distância inicial.", "Solicitar flexão anterior do tronco.", "Medir novamente e registrar a diferença."], "Maior aumento da distância representa maior excursão entre os pontos marcados.", "Usar técnica padronizada e o mesmo método nas reavaliações."),
      base("Agachamento Unipodal", "Avaliar controle dinâmico do membro inferior, incluindo alinhamento de quadril, joelho e pé.", "Em pé, apoiado em um membro.", ["Solicitar apoio unipodal.", "Realizar agachamento até profundidade definida.", "Observar pelve, joelho e pé.", "Registrar dor, equilíbrio, compensações e repetições."], "Valgo dinâmico, queda pélvica, dor ou perda de equilíbrio podem indicar déficit de controle, sem definir uma lesão específica.", "Padronizar profundidade e número de repetições. Proteger contra perda de equilíbrio."),
      base("Prancha – Resistência do Core", "Avaliar resistência e controle dos músculos do tronco durante estabilização.", "Decúbito ventral, apoiado nos antebraços e/ou mãos e pés conforme o protocolo.", ["Posicionar o paciente.", "Solicitar manutenção da posição.", "Cronometrar o tempo.", "Registrar compensações, fadiga e sintomas."], "Maior tempo com técnica adequada sugere melhor resistência dentro do protocolo adotado.", "Não priorizar tempo em detrimento da técnica. Interromper diante de dor ou perda importante do alinhamento."),
      testesComuns.tug,
    ],
  },
  {
    id: "psicomotricidade",
    nome: "Fisioterapia em Psicomotricidade",
    icone: <Baby className="w-5 h-5" />,
    testes: [
      base("MABC-2", "Avaliar competência motora em destreza manual, habilidades com bola e equilíbrio.", "Varia conforme a tarefa, geralmente sentado ou em pé.", ["Identificar faixa etária e itens.", "Preparar materiais padronizados.", "Aplicar tarefas de destreza, bola e equilíbrio.", "Registrar tempo, acertos e desempenho.", "Converter resultados conforme as tabelas normativas."], "Resultados são convertidos em escores e percentis conforme a idade; desempenho inferior pode indicar necessidade de investigação.", "Instrumento padronizado: seguir o manual e não improvisar a pontuação."),
      base("Escala Motora Infantil de Alberta (AIMS)", "Avaliar maturação motora grossa do nascimento à marcha independente.", "A criança é observada em prono, supino, sentado e em pé.", ["Determinar idade e estado de desenvolvimento.", "Observar movimentos espontâneos nas quatro posições.", "Registrar habilidades observadas e não observadas.", "Somar e converter conforme a referência etária."], "Pontuação e percentil ajudam a identificar maturação motora abaixo do esperado e acompanhar a evolução.", "Observar o movimento espontâneo sem facilitar a execução. Usar normas da versão adotada."),
      base("KTK – Teste de Coordenação Corporal para Crianças", "Avaliar coordenação motora global por equilíbrio, saltos e deslocamentos.", "Em pé e em movimento, conforme cada tarefa.", ["Preparar espaço e materiais.", "Aplicar as tarefas na ordem oficial.", "Avaliar equilíbrio, saltos e transferências.", "Registrar tentativas e desempenho.", "Converter resultados segundo idade e normas."], "Resultado inferior ao esperado sugere menor coordenação motora global.", "Usar o protocolo completo e não substituir as tarefas por exercícios semelhantes."),
      base("TGMD-3", "Avaliar habilidades motoras fundamentais locomotoras e de controle de objetos.", "Em pé e em movimento, em espaço amplo e seguro.", ["Demonstrar cada habilidade.", "Aplicar habilidades locomotoras.", "Aplicar habilidades de controle de objetos.", "Registrar os critérios atendidos.", "Calcular os escores conforme o manual."], "O escore bruto reflete o domínio das habilidades; a interpretação normativa depende da idade e do sistema de conversão.", "Usar critérios específicos de cada habilidade e o manual da versão adotada."),
      base("Timed Up and Go Pediátrico", "Avaliar mobilidade funcional e equilíbrio dinâmico em crianças.", "Sentado em cadeira apropriada, com percurso de 3 metros.", ["Demonstrar a tarefa.", "Levantar ao comando.", "Caminhar até a marca, virar, retornar e sentar.", "Cronometrar e registrar tempo, dispositivo e ajuda."], "Tempo maior indica pior mobilidade; usar referências pediátricas específicas.", "Não aplicar pontos de corte de adultos. Padronizar cadeira, distância e instruções."),
    ],
  },
  {
    id: "trabalhador",
    nome: "Fisioterapia na Saúde do Trabalhador",
    icone: <Briefcase className="w-5 h-5" />,
    testes: [
      base("Avaliação Ergonômica de Postura Sentada", "Avaliar a postura no trabalho sentado e fatores de risco relacionados ao posto e à tarefa.", "Sentado no posto habitual, reproduzindo a tarefa real.", ["Observar a tarefa.", "Verificar altura e profundidade do assento.", "Avaliar tronco, pelve, cabeça e membros superiores.", "Verificar monitor, teclado, mouse e apoio dos pés.", "Registrar duração, frequência e oportunidades de ajuste."], "Posturas mantidas e inadequação entre trabalhador, mobiliário e tarefa podem aumentar a exposição biomecânica.", "Avaliar a tarefa real, não apenas uma fotografia. Considerar pausas e alternância de tarefas."),
      base("Checklist OCRA", "Estimar exposição a movimentos e esforços repetitivos dos membros superiores.", "Na estação de trabalho, executando a tarefa habitual.", ["Definir tarefa e período de observação.", "Registrar frequência de ações técnicas.", "Avaliar força e posturas dos membros superiores.", "Registrar fatores adicionais e períodos de recuperação.", "Aplicar os multiplicadores e calcular o índice."], "Quanto maior o índice, maior a indicação de análise e gerenciamento do risco de sobrecarga.", "Usar versão oficial e treinamento adequado. Não substituir uma análise ergonômica completa por um escore isolado."),
      base("REBA", "Estimar risco postural do corpo inteiro considerando carga, força e atividade.", "Executando a tarefa habitual.", ["Selecionar a postura representativa ou de maior risco.", "Avaliar tronco, pescoço e pernas.", "Avaliar braços, antebraços e punhos.", "Considerar carga, força, pega e atividade.", "Cruzar os escores nas tabelas oficiais."], "Escore mais elevado corresponde a maior risco e maior necessidade de intervenção.", "É um método de triagem. Registrar a postura analisada e não generalizar para todo o turno sem amostragem."),
      base("RULA", "Avaliar risco postural principalmente de membros superiores, pescoço e tronco.", "No posto habitual, realizando a tarefa.", ["Selecionar postura representativa.", "Avaliar braço, antebraço e punho.", "Avaliar pescoço e tronco.", "Considerar força, repetição e carga.", "Obter o nível de ação pela tabela oficial."], "Maior pontuação indica maior risco e necessidade de investigação/intervenção.", "Escolher a postura representativa e documentar o momento da tarefa avaliado."),
    ],
  },
  {
    id: "mulher",
    nome: "Fisioterapia na Saúde da Mulher",
    icone: <Venus className="w-5 h-5" />,
    testes: [
      base("Escala de Brink", "Avaliar força da contração voluntária dos músculos do assoalho pélvico.", "Posição confortável e adequada ao exame do assoalho pélvico.", ["Explicar e obter consentimento.", "Solicitar contração voluntária.", "Realizar palpação digital quando indicada.", "Observar pressão, sustentação e elevação.", "Classificar conforme a versão adotada."], "Pontuação mais alta representa melhor desempenho da contração, considerando força, tônus, dor e função.", "Exame interno somente por profissional habilitado, com privacidade, higiene e consentimento."),
      base("Escala de Oxford Modificada", "Graduar a força da contração voluntária do assoalho pélvico de 0 a 5.", "Posição padronizada para avaliação do assoalho pélvico.", ["Explicar e obter consentimento.", "Solicitar contração.", "Avaliar a contração por palpação quando indicada.", "Graduar de 0 a 5.", "Registrar qualidade, relaxamento e compensações."], "Graus maiores representam contração mais forte; interpretar junto à qualidade e função.", "Não usar o valor isolado para definir a função global. Exame interno exige habilitação e consentimento."),
      base("Esquema PERFECT / Laycock", "Avaliar força, resistência, repetições, contrações rápidas, elevação, co-contração e sincronização.", "Posição padronizada e confortável para avaliação.", ["Avaliar potência pela escala adotada.", "Medir duração da contração sustentada.", "Registrar repetições.", "Contar contrações rápidas.", "Avaliar elevação, co-contração e sincronização quando aplicável."], "Gera um perfil dos componentes musculares; não deve ser reduzido a uma única nota global.", "Registrar o protocolo e a versão. Garantir privacidade, consentimento e profissional habilitado."),
      base("Teste de Diástase dos Retos Abdominais", "Avaliar a distância entre os músculos retos do abdome em pontos padronizados.", "Decúbito dorsal, joelhos flexionados e pés apoiados.", ["Identificar os pontos de medida.", "Avaliar em repouso.", "Solicitar pequena flexão de cabeça/tronco quando previsto.", "Medir a separação nos pontos padronizados.", "Registrar método, ponto e medida."], "Maior distância indica maior separação, mas a interpretação depende do método, profundidade, tensão da linha alba e função abdominal.", "Não existe ponto de corte universal. Registrar instrumento e método; não diagnosticar apenas pela distância."),
      base("ICIQ-UI SF", "Mensurar frequência, gravidade e impacto da incontinência urinária na qualidade de vida.", "Sentada, preenchendo o questionário ou respondendo à aplicação estruturada.", ["Explicar o período de referência.", "Aplicar os itens da versão validada.", "Registrar frequência e impacto.", "Calcular o escore conforme o instrumento."], "Maior escore geralmente representa maior impacto dos sintomas, conforme a versão.", "Não induzir respostas. Usar versão validada e interpretar junto à avaliação clínica."),
    ],
  },
  {
    id: "homem",
    nome: "Fisioterapia na Saúde do Homem",
    icone: <Mars className="w-5 h-5" />,
    testes: [
      testesComuns.preensao,
      base("Escala de Laycock Masculina", "Avaliar força, resistência e controle dos músculos do assoalho pélvico masculino.", "Posição confortável e adequada à avaliação.", ["Explicar e obter consentimento.", "Solicitar contração voluntária.", "Avaliar força e duração.", "Registrar repetições e contrações rápidas.", "Avaliar elevação, co-contração e sincronização quando aplicável."], "Produz um perfil da função muscular e identifica déficits de força, resistência ou controle.", "Exame interno somente por profissional habilitado, com privacidade e consentimento."),
      base("Esquema PERFECT Masculino", "Avaliar de forma estruturada força, resistência, repetições, contrações rápidas e controle funcional.", "Posição confortável e padronizada.", ["Avaliar força.", "Medir duração da contração.", "Registrar repetições.", "Contar contrações rápidas.", "Registrar elevação, co-contração e timing conforme a versão."], "Maior desempenho nos componentes indica melhor função muscular.", "Registrar componentes separadamente. Não criar uma nota única sem protocolo."),
      base("IPSS – Questionário Internacional de Sintomas Prostáticos", "Quantificar a gravidade dos sintomas urinários e o impacto na qualidade de vida.", "Sentado, preenchendo o questionário.", ["Aplicar os sete itens.", "Somar os pontos.", "Registrar a qualidade de vida separadamente.", "Classificar conforme a versão adotada."], "Na classificação usual, 0–7 é leve, 8–19 moderado e 20–35 grave.", "Usar a versão validada. Sintomas relevantes podem exigir avaliação médica/urológica."),
      base("Teste do Absorvente Masculino", "Quantificar objetivamente a perda urinária pela diferença de peso do absorvente.", "Durante as atividades do protocolo, usando absorvente previamente pesado.", ["Pesar o absorvente seco.", "Registrar o peso inicial.", "Usar durante o período definido.", "Pesar novamente.", "Calcular o ganho de peso."], "Maior ganho de peso indica maior volume de perda urinária.", "Definir duração e método antes do teste; registrar condições e atividades realizadas."),
    ],
  },
  {
    id: "reumatologia",
    nome: "Fisioterapia em Reumatologia",
    icone: <Bone className="w-5 h-5" />,
    testes: [
      base("BASMI – Índice de Bath para Metrologia da Espondilite", "Quantificar mobilidade da coluna e quadril em pessoas com espondiloartrite.", "Em pé e sentado, conforme cada medida.", ["Realizar medidas cervicais.", "Avaliar distância tragus-parede.", "Medir rotação cervical.", "Realizar Schober modificado.", "Avaliar distância intermaleolar quando prevista.", "Converter medidas em escore conforme o protocolo."], "Maior restrição nas medidas indica menor mobilidade axial.", "Padronizar pontos anatômicos, versão e método de medida nas reavaliações."),
      base("Índice de Fibromialgia (WPI/SSS)", "Quantificar a distribuição da dor e a gravidade de sintomas associados à fibromialgia.", "Sentado, em entrevista estruturada.", ["Identificar regiões dolorosas no período de referência.", "Calcular o WPI.", "Avaliar fadiga, sono não reparador e sintomas cognitivos.", "Calcular o SSS e registrar ambos."], "Maior escore representa maior impacto ou gravidade dos sintomas conforme o instrumento.", "Usar versão validada e período de referência correto. Interpretar com avaliação clínica."),
      base("Escala Visual Analógica da Dor", "Quantificar a intensidade subjetiva da dor.", "Sentado ou em posição confortável.", ["Explicar os extremos da escala.", "Solicitar indicação da intensidade atual.", "Registrar valor, local e situação.", "Repetir em condições comparáveis."], "Valor maior representa maior intensidade de dor.", "A escala não identifica a causa da dor; registrar contexto e localização."),
    ],
  },
  {
    id: "quiropraxia",
    nome: "Fisioterapia em Quiropraxia",
    icone: <Hand className="w-5 h-5" />,
    testes: [
      base("Teste de Adson", "Investigar sinais neurovasculares associados ao desfiladeiro torácico.", "Posição conforme a variante, com ambiente seguro.", ["Palpar o pulso radial.", "Posicionar membro e cervical conforme a variante.", "Solicitar inspiração e/ou posição provocativa.", "Observar pulso e sintomas.", "Comparar lados."], "Achado positivo deve ser interpretado junto à história, exame físico e outros testes; não confirma doença vascular isoladamente.", "Manobras de desfiladeiro torácico têm limitações diagnósticas. Interromper diante de sintomas relevantes."),
      base("Teste de Allen", "Avaliar a circulação colateral da mão pelas artérias radial e ulnar.", "Sentado, com a mão elevada e relaxada.", ["Comprimir radial e ulnar.", "Solicitar abrir e fechar a mão para esvaziamento.", "Liberar uma artéria.", "Observar retorno da coloração.", "Repetir para a outra artéria."], "Retorno lento ou ausente pode sugerir alteração da perfusão pela artéria liberada.", "Considerar temperatura, vasoespasmo e técnica. Interromper diante de dor ou alterações importantes."),
      base("Teste de Bragard", "Aumentar a tensão neural após Lasègue para investigar mecanossensibilidade ciática.", "Geralmente em decúbito dorsal.", ["Elevar a perna estendida até os sintomas.", "Reduzir discretamente a elevação.", "Adicionar dorsiflexão.", "Verificar se a dor radicular familiar retorna.", "Comparar lados."], "Reprodução de sintomas familiares com diferenciação estrutural favorece mecanossensibilidade neural; isoladamente não confirma diagnóstico.", "Comparar lados, evitar movimentos bruscos e interromper diante de dor intensa ou déficit neurológico."),
      base("Teste de Compressão Cervical", "Avaliar a reprodução de sintomas com aumento da carga cervical.", "Sentado, com tronco estabilizado e cabeça inicialmente neutra.", ["Estabilizar tronco e cabeça.", "Aplicar compressão axial leve e breve.", "Registrar dor local ou irradiada.", "Comparar lados e sintomas."], "Um achado positivo deve ser integrado à história, exame físico e demais testes.", "Evitar força excessiva em trauma, instabilidade, fratura, doença vascular ou contraindicações."),
      base("Teste de Thigh Thrust", "Provocar a articulação sacroilíaca por cisalhamento transmitido pelo fêmur.", "Decúbito dorsal, com quadril flexionado e pelve estabilizada.", ["Posicionar e estabilizar a pelve.", "Aplicar força axial controlada pelo fêmur.", "Verificar reprodução da dor familiar.", "Comparar os lados."], "Reprodução da dor familiar pode sugerir envolvimento sacroilíaco, principalmente quando vários testes concordam.", "Evitar força excessiva e interromper diante de dor intensa, instabilidade ou sinais de alerta."),
    ],
  },
  {
    id: "ortopedia",
    nome: "Fisioterapia Traumato-Ortopédica",
    icone: <Activity className="w-5 h-5" />,
    testes: [
      base("DASH", "Avaliar sintomas e incapacidade funcional do membro superior por autorrelato.", "Sentado, respondendo ao questionário.", ["Explicar o período de referência.", "Aplicar a versão validada.", "Registrar respostas funcionais e de sintomas.", "Calcular pelo algoritmo oficial."], "Maior escore indica maior incapacidade ou sintomas.", "Usar versão validada e respeitar as regras de cálculo."),
      base("Lasègue – Elevação da Perna Estendida", "Avaliar mecanossensibilidade do sistema neural lombossacro, especialmente do nervo ciático.", "Decúbito dorsal, com pernas relaxadas.", ["Sustentar calcanhar e joelho.", "Elevar passivamente a perna com joelho estendido.", "Identificar ângulo e localização dos sintomas.", "Comparar lados."], "Dor radicular familiar em distribuição típica aumenta a suspeita de envolvimento neural; dor posterior inespecífica não confirma radiculopatia.", "Evitar movimentos bruscos e diferenciar dor neural de limitação muscular."),
      base("Escala de Constant-Murley", "Avaliar função do ombro combinando dor, atividades, amplitude de movimento e força.", "Sentado e em pé conforme os componentes.", ["Avaliar dor.", "Registrar atividades de vida diária.", "Medir movimentos ativos.", "Testar força conforme o protocolo.", "Somar os componentes oficiais."], "Maior escore indica melhor função do ombro.", "Padronizar dinamometria, posição e método de medida."),
      base("Escala de Kujala", "Avaliar sintomas e função relacionados à articulação patelofemoral.", "Sentado, respondendo ao questionário.", ["Aplicar os itens oficiais.", "Registrar dor e função.", "Calcular o escore.", "Comparar longitudinalmente."], "Maior escore indica melhor função e menor impacto patelofemoral.", "Usar versão validada e interpretar junto ao exame físico."),
      base("Escala de Lysholm", "Avaliar a função do joelho, incluindo claudicação, apoio, bloqueio, instabilidade, dor, edema e escadas.", "Sentado, respondendo ao questionário.", ["Aplicar os itens oficiais.", "Registrar sintomas e limitações.", "Somar conforme o instrumento.", "Comparar avaliações."], "Maior escore indica melhor função.", "Interpretar junto ao exame físico e ao diagnóstico estrutural."),
      base("Teste de Thessaly", "Investigar sintomas meniscais sob carga e rotação do joelho.", "Em apoio unipodal, com segurança e conforme a variante.", ["Solicitar apoio unipodal.", "Flexionar o joelho conforme o protocolo.", "Realizar rotações de tronco e pelve.", "Registrar dor na linha articular, clique ou travamento."], "Dor na linha articular, clique ou travamento podem aumentar a suspeita de lesão meniscal.", "Proteger contra queda, comparar lados e interromper diante de dor intensa ou instabilidade."),
      base("Teste da Gaveta Anterior do Tornozelo", "Avaliar estabilidade anterior da articulação talocrural, especialmente do ligamento talofibular anterior.", "Sentado ou em decúbito, com o tornozelo em posição padronizada.", ["Estabilizar a perna.", "Segurar o calcâneo/tálus.", "Aplicar translação anterior.", "Observar deslocamento e end-feel.", "Comparar lados."], "Maior translação ou end-feel amolecido em comparação com o lado contralateral pode sugerir instabilidade ligamentar.", "Considerar a fase da lesão e evitar força excessiva em trauma agudo."),
    ],
  },
  {
    id: "respiratoria",
    nome: "Fisioterapia Respiratória",
    icone: <HeartPulse className="w-5 h-5" />,
    testes: [
      base("Espirometria", "Avaliar volumes e fluxos pulmonares por manobras respiratórias padronizadas.", "Sentado, com tronco ereto e bocal corretamente posicionado.", ["Conferir e calibrar o equipamento.", "Explicar as manobras.", "Realizar a capacidade vital forçada.", "Obter curvas fluxo-volume e volume-tempo.", "Repetir até critérios de aceitabilidade e reprodutibilidade.", "Registrar os parâmetros."], "Interpretar curvas, critérios técnicos e valores de referência junto ao exame clínico; resultado isolado não estabelece diagnóstico.", "Exige técnica adequada, vedação, calibração e avaliação de contraindicações ao esforço expiratório máximo."),
      base("Escala de Borg para Dispneia", "Avaliar a percepção subjetiva da falta de ar durante esforço ou recuperação.", "Em repouso ou durante o teste funcional.", ["Explicar os extremos da escala.", "Solicitar classificação da dispneia.", "Registrar pontuação e momento do teste.", "Relacionar com distância, carga e demais parâmetros."], "A pontuação representa a percepção de dispneia na condição avaliada.", "Padronizar condições de aplicação e registrar a versão utilizada."),
      base("mMRC – Escala de Dispneia", "Classificar a limitação funcional provocada pela dispneia nas atividades cotidianas.", "Sentado, em entrevista.", ["Explicar que a resposta deve refletir atividades habituais.", "Ler as categorias.", "Selecionar a descrição mais adequada.", "Registrar o grau de 0 a 4."], "Graus maiores indicam maior limitação funcional relacionada à dispneia.", "Não induzir respostas. Interpretar junto à avaliação respiratória e funcional."),
      testesComuns.tc6,
      base("Incremental Shuttle Walk Test", "Avaliar capacidade funcional cardiorrespiratória por caminhada com velocidade progressivamente aumentada.", "Em pé no início de corredor demarcado.", ["Demarcar o percurso.", "Explicar o áudio.", "Iniciar caminhada.", "Acompanhar os sinais sonoros com aumento progressivo de velocidade.", "Registrar estágio final, distância, sinais e sintomas."], "Maior distância ou estágio atingido geralmente indica melhor desempenho, considerando a resposta cardiorrespiratória.", "Monitorar sintomas e sinais vitais conforme risco. Interromper diante de sinais de intolerância."),
      base("COPD Assessment Test (CAT)", "Quantificar o impacto dos sintomas da DPOC no estado de saúde e nas atividades diárias.", "Sentado, respondendo ao questionário.", ["Explicar o período de referência.", "Responder os itens da versão oficial.", "Somar os pontos.", "Registrar e comparar nas reavaliações."], "O escore representa a carga de sintomas e impacto na qualidade de vida conforme a versão validada.", "Usar versão autorizada e não alterar itens ou regras de pontuação."),
    ],
  },
  {
    id: "uti",
    nome: "Fisioterapia em Terapia Intensiva",
    icone: <Hospital className="w-5 h-5" />,
    testes: [
      base("Teste de Força Muscular MRC", "Graduar força muscular manualmente nos principais grupos musculares usando a escala MRC.", "A posição varia conforme o músculo, contra a gravidade ou eliminando a gravidade.", ["Explicar o movimento.", "Posicionar e estabilizar.", "Solicitar movimento ativo.", "Verificar amplitude contra a gravidade.", "Aplicar resistência quando indicado.", "Graduar de 0 a 5 e registrar grupo e lado."], "Maior grau indica maior força, considerando dor, amplitude, compreensão e controle motor.", "Não testar resistência máxima em pacientes instáveis. Padronizar posição e resistência."),
      base("Teste de Equilíbrio Sentado", "Avaliar capacidade de manter sedestação com controle de tronco e sem apoio excessivo.", "Sentado à beira do leito ou em superfície firme.", ["Posicionar o paciente.", "Solicitar manutenção sem apoio.", "Observar alinhamento e oscilações.", "Aplicar alcance ou deslocamento de peso quando previsto.", "Registrar tempo e necessidade de apoio."], "Maior tempo e menor necessidade de apoio indicam melhor controle de tronco em sedestação.", "Não há um protocolo universal; definir critérios antes. Manter proteção próxima."),
      base("Teste de Mobilidade no Leito", "Avaliar rolar, reposicionar-se e passar do decúbito para a sedestação.", "No próprio leito, inicialmente na posição habitual.", ["Solicitar rolar para um lado e retornar.", "Repetir para o outro lado.", "Avaliar ponte e reajuste quando aplicável.", "Solicitar passagem para sedestação quando clinicamente possível.", "Registrar assistência e qualidade do movimento."], "Menor necessidade de assistência indica melhor mobilidade no leito.", "Verificar linhas, drenos, cateteres, estabilidade hemodinâmica e respiratória."),
      base("Teste de Transferência Leito-Cadeira", "Avaliar a capacidade de realizar transferência funcional entre leito e cadeira com segurança.", "Sentado à beira do leito, com cadeira travada ao lado.", ["Posicionar e travar a cadeira.", "Orientar aproximação e preparação dos pés e tronco.", "Auxiliar ortostatismo quando necessário.", "Girar em direção à cadeira.", "Sentar controladamente.", "Registrar assistência, dispositivo e qualidade."], "Menor necessidade de assistência indica melhor mobilidade funcional.", "Verificar linhas, drenos, cateteres e estabilidade antes de iniciar."),
    ],
  },
  {
    id: "tea",
    nome: "Fisioterapia no TEA",
    icone: <Puzzle className="w-5 h-5" />,
    testes: [
      base("AIMS", "Avaliar maturação e desempenho motor grosso de lactentes por observação de posturas e movimentos.", "Lactente em prono, supino, sentado e em pé quando aplicável.", ["Observar comportamento espontâneo.", "Avaliar cada posição.", "Registrar itens motores observados.", "Calcular o resultado conforme o manual."], "Compara o desempenho com referências por idade; não é instrumento específico para diagnóstico de TEA.", "Usar normas adequadas à idade e evitar induzir movimentos."),
      base("ATEC", "Monitorar evolução em comunicação, sociabilidade, percepção sensorial/cognitiva e saúde/comportamento.", "Normalmente o cuidador, professor ou familiar responde sobre o funcionamento habitual.", ["Identificar o respondente.", "Explicar que se avalia o funcionamento habitual.", "Aplicar o formulário autorizado.", "Calcular subtotais e total.", "Comparar resultados ao longo do tempo."], "A mudança do escore pode auxiliar no monitoramento, mas o instrumento não é diagnóstico.", "Usar versão autorizada e interpretar no contexto multiprofissional."),
      base("M-CHAT-R/F", "Rastrear sinais associados ao autismo em crianças pequenas por relato dos pais e entrevista de seguimento quando indicada.", "O responsável responde ao instrumento; a criança pode ser observada quando necessário.", ["Confirmar faixa etária.", "Aplicar o questionário aos responsáveis.", "Calcular o resultado conforme a versão.", "Realizar entrevista de seguimento quando indicada.", "Encaminhar para avaliação complementar quando necessário."], "Resultado de risco indica necessidade de investigação; não estabelece diagnóstico de TEA.", "Usar a versão validada e seguir o fluxo de encaminhamento definido pelo serviço."),
      base("KTK", "Avaliar coordenação motora global por tarefas padronizadas de equilíbrio, saltos e deslocamentos.", "Em roupas e calçados adequados, em espaço livre e seguro.", ["Preparar espaço e materiais.", "Explicar e demonstrar cada tarefa.", "Realizar os subtestes na ordem padronizada.", "Registrar execução e converter conforme as normas."], "Permite classificar o desempenho de coordenação motora em relação às normas da população avaliada.", "Usar protocolo oficial e faixa etária correspondente."),
    ],
  },
];

function youtubeUrl(nome: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${nome} Fisioterapia`)}`;
}

export default function TestesPage() {
  const [busca, setBusca] = useState("");
  const [areaAberta, setAreaAberta] = useState<string | null>(null);
  const [testeAberto, setTesteAberto] = useState<string | null>(null);

  const todosTestes = useMemo(
    () => AREAS.flatMap((area) => area.testes.map((teste) => ({ ...teste, area: area.nome, areaId: area.id }))),
    []
  );
  const termo = busca.trim().toLowerCase();

  const sugestoes = useMemo(() => {
    if (termo.length < 2) return [];
    return todosTestes
      .filter((teste) => teste.nome.toLowerCase().includes(termo) || teste.area.toLowerCase().includes(termo))
      .slice(0, 8);
  }, [termo, todosTestes]);

  const areasFiltradas = useMemo(() => {
    if (!termo) return AREAS;
    return AREAS.map((area) => ({
      ...area,
      testes: area.testes.filter((teste) => teste.nome.toLowerCase().includes(termo) || area.nome.toLowerCase().includes(termo)),
    })).filter((area) => area.testes.length > 0);
  }, [termo]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Testes de Fisioterapia</h1>
      <p className="text-sm text-gray-500 mb-6">
        Pesquise por nome, abra a área desejada e clique em um teste para visualizar objetivo, posicionamento, execução, interpretação e precauções.
      </p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar teste... ex.: TUG, Berg, Lasègue, Oxford"
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {sugestoes.length > 0 && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {sugestoes.map((s) => (
              <button
                key={`${s.areaId}-${s.nome}`}
                type="button"
                className="w-full text-left px-4 py-2.5 hover:bg-indigo-50 flex items-center justify-between gap-3"
                onClick={() => {
                  setBusca(s.nome);
                  setAreaAberta(s.areaId);
                  setTesteAberto(`${s.areaId}-${s.nome}`);
                }}
              >
                <span>
                  <span className="block text-sm font-medium text-gray-800">{s.nome}</span>
                  <span className="block text-xs text-gray-500">{s.area}</span>
                </span>
                <Search className="w-4 h-4 text-indigo-500" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {areasFiltradas.map((area) => {
          const aberta = areaAberta === area.id || !!termo;
          return (
            <section key={area.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setAreaAberta(aberta && !termo ? null : area.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">{area.icone}</span>
                  <span>
                    <span className="block font-semibold text-gray-800">{area.nome}</span>
                    <span className="block text-xs text-gray-500">{area.testes.length} testes encontrados</span>
                  </span>
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${aberta ? "rotate-180" : ""}`} />
              </button>

              {aberta && (
                <div className="border-t divide-y">
                  {area.testes.map((teste) => {
                    const chave = `${area.id}-${teste.nome}`;
                    const aberto = testeAberto === chave;
                    return (
                      <div key={chave}>
                        <div className="px-4 py-3 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setTesteAberto(aberto ? null : chave)}
                            className="flex-1 text-left flex items-center gap-2"
                          >
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${aberto ? "rotate-180" : ""}`} />
                            <span className="text-sm font-medium text-gray-800">{teste.nome}</span>
                          </button>
                          <a
                            href={youtubeUrl(teste.nome)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg shrink-0"
                          >
                            YouTube <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {aberto && (
                          <div className="mx-4 mb-4 rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 space-y-4">
                            <div>
                              <h3 className="font-semibold text-indigo-700 mb-1">Objetivo</h3>
                              <p>{teste.objetivo}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-indigo-700 mb-1">Posição do paciente</h3>
                              <p>{teste.paciente}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-indigo-700 mb-1">Posição do fisioterapeuta</h3>
                              <p>{teste.fisioterapeuta}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-indigo-700 mb-1">Execução passo a passo</h3>
                              <ol className="list-decimal pl-5 space-y-1">
                                {teste.execucao.map((passo) => <li key={passo}>{passo}</li>)}
                              </ol>
                            </div>
                            <div>
                              <h3 className="font-semibold text-indigo-700 mb-1">Interpretação clínica</h3>
                              <p>{teste.interpretacao}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-amber-700 mb-1">Observações e precauções</h3>
                              <p>{teste.precaucoes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {areasFiltradas.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-10">Nenhum teste encontrado para “{busca}”.</p>
      )}

      <p className="mt-6 text-xs text-gray-500">
        Conteúdo organizado a partir do PDF enviado. Instrumentos padronizados devem ser aplicados conforme sua versão oficial, manual, treinamento e critérios de segurança.
      </p>
    </div>
  );
}
