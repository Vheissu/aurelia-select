import {customAttribute, bindable, inject, TemplatingEngine} from 'aurelia-framework';
import {Select} from './select';

@inject(Element, Select, TemplatingEngine)
@customAttribute('au-select')
export class SelectAttribute {
    constructor(element, select, templatingEngine) {
        this.element = element;
        this.select = select;
        this.templatingEngine = templatingEngine;
    }

    attached() {
        this.templatingEngine.enhance({element: this.element, bindingContext: this.select});
    }

    valueChanged(newValue) {
        if (newValue) {

        } else {

        }
    }

}
