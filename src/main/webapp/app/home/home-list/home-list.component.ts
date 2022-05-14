import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';

import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';

@Component({
  selector: 'jhi-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent {
  codigoDESDES?: ICodigoDESDE[];
  num?: number;

  constructor(service: CodigoDESDEService) {}
}
