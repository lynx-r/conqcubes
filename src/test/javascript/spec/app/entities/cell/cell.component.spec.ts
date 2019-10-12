import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConqcubesTestModule } from '../../../test.module';
import { CellComponent } from 'app/entities/cell/cell.component';
import { CellService } from 'app/entities/cell/cell.service';
import { Cell } from 'app/shared/model/cell.model';

describe('Component Tests', () => {
  describe('Cell Management Component', () => {
    let comp: CellComponent;
    let fixture: ComponentFixture<CellComponent>;
    let service: CellService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConqcubesTestModule],
        declarations: [CellComponent],
        providers: []
      })
        .overrideTemplate(CellComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CellComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CellService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cell(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cells[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
