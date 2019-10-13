import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundComponent } from 'app/playground/playground.component';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundComponent,
    data: {
      authorities: [],
      pageTitle: 'home.title'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule {}
