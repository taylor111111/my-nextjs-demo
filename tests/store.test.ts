import { store } from '@/store/store'
import { login, logout } from '@/store/userSlice'

describe('Redux Store - User Slice', () => {
    it('should set user data on login', () => {
        store.dispatch(login({ username: 'Taylor', email: 'taylor@example.com' }))
        const state = store.getState().user
        expect(state.username).toBe('Taylor')
        expect(state.email).toBe('taylor@example.com')
        expect(state.isLoggedIn).toBe(true)
    })

    it('should clear user data on logout', () => {
        store.dispatch(logout())
        const state = store.getState().user
        expect(state.username).toBe('')
        expect(state.email).toBe('')
        expect(state.isLoggedIn).toBe(false)
    })
})
