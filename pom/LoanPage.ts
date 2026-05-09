import {Page} from "@playwright/test";
import {SERVICE_URL} from "../config/env-data";
import {Button} from "../atom/Button";
import {LoanAmountCalculator} from "../organisms/LoanAmountCalculator";
import {PopupContainer} from "../organisms/PopupContainer";

export class LoanPage {

    readonly page: Page;
    readonly firstBtn: Button;
    readonly secondBtn: Button;
    readonly calculator: LoanAmountCalculator
    readonly popupContainer: PopupContainer;
    private readonly URL_FIRST = SERVICE_URL;

    constructor(page: Page) {
        this.page = page;
        this.calculator = new LoanAmountCalculator(page.locator('.Container').nth(0));
        this.popupContainer = new PopupContainer(page.locator('.popup-container'));
        this.firstBtn = new Button (page.getByTestId('id-image-element-button-image-1'));
        this.secondBtn = new Button (page.getByTestId('id-image-element-button-image-2'));
    }

    async goTo(): Promise<void> {
        await this.page.goto(this.URL_FIRST);
    }
    async checkElementsVisible(): Promise<void> {
        await this.calculator.checkCalculatorElements();
        await this.firstBtn.checkElementVisible(true);
        await this.secondBtn.checkElementVisible(true);
    }
    async checkElementsToBeInViewport(): Promise<void> {
        await this.calculator.checkElementsToBeInViewport();
        await this.firstBtn.scrollIntoViewIfNeededElement();
        await this.firstBtn.toBeInViewportElement();
        await this.secondBtn.scrollIntoViewIfNeededElement();
        await this.secondBtn.toBeInViewportElement();
    }
    async checkButtonsEnabled(): Promise<void> {
        await this.calculator.applyBtn.checkBtnEnabled(true);
        await this.firstBtn.checkBtnEnabled(true);
        await this.secondBtn.checkBtnEnabled(true);
    }
}

