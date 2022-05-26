import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';
import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';
import { SeccionService } from 'app/entities/seccion/service/seccion.service';
import { ISeccion, getSeccionIdentifier } from 'app/entities/seccion/seccion.model';

import { HomeBodyComponent } from './home-body/home-body.component';

@Component({
  selector: 'jhi-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent {
  codigoDESDES?: ICodigoDESDE[];
  seccions?: ISeccion[];
  seccion?: ISeccion;
  num?: number;
  isLoading = false;

  constructor(protected codigoDESDEService: CodigoDESDEService, protected seccionService: SeccionService) {}

  ngOnInit(): void {
    this.seccionService.query().subscribe((res: HttpResponse<ISeccion[]>) => {
      this.seccions = res.body ?? [];
    });
  }
}
