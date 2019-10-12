import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { Game, IGame } from 'app/shared/model/game.model';
import { GameService } from './game.service';
import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from 'app/entities/player/player.service';
import { IField } from 'app/shared/model/field.model';
import { FieldService } from 'app/entities/field/field.service';

@Component({
  selector: 'jhi-game-update',
  templateUrl: './game-update.component.html'
})
export class GameUpdateComponent implements OnInit {
  isSaving: boolean;

  players: IPlayer[];

  gamefields: IField[];

  editForm = this.fb.group({
    id: [],
    player: [],
    gameField: [],
    loggedPlayer: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected gameService: GameService,
    protected playerService: PlayerService,
    protected fieldService: FieldService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ game }) => {
      this.updateForm(game);
    });
    this.playerService
      .query({ filter: 'game-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPlayer[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlayer[]>) => response.body)
      )
      .subscribe(
        (res: IPlayer[]) => {
          if (!this.editForm.get('player').value || !this.editForm.get('player').value.id) {
            this.players = res;
          } else {
            this.playerService
              .find(this.editForm.get('player').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPlayer>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPlayer>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPlayer) => (this.players = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.fieldService
      .query({ filter: 'game-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IField[]>) => mayBeOk.ok),
        map((response: HttpResponse<IField[]>) => response.body)
      )
      .subscribe(
        (res: IField[]) => {
          if (!this.editForm.get('gameField').value || !this.editForm.get('gameField').value.id) {
            this.gamefields = res;
          } else {
            this.fieldService
              .find(this.editForm.get('gameField').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IField>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IField>) => subResponse.body)
              )
              .subscribe(
                (subRes: IField) => (this.gamefields = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.playerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlayer[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlayer[]>) => response.body)
      )
      .subscribe((res: IPlayer[]) => (this.players = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(game: IGame) {
    this.editForm.patchValue({
      id: game.id,
      player: game.player,
      gameField: game.gameField,
      loggedPlayer: game.loggedPlayer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const game = this.createFromForm();
    if (game.id !== undefined) {
      this.subscribeToSaveResponse(this.gameService.update(game));
    } else {
      this.subscribeToSaveResponse(this.gameService.create(game));
    }
  }

  trackPlayerById(index: number, item: IPlayer) {
    return item.id;
  }

  trackFieldById(index: number, item: IField) {
    return item.id;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGame>>) {
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

  private createFromForm(): IGame {
    return {
      ...new Game(),
      id: this.editForm.get(['id']).value,
      player: this.editForm.get(['player']).value,
      gameField: this.editForm.get(['gameField']).value,
      loggedPlayer: this.editForm.get(['loggedPlayer']).value
    };
  }
}
