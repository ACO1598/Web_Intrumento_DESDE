import { Component, OnInit } from '@angular/core';

import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';

import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';
import { ISeccion, getSeccionIdentifier } from 'app/entities/seccion/seccion.model';

@Component({
  selector: 'jhi-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent {
  codigoDESDES?: ICodigoDESDE[];
  num?: number;

  constructor(protected codigoDESDEService: CodigoDESDEService) {}

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log(this.codigoDESDEService.query().subscribe());
  }
}
