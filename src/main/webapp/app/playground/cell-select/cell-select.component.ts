import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Cell } from 'app/shared/model/cell.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CELL_UNIT_FACTOR } from 'app/shared/constants/playground.constats';

const CELL_SIZE = 6;

@Component({
  selector: 'jhi-cell-select',
  templateUrl: './cell-select.component.html',
  styles: [``]
})
export class CellSelectComponent implements OnInit, OnChanges {
  @Input() cell: Cell;

  configStage: Observable<any> = of({
    width: CELL_SIZE * CELL_UNIT_FACTOR,
    height: CELL_SIZE * CELL_UNIT_FACTOR
  });
  configRect: BehaviorSubject<any>;
  score: number;

  constructor() {}

  ngOnInit() {
    this.configRect = new BehaviorSubject<any>(this.getRectParam(4, 4));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.cell) {
      this.score = this.cell.w;
    }
    if (this.cell && this.configRect) {
      this.configRect.next(this.getRectParam(this.cell.w, this.cell.w));
    }
  }

  private getRectParam(width = CELL_SIZE, height = CELL_SIZE) {
    return {
      x: 0,
      y: 0,
      width: width * CELL_UNIT_FACTOR,
      height: height * CELL_UNIT_FACTOR,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 2
    };
  }
}
