import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConqcubesTestModule } from '../../../test.module';
import { CellDetailComponent } from 'app/entities/cell/cell-detail.component';
import { Cell } from 'app/shared/model/cell.model';

describe('Component Tests', () => {
  describe('Cell Management Detail Component', () => {
    let comp: CellDetailComponent;
    let fixture: ComponentFixture<CellDetailComponent>;
    const route = ({ data: of({ cell: new Cell(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConqcubesTestModule],
        declarations: [CellDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CellDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CellDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cell).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
