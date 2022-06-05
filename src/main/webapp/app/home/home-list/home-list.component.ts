import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';
import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';
import { SeccionService } from 'app/entities/seccion/service/seccion.service';
import { ISeccion, getSeccionIdentifier } from 'app/entities/seccion/seccion.model';
import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ClasificadorService } from 'app/entities/clasificador/service/clasificador.service';
import { IIdentificador } from 'app/entities/identificador/identificador.model';
import { IdentificadorService } from 'app/entities/identificador/service/identificador.service';

import { HomeBodyComponent } from './home-body/home-body.component';
import { HomeListElement, IHomeListElement } from './home-list.model';

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
  elementos?: IHomeListElement[];
  seccion?: ISeccion;
  contadorElementos = 1;

  constructor(
    protected codigoDESDEService: CodigoDESDEService,
    protected seccionService: SeccionService,
    protected clasificadorService: ClasificadorService,
    protected identificadorService: IdentificadorService
  ) {}

  ngOnInit(): void {
    /*	this.getsecciones();*/

    this.getelementos();
  }

  getelementos(): void {
    this.getcodigos();
    this.getsecciones();
    this.getclasificadores();
    this.getidentificadores();

    if (this.seccions !== undefined) {
      for (const seccion of this.seccions) {
        // eslint-disable-next-line no-console
        console.log('test');
      }
    }

    /*    this.contadorElementos + 1;
    this.elementos?.push(new HomeListElement(this.contadorElementos, null, null, null, null, 1));*/
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
}
