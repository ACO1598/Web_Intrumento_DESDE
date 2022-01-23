import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICodigoDESDE } from '../codigo-desde.model';
import { CodigoDESDEService } from '../service/codigo-desde.service';

@Component({
  templateUrl: './codigo-desde-delete-dialog.component.html',
})
export class CodigoDESDEDeleteDialogComponent {
  codigoDESDE?: ICodigoDESDE;

  constructor(protected codigoDESDEService: CodigoDESDEService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.codigoDESDEService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
