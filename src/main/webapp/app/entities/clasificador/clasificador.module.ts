import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ClasificadorComponent } from './list/clasificador.component';
import { ClasificadorDetailComponent } from './detail/clasificador-detail.component';
import { ClasificadorUpdateComponent } from './update/clasificador-update.component';
import { ClasificadorDeleteDialogComponent } from './delete/clasificador-delete-dialog.component';
import { ClasificadorRoutingModule } from './route/clasificador-routing.module';

@NgModule({
  imports: [SharedModule, ClasificadorRoutingModule],
  declarations: [ClasificadorComponent, ClasificadorDetailComponent, ClasificadorUpdateComponent, ClasificadorDeleteDialogComponent],
})
export class ClasificadorModule {}
