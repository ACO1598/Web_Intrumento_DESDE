import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'codigo-desde',
        data: { pageTitle: 'instrumentoDesdeApp.codigoDESDE.home.title' },
        loadChildren: () => import('./codigo-desde/codigo-desde.module').then(m => m.CodigoDESDEModule),
      },
      {
        path: 'seccion',
        data: { pageTitle: 'instrumentoDesdeApp.seccion.home.title' },
        loadChildren: () => import('./seccion/seccion.module').then(m => m.SeccionModule),
      },
      {
        path: 'identificador',
        data: { pageTitle: 'instrumentoDesdeApp.identificador.home.title' },
        loadChildren: () => import('./identificador/identificador.module').then(m => m.IdentificadorModule),
      },
      {
        path: 'clasificador',
        data: { pageTitle: 'instrumentoDesdeApp.clasificador.home.title' },
        loadChildren: () => import('./clasificador/clasificador.module').then(m => m.ClasificadorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}