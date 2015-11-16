import {customAttribute, bindable, inject, TemplatingEngine} from 'aurelia-framework';

@inject(Element, TemplatingEngine)
@customAttribute('au-select')
export class SelectAttribute {
    constructor(element, templatingEngine) {
        this.element = element;
        this.templatingEngine = templatingEngine;
    }

    attached() {
        //this.templatingEngine.enhance({element: this.element});
    }

    detached() {

    }

    valueChanged(newValue) {
        if (newValue) {

        } else {

        }
    }

}
