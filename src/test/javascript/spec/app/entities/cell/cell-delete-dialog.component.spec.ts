import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConqcubesTestModule } from '../../../test.module';
import { CellDeleteDialogComponent } from 'app/entities/cell/cell-delete-dialog.component';
import { CellService } from 'app/entities/cell/cell.service';

describe('Component Tests', () => {
  describe('Cell Management Delete Component', () => {
    let comp: CellDeleteDialogComponent;
    let fixture: ComponentFixture<CellDeleteDialogComponent>;
    let service: CellService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConqcubesTestModule],
        declarations: [CellDeleteDialogComponent]
      })
        .overrideTemplate(CellDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CellDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CellService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
