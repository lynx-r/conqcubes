import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICell } from 'app/shared/model/cell.model';
import { CellService } from './cell.service';

@Component({
  selector: 'jhi-cell-delete-dialog',
  templateUrl: './cell-delete-dialog.component.html'
})
export class CellDeleteDialogComponent {
  cell: ICell;

  constructor(protected cellService: CellService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cellService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cellListModification',
        content: 'Deleted an cell'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-cell-delete-popup',
  template: ''
})
export class CellDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cell }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CellDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.cell = cell;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/cell', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/cell', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
