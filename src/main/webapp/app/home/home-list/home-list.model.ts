import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ISeccion } from 'app/entities/seccion/seccion.model';
import { Identificador } from 'app/entities/identificador/identificador.model';
import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';

export interface IHomeListElement {
  id?: number;
  codigoDESDE?: ICodigoDESDE | null;
  seccion?: ISeccion | null;
  clasificador?: IClasificador | null;
  identificador?: Identificador | null;
  elemento?: Elemento;
}

export class HomeListElement implements IHomeListElement {
  constructor(
    public id?: number,
    public codigoDESDE?: ICodigoDESDE | null,
    public seccion?: ISeccion | null,
    public clasificador?: IClasificador | null,
    public identificador?: Identificador | null,
    public elemento?: Elemento
  ) {}
}

enum Elemento {
  codigoDESDE = 0,
  seccion = 1,
  clasificador = 2,
  identificador = 3,
}
