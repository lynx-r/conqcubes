// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CellComponentsPage, CellDeleteDialog, CellUpdatePage } from './cell.page-object';

const expect = chai.expect;

describe('Cell e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cellUpdatePage: CellUpdatePage;
  let cellComponentsPage: CellComponentsPage;
  let cellDeleteDialog: CellDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Cells', async () => {
    await navBarPage.goToEntity('cell');
    cellComponentsPage = new CellComponentsPage();
    await browser.wait(ec.visibilityOf(cellComponentsPage.title), 5000);
    expect(await cellComponentsPage.getTitle()).to.eq('conqcubesApp.cell.home.title');
  });

  it('should load create Cell page', async () => {
    await cellComponentsPage.clickOnCreateButton();
    cellUpdatePage = new CellUpdatePage();
    expect(await cellUpdatePage.getPageTitle()).to.eq('conqcubesApp.cell.home.createOrEditLabel');
    await cellUpdatePage.cancel();
  });

  it('should create and save Cells', async () => {
    const nbButtonsBeforeCreate = await cellComponentsPage.countDeleteButtons();

    await cellComponentsPage.clickOnCreateButton();
    await promise.all([
      cellUpdatePage.setXInput('5'),
      cellUpdatePage.setYInput('5'),
      cellUpdatePage.setWInput('5'),
      cellUpdatePage.setHInput('5'),
      cellUpdatePage.fieldSelectLastOption(),
      cellUpdatePage.playerSelectLastOption()
    ]);
    expect(await cellUpdatePage.getXInput()).to.eq('5', 'Expected x value to be equals to 5');
    expect(await cellUpdatePage.getYInput()).to.eq('5', 'Expected y value to be equals to 5');
    expect(await cellUpdatePage.getWInput()).to.eq('5', 'Expected w value to be equals to 5');
    expect(await cellUpdatePage.getHInput()).to.eq('5', 'Expected h value to be equals to 5');
    await cellUpdatePage.save();
    expect(await cellUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cellComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Cell', async () => {
    const nbButtonsBeforeDelete = await cellComponentsPage.countDeleteButtons();
    await cellComponentsPage.clickOnLastDeleteButton();

    cellDeleteDialog = new CellDeleteDialog();
    expect(await cellDeleteDialog.getDialogTitle()).to.eq('conqcubesApp.cell.delete.question');
    await cellDeleteDialog.clickOnConfirmButton();

    expect(await cellComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
