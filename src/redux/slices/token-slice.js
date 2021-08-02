import { createSlice } from "@reduxjs/toolkit"; 

const initialTokenState = {
    token: null
}

const tokenSlice = createSlice({
    name: 'tokenSlice',
    initialState: initialTokenState,
    reducers: {
        getToken(state, action) {
            state.token = action.payload
        },
        emptyToken(state) {
            state.token = null
        }
    }
})

export const tokenActions = tokenSlice.actions

export default tokenSlice.reducer