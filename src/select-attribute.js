import {customAttribute, bindable, inject} from 'aurelia-framework';

@inject(Element)
@customAttribute('au-select')
export class SelectAttribute {
    constructor(element) {
        this.element = element;
    }

    attached() {

    }

    detached() {

    }

    valueChanged(newValue) {
        if (newValue) {

        } else {

        }
    }

}
