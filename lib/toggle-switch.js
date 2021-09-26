import { changeEvent } from './events.js'

const CHECKED_ATTR = 'checked'
const DISABLED_ATTR = 'disabled'

const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
            width: 2em;
            height: 1em;
            cursor: pointer;
        }

        span {
            box-sizing: border-box;
            display: inline-block;
            line-height: 1;
        }

        [part="track"] {
            width: 100%;
            height: 100%;
            background-color: #dddddd;
            text-align: left;
            transition: all 0.256s;
        }

        [part="slider"] {
            width: 50%;
            height: 100%;
            background-color: #777777;
            transition: all 0.256s;
            vertical-align: text-top;
        }

        :host([checked]) [part="slider"] {
            transform: translateX(100%);
        }

        :host([disabled]) {
            cursor: not-allowed;
            opacity: 0.5;
        }
    </style>

    <span part="track">
        <span part="slider"></span>
    </span>
`

export class ToggleSwitch extends HTMLElement {
    static elementName = 'toggle-switch'

    // Currently, only Chrome adequately supports this part of the spec
    static formAssociated = true

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

        this._updateChecked(false)

        this.addEventListener('click', this.toggle)
        this.addEventListener('keydown', this._onKeyDown)
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.toggle)
        this.removeEventListener('keydown', this._onKeyDown)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === CHECKED_ATTR) {
            this._updateChecked(true)
        }
    }

    get checked() { return this.hasAttribute(CHECKED_ATTR) }
    set checked(value) { this.toggleAttribute(CHECKED_ATTR, value) }

    get disabled() { return this.hasAttribute(DISABLED_ATTR) }
    set disabled(value) { this.toggleAttribute(DISABLED_ATTR, value) }

    toggle = () => {
        if (!this.disabled) {
            this.checked = !this.checked
        }
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

    _updateChecked = (dispatch = false) => {
        this.setAttribute('aria-checked', this.checked.toString())
        if (dispatch)
            this.dispatchEvent(changeEvent(this.checked))
    }
}
