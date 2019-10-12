import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConqcubesSharedModule } from 'app/shared/shared.module';
import { CellComponent } from './cell.component';
import { CellDetailComponent } from './cell-detail.component';
import { CellUpdateComponent } from './cell-update.component';
import { CellDeleteDialogComponent, CellDeletePopupComponent } from './cell-delete-dialog.component';
import { cellPopupRoute, cellRoute } from './cell.route';

const ENTITY_STATES = [...cellRoute, ...cellPopupRoute];

@NgModule({
  imports: [ConqcubesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CellComponent, CellDetailComponent, CellUpdateComponent, CellDeleteDialogComponent, CellDeletePopupComponent],
  entryComponents: [CellDeleteDialogComponent]
})
export class ConqcubesCellModule {}
