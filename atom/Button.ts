import { expect, Locator } from "@playwright/test";
import {BaseElement} from "./BaseElement";

export class Button extends BaseElement{

    constructor(element: Locator) {
        super(element)
    }
    async click(): Promise<void> {
        await this.element.click();
    }
    async checkBtnEnabled(enabled = true): Promise<void> {
        if (enabled) {
            await expect(this.element).toBeEnabled()
        } else {
            await expect(this.element).toBeDisabled()
        }
    }
}