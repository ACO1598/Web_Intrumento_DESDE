/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { HomeListComponent } from 'app/home/home-list/home-list.component';

import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';
import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';
import { SeccionService } from 'app/entities/seccion/service/seccion.service';
import { ISeccion } from 'app/entities/seccion/seccion.model';
import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ClasificadorService } from 'app/entities/clasificador/service/clasificador.service';
import { IIdentificador } from 'app/entities/identificador/identificador.model';
import { IdentificadorService } from 'app/entities/identificador/service/identificador.service';

@Component({
  selector: 'jhi-home-element',
  templateUrl: './home-element.component.html',
  styleUrls: ['./home-element.component.scss'],
})
export class HomeElementComponent implements OnInit {
  constructor(
    protected codigoDESDEService: CodigoDESDEService,
    protected seccionService: SeccionService,
    protected clasificadorService: ClasificadorService,
    protected identificadorService: IdentificadorService
  ) {}

  ngOnInit(): void {
    console.log('something');
  }
}
