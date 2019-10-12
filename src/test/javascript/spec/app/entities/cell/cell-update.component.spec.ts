import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ConqcubesTestModule } from '../../../test.module';
import { CellUpdateComponent } from 'app/entities/cell/cell-update.component';
import { CellService } from 'app/entities/cell/cell.service';
import { Cell } from 'app/shared/model/cell.model';

describe('Component Tests', () => {
  describe('Cell Management Update Component', () => {
    let comp: CellUpdateComponent;
    let fixture: ComponentFixture<CellUpdateComponent>;
    let service: CellService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConqcubesTestModule],
        declarations: [CellUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CellUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CellUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CellService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cell(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cell();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
