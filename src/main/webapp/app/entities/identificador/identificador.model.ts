import { IClasificador } from 'app/entities/clasificador/clasificador.model';

export interface IIdentificador {
  id?: number;
  nombre?: string;
  codigo?: string;
  descripcion?: string | null;
  ejemplos?: string | null;
  parentIS?: IIdentificador[] | null;
  clasificador?: IClasificador | null;
  hijoI?: IIdentificador | null;
}

export class Identificador implements IIdentificador {
  constructor(
    public id?: number,
    public nombre?: string,
    public codigo?: string,
    public descripcion?: string | null,
    public ejemplos?: string | null,
    public parentIS?: IIdentificador[] | null,
    public clasificador?: IClasificador | null,
    public hijoI?: IIdentificador | null
  ) {}
}

export function getIdentificadorIdentifier(identificador: IIdentificador): number | undefined {
  return identificador.id;
}
