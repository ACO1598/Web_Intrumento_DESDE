import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClasificador } from '../clasificador.model';

@Component({
  selector: 'jhi-clasificador-detail',
  templateUrl: './clasificador-detail.component.html',
})
export class ClasificadorDetailComponent implements OnInit {
  clasificador: IClasificador | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clasificador }) => {
      this.clasificador = clasificador;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
