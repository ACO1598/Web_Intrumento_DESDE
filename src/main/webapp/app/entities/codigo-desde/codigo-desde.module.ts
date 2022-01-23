import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CodigoDESDEComponent } from './list/codigo-desde.component';
import { CodigoDESDEDetailComponent } from './detail/codigo-desde-detail.component';
import { CodigoDESDEUpdateComponent } from './update/codigo-desde-update.component';
import { CodigoDESDEDeleteDialogComponent } from './delete/codigo-desde-delete-dialog.component';
import { CodigoDESDERoutingModule } from './route/codigo-desde-routing.module';

@NgModule({
  imports: [SharedModule, CodigoDESDERoutingModule],
  declarations: [CodigoDESDEComponent, CodigoDESDEDetailComponent, CodigoDESDEUpdateComponent, CodigoDESDEDeleteDialogComponent],
  entryComponents: [CodigoDESDEDeleteDialogComponent],
})
export class CodigoDESDEModule {}
