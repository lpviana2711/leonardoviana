import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Permite passar livremente se for a página de login, arquivos estáticos ou rotas públicas
  if (
    path.startsWith('/login') ||
    path.startsWith('/cadastro') ||
    path.startsWith('/recuperar-senha') ||
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.includes('.')
  ) {
    return NextResponse.next();
  }

  // Verifica se existe qualquer cookie de sessão ativo do Supabase de forma ampla
  const hasSupabaseCookie = request.cookies.getAll().some(cookie => 
    cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')
  );

  // Se for uma rota protegida (/painel, /pacientes, /atendimento, etc.) e não tiver o cookie, manda pro login
  if (!hasSupabaseCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};