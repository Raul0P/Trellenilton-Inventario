import validateCPFOrCNPJ from '@/hooks/use-validator';
import { z } from 'zod';

const clientesSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  contato: z.string().min(1, 'Contato é obrigatório'),
  cpf: z
    .string()
    .min(1, 'CPF ou CNPJ é obrigatório')
    .refine(validateCPFOrCNPJ, {
      message: 'CPF ou CNPJ inválido'
    })
});

type ClienteFormValues = z.infer<typeof clientesSchema>;

export default function ClientesPage() {
  const { cliente, createCliente, updateCliente, deleteCliente, getCliente } =
    useContext(AuthContext);
}
