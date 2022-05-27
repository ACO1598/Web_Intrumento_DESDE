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
import { IHomeListElement } from './home-list.model';

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
  Elementos?: IHomeListElement[];
  seccion?: ISeccion;

  constructor(
    protected codigoDESDEService: CodigoDESDEService,
    protected seccionService: SeccionService,
    protected clasificadorService: ClasificadorService,
    protected identificadorService: IdentificadorService
  ) {}

  ngOnInit(): void {
    this.seccionService.query().subscribe((res: HttpResponse<ISeccion[]>) => {
      this.seccions = res.body ?? [];
    });
  }

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

  getidentificadore(): void {
    this.identificadorService.query().subscribe((res: HttpResponse<IIdentificador[]>) => {
      this.identificadores = res.body ?? [];
    });
  }
}
