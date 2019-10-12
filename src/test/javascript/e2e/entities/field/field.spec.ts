// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldComponentsPage, FieldDeleteDialog, FieldUpdatePage } from './field.page-object';

const expect = chai.expect;

describe('Field e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fieldUpdatePage: FieldUpdatePage;
  let fieldComponentsPage: FieldComponentsPage;
  let fieldDeleteDialog: FieldDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Fields', async () => {
    await navBarPage.goToEntity('field');
    fieldComponentsPage = new FieldComponentsPage();
    await browser.wait(ec.visibilityOf(fieldComponentsPage.title), 5000);
    expect(await fieldComponentsPage.getTitle()).to.eq('conqcubesApp.field.home.title');
  });

  it('should load create Field page', async () => {
    await fieldComponentsPage.clickOnCreateButton();
    fieldUpdatePage = new FieldUpdatePage();
    expect(await fieldUpdatePage.getPageTitle()).to.eq('conqcubesApp.field.home.createOrEditLabel');
    await fieldUpdatePage.cancel();
  });

  it('should create and save Fields', async () => {
    const nbButtonsBeforeCreate = await fieldComponentsPage.countDeleteButtons();

    await fieldComponentsPage.clickOnCreateButton();
    await promise.all([fieldUpdatePage.setWidthInput('5'), fieldUpdatePage.setHeightInput('5')]);
    expect(await fieldUpdatePage.getWidthInput()).to.eq('5', 'Expected width value to be equals to 5');
    expect(await fieldUpdatePage.getHeightInput()).to.eq('5', 'Expected height value to be equals to 5');
    await fieldUpdatePage.save();
    expect(await fieldUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fieldComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Field', async () => {
    const nbButtonsBeforeDelete = await fieldComponentsPage.countDeleteButtons();
    await fieldComponentsPage.clickOnLastDeleteButton();

    fieldDeleteDialog = new FieldDeleteDialog();
    expect(await fieldDeleteDialog.getDialogTitle()).to.eq('conqcubesApp.field.delete.question');
    await fieldDeleteDialog.clickOnConfirmButton();

    expect(await fieldComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
