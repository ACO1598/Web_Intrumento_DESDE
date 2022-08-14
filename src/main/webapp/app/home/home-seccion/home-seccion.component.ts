import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISeccion } from 'app/entities/seccion/seccion.model';

@Component({
  selector: 'jhi-home-seccion',
  templateUrl: './home-seccion.component.html',
  styleUrls: ['./home-seccion.component.scss'],
})
export class HomeSeccionComponent implements OnInit {
  seccion: ISeccion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seccion }) => {
      this.seccion = seccion;
    });
  }
}
