import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConqcubesTestModule } from '../../../test.module';
import { GameDeleteDialogComponent } from 'app/entities/game/game-delete-dialog.component';
import { GameService } from 'app/entities/game/game.service';

describe('Component Tests', () => {
  describe('Game Management Delete Component', () => {
    let comp: GameDeleteDialogComponent;
    let fixture: ComponentFixture<GameDeleteDialogComponent>;
    let service: GameService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConqcubesTestModule],
        declarations: [GameDeleteDialogComponent]
      })
        .overrideTemplate(GameDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GameDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GameService);
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
