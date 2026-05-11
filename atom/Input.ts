import {BaseElement} from "./BaseElement";
import {expect, Locator} from "@playwright/test";


export class Input extends BaseElement {

    constructor(element: Locator) {
        super(element);
    }

    async fill(value: string): Promise<void> {
        await this.element.fill(value);
    }

    async selectOption(value: string): Promise<void> {
        await this.element.selectOption(value);
    }

    async checkInputEnabled(enabled = true): Promise<void> {
        if (enabled) {
            await expect(this.element).toBeEnabled()
        } else {
            await expect(this.element).toBeDisabled()
        }
    }
    async checkInputValue(expectedValue: string): Promise<void> {
        await expect(this.element).toHaveValue(expectedValue);
    }
}