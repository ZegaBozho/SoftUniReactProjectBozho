import { createSlice } from '@reduxjs/toolkit'


export const loginUserSlice = createSlice({
    name: 'login',
    initialState: {
        username:'',
        userId: '',
        imgUrl: '',
        email: ''
    },
    reducers: {
        login : (state, action) => {
            state = action.payload
        }
    },
})

export const { login } = loginUserSlice.actions;

export default loginUserSlice.reducer;