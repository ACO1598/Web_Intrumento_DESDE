import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIdentificador } from '../identificador.model';

@Component({
  selector: 'jhi-identificador-detail',
  templateUrl: './identificador-detail.component.html',
})
export class IdentificadorDetailComponent implements OnInit {
  identificador: IIdentificador | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ identificador }) => {
      this.identificador = identificador;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
