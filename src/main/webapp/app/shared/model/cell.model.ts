import { IField } from 'app/shared/model/field.model';
import { IPlayer } from 'app/shared/model/player.model';

export interface ICell {
  id?: number;
  x?: number;
  y?: number;
  w?: number;
  field?: IField;
  player?: IPlayer;
}

export class Cell implements ICell {
  constructor(
    public id?: number,
    public x?: number,
    public y?: number,
    public w?: number,
    public field?: IField,
    public player?: IPlayer
  ) {}
}
