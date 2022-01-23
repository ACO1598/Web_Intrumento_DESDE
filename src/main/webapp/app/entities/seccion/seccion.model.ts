import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';

export interface ISeccion {
  id?: number;
  nombre?: string;
  descripcion?: string | null;
  codigo?: string;
  clasificadors?: IClasificador[] | null;
  codigoDESDE?: ICodigoDESDE | null;
}

export class Seccion implements ISeccion {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string | null,
    public codigo?: string,
    public clasificadors?: IClasificador[] | null,
    public codigoDESDE?: ICodigoDESDE | null
  ) {}
}

export function getSeccionIdentifier(seccion: ISeccion): number | undefined {
  return seccion.id;
}
