import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: () => import('./admin/admin.module').then(m => m.ConqcubesAdminModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.ConqcubesAccountModule)
        },
        {
          path: 'playground',
          loadChildren: () => import('./playground/playground.module').then(m => m.PlaygroundModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class ConqcubesAppRoutingModule {}
