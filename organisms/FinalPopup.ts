import {Button} from "../atom/Button";
import {Locator} from "@playwright/test";

export class FinalPopup {

    readonly container: Locator;
    readonly successBtn: Button;

    constructor(container: Locator) {
        this.container = container;
        this.successBtn = new Button (container.getByTestId('final-page-success-ok-button'));
    }
    async checkPopupElements(): Promise<void> {
        await this.successBtn.checkElementVisible();
        await this.successBtn.checkBtnEnabled();
    }
}