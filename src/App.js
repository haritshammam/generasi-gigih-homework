import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http:%2F%2Flocalhost:3000"
const SCOPE = "playlist-modify-private"


function App() {
  const [accessToken, setAccessToken] = useState()
  const [searchKeyword, setSearchKeyword] = useState()
  const [tracksData, setTracksData] = useState()
  const [isAuthenticated, setAuthenticated] = useState(false)

  const getParamsFromUrl = (hash) => {
    const stringAfterHashtag = hash.substring(1)
    const paramsInUrl = stringAfterHashtag.split("&")
    const paramsSplitUp = paramsInUrl.reduce((acc, currentVal) => {
      const [key, value] = currentVal.split("=")
      acc[key] = value
      return acc
    }, {})

    return paramsSplitUp
  }

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPE}&response_type=token&state=123`
  }

  const handleSearchPlaylist = async () => {
    await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        params: {
          api_key: process.env.REACT_APP_GIPHY_API_KEY,
          q: searchKeyword,
          type: "track",
          limit: 10
        },
      })
      .then((res) => {
        setTracksData(res.data.tracks.items)
      })
  }

  useEffect(() => {
    if (window.location.hash) {
      const { access_token } = getParamsFromUrl(window.location.hash)
      setAccessToken(access_token)
    }
    if (accessToken) {
      setAuthenticated(true)
    }
  }, [accessToken])

  const handleKeywordSpace = (keyword) => {
    const keywordString = keyword.replace(" ", "+")
    return keywordString
  }

  const renderShowPage = () => {
    if (isAuthenticated) {
      let renderShowPage = (
        <div>
          <input type="text" placeholder="Seach playlist" onChange={(e) => setSearchKeyword(handleKeywordSpace(e.target.value))} />
          {console.log(searchKeyword)}
          <button onClick={handleSearchPlaylist}>Search</button>

          {/* Buat state ketika tracksData masih kosong */}
          {tracksData && tracksData.map((track, index) => {
            return (
              <div>
                <img src={track.album.images[1].url} alt="Album" />
                <p>{index + 1}. Track name: {track.name}</p>
                <p>Artist name: {track.artists[0].name}</p>
                <br />
              </div>
            )
          })}
        </div>
      )
      return renderShowPage
    }
  }

  const renderAuthenticateButton = () => {
    return (
      isAuthenticated ? <h2>You are authenticated</h2> : <button onClick={handleLogin}>Connect with Spotify</button>
    )
  }

  return (
    <div>
      {renderAuthenticateButton()}
      {renderShowPage()}
    </div>
  )
}

export default App;
