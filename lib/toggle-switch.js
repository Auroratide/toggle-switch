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
            cursor: pointer;
            width: 2em;
            height: 1em;
            background-color: #dddddd;
        }

        .slider {
            width: 50%;
            height: 100%;
            background-color: #777777;
            transition: all 0.256s;
        }

        :host([checked]) .slider {
            margin-left: 100%;
            transform: translateX(-100%);
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

        this.addEventListener('click', this.toggle)
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.toggle)
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

    toggle = () => {
        this.checked = !this.checked
    }
}
