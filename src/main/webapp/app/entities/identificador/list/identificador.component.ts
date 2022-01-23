import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IIdentificador } from '../identificador.model';
import { IdentificadorService } from '../service/identificador.service';
import { IdentificadorDeleteDialogComponent } from '../delete/identificador-delete-dialog.component';

@Component({
  selector: 'jhi-identificador',
  templateUrl: './identificador.component.html',
})
export class IdentificadorComponent implements OnInit {
  identificadors?: IIdentificador[];
  isLoading = false;

  constructor(protected identificadorService: IdentificadorService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.identificadorService.query().subscribe(
      (res: HttpResponse<IIdentificador[]>) => {
        this.isLoading = false;
        this.identificadors = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IIdentificador): number {
    return item.id!;
  }

  delete(identificador: IIdentificador): void {
    const modalRef = this.modalService.open(IdentificadorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.identificador = identificador;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
