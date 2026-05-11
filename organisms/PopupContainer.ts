import {Input} from "../atom/Input";
import {Button} from "../atom/Button";
import {expect, Locator} from "@playwright/test";


export class PopupContainer {
    readonly container: Locator;
    readonly loginInput: Input;
    readonly passwordInput: Input;
    readonly continueButton: Button;
    readonly closeButton: Button;

    constructor(container: Locator) {
        this.container = container;
        this.loginInput = new Input(container.getByTestId('login-popup-username-input'));
        this.passwordInput = new Input(container.getByTestId('login-popup-password-input'));
        this.continueButton = new Button(container.getByTestId('login-popup-continue-button'));
        this.closeButton = new Button(container.getByTestId('login-popup-close-button'));
    }
    async checkPopupElements(): Promise<void> {
        await this.loginInput.checkElementVisible(true);
        await this.passwordInput.checkElementVisible(true);
        await this.continueButton.checkElementVisible(true);
        // await this.closeButton.checkElementVisible(true); кнопка hidden по CSS
    }
    async checkElementsToBeInViewport(): Promise<void> {
        await this.loginInput.toBeInViewportElement();
        await this.passwordInput.toBeInViewportElement();
        await this.continueButton.toBeInViewportElement();
        await this.closeButton.toBeInViewportElement();
    }
    async close(): Promise<void> {
        await this.closeButton.click();
    }
}
