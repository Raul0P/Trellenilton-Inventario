import UserAuthForm from './components/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import TrelleniltonLogo from '@/assets/Trellenilton logo.svg';
import PageHead from '@/components/shared/page-head';

export default function SignInPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <PageHead title="Login" />
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r  lg:flex">
        <div className="absolute inset-0 bg-primary dark:bg-secondary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img className="mr-2 h-6" src={TrelleniltonLogo} alt="Logo" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Sinto vontade de realizar um revolução, logo dependo
              inúmeras formas de vida cooperarem e firmarem um acordo comigo
              para participarmos e assim mudarmos a maldita CONMEBOL,
              safada!&rdquo;
            </p>
            <footer className="text-sm">Eunuco Argentino</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Crie uma conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite seu e-mail e senha abaixo para criar sua conta
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Clicando em continuar, você concorda com nossos{' '}
            <Link
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de serviço
            </Link>{' '}
            e{' '}
            <Link
              to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Políticas de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
