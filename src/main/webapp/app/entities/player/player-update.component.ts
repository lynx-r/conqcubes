import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlayer, Player } from 'app/shared/model/player.model';
import { PlayerService } from './player.service';

@Component({
  selector: 'jhi-player-update',
  templateUrl: './player-update.component.html'
})
export class PlayerUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: []
  });

  constructor(protected playerService: PlayerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ player }) => {
      this.updateForm(player);
    });
  }

  updateForm(player: IPlayer) {
    this.editForm.patchValue({
      id: player.id,
      firstName: player.firstName,
      lastName: player.lastName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const player = this.createFromForm();
    if (player.id !== undefined) {
      this.subscribeToSaveResponse(this.playerService.update(player));
    } else {
      this.subscribeToSaveResponse(this.playerService.create(player));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayer>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  private createFromForm(): IPlayer {
    return {
      ...new Player(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value
    };
  }
}
