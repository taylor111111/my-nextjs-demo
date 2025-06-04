import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    username: string
    email: string
    isLoggedIn: boolean
}

const initialState: UserState = {
    username: '',
    email: '',
    isLoggedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ username: string; email: string }>) {
            state.username = action.payload.username
            state.email = action.payload.email
            state.isLoggedIn = true
        },
        logout(state) {
            state.username = ''
            state.email = ''
            state.isLoggedIn = false
        },
    },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
