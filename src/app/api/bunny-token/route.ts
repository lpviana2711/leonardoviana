import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json(
      { error: "videoId é obrigatório" },
      { status: 400 }
    );
  }

  const libraryId = process.env.BUNNY_LIBRARY_ID;
  const apiKey = process.env.BUNNY_LIBRARY_API_KEY;

  if (!libraryId || !apiKey) {
    return NextResponse.json(
      { error: "Bunny Stream não configurado" },
      { status: 500 }
    );
  }

  // TODO: validar aqui a sessão do Supabase e se o usuário
  // possui permissão para assistir esta aula.

  const expires = Math.floor(Date.now() / 1000) + 300;
  const payload = apiKey + videoId + expires;

  const signature = crypto
    .createHmac("sha256", apiKey)
    .update(payload)
    .digest("hex");

  const token = Buffer
    .from(`${signature}:${expires}`)
    .toString("base64");

  return NextResponse.json({
    libraryId,
    videoId,
    token,
    expires,
  });
}