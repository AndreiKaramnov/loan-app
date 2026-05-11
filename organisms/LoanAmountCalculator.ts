import {Input} from "../atom/Input";
import {expect, Locator} from "@playwright/test";
import {Button} from "../atom/Button";


export class LoanAmountCalculator {
    readonly container: Locator;
    readonly errorMessage: Locator;
    readonly inputAmount: Input;
    readonly sliderAmount: Input;
    readonly inputPeriod: Input;
    readonly sliderPeriod: Input;
    readonly monthlyPayment: Locator;
    readonly applyBtn: Button;


    constructor(container: Locator) {
        this.container = container;
        this.errorMessage = container.getByTestId('id-small-loan-calculator-field-error');
        this.inputAmount = new Input (container.getByTestId('id-small-loan-calculator-field-amount'));
        this.sliderAmount = new Input (container.getByTestId('id-small-loan-calculator-field-amount-slider'));
        this.inputPeriod = new Input (container.getByTestId('ib-small-loan-calculator-field-period'));
        this.sliderPeriod = new Input (container.getByTestId('ib-small-loan-calculator-field-period-slider'));
        this.monthlyPayment = container.getByTestId('ib-small-loan-calculator-field-monthlyPayment');
        this.applyBtn = new Button (container.getByTestId('id-small-loan-calculator-field-apply'));
    }
    async checkError(): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
    }

    async checkCalculatorElements(): Promise<void> {
        await this.inputAmount.checkElementVisible(true);
        await this.sliderAmount.checkElementVisible(true);
        await this.inputPeriod.checkElementVisible(true);
        await this.sliderPeriod.checkElementVisible(true);
        await expect(this.monthlyPayment).toBeVisible();
        await this.applyBtn.checkElementVisible(true);
    }
    async checkElementsToBeInViewport(): Promise<void> {
        await this.inputAmount.toBeInViewportElement();
        await this.sliderAmount.toBeInViewportElement();
        await this.inputPeriod.toBeInViewportElement();
        await this.sliderPeriod.toBeInViewportElement();
        await expect(this.monthlyPayment).toBeInViewport();
        await this.applyBtn.toBeInViewportElement();
    }
    async checkMonthlyPaymentValue(expectedValue: string): Promise<void> {
        await expect(this.monthlyPayment).toContainText(expectedValue);
    }
}