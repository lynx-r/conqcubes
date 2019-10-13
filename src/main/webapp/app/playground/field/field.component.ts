import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Field } from 'app/shared/model/field.model';
import { CELL_UNIT_FACTOR } from 'app/shared/constants/playground.constats';
import { Cell } from 'app/shared/model/cell.model';

@Component({
  selector: 'jhi-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnChanges {
  @Input() field: Field;
  @Input() placeCell: Cell;

  rows: number[];
  cols: number[];
  size = CELL_UNIT_FACTOR;

  private mouseX: number;
  private mouseY: number;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.field) {
      this.rows = Array.from(Array(this.field.height).keys());
      this.cols = Array.from(Array(this.field.width).keys());
    }
  }

  getCoords(i: number) {
    return i * this.size;
  }

  getFill(col: number, row: number) {
    let fill = 'yellow';
    const halfW = Math.floor(this.placeCell.w / 2);
    const isOdd = this.placeCell.w % 2 !== 0;
    const r = row + halfW >= this.mouseY && row - halfW + (isOdd ? 0 : 1) <= this.mouseY;
    const c = col + halfW >= this.mouseX && col - halfW + (isOdd ? 0 : 1) <= this.mouseX;
    if (r && c) {
      fill = 'red';
    }
    return fill;
  }

  onMousemove(e: { x: number; y: number }, row: number) {
    this.mouseX = Math.floor(e.x / this.size);
    this.mouseY = row;
  }
}
