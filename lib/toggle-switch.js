const CHECKED_ATTR = 'checked'

const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
        }

        span {
            display: inline-block;
        }

        .track {
            width: 2em;
            height: 1em;
            background-color: #eee;
        }

        .slider {
            width: 50%;
            height: 1em;
            background-color: #aaa;
        }
    </style>

    <span class="track">
        <span class="slider"></span>
    </span>
`

export class ToggleSwitch extends HTMLElement {
    static elementName = 'toggle-switch'

    static get observedAttributes() {
        return [CHECKED_ATTR]
    }

    constructor() {
        super()

        this
            .attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
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
