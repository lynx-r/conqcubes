import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Field, IField } from 'app/shared/model/field.model';
import { FieldService } from './field.service';

@Component({
  selector: 'jhi-field-update',
  templateUrl: './field-update.component.html'
})
export class FieldUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    width: [],
    height: []
  });

  constructor(protected fieldService: FieldService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ field }) => {
      this.updateForm(field);
    });
  }

  updateForm(field: IField) {
    this.editForm.patchValue({
      id: field.id,
      width: field.width,
      height: field.height
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const field = this.createFromForm();
    if (field.id !== undefined) {
      this.subscribeToSaveResponse(this.fieldService.update(field));
    } else {
      this.subscribeToSaveResponse(this.fieldService.create(field));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IField>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  private createFromForm(): IField {
    return {
      ...new Field(),
      id: this.editForm.get(['id']).value,
      width: this.editForm.get(['width']).value,
      height: this.editForm.get(['height']).value
    };
  }
}
