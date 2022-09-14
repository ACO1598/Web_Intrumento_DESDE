import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { IdentificadorComponent } from './list/identificador.component';
import { IdentificadorDetailComponent } from './detail/identificador-detail.component';
import { IdentificadorUpdateComponent } from './update/identificador-update.component';
import { IdentificadorDeleteDialogComponent } from './delete/identificador-delete-dialog.component';
import { IdentificadorRoutingModule } from './route/identificador-routing.module';

@NgModule({
  imports: [SharedModule, IdentificadorRoutingModule],
  declarations: [IdentificadorComponent, IdentificadorDetailComponent, IdentificadorUpdateComponent, IdentificadorDeleteDialogComponent],
})
export class IdentificadorModule {}
