import { Injectable } from '@angular/core';
import { Cell } from 'app/shared/model/cell.model';
import { Player } from 'app/shared/model/player.model';
import { Field } from 'app/shared/model/field.model';
import { log, Util } from 'app/shared/util/util';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {
  constructor() {}

  genCell(player: Player, field: Field) {
    const cell = new Cell();
    const val = Util.getRandomArbitrary(1, 6);
    cell.x = 0;
    cell.y = 0;
    cell.w = val;
    cell.player = player;
    cell.field = field;
    return cell;
  }

  genField() {
    const field = new Field();
    field.width = Util.getRandomArbitrary(10, 20);
    field.height = Util.getRandomArbitrary(10, 20);
    field.cells = [];
    for (let i = 0; i < field.height; i++) {
      for (let j = 0; j < field.width; j++) {
        const c = new Cell();
        // c.field = field;
        c.x = j;
        c.y = i;
        c.w = 1;
        field.cells.push(c);
      }
    }
    log(field);
    return field;
  }

  createCell(w: number, h: number, player: Player, field: Field) {
    const cell = new Cell();
    cell.x = 0;
    cell.y = 0;
    cell.w = w;
    cell.player = player;
    cell.field = field;
    return cell;
  }
}
