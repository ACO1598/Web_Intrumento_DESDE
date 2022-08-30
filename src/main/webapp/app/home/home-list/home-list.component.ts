/* eslint-disable no-console */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';
import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';
import { SeccionService } from 'app/entities/seccion/service/seccion.service';
import { ISeccion, Seccion } from 'app/entities/seccion/seccion.model';
import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ClasificadorService } from 'app/entities/clasificador/service/clasificador.service';
import { IIdentificador } from 'app/entities/identificador/identificador.model';
import { IdentificadorService } from 'app/entities/identificador/service/identificador.service';

import { HomeListElement, IHomeListElement } from './home-list.model';
import { HomeElementComponent } from '../home-element/home-element.component';

@Component({
  selector: 'jhi-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent {
  codigoDESDES?: ICodigoDESDE[];
  seccions?: ISeccion[];
  clasificadores?: IClasificador[];
  identificadores?: IIdentificador[];
  /* elemento: HomeListElement = new HomeListElement(1, 0); */

  @Output() msgToHome = new EventEmitter<any>();

  constructor(
    protected codigoDESDEService: CodigoDESDEService,
    protected seccionService: SeccionService,
    protected clasificadorService: ClasificadorService,
    protected identificadorService: IdentificadorService
  ) {}

  ngOnInit(): void {
    this.getelementos();
  }

  ordenarJerarquias(): void {
    if (this.seccions !== undefined && this.codigoDESDES !== undefined) {
      //let indexcodigos= new Array<number>(this.seccions.length);
      const arraysecciones = new Array<Array<ISeccion>>(this.codigoDESDES.length);

      console.log('Entra en jerarquias');

      for (const seccion of this.seccions) {
        if (seccion.codigoDESDE?.id) {
          const index = seccion.codigoDESDE.id;
          console.log(index);

          arraysecciones[index].push(seccion);

          //this.codigoDESDES[1].seccions= new ISeccion[];
        }
      }

      for (let i = 0; i < this.codigoDESDES.length; i++) {
        this.codigoDESDES[i].seccions = arraysecciones[i];
      }
    }
  }

  getelementos(): void {
    this.getcodigos();
    this.getsecciones();
    this.getclasificadores();
    this.getidentificadores();

    this.ordenarJerarquias();
  }

  // Estas funciones extraen las entidades de la base de datos y
  // las asignan a sus arrays correspondientes
  getcodigos(): void {
    this.codigoDESDEService.query().subscribe((res: HttpResponse<ICodigoDESDE[]>) => {
      this.codigoDESDES = res.body ?? [];
    });
  }

  getsecciones(): void {
    this.seccionService.query().subscribe((res: HttpResponse<ISeccion[]>) => {
      this.seccions = res.body ?? [];
    });
  }

  getclasificadores(): void {
    this.clasificadorService.query().subscribe((res: HttpResponse<IClasificador[]>) => {
      this.clasificadores = res.body ?? [];
    });
  }

  getidentificadores(): void {
    this.identificadorService.query().subscribe((res: HttpResponse<IIdentificador[]>) => {
      this.identificadores = res.body ?? [];
    });
  }

  //Manda la interfaz con todos los datos relevantes al home-element
  sendmsg(elemento: any, homeCodigoDESDE: boolean): void {
    const msg = new HomeListElement(elemento.nombre, elemento.descripcion, elemento.codigo, elemento.ejemplos, homeCodigoDESDE);

    this.msgToHome.emit(msg);
    console.log(msg);
  }
}
