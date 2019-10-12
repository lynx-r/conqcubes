import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICell } from 'app/shared/model/cell.model';

@Component({
  selector: 'jhi-cell-detail',
  templateUrl: './cell-detail.component.html'
})
export class CellDetailComponent implements OnInit {
  cell: ICell;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cell }) => {
      this.cell = cell;
    });
  }

  previousState() {
    window.history.back();
  }
}
