import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IIdentificador } from '../identificador.model';
import { IdentificadorService } from '../service/identificador.service';

@Component({
  templateUrl: './identificador-delete-dialog.component.html',
})
export class IdentificadorDeleteDialogComponent {
  identificador?: IIdentificador;

  constructor(protected identificadorService: IdentificadorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.identificadorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
