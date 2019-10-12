import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConqcubesSharedModule } from 'app/shared/shared.module';
import { GameComponent } from './game.component';
import { GameDetailComponent } from './game-detail.component';
import { GameUpdateComponent } from './game-update.component';
import { GameDeleteDialogComponent, GameDeletePopupComponent } from './game-delete-dialog.component';
import { gamePopupRoute, gameRoute } from './game.route';

const ENTITY_STATES = [...gameRoute, ...gamePopupRoute];

@NgModule({
  imports: [ConqcubesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [GameComponent, GameDetailComponent, GameUpdateComponent, GameDeleteDialogComponent, GameDeletePopupComponent],
  entryComponents: [GameDeleteDialogComponent]
})
export class ConqcubesGameModule {}
