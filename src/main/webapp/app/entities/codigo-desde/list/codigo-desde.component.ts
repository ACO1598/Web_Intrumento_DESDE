import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICodigoDESDE } from '../codigo-desde.model';
import { ISeccion, getSeccionIdentifier } from 'app/entities/seccion/seccion.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { CodigoDESDEService } from '../service/codigo-desde.service';
import { CodigoDESDEDeleteDialogComponent } from '../delete/codigo-desde-delete-dialog.component';
import { SeccionService } from 'app/entities/seccion/service/seccion.service';

@Component({
  selector: 'jhi-codigo-desde',
  templateUrl: './codigo-desde.component.html',
})
export class CodigoDESDEComponent implements OnInit {
  codigoDESDES?: ICodigoDESDE[];
  secciones?: ISeccion[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected codigoDESDEService: CodigoDESDEService,
    protected seccionService: SeccionService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  getSecciones(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page ?? this.page ?? 1;

    this.seccionService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ISeccion[]>) => {
          this.secciones = res;
        },
        () => {
          this.onError();
        }
      );
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;
    this.getSeccions(page, dontNavigate);

    this.codigoDESDEService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ICodigoDESDE[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        () => {
          this.isLoading = false;
          this.onError();
        }
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
  }

  trackId(index: number, item: ICodigoDESDE): number {
    return item.id!;
  }

  delete(codigoDESDE: ICodigoDESDE): void {
    const modalRef = this.modalService.open(CodigoDESDEDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.codigoDESDE = codigoDESDE;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: ICodigoDESDE[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/codigo-desde'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.codigoDESDES = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  //Metodo de testeo, eliminar mas tarde
}
