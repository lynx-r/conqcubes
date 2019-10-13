import { Component, OnInit } from '@angular/core';
import { Field } from 'app/shared/model/field.model';
import { PlaygroundService } from 'app/playground/playground.service';
import { AccountService } from 'app/core/auth/account.service';
import { Player } from 'app/shared/model/player.model';
import { Cell } from 'app/shared/model/cell.model';
import { log } from 'app/shared/util/util';

@Component({
  selector: 'jhi-playground',
  template: `
    <div class="row">
      <div class="col-sm-8">
        playground
        <button class="btn btn-default" jhiTranslate="playground.genfield" (click)="onCreateField()">
          Создать поле
        </button>
      </div>
      <div class="col-sm-4">
        <jhi-cell-select [cell]="newCell"></jhi-cell-select>
        <button class="btn btn-default" jhiTranslate="playground.gencell" (click)="onGenCell()" [disabled]="!field">
          Кинуть кубик
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class PlaygroundComponent implements OnInit {
  field: Field;
  player: Player;

  newCell: Cell;

  constructor(private accountService: AccountService, private playgroundService: PlaygroundService) {}

  ngOnInit() {
    this.accountService.identity().then(player => {
      this.player = player;
      this.field = this.playgroundService.createField();
      this.newCell = this.playgroundService.createCell(4, 4, this.player, this.field);
      log(this.newCell);
    });
  }

  onCreateField() {
    this.field = this.playgroundService.createField();
  }

  onGenCell() {
    this.newCell = this.playgroundService.genCell(this.player, this.field);
  }
}
