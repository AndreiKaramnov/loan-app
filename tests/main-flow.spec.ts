import { test, expect } from '@playwright/test';
import {LoanPage} from "../pom/LoanPage";
import {LoanDetails} from "../pom/LoanDetailsPage";


// test('default flow with mock', async ({page}) => {
//     // we have to define mock before navigation to the page
//     // our json response is
//     // {"paymentAmountMonthly":42.8}
//     // response code is 200
//     // response headers is application/json
//     // route to intercept is https:
//
//     // define the response body as json object
//     const amountValue: string = '22.3'
//     const amountResponse = {paymentAmountMonthly: amountValue};
//
//     // intercept the route only for specific query parameters (default values)
//     await page.route('**/api/loan-calc?amount=500&period=12', async route => {
//         await route.fulfill({
//             json: amountResponse,
//             // status: 200 by default
//             // status: 400 in case of error
//         });
//     });
//
//     await page.goto(serviceURL);
//     await expect(page.getByTestId('ib-small-loan-calculator-field-monthlyPayment')).toBeVisible();
//     const textContentElement = await page.getByTestId('ib-small-loan-calculator-field-monthlyPayment').textContent()
//     console.log(textContentElement)
//     const monthlyValue = textContentElement?.replace('€', '').trim() ?? ''
//     expect(monthlyValue).toBe(amountValue);
// })
//
// test('main flow', async ({ page }) => {
//   await page.goto(serviceURL);
//   await page.getByTestId('id-small-loan-calculator-field-apply').click();
//   await page.getByTestId('login-popup-username-input').click();
//   await page.getByTestId('login-popup-username-input').fill('usern');
//   await page.getByTestId('login-popup-username-input').press('Tab');
//   await page.getByTestId('login-popup-password-input').fill('pwd');
//   await page.getByTestId('login-popup-continue-button').click();
//   await page.getByTestId('final-page-continue-button').click();
//   await page.getByTestId('final-page-success-ok-button').click();
// });

// test('redirect flow', async ({ page, request }) => {
//   await page.goto(serviceURL);
//   await page.getByTestId('id-image-element-button-image-1').click();
//   await expect( page.getByTestId('id-small-loan-calculator-field-apply') ).toBeInViewport()
//   await page.getByTestId('id-image-element-button-image-2').click();
//   await expect( page.getByTestId('id-small-loan-calculator-field-apply') ).toBeInViewport()
// })

test('Critical path', async ({ page }) => {
    const loanPage = new LoanPage(page);

    await page.route("**/api/loan-calc**", async route => {
        // if (route.request().method() === "POST") await route.continue();
        // const response = await route.fetch();
        // const json = await response.json();
        // expect (json.paymentAmountMonthly).toBeGreaterThan(0);
        console.log(route.request().url());
        await route.fulfill({status: 200, json: {paymentAmountMonthly: 1}, contentType: 'application/json'});
    })
    await loanPage.goTo();
    await loanPage.checkElementsVisible();
    await loanPage.checkElementsToBeInViewport();
    await loanPage.checkButtonsEnabled();

    await loanPage.calculator.inputAmount.fill('500');
    const loanCalcResponse = page.waitForResponse('**/api/loan-calc?**');
    await loanPage.calculator.inputPeriod.selectOption('24');
    await loanCalcResponse;
    await loanPage.calculator.applyBtn.click();

    await loanPage.popupContainer.checkPopupElements();
    await loanPage.popupContainer.checkElementsToBeInViewport();
    await loanPage.popupContainer.continueButton.checkBtnEnabled(false);
    await loanPage.popupContainer.loginInput.fill('test');
    await loanPage.popupContainer.passwordInput.fill('test');
    await loanPage.popupContainer.continueButton.click();

    const detailsPage = new LoanDetails(page);
    await detailsPage.checkElementsVisible();
    await detailsPage.inputName.checkInputEnabled(false);
    await detailsPage.inputName.checkInputValue('Name Surname');
    await detailsPage.inputCommunicationLang.selectOption('Russian');
    await detailsPage.continueBtn.click();
    await detailsPage.finalPopupContainer.checkPopupElements();
    await detailsPage.finalPopupContainer.successBtn.click();
    await loanPage.checkElementsVisible();
})
test('Incorrect amount error', async ({ page }) => {
    const loanPage = new LoanPage(page);
    await loanPage.goTo();
    await loanPage.checkElementsVisible();
    await loanPage.checkElementsToBeInViewport();
    await loanPage.checkButtonsEnabled();
    await loanPage.calculator.inputAmount.fill('100');
    await loanPage.calculator.inputPeriod.selectOption('24');
    await page.waitForTimeout(3000);
    await loanPage.calculator.checkError();
})
test('UI shows error when loan calc returns 500 without body', async ({ page }) => {
    const loanPage = new LoanPage(page);

    await page.route("**/api/loan-calc**", async route => {
       await route.fulfill({
           status: 500,
       })
    })
    const responsePromise = page.waitForResponse('**/api/loan-calc?**');
    await loanPage.goTo();
    await loanPage.calculator.inputAmount.fill('500');
    await loanPage.calculator.inputPeriod.selectOption('24');
    await loanPage.calculator.applyBtn.click();

    await responsePromise;
    await loanPage.calculator.checkError();
})
test('UI shows error when loan calc returns 200 without body', async ({ page }) => {
    const loanPage = new LoanPage(page);

    await page.route("**/api/loan-calc**", async route => {
        await route.fulfill({
            status: 200,
            json: {}
        })
    })
    const responsePromise = page.waitForResponse('**/api/loan-calc?**');
    await loanPage.goTo();
    await loanPage.calculator.inputAmount.fill('500');
    await loanPage.calculator.inputPeriod.selectOption('24');
    await loanPage.calculator.applyBtn.click();

    await responsePromise;
    await loanPage.calculator.checkMonthlyPaymentValue('undefined');
})
test('UI shows error when loan calc returns 200 with wrong response key', async ({ page }) => {
    const loanPage = new LoanPage(page);

    await page.route("**/api/loan-calc**", async route => {
        await route.fulfill({
            status: 200,
            json: {wrongKey: 1},
            contentType: 'application/json',
        })
    })
    const responsePromise = page.waitForResponse('**/api/loan-calc?**');
    await loanPage.goTo();
    await loanPage.calculator.inputAmount.fill('500');
    await loanPage.calculator.inputPeriod.selectOption('24');
    await loanPage.calculator.applyBtn.click();

    await responsePromise;
    await loanPage.calculator.checkMonthlyPaymentValue('undefined');
})
