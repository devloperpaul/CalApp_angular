import { browser, logging, until, element, by, ExpectedConditions } from 'protractor';
import { AppPage } from './app.po';
import { CalcPage } from './calc.po';

describe('workspace-project App', () => {
  let page: AppPage;
  let calcPage: CalcPage;

  beforeEach(() => {
    page = new AppPage();
    calcPage = new CalcPage();
  });

  it('Should display the calculator', async() => {
    await calcPage.navigateTo();
    expect(await calcPage.getCalcComponent()).toBeDefined();
  });

  it('Valid input should result in valid output', async() => {
    await calcPage.navigateTo();
    (await calcPage.getInputBtn('startBrace')).click();
    (await calcPage.getInputBtn('btn-6')).click();
    (await calcPage.getInputBtn('btn-op-3')).click();
    (await calcPage.getInputBtn('btn-2')).click();
    (await calcPage.getInputBtn('endBrace')).click();
    (await calcPage.getInputBtn('resultBtn')).click();
    expect(await calcPage.getResultText()).toEqual('3');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
