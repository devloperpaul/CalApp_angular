import { browser, by, element, until } from 'protractor';

export class CalcPage {
    async navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl);
    }

    async getCalcComponent(): Promise<any> {
        return element(by.css('.calc-container'));
    }

    async getResultText(): Promise<string> {
        return element(by.css('.calc-display-result')).getText();
    }

    async getInputBtn(btnId: string): Promise<HTMLElement> {
        return element(by.css(`#${btnId}`));
    }
}
