/* eslint-disable no-console */
import { Component, OnInit, Input } from '@angular/core';

import { HomeListComponent } from 'app/home/home-list/home-list.component';

import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';
import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';
import { SeccionService } from 'app/entities/seccion/service/seccion.service';
import { ISeccion, getSeccionIdentifier } from 'app/entities/seccion/seccion.model';

@Component({
  selector: 'jhi-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss'],
})
export class HomeBodyComponent implements OnInit {
  @Input() codigoelement!: HomeListComponent;
  @Input() secciones!: HomeListComponent;
  constructor(protected codigoDESDEService: CodigoDESDEService, protected seccionService: SeccionService) {}

  ngOnInit(): void {
    console.log(this.codigoelement);
  }
}
