import { IIdentificador } from 'app/entities/identificador/identificador.model';
import { ISeccion } from 'app/entities/seccion/seccion.model';

export interface IClasificador {
  id?: number;
  nombre?: string;
  descripcion?: string | null;
  ejemplos?: string | null;
  identificadors?: IIdentificador[] | null;
  parentCS?: IClasificador[] | null;
  seccion?: ISeccion | null;
  hijoC?: IClasificador | null;
}

export class Clasificador implements IClasificador {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string | null,
    public ejemplos?: string | null,
    public identificadors?: IIdentificador[] | null,
    public parentCS?: IClasificador[] | null,
    public seccion?: ISeccion | null,
    public hijoC?: IClasificador | null
  ) {}
}

export function getClasificadorIdentifier(clasificador: IClasificador): number | undefined {
  return clasificador.id;
}
