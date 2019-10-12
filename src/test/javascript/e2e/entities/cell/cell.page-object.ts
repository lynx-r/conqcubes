import { by, element, ElementFinder } from 'protractor';

export class CellComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cell div table .btn-danger'));
  title = element.all(by.css('jhi-cell div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CellUpdatePage {
  pageTitle = element(by.id('jhi-cell-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  xInput = element(by.id('field_x'));
  yInput = element(by.id('field_y'));
  wInput = element(by.id('field_w'));
  hInput = element(by.id('field_h'));
  fieldSelect = element(by.id('field_field'));
  playerSelect = element(by.id('field_player'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setXInput(x) {
    await this.xInput.sendKeys(x);
  }

  async getXInput() {
    return await this.xInput.getAttribute('value');
  }

  async setYInput(y) {
    await this.yInput.sendKeys(y);
  }

  async getYInput() {
    return await this.yInput.getAttribute('value');
  }

  async setWInput(w) {
    await this.wInput.sendKeys(w);
  }

  async getWInput() {
    return await this.wInput.getAttribute('value');
  }

  async setHInput(h) {
    await this.hInput.sendKeys(h);
  }

  async getHInput() {
    return await this.hInput.getAttribute('value');
  }

  async fieldSelectLastOption(timeout?: number) {
    await this.fieldSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async fieldSelectOption(option) {
    await this.fieldSelect.sendKeys(option);
  }

  getFieldSelect(): ElementFinder {
    return this.fieldSelect;
  }

  async getFieldSelectedOption() {
    return await this.fieldSelect.element(by.css('option:checked')).getText();
  }

  async playerSelectLastOption(timeout?: number) {
    await this.playerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async playerSelectOption(option) {
    await this.playerSelect.sendKeys(option);
  }

  getPlayerSelect(): ElementFinder {
    return this.playerSelect;
  }

  async getPlayerSelectedOption() {
    return await this.playerSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CellDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cell-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cell'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
