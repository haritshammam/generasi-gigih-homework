import axios from 'axios'
import { spotifyActions } from '../../slices/spotify-slice'

export const searchTrack = (accessToken: string, searchKeyword: string) => {
    return async (dispatch: Function) => {
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
                    limit: 9
                }
            })
            dispatch(spotifyActions.appendTracksData(res.data.tracks.items))
        }
        catch (err) {
            console.error(err)
        }
    }
}