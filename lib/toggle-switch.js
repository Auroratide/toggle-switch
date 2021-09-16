export class ToggleSwitch extends HTMLElement {
    static elementName = 'toggle-switch'

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'switch')
        }
    }
}
