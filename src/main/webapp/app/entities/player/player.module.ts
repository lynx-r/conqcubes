import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConqcubesSharedModule } from 'app/shared/shared.module';
import { PlayerComponent } from './player.component';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerUpdateComponent } from './player-update.component';
import { PlayerDeleteDialogComponent, PlayerDeletePopupComponent } from './player-delete-dialog.component';
import { playerPopupRoute, playerRoute } from './player.route';

const ENTITY_STATES = [...playerRoute, ...playerPopupRoute];

@NgModule({
  imports: [ConqcubesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PlayerComponent, PlayerDetailComponent, PlayerUpdateComponent, PlayerDeleteDialogComponent, PlayerDeletePopupComponent],
  entryComponents: [PlayerDeleteDialogComponent]
})
export class ConqcubesPlayerModule {}
