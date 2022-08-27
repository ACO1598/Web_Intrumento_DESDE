import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ISeccion } from 'app/entities/seccion/seccion.model';
import { Identificador } from 'app/entities/identificador/identificador.model';
import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';

export interface IHomeListElement {
  idelemento?: number;
  tipoelemento?: Elemento;
}

export class HomeListElement implements IHomeListElement {
  constructor(public idelemento?: number, public tipoelemento?: Elemento) {}
}

enum Elemento {
  codigoDESDE = 0,
  seccion = 1,
  clasificador = 2,
  identificador = 3,
}
