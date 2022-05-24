import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISeccion } from '../seccion.model';
import { SeccionService } from '../service/seccion.service';
import { SeccionDeleteDialogComponent } from '../delete/seccion-delete-dialog.component';

@Component({
  selector: 'jhi-seccion',
  templateUrl: './seccion.component.html',
})
export class SeccionComponent implements OnInit {
  seccions?: ISeccion[];
  isLoading = false;

  constructor(protected seccionService: SeccionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

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

  ngOnInit(): void {
    this.loadAll();
    this.seccionService.getSecciones();
  }

  trackId(index: number, item: ISeccion): number {
    return item.id!;
  }

  delete(seccion: ISeccion): void {
    const modalRef = this.modalService.open(SeccionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.seccion = seccion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
