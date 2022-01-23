import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IClasificador } from '../clasificador.model';
import { ClasificadorService } from '../service/clasificador.service';

@Component({
  templateUrl: './clasificador-delete-dialog.component.html',
})
export class ClasificadorDeleteDialogComponent {
  clasificador?: IClasificador;

  constructor(protected clasificadorService: ClasificadorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clasificadorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
