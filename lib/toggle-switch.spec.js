import { fixture, expect } from '@open-wc/testing'
import './define.js'

chai.use(function(_chai, utils) {
    const Assertion = _chai.Assertion

    Assertion.addMethod('on', function() {
        this.assert(
            this._obj.hasAttribute('checked') && this._obj.getAttribute('aria-checked') === 'true',
            'expected #{this} to be on',
            'expected #{this} to not be on'
        )
    })

    Assertion.addMethod('off', function() {
        this.assert(
            !this._obj.hasAttribute('checked') && this._obj.getAttribute('aria-checked') === 'false',
            'expected #{this} to be off',
            'expected #{this} to not be off'
        )
    })
})

const pressKey = (key) => {
    const focusedElement = document.activeElement
    focusedElement.dispatchEvent(new KeyboardEvent('keydown', { key }))
    focusedElement.dispatchEvent(new KeyboardEvent('keyup', { key }))
}

describe('toggle-switch', () => {
    describe('toggling on and off', () => {
        it('via the API', async () => {
            const el = await fixture(`<toggle-switch></toggle-switch>`)

            expect(el).to.be.off()

            el.toggle()
            expect(el).to.be.on()

            el.toggle()
            expect(el).to.be.off()
        })

        it('via clicking', async () => {
            const el = await fixture(`<toggle-switch></toggle-switch>`)

            expect(el).to.be.off()

            el.click()
            expect(el).to.be.on()

            el.click()
            expect(el).to.be.off()
        })

        it('via keypresses', async () => {
            const el = await fixture(`<toggle-switch></toggle-switch>`)

            expect(el).to.be.off()

            el.focus()
            pressKey(' ')
            expect(el).to.be.on()

            pressKey('Enter')
            expect(el).to.be.off()
        })
    })

    describe('checked attribute', () => {
        it('unchecked', async () => {
            const el = await fixture(`<toggle-switch></toggle-switch>`)

            expect(el).to.be.off()
        })

        it('checked', async () => {
            const el = await fixture(`<toggle-switch checked></toggle-switch>`)

            expect(el).to.be.on()
        })

        it('update via property', async () => {
            const el = await fixture(`<toggle-switch></toggle-switch>`)

            expect(el).to.be.off()

            el.checked = true
            expect(el).to.be.on()

            el.checked = false
            expect(el).to.be.off()
        })

        it('update via attribute', async () => {
            const el = await fixture(`<toggle-switch></toggle-switch>`)

            expect(el).to.be.off()

            el.setAttribute('checked', '')
            expect(el).to.be.on()

            el.removeAttribute('checked')
            expect(el).to.be.off()
        })
    })

    describe('accessibility', () => {
        it('default role', async () => {
            const el = await fixture(`<toggle-switch></toggle-switch>`)
    
            expect(el.getAttribute('role')).to.equal('switch')
        })

        it('user-provided role', async () => {
            const el = await fixture(`<toggle-switch role="checkbox"></toggle-switch>`)
    
            expect(el.getAttribute('role')).to.equal('checkbox')
        })

        it('tabbable', async () => {
            const el = await fixture(`<toggle-switch></toggle-switch>`)

            expect(el.getAttribute('tabindex')).to.equal('0')
        })
    })
})
