const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "https://utafy.vercel.app"
const SCOPE = "playlist-modify-private"

export {
    CLIENT_ID,
    SPOTIFY_AUTHORIZE_ENDPOINT,
    REDIRECT_URL_AFTER_LOGIN,
    SCOPE
}