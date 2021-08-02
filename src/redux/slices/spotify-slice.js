import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialSpotifyState = {
    tracksData: null,
    userData: null
}

const spotifySlice = createSlice({
    name: 'spotify',
    initialState: initialSpotifyState,
    reducers: {
        appendTracksData(state, action) {
            state.tracksData = action.payload
        },

        appendUserData(state, action) {
            state.userData = action.payload
        }
    }
})

export const spotifyActions = spotifySlice.actions

export const getUserProfile =  (accessToken) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: 'get',
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            dispatch(spotifyActions.appendUserData(res.data))
        }
        catch (err) {
            console.error(err)
        }
    }
}

const handleAppendTracksToPlaylist = async (playlist_id, accessToken, selectedTracks) => {
    try {
        await axios({
            method: 'post',
            url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            data: {
                uris: selectedTracks
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
    }
    catch (err) {
        console.error(err)
    }
}

export const createPlaylist = (newPlaylistForm, accessToken, selectedTracks) => {
    return async () => {
        try {
            const response = await axios({
                method: 'post',
                url: `https://api.spotify.com/v1/users/haritshammam/playlists`,
                data: {
                    name: newPlaylistForm.playlistTitle,
                    description: newPlaylistForm.playlistDescription,
                    public: false,
                    collaborative: false
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            handleAppendTracksToPlaylist(response.data.id, accessToken, selectedTracks)
        }
        catch (error) {
            console.error(error)
        }
    }
}

export const searchTrack = (accessToken, searchKeyword) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: "get",
                url: "https://api.spotify.com/v1/search",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                params: {
                    api_key: process.env.REACT_APP_GIPHY_API_KEY,
                    q: searchKeyword,
                    type: "track",
                    limit: 12
                }
            })
            dispatch(spotifyActions.appendTracksData(res.data.tracks.items))
        }
        catch (err) {
            console.error(err)
        }
    }
}

export default spotifySlice.reducer