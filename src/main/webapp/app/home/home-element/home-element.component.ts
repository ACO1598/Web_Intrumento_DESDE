/* eslint-disable no-console */
import { Component, Input, OnInit } from '@angular/core';
import { HomeListComponent } from 'app/home/home-list/home-list.component';

import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';
import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';
import { SeccionService } from 'app/entities/seccion/service/seccion.service';
import { ISeccion } from 'app/entities/seccion/seccion.model';
import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ClasificadorService } from 'app/entities/clasificador/service/clasificador.service';
import { IIdentificador } from 'app/entities/identificador/identificador.model';
import { IdentificadorService } from 'app/entities/identificador/service/identificador.service';
import { HttpResponse } from '@angular/common/http';
import { HomeListElement } from '../home-list/home-list.model';

@Component({
  selector: 'jhi-home-element',
  templateUrl: './home-element.component.html',
  styleUrls: ['./home-element.component.scss'],
})
export class HomeElementComponent implements OnInit {
  //@Input() homeCodigoDESDE = true;
  @Input() info: HomeListElement;

  codigoDESDES?: ICodigoDESDE[];

  constructor(
    protected codigoDESDEService: CodigoDESDEService,
    protected seccionService: SeccionService,
    protected clasificadorService: ClasificadorService,
    protected identificadorService: IdentificadorService
  ) {
    this.info = new HomeListElement();
  }

  ngOnInit(): void {
    this.getcodigos();
  }

  getcodigos(): void {
    this.codigoDESDEService.query().subscribe((res: HttpResponse<ICodigoDESDE[]>) => {
      this.codigoDESDES = res.body ?? [];
    });
  }
}
