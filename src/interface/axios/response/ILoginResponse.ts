import { IUsuario } from './IUsuario';

export interface ILoginResponse {
  user: IUsuario;
  token: string;
}
