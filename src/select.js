import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';

@inject(Element)
@customElement('au-select')
export class Select {
    showing = false;
    showSearch = true;
    filteredValues = [];
    currentItem = null;

    @bindable options = null;
    @bindable values = [];

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.filteredValues = this.values;

        this.values.forEach(obj => {
            if (obj.selected) {
                this.currentItem = obj;
            }
        });

        document.addEventListener('click', e => {
            if (!this.element.contains(e.target)) {
                this.showing = false;
            }
        });
    }

    updateActiveItem(val) {

    }

    onSearchChange(evt) {
        let value = evt.target.value;

        if (value.length) {

            let filtered = this.values.filter(obj => {
                return (obj.label.indexOf(value) >= 0);
            });

            this.filteredValues = filtered;
        } else {
            this.filteredValues = this.values;
        }
    }

    valuesChanged(newVal) {
        this.filteredValues = newVal;
    }

    itemClicked(evt, item) {
        this.currentItem = item;
        this.showing = false;
        evt.preventDefault();
    }

    /**
     * Toggle Dropdown
     * Handles the visibility state of our dropdown
     */
    toggleDropdown() {
        if (this.showing) {
            this.showing = false;
            this.dispatchEvent(this.element, this.createEvent('toggleDropdown.hide', {bubbles: false, cancelable: true}));
        } else {
            this.showing = true;
            this.dispatchEvent(this.element, this.createEvent('toggleDropdown.show', {bubbles: false, cancelable: true}));
        }
    }

    /**
     * Create Event
     * Handles DOM Event Creation
     * for plugin events
     * @param event
     * @param params
     * @returns {*}
     */
    createEvent(event, params = false) {
        var evt;

        // Makes sense to have default params defined inside function instead of on function itself
        params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };

        if (window.CustomEvent) {
            evt = new CustomEvent(event, params);
        } else {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        }

        return evt;
    }

    /**
     * Dispatch Event
     * Dispatches a custom event created through the above method
     * @param elem
     * @param event
     */
    dispatchEvent(elem, event) {
        elem.dispatchEvent(event);
    }

}
