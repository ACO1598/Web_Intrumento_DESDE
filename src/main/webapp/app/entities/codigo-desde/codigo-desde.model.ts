import * as dayjs from 'dayjs';
import { ISeccion } from 'app/entities/seccion/seccion.model';

export interface ICodigoDESDE {
  id?: number;
  version?: string;
  fecha?: dayjs.Dayjs;
  introduccion?: string | null;
  terminologiaComun?: string | null;
  importanciaContexto?: string | null;
  descripcion?: string | null;
  poblacionObjetivo?: string | null;
  referencia?: string | null;
  seccions?: ISeccion[] | null;
}

export class CodigoDESDE implements ICodigoDESDE {
  constructor(
    public id?: number,
    public version?: string,
    public fecha?: dayjs.Dayjs,
    public introduccion?: string | null,
    public terminologiaComun?: string | null,
    public importanciaContexto?: string | null,
    public descripcion?: string | null,
    public poblacionObjetivo?: string | null,
    public referencia?: string | null,
    public seccions?: ISeccion[] | null
  ) {}
}

export function getCodigoDESDEIdentifier(codigoDESDE: ICodigoDESDE): number | undefined {
  return codigoDESDE.id;
}
