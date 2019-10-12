import { ICell } from 'app/shared/model/cell.model';

export interface IField {
  id?: number;
  width?: number;
  height?: number;
  cells?: ICell[];
}

export class Field implements IField {
  constructor(public id?: number, public width?: number, public height?: number, public cells?: ICell[]) {}
}
