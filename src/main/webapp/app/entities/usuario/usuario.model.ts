import { Rol } from 'app/entities/enumerations/rol.model';

export interface IUsuario {
  id?: number;
  nombre?: string;
  apellido?: string | null;
  nombreUsuario?: string;
  email?: string;
  contrasena?: string;
  rol?: Rol;
}

export class Usuario implements IUsuario {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellido?: string | null,
    public nombreUsuario?: string,
    public email?: string,
    public contrasena?: string,
    public rol?: Rol
  ) {}
}

export function getUsuarioIdentifier(usuario: IUsuario): number | undefined {
  return usuario.id;
}
