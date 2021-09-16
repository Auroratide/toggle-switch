const CHECKED_ATTR = 'checked'

const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
            width: 2em;
            height: 1em;
        }

        span {
            display: inline-block;
        }

        .track {
            cursor: pointer;
            width: 100%;
            height: 100%;
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

        if (!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', '0')
        }

        this.setAttribute('aria-checked', this.checked.toString())

        this.addEventListener('click', this.toggle)
        this.addEventListener('keydown', this._onKeyDown)
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.toggle)
        this.removeEventListener('keydown', this._onKeyDown)
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

    _onKeyDown = (e) => {
        switch(e.key) {
            case ' ':
            case 'Enter':
                e.preventDefault()
                this.toggle()
                break;
            default:
                break;
        }
    }
}
