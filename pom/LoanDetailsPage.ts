import {DETAILS_URL} from "../config/env-data";
import {Input} from "../atom/Input";
import {Button} from "../atom/Button";
import {Locator, Page} from "@playwright/test";
import {Score} from "../atom/Score";
import {FinalPopup} from "../organisms/FinalPopup";

export class LoanDetails {
    readonly page: Page;
    private readonly URL_SECOND = DETAILS_URL
    private readonly amountScore: Score;
    private readonly monthlyPaymentScore: Score;
    private readonly periodScore: Score;
    readonly inputName: Input;
    readonly inputCommunicationLang: Input;
    readonly continueBtn: Button;
    readonly finalPopupContainer: FinalPopup;

    constructor(page: Page) {
        this.page = page;
        this.amountScore = new Score (page.getByTestId('final-page-amount'));
        this.monthlyPaymentScore = new Score (page.getByTestId('final-page-monthly-payment'));
        this.periodScore = new Score (page.getByTestId('final-page-period'));
        this.inputName = new Input (page.getByTestId('final-page-full-name'));
        this.inputCommunicationLang = new Input(page.getByTestId('final-page-communication-language'));
        this.continueBtn = new Button (page.getByTestId('final-page-continue-button'));
        this.finalPopupContainer = new FinalPopup (page.locator('.popup-container'));
    }
    async checkElementsVisible(): Promise<void> {
        await this.amountScore.checkElementVisible();
        await this.monthlyPaymentScore.checkElementVisible();
        await this.periodScore.checkElementVisible();
        await this.inputName.checkElementVisible();
        await this.inputCommunicationLang.checkElementVisible();
        await this.continueBtn.checkElementVisible();
    }

}