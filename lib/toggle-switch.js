const CHECKED_ATTR = 'checked'

export class ToggleSwitch extends HTMLElement {
    static elementName = 'toggle-switch'

    static get observedAttributes() {
        return [CHECKED_ATTR]
    }

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'switch')
        }

        this.setAttribute('aria-checked', this.checked.toString())
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === CHECKED_ATTR) {
            this.setAttribute('aria-checked', this.checked.toString())
        }
    }

    get checked() { return this.hasAttribute(CHECKED_ATTR) }
    set checked(value) {
        if (value) {
            this.setAttribute(CHECKED_ATTR, '')
        } else {
            this.removeAttribute(CHECKED_ATTR)
        }
    }
}
