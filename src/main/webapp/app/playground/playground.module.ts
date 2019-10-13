import { NgModule } from '@angular/core';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';
import { ConqcubesSharedModule } from 'app/shared/shared.module';
import { CellSelectComponent } from './cell-select/cell-select.component';

@NgModule({
  declarations: [PlaygroundComponent, CellSelectComponent],
  imports: [ConqcubesSharedModule, PlaygroundRoutingModule]
})
export class PlaygroundModule {}
