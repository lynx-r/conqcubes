import { NgModule } from '@angular/core';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';
import { ConqcubesSharedModule } from 'app/shared/shared.module';
import { CellSelectComponent } from './cell-select/cell-select.component';
import { FieldComponent } from './field/field.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [PlaygroundComponent, CellSelectComponent, FieldComponent, CellComponent],
  imports: [ConqcubesSharedModule, PlaygroundRoutingModule]
})
export class PlaygroundModule {}
