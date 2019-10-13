import { AfterContentInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Field } from 'app/shared/model/field.model';
import { CELL_UNIT_FACTOR } from 'app/shared/constants/playground.constats';
import { BehaviorSubject, of } from 'rxjs';
import { CoreShapeComponent, StageComponent } from 'ng2-konva';
import { log } from 'app/shared/util/util';
import { PlaygroundService } from 'app/playground/playground.service';
import { Cell } from 'app/shared/model/cell.model';

@Component({
  selector: 'jhi-field',
  templateUrl: './field.component.html',
  styles: [``]
})
export class FieldComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() field: Field;
  @Input() placeCell: Cell;

  @ViewChild(StageComponent, { static: false }) stage: StageComponent;
  @ViewChild('fieldLayer', { static: false }) fieldLayer: CoreShapeComponent;

  configStage: BehaviorSubject<any>;
  configGroup: BehaviorSubject<any>;

  rows: number[];
  cols: number[];
  private mouseX: number;
  private mouseY: number;

  constructor(private playgroundService: PlaygroundService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.configStage = new BehaviorSubject<any>({});
    this.configGroup = new BehaviorSubject<any>({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.field) {
      log(this.field);
      this.rows = Array.from(Array(this.field.height).keys());
      this.cols = Array.from(Array(this.field.width).keys());
      log(this.rows, this.cols);
      const size = {
        width: this.field.width * CELL_UNIT_FACTOR,
        height: this.field.height * CELL_UNIT_FACTOR
      };
      this.configStage.next(size);
      this.configGroup.next({
        width: this.field.width * CELL_UNIT_FACTOR,
        height: CELL_UNIT_FACTOR
      });
    }
  }

  ngAfterContentInit(): void {
    log(this.stage);
  }

  getCellConfig(row: any, col: any) {
    let fill = 'yellow';
    if (col === this.mouseX && row === this.mouseY) {
      fill = 'red';
      // log(fill, col, row);
    }
    return of({
      x: col * CELL_UNIT_FACTOR,
      y: row * CELL_UNIT_FACTOR,
      width: CELL_UNIT_FACTOR,
      height: CELL_UNIT_FACTOR,
      fill,
      stroke: 'black',
      strokeWidth: 1
    });
  }

  onMousemove(e: MouseEvent) {
    if (e instanceof MouseEvent) {
      const x = e.layerX;
      const y = e.layerY;
      this.mouseX = Math.floor(x / CELL_UNIT_FACTOR);
      this.mouseY = Math.floor(y / CELL_UNIT_FACTOR);
    }
  }
}
