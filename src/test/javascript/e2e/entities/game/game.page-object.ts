import { by, element, ElementFinder } from 'protractor';

export class GameComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-game div table .btn-danger'));
  title = element.all(by.css('jhi-game div h2#page-heading span')).first();

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

export class GameUpdatePage {
  pageTitle = element(by.id('jhi-game-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  playerSelect = element(by.id('field_player'));
  gameFieldSelect = element(by.id('field_gameField'));
  loggedPlayerSelect = element(by.id('field_loggedPlayer'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
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

  async gameFieldSelectLastOption(timeout?: number) {
    await this.gameFieldSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async gameFieldSelectOption(option) {
    await this.gameFieldSelect.sendKeys(option);
  }

  getGameFieldSelect(): ElementFinder {
    return this.gameFieldSelect;
  }

  async getGameFieldSelectedOption() {
    return await this.gameFieldSelect.element(by.css('option:checked')).getText();
  }

  async loggedPlayerSelectLastOption(timeout?: number) {
    await this.loggedPlayerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async loggedPlayerSelectOption(option) {
    await this.loggedPlayerSelect.sendKeys(option);
  }

  getLoggedPlayerSelect(): ElementFinder {
    return this.loggedPlayerSelect;
  }

  async getLoggedPlayerSelectedOption() {
    return await this.loggedPlayerSelect.element(by.css('option:checked')).getText();
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

export class GameDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-game-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-game'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
