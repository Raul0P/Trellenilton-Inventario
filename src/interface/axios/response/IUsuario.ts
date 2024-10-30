export enum UsuarioEnum {
  Admin = 'Admin',
  Usuario = 'Usuario'
}

export interface IUsuario {
  id?: number;
  name: string;
  email: string;
  password: string;
  tipo: UsuarioEnum;
}
