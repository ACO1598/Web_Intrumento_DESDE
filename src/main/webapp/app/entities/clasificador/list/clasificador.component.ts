import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClasificador } from '../clasificador.model';
import { ClasificadorService } from '../service/clasificador.service';
import { ClasificadorDeleteDialogComponent } from '../delete/clasificador-delete-dialog.component';

@Component({
  selector: 'jhi-clasificador',
  templateUrl: './clasificador.component.html',
})
export class ClasificadorComponent implements OnInit {
  clasificadors?: IClasificador[];
  isLoading = false;

  constructor(protected clasificadorService: ClasificadorService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.clasificadorService.query().subscribe(
      (res: HttpResponse<IClasificador[]>) => {
        this.isLoading = false;
        this.clasificadors = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IClasificador): number {
    return item.id!;
  }

  delete(clasificador: IClasificador): void {
    const modalRef = this.modalService.open(ClasificadorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.clasificador = clasificador;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
