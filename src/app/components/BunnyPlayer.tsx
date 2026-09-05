"use client";

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
  const url = new URL(
    `https://player.mediadelivery.net/embed/${libraryId}/${videoId}`
  );

  // Impede que o vídeo inicie automaticamente.
  url.searchParams.set("autoplay", "false");

  // Mantém o áudio disponível e evita comportamento de autoplay silencioso.
  url.searchParams.set("muted", "false");

  // Evita repetição automática ao final da aula.
  url.searchParams.set("loop", "false");

  // Carrega somente os metadados iniciais em vez de tentar baixar todo o vídeo.
  url.searchParams.set("preload", "metadata");

  return (
    <iframe
      src={url.toString()}
      title={titulo}
      className="absolute inset-0 h-full w-full border-0"
      allow="fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}