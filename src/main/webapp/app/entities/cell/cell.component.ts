import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { ICell } from 'app/shared/model/cell.model';
import { AccountService } from 'app/core/auth/account.service';
import { CellService } from './cell.service';

@Component({
  selector: 'jhi-cell',
  templateUrl: './cell.component.html'
})
export class CellComponent implements OnInit, OnDestroy {
  cells: ICell[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected cellService: CellService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.cellService
      .query()
      .pipe(
        filter((res: HttpResponse<ICell[]>) => res.ok),
        map((res: HttpResponse<ICell[]>) => res.body)
      )
      .subscribe(
        (res: ICell[]) => {
          this.cells = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCells();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICell) {
    return item.id;
  }

  registerChangeInCells() {
    this.eventSubscriber = this.eventManager.subscribe('cellListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
