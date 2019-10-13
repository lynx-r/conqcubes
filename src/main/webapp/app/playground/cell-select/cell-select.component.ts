import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'app/shared/model/cell.model';

@Component({
  selector: 'jhi-cell-select',
  templateUrl: './cell-select.component.html',
  styles: [``]
})
export class CellSelectComponent implements OnInit {
  @Input() cell: Cell;

  constructor() {}

  ngOnInit() {}
}
