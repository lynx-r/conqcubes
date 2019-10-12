import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cell, ICell } from 'app/shared/model/cell.model';
import { CellService } from './cell.service';
import { CellComponent } from './cell.component';
import { CellDetailComponent } from './cell-detail.component';
import { CellUpdateComponent } from './cell-update.component';
import { CellDeletePopupComponent } from './cell-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CellResolve implements Resolve<ICell> {
  constructor(private service: CellService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICell> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Cell>) => response.ok),
        map((cell: HttpResponse<Cell>) => cell.body)
      );
    }
    return of(new Cell());
  }
}

export const cellRoute: Routes = [
  {
    path: '',
    component: CellComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'conqcubesApp.cell.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CellDetailComponent,
    resolve: {
      cell: CellResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'conqcubesApp.cell.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CellUpdateComponent,
    resolve: {
      cell: CellResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'conqcubesApp.cell.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CellUpdateComponent,
    resolve: {
      cell: CellResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'conqcubesApp.cell.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cellPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CellDeletePopupComponent,
    resolve: {
      cell: CellResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'conqcubesApp.cell.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
