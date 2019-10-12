import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'field',
        loadChildren: () => import('./field/field.module').then(m => m.ConqcubesFieldModule)
      },
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.ConqcubesGameModule)
      },
      {
        path: 'player',
        loadChildren: () => import('./player/player.module').then(m => m.ConqcubesPlayerModule)
      },
      {
        path: 'cell',
        loadChildren: () => import('./cell/cell.module').then(m => m.ConqcubesCellModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ConqcubesEntityModule {}
