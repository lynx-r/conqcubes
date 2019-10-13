import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'app/shared/model/cell.model';
import { Observable, of } from 'rxjs';
import { CELL_UNIT_FACTOR } from 'app/shared/constants/playground.constats';

@Component({
  selector: 'jhi-cell',
  templateUrl: './cell.component.html',
  styles: []
})
export class CellComponent implements OnInit {
  @Input() cell: Cell;
  configRect: Observable<any>;

  constructor() {}

  ngOnInit() {
    this.configRect = of({
      x: this.cell.x * CELL_UNIT_FACTOR,
      y: this.cell.y * CELL_UNIT_FACTOR,
      width: this.cell.w * CELL_UNIT_FACTOR,
      height: this.cell.w * CELL_UNIT_FACTOR,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 2
    });
  }
}
