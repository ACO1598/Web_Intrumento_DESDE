import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISeccion, Seccion } from '../seccion.model';
import { SeccionService } from '../service/seccion.service';
import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';
import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';

@Component({
  selector: 'jhi-seccion-update',
  templateUrl: './seccion-update.component.html',
})
export class SeccionUpdateComponent implements OnInit {
  isSaving = false;

  codigoDESDESSharedCollection: ICodigoDESDE[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: [],
    codigoDESDE: [],
  });

  constructor(
    protected seccionService: SeccionService,
    protected codigoDESDEService: CodigoDESDEService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seccion }) => {
      this.updateForm(seccion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const seccion = this.createFromForm();
    if (seccion.id !== undefined) {
      this.subscribeToSaveResponse(this.seccionService.update(seccion));
    } else {
      this.subscribeToSaveResponse(this.seccionService.create(seccion));
    }
  }

  trackCodigoDESDEById(index: number, item: ICodigoDESDE): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeccion>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(seccion: ISeccion): void {
    this.editForm.patchValue({
      id: seccion.id,
      nombre: seccion.nombre,
      descripcion: seccion.descripcion,
      codigoDESDE: seccion.codigoDESDE,
    });

    this.codigoDESDESSharedCollection = this.codigoDESDEService.addCodigoDESDEToCollectionIfMissing(
      this.codigoDESDESSharedCollection,
      seccion.codigoDESDE
    );
  }

  protected loadRelationshipsOptions(): void {
    this.codigoDESDEService
      .query()
      .pipe(map((res: HttpResponse<ICodigoDESDE[]>) => res.body ?? []))
      .pipe(
        map((codigoDESDES: ICodigoDESDE[]) =>
          this.codigoDESDEService.addCodigoDESDEToCollectionIfMissing(codigoDESDES, this.editForm.get('codigoDESDE')!.value)
        )
      )
      .subscribe((codigoDESDES: ICodigoDESDE[]) => (this.codigoDESDESSharedCollection = codigoDESDES));
  }

  protected createFromForm(): ISeccion {
    return {
      ...new Seccion(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      codigoDESDE: this.editForm.get(['codigoDESDE'])!.value,
    };
  }
}
