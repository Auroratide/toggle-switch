import { fixture, expect } from '@open-wc/testing'
import './define.js'

describe('toggle-switch', () => {
    it('works', async () => {
        const el = await fixture(`<toggle-switch>Hello</toggle-switch>`)

        expect(el.textContent).to.equal('Hello')
    })
})
