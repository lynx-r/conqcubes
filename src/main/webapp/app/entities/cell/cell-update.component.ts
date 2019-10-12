import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { Cell, ICell } from 'app/shared/model/cell.model';
import { CellService } from './cell.service';
import { IField } from 'app/shared/model/field.model';
import { FieldService } from 'app/entities/field/field.service';
import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from 'app/entities/player/player.service';

@Component({
  selector: 'jhi-cell-update',
  templateUrl: './cell-update.component.html'
})
export class CellUpdateComponent implements OnInit {
  isSaving: boolean;

  fields: IField[];

  players: IPlayer[];

  editForm = this.fb.group({
    id: [],
    x: [],
    y: [],
    w: [],
    h: [],
    field: [],
    player: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cellService: CellService,
    protected fieldService: FieldService,
    protected playerService: PlayerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cell }) => {
      this.updateForm(cell);
    });
    this.fieldService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IField[]>) => mayBeOk.ok),
        map((response: HttpResponse<IField[]>) => response.body)
      )
      .subscribe((res: IField[]) => (this.fields = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.playerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlayer[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlayer[]>) => response.body)
      )
      .subscribe((res: IPlayer[]) => (this.players = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cell: ICell) {
    this.editForm.patchValue({
      id: cell.id,
      x: cell.x,
      y: cell.y,
      w: cell.w,
      h: cell.h,
      field: cell.field,
      player: cell.player
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cell = this.createFromForm();
    if (cell.id !== undefined) {
      this.subscribeToSaveResponse(this.cellService.update(cell));
    } else {
      this.subscribeToSaveResponse(this.cellService.create(cell));
    }
  }

  trackFieldById(index: number, item: IField) {
    return item.id;
  }

  trackPlayerById(index: number, item: IPlayer) {
    return item.id;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICell>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  private createFromForm(): ICell {
    return {
      ...new Cell(),
      id: this.editForm.get(['id']).value,
      x: this.editForm.get(['x']).value,
      y: this.editForm.get(['y']).value,
      w: this.editForm.get(['w']).value,
      h: this.editForm.get(['h']).value,
      field: this.editForm.get(['field']).value,
      player: this.editForm.get(['player']).value
    };
  }
}
