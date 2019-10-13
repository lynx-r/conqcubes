import { Injectable } from '@angular/core';
import { Cell } from 'app/shared/model/cell.model';
import { Player } from 'app/shared/model/player.model';
import { Field } from 'app/shared/model/field.model';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {
  constructor() {}

  private static getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  genCell(player: Player, field: Field) {
    const cell = new Cell();
    const val = PlaygroundService.getRandomArbitrary(1, 6);
    cell.x = 0;
    cell.y = 0;
    cell.w = val;
    cell.h = val;
    cell.player = player;
    cell.field = field;
    return cell;
  }

  createField() {
    const field = new Field();
    field.width = PlaygroundService.getRandomArbitrary(100, 300);
    field.height = PlaygroundService.getRandomArbitrary(100, 300);
    field.cells = [];
    return field;
  }
}
