export const CHANGED = 'toggle-switch:changed'
export const changeEvent = (checked) => new CustomEvent(CHANGED, {
    detail: { checked }
})
