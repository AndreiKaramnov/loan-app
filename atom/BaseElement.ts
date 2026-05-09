import {expect, Locator} from "@playwright/test";


export class BaseElement {

    constructor(protected readonly element: Locator) {
        this.element = element;
    }
    async checkElementVisible(visible = true): Promise<void> {
        await expect(this.element).toBeVisible({ visible });
    }
    async toBeInViewportElement (): Promise<void> {
        await expect(this.element).toBeInViewport();
    }
    async scrollIntoViewIfNeededElement (): Promise<void> {
        await this.element.scrollIntoViewIfNeeded();
    }
}