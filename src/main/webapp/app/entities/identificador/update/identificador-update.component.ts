import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IIdentificador, Identificador } from '../identificador.model';
import { IdentificadorService } from '../service/identificador.service';
import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ClasificadorService } from 'app/entities/clasificador/service/clasificador.service';

@Component({
  selector: 'jhi-identificador-update',
  templateUrl: './identificador-update.component.html',
})
export class IdentificadorUpdateComponent implements OnInit {
  isSaving = false;

  identificadorsSharedCollection: IIdentificador[] = [];
  clasificadorsSharedCollection: IClasificador[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    codigo: [null, [Validators.required]],
    descripcion: [],
    clasificador: [],
    hijoI: [],
  });

  constructor(
    protected identificadorService: IdentificadorService,
    protected clasificadorService: ClasificadorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ identificador }) => {
      this.updateForm(identificador);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const identificador = this.createFromForm();
    if (identificador.id !== undefined) {
      this.subscribeToSaveResponse(this.identificadorService.update(identificador));
    } else {
      this.subscribeToSaveResponse(this.identificadorService.create(identificador));
    }
  }

  trackIdentificadorById(index: number, item: IIdentificador): number {
    return item.id!;
  }

  trackClasificadorById(index: number, item: IClasificador): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIdentificador>>): void {
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

  protected updateForm(identificador: IIdentificador): void {
    this.editForm.patchValue({
      id: identificador.id,
      nombre: identificador.nombre,
      codigo: identificador.codigo,
      descripcion: identificador.descripcion,
      clasificador: identificador.clasificador,
      hijoI: identificador.hijoI,
    });

    this.identificadorsSharedCollection = this.identificadorService.addIdentificadorToCollectionIfMissing(
      this.identificadorsSharedCollection,
      identificador.hijoI
    );
    this.clasificadorsSharedCollection = this.clasificadorService.addClasificadorToCollectionIfMissing(
      this.clasificadorsSharedCollection,
      identificador.clasificador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.identificadorService
      .query()
      .pipe(map((res: HttpResponse<IIdentificador[]>) => res.body ?? []))
      .pipe(
        map((identificadors: IIdentificador[]) =>
          this.identificadorService.addIdentificadorToCollectionIfMissing(identificadors, this.editForm.get('hijoI')!.value)
        )
      )
      .subscribe((identificadors: IIdentificador[]) => (this.identificadorsSharedCollection = identificadors));

    this.clasificadorService
      .query()
      .pipe(map((res: HttpResponse<IClasificador[]>) => res.body ?? []))
      .pipe(
        map((clasificadors: IClasificador[]) =>
          this.clasificadorService.addClasificadorToCollectionIfMissing(clasificadors, this.editForm.get('clasificador')!.value)
        )
      )
      .subscribe((clasificadors: IClasificador[]) => (this.clasificadorsSharedCollection = clasificadors));
  }

  protected createFromForm(): IIdentificador {
    return {
      ...new Identificador(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      clasificador: this.editForm.get(['clasificador'])!.value,
      hijoI: this.editForm.get(['hijoI'])!.value,
    };
  }
}
