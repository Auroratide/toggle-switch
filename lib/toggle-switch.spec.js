import { fixture, expect } from '@open-wc/testing'
import './define.js'

describe('toggle-switch', () => {
    it('works', async () => {
        const el = await fixture(`<toggle-switch>Hello</toggle-switch>`)

        expect(el.textContent).to.equal('Hello')
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
    })
})
