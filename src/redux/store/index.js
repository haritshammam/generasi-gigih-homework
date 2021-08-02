import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../slices/token-slice"
import spotifyReducer from "../slices/spotify-slice"

const store = configureStore({
    reducer: {
        token: tokenReducer,
        spotify: spotifyReducer
    }
})

export default store