import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ISeccion, Seccion } from 'app/entities/seccion/seccion.model';
import { Identificador } from 'app/entities/identificador/identificador.model';
import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';

export interface IHomeListElement {
  id?: number;
  codigoDESDE?: ICodigoDESDE;
  seccion?: ISeccion;
  clasificador?: IClasificador;
  identificador?: Identificador;
}

export class HomeListElement implements IHomeListElement {
  constructor(
    public id?: number,
    public codigoDESDE?: ICodigoDESDE,
    public seccion?: ISeccion,
    public clasificador?: IClasificador,
    public identificador?: Identificador
  ) {}
}

enum Elemento {
  codigoDESDE = 0,
  seccion = 1,
  clasificador = 2,
  identificador = 3,
}
