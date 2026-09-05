"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Filter, Search, VideoOff } from "lucide-react";
import BunnyPlayer from "@/app/components/BunnyPlayer";
import { supabase } from "@/lib/supabase";

type Exercicio = {
  id: string;
  titulo: string;
  descricao: string | null;
  categoria: string | null;
  video_url: string | null;
  bunny_video_id: string | null;
  bunny_library_id: string | null;
  modulo_num: number | null;
  aula_num: number | null;
  ordem: number | null;
};

function gerarLinkPreviewDrive(videoUrl: string | null): string | null {
  if (!videoUrl?.trim()) {
    return null;
  }

  const url = videoUrl.trim();

  const matchArquivo = url.match(
    /drive\.google\.com\/file\/d\/([^/?#]+)/
  );

  if (matchArquivo?.[1]) {
    return `https://drive.google.com/file/d/${matchArquivo[1]}/preview`;
  }

  const matchParametroId = url.match(/[?&]id=([^&#/]+)/);

  if (matchParametroId?.[1]) {
    return `https://drive.google.com/file/d/${matchParametroId[1]}/preview`;
  }

  if (
    url.includes("drive.google.com") &&
    url.includes("/preview")
  ) {
    return url;
  }

  return null;
}

export default function ExerciciosPage() {
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const categorias = useMemo(() => {
    const categoriasUnicas = Array.from(
      new Set(
        exercicios
          .map((exercicio) => exercicio.categoria?.trim())
          .filter(
            (categoria): categoria is string =>
              Boolean(categoria)
          )
      )
    );

    return ["Todos", ...categoriasUnicas];
  }, [exercicios]);

  useEffect(() => {
    carregarExercicios();
  }, []);

  async function carregarExercicios() {
    setLoading(true);
    setErro(null);

    const { data, error } = await supabase
      .from("exercicios")
      .select(`
        id,
        titulo,
        descricao,
        categoria,
        video_url,
        bunny_video_id,
        bunny_library_id,
        modulo_num,
        aula_num,
        ordem
      `)
      .order("modulo_num", { ascending: true })
      .order("aula_num", { ascending: true })
      .order("ordem", { ascending: true })
      .order("titulo", { ascending: true });

    if (error) {
      console.error("Erro ao carregar exercícios:", error);

      setErro(
        "Não foi possível carregar os vídeos. Verifique as permissões e colunas da tabela exercicios no Supabase."
      );

      setExercicios([]);
      setLoading(false);
      return;
    }

    setExercicios((data || []) as Exercicio[]);
    setLoading(false);
  }

  const exerciciosFiltrados = useMemo(() => {
    const termoBusca = busca.trim().toLowerCase();

    return exercicios.filter((exercicio) => {
      const titulo = exercicio.titulo?.toLowerCase() || "";
      const descricao = exercicio.descricao?.toLowerCase() || "";
      const categoria = exercicio.categoria?.toLowerCase() || "";

      const bateTexto =
        !termoBusca ||
        titulo.includes(termoBusca) ||
        descricao.includes(termoBusca) ||
        categoria.includes(termoBusca);

      const bateCategoria =
        categoriaAtiva === "Todos" ||
        exercicio.categoria === categoriaAtiva;

      return bateTexto && bateCategoria;
    });
  }, [busca, categoriaAtiva, exercicios]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Execuções e Exercícios
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Assista às videoaulas organizadas por módulo.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Buscar por nome, descrição ou módulo..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-slate-700 outline-none transition focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex max-w-full items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Filter
            size={20}
            className="hidden shrink-0 text-slate-400 md:block"
          />

          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              onClick={() => setCategoriaAtiva(categoria)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                categoriaAtiva === categoria
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12 text-slate-500">
          Carregando vídeos...
        </div>
      ) : erro ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          <p className="font-medium">{erro}</p>

          <button
            type="button"
            onClick={carregarExercicios}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Tentar novamente
          </button>
        </div>
      ) : exerciciosFiltrados.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white py-12 text-center text-slate-500">
          Nenhum vídeo encontrado para esta busca.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exerciciosFiltrados.map((exercicio) => {
            const possuiVideoBunny =
              Boolean(exercicio.bunny_library_id) &&
              Boolean(exercicio.bunny_video_id);

            const drivePreviewUrl = gerarLinkPreviewDrive(
              exercicio.video_url
            );

            return (
              <article
                key={exercicio.id}
                className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative flex aspect-video items-center justify-center bg-slate-900">
                  {possuiVideoBunny ? (
  <BunnyPlayer
    libraryId={exercicio.bunny_library_id as string}
    videoId={exercicio.bunny_video_id as string}
    titulo={exercicio.titulo}
  />
) : (
  <div className="flex flex-col items-center justify-center p-4 text-center text-slate-400">
    <VideoOff
      size={36}
      className="mb-2 text-slate-500"
    />

    <span className="text-xs">
      Vídeo aguardando migração para o Bunny
    </span>
  </div>
)}
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-indigo-50 px-2 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600">
                      {exercicio.categoria || "Sem módulo"}
                    </span>

                    <h3 className="text-base font-bold text-slate-800">
                      {exercicio.titulo}
                    </h3>

                    {exercicio.descricao && (
                      <p className="mt-1 text-sm text-slate-500">
                        {exercicio.descricao}
                      </p>
                    )}
                  </div>

                  {(exercicio.modulo_num || exercicio.aula_num) && (
                    <div className="mt-4 text-xs text-slate-400">
                      {exercicio.modulo_num
                        ? `Módulo ${exercicio.modulo_num}`
                        : ""}

                      {exercicio.modulo_num && exercicio.aula_num
                        ? " · "
                        : ""}

                      {exercicio.aula_num
                        ? `Aula ${exercicio.aula_num}`
                        : ""}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}