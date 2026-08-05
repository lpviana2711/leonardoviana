import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // O Supabase salva o token de acesso nos cookies do navegador com um nome padrão contendo "auth-token" ou similar.
  // Vamos procurar por qualquer cookie que pertença à sessão do Supabase.
  const allCookies = request.cookies.getAll();
  const supabaseCookie = allCookies.find(cookie => 
    cookie.name.includes('auth-token') || cookie.name.includes('supabase')
  );

  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  // Se o usuário NÃO estiver logado (não tem o cookie) e tentar acessar rotas protegidas:
  if (!supabaseCookie && !isLoginPage) {
    const url = request.url.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Se o usuário ESTIVER logado e tentar ir para a página de login, joga direto para o painel:
  if (supabaseCookie && isLoginPage) {
    const url = request.url.clone();
    url.pathname = '/painel';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configura em quais rotas o middleware vai atuar
export const config = {
  matcher: [
    /*
     * Protege todas as rotas principais, exceto arquivos estáticos, favicon e a página de login
     */
    '/((?!_next/static|_next/image|favicon.ico|login|auth).*)',
  ],
};