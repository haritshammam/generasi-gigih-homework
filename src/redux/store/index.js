import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../slices/token-slice"

const store = configureStore({
    reducer: {
        token: tokenReducer
    }
})

export default store