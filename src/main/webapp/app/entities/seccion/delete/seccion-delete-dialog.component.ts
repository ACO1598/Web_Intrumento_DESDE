import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISeccion } from '../seccion.model';
import { SeccionService } from '../service/seccion.service';

@Component({
  templateUrl: './seccion-delete-dialog.component.html',
})
export class SeccionDeleteDialogComponent {
  seccion?: ISeccion;

  constructor(protected seccionService: SeccionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.seccionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
