import { Component, OnInit } from '@angular/core';

import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';

import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';
import { SeccionService } from 'app/entities/seccion/service/seccion.service';
import { ISeccion, getSeccionIdentifier } from 'app/entities/seccion/seccion.model';
import { HttpResponse } from '@angular/common/http';

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
    this.num = 11;

    /*	this.seccionService.find(1).subscribe(
		(res: HttpResponse<ISeccion>) => {
        this.isLoading = false;
        this.seccion = res.body;
      },
      () => {
        this.isLoading = false;
      }
	);*/

    this.seccionService.query().subscribe(
      (res: HttpResponse<ISeccion[]>) => {
        this.isLoading = false;
        this.seccions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
