import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHead from '@/components/shared/page-head';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UsuarioEnum } from '@/interface/axios/response/IUsuario';

const userSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: 'Nome de usuário deve ter pelo menos 5 caracteres' })
      .max(50, { message: 'Nome de usuário deve ter no máximo 50 caracteres' })
      .regex(/^[a-zA-Z0-9_-]+$/, {
        message:
          'Nome de usuário deve conter apenas letras, números, hífens e sublinhados'
      }),
    email: z
      .string()
      .email({ message: 'Endereço de e-mail inválido' })
      .toLowerCase(),
    password: z
      .string()
      .min(6, { message: 'Senha deve ter ao menos 6 carateres' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword']
  });
type FormValues = z.infer<typeof userSchema>;

export default function SignupPage() {
  const { createUsuario } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const userData = {
        name: data.username,
        email: data.email,
        password: data.password,
        tipo: 'Usuário' as UsuarioEnum
      };

      const result = await createUsuario(userData);

      if (result) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <PageHead title="Crie sua conta" />
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Criar Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de usuário</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do usuário"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite seu e-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Criando conta...' : 'Registre-se'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
