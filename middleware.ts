import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  const supabaseCookie = allCookies.find(cookie => 
    cookie.name.includes('auth-token') || cookie.name.includes('supabase')
  );

  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  // Se o usuário NÃO estiver logado e tentar acessar rotas protegidas:
  if (!supabaseCookie && !isLoginPage) {
    const url = request.nextUrl.clone(); // CORRIGIDO AQUI
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Se o usuário ESTIVER logado e tentar ir para a página de login:
  if (supabaseCookie && isLoginPage) {
    const url = request.nextUrl.clone(); // CORRIGIDO AQUI
    url.pathname = '/painel';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|auth).*)',
  ],
};