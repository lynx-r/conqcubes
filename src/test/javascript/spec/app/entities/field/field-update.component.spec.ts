import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ConqcubesTestModule } from '../../../test.module';
import { FieldUpdateComponent } from 'app/entities/field/field-update.component';
import { FieldService } from 'app/entities/field/field.service';
import { Field } from 'app/shared/model/field.model';

describe('Component Tests', () => {
  describe('Field Management Update Component', () => {
    let comp: FieldUpdateComponent;
    let fixture: ComponentFixture<FieldUpdateComponent>;
    let service: FieldService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConqcubesTestModule],
        declarations: [FieldUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FieldUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FieldUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FieldService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Field(123);
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
        const entity = new Field();
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
