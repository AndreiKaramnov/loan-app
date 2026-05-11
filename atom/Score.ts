import {BaseElement} from "./BaseElement";
import {Locator} from "@playwright/test";


export class Score extends BaseElement {

    constructor(element: Locator) {
        super(element);
    }
}