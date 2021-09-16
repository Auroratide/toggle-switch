export class ToggleSwitch extends HTMLElement {
    static elementName = 'toggle-switch'

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'switch')
        }

        this.setAttribute('aria-checked', this.checked.toString())
    }

    get checked() { return this.hasAttribute('checked') }
}
