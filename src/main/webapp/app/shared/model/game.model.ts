import { IPlayer } from 'app/shared/model/player.model';
import { IField } from 'app/shared/model/field.model';

export interface IGame {
  id?: number;
  player?: IPlayer;
  gameField?: IField;
  loggedPlayer?: IPlayer;
}

export class Game implements IGame {
  constructor(public id?: number, public player?: IPlayer, public gameField?: IField, public loggedPlayer?: IPlayer) {}
}
