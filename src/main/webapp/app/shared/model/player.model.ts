import { ICell } from 'app/shared/model/cell.model';
import { IGame } from 'app/shared/model/game.model';

export interface IPlayer {
  id?: number;
  firstName?: string;
  lastName?: string;
  capturedCells?: ICell[];
  gameHistories?: IGame[];
}

export class Player implements IPlayer {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public capturedCells?: ICell[],
    public gameHistories?: IGame[]
  ) {}
}
