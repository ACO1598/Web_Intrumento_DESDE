import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IClasificador, Clasificador } from '../clasificador.model';
import { ClasificadorService } from '../service/clasificador.service';
import { ISeccion } from 'app/entities/seccion/seccion.model';
import { SeccionService } from 'app/entities/seccion/service/seccion.service';

@Component({
  selector: 'jhi-clasificador-update',
  templateUrl: './clasificador-update.component.html',
})
export class ClasificadorUpdateComponent implements OnInit {
  isSaving = false;

  clasificadorsSharedCollection: IClasificador[] = [];
  seccionsSharedCollection: ISeccion[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: [],
    ejemplos: [],
    seccion: [],
    hijoC: [],
  });

  constructor(
    protected clasificadorService: ClasificadorService,
    protected seccionService: SeccionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clasificador }) => {
      this.updateForm(clasificador);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const clasificador = this.createFromForm();
    if (clasificador.id !== undefined) {
      this.subscribeToSaveResponse(this.clasificadorService.update(clasificador));
    } else {
      this.subscribeToSaveResponse(this.clasificadorService.create(clasificador));
    }
  }

  trackClasificadorById(index: number, item: IClasificador): number {
    return item.id!;
  }

  trackSeccionById(index: number, item: ISeccion): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClasificador>>): void {
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

  protected updateForm(clasificador: IClasificador): void {
    this.editForm.patchValue({
      id: clasificador.id,
      nombre: clasificador.nombre,
      descripcion: clasificador.descripcion,
      ejemplos: clasificador.ejemplos,
      seccion: clasificador.seccion,
      hijoC: clasificador.hijoC,
    });

    this.clasificadorsSharedCollection = this.clasificadorService.addClasificadorToCollectionIfMissing(
      this.clasificadorsSharedCollection,
      clasificador.hijoC
    );
    this.seccionsSharedCollection = this.seccionService.addSeccionToCollectionIfMissing(
      this.seccionsSharedCollection,
      clasificador.seccion
    );
  }

  protected loadRelationshipsOptions(): void {
    this.clasificadorService
      .query()
      .pipe(map((res: HttpResponse<IClasificador[]>) => res.body ?? []))
      .pipe(
        map((clasificadors: IClasificador[]) =>
          this.clasificadorService.addClasificadorToCollectionIfMissing(clasificadors, this.editForm.get('hijoC')!.value)
        )
      )
      .subscribe((clasificadors: IClasificador[]) => (this.clasificadorsSharedCollection = clasificadors));

    this.seccionService
      .query()
      .pipe(map((res: HttpResponse<ISeccion[]>) => res.body ?? []))
      .pipe(
        map((seccions: ISeccion[]) => this.seccionService.addSeccionToCollectionIfMissing(seccions, this.editForm.get('seccion')!.value))
      )
      .subscribe((seccions: ISeccion[]) => (this.seccionsSharedCollection = seccions));
  }

  protected createFromForm(): IClasificador {
    return {
      ...new Clasificador(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      ejemplos: this.editForm.get(['ejemplos'])!.value,
      seccion: this.editForm.get(['seccion'])!.value,
      hijoC: this.editForm.get(['hijoC'])!.value,
    };
  }
}
