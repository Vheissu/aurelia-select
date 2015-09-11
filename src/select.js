import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';

@inject(Element)
@customElement('au-select')
export class Select {
    showing = false;
    showSearch = false;
    filteredValues = [];
    currentItem = null;

    defaultOptions = {
        minimumResultsForSearch: Infinity,
        minimumSearchCharacters: 3,
        searchCaseSensitive: false,
        width: 'element'
    };

    @bindable options = {};

    @bindable values = [];

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.filteredValues = this.values;

        for (let value of this.values) {
            if (value.selected) {
                this.currentItem = value;
            }
        }

        document.addEventListener('click', e => {
            if (!this.element.contains(e.target)) {
                this.showing = false;
            }
        });

        if (this.options.width === 'element') {
            this.realSelect.style.display = 'initial';
            this.element.style.width = this.realSelect.offsetWidth + 'px';
            this.realSelect.style.display = '';
        } else {
            this.element.style.width = this.options.width;
        }
    }

    updateActiveItem(val) {

        this.showSearch = (this.values.length >= this.options.minimumResultsForSearch);
    }

    onSearchChange(evt) {
        let value = evt.target.value;

        if (value.length && value.length >= this.options.minimumSearchCharacters) {
                if (this.options.searchCaseSensitive) {
                    return obj.label.indexOf(value) >= 0;
                } else {
                    return obj.label.toLowerCase().indexOf(value) >= 0;
                }
            });

            this.filteredValues = filtered;
        } else {
            this.filteredValues = this.values;
        }
    }

    optionsChanged(newVal) {
        this.parseUserOptions();
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

    /**
     * Parse User Options
     * Handles parsing options provided by user or if none
     * uses the default options instead, with selective merging
     */
    parseUserOptions() {
        if (!this.options) {
            Object.assign(this.options, this.defaultOptions);
        } else {
            try {
                eval('this.options='+this.options+';');

                Object.assign(this.options, Object.assign({}, this.defaultOptions, this.options));
            } catch(e) {
                console.error(e.message);
            }
        }
    }

}
