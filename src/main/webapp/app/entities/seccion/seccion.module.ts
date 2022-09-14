import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SeccionComponent } from './list/seccion.component';
import { SeccionDetailComponent } from './detail/seccion-detail.component';
import { SeccionUpdateComponent } from './update/seccion-update.component';
import { SeccionDeleteDialogComponent } from './delete/seccion-delete-dialog.component';
import { SeccionRoutingModule } from './route/seccion-routing.module';

@NgModule({
  imports: [SharedModule, SeccionRoutingModule],
  declarations: [SeccionComponent, SeccionDetailComponent, SeccionUpdateComponent, SeccionDeleteDialogComponent],
})
export class SeccionModule {}
