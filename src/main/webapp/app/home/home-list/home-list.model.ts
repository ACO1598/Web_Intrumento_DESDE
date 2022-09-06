import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ISeccion } from 'app/entities/seccion/seccion.model';
import { Identificador } from 'app/entities/identificador/identificador.model';
import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';

export interface IHomeListElement {
  nombre: string;
  descripcion?: string;
  codigo?: number | null;
  ejemplos?: string | null;
  homeCodigoDESDE?: boolean;
}

export interface IHomeListArray extends IHomeListElement {
  id: number;
  hijos?: IHomeListArray[];
}

export class HomeListElement implements IHomeListElement {
  constructor(
    public nombre: string,
    public descripcion?: string,
    public codigo?: number | null,
    public ejemplos?: string | null,
    public homeCodigoDESDE?: boolean
  ) {}
}

export class HomeListArray implements IHomeListArray {
  constructor(
    public id: number,
    public nombre: string,
    public hijos?: HomeListArray[],
    public descripcion?: string,
    public codigo?: number | null,
    public ejemplos?: string | null,
    public homeCodigoDESDE?: boolean
  ) {}
}
