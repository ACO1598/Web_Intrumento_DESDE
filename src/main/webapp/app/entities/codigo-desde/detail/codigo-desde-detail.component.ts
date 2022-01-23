import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICodigoDESDE } from '../codigo-desde.model';

@Component({
  selector: 'jhi-codigo-desde-detail',
  templateUrl: './codigo-desde-detail.component.html',
})
export class CodigoDESDEDetailComponent implements OnInit {
  codigoDESDE: ICodigoDESDE | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ codigoDESDE }) => {
      this.codigoDESDE = codigoDESDE;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
