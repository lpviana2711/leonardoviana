"use client";

import { useEffect, useState } from "react";

interface BunnyPlayerProps {
  libraryId: string;
  videoId: string;
  titulo: string;
}

export default function BunnyPlayer({
  libraryId,
  videoId,
  titulo,
}: BunnyPlayerProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarToken() {
      try {
        const response = await fetch(
          `/api/bunny-token?videoId=${encodeURIComponent(videoId)}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Não foi possível gerar o token Bunny");
        }

        const dados = await response.json();

        const url = new URL(
          `https://player.mediadelivery.net/embed/${libraryId}/${videoId}`
        );

        url.searchParams.set("token", dados.token);
        url.searchParams.set("expires", String(dados.expires));

        if (ativo) {
          setSrc(url.toString());
        }
      } catch (error) {
        console.error(error);

        if (ativo) {
          setErro(true);
        }
      }
    }

    carregarToken();

    return () => {
      ativo = false;
    };
  }, [libraryId, videoId]);

  if (erro) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-center text-sm text-slate-400">
        Não foi possível carregar esta videoaula.
      </div>
    );
  }

  if (!src) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-sm text-slate-400">
        Carregando vídeo...
      </div>
    );
  }

  return (
    <iframe
      src={src}
      title={titulo}
      className="absolute inset-0 h-full w-full border-0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}