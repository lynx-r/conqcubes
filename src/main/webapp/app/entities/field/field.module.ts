import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConqcubesSharedModule } from 'app/shared/shared.module';
import { FieldComponent } from './field.component';
import { FieldDetailComponent } from './field-detail.component';
import { FieldUpdateComponent } from './field-update.component';
import { FieldDeleteDialogComponent, FieldDeletePopupComponent } from './field-delete-dialog.component';
import { fieldPopupRoute, fieldRoute } from './field.route';

const ENTITY_STATES = [...fieldRoute, ...fieldPopupRoute];

@NgModule({
  imports: [ConqcubesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [FieldComponent, FieldDetailComponent, FieldUpdateComponent, FieldDeleteDialogComponent, FieldDeletePopupComponent],
  entryComponents: [FieldDeleteDialogComponent]
})
export class ConqcubesFieldModule {}
