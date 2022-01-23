import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICodigoDESDE, CodigoDESDE } from '../codigo-desde.model';
import { CodigoDESDEService } from '../service/codigo-desde.service';

@Component({
  selector: 'jhi-codigo-desde-update',
  templateUrl: './codigo-desde-update.component.html',
})
export class CodigoDESDEUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    version: [null, [Validators.required]],
    fecha: [null, [Validators.required]],
    introduccion: [],
    terminologiaComun: [],
    importanciaContexto: [],
    descripcion: [],
    poblacionObjetivo: [],
    referencia: [],
  });

  constructor(protected codigoDESDEService: CodigoDESDEService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ codigoDESDE }) => {
      this.updateForm(codigoDESDE);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const codigoDESDE = this.createFromForm();
    if (codigoDESDE.id !== undefined) {
      this.subscribeToSaveResponse(this.codigoDESDEService.update(codigoDESDE));
    } else {
      this.subscribeToSaveResponse(this.codigoDESDEService.create(codigoDESDE));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICodigoDESDE>>): void {
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

  protected updateForm(codigoDESDE: ICodigoDESDE): void {
    this.editForm.patchValue({
      id: codigoDESDE.id,
      version: codigoDESDE.version,
      fecha: codigoDESDE.fecha,
      introduccion: codigoDESDE.introduccion,
      terminologiaComun: codigoDESDE.terminologiaComun,
      importanciaContexto: codigoDESDE.importanciaContexto,
      descripcion: codigoDESDE.descripcion,
      poblacionObjetivo: codigoDESDE.poblacionObjetivo,
      referencia: codigoDESDE.referencia,
    });
  }

  protected createFromForm(): ICodigoDESDE {
    return {
      ...new CodigoDESDE(),
      id: this.editForm.get(['id'])!.value,
      version: this.editForm.get(['version'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      introduccion: this.editForm.get(['introduccion'])!.value,
      terminologiaComun: this.editForm.get(['terminologiaComun'])!.value,
      importanciaContexto: this.editForm.get(['importanciaContexto'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      poblacionObjetivo: this.editForm.get(['poblacionObjetivo'])!.value,
      referencia: this.editForm.get(['referencia'])!.value,
    };
  }
}
