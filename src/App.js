
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CLIENT_ID, SPOTIFY_AUTHORIZE_ENDPOINT, REDIRECT_URL_AFTER_LOGIN, SCOPE } from './constants/spotifyAuthConst'

import styles from './App.module.css'
import Button from './components/UI/buttons'
import InputLarge from './components/UI/input-field-large'
import TrackCard from './components/UI/cards'
import IconButton from './components/UI/icon-buttons'

function App() {
  const [accessToken, setAccessToken] = useState()
  const [searchKeyword, setSearchKeyword] = useState()
  const [tracksData, setTracksData] = useState()
  const [isTrackSelected, setTracksState] = useState(false)

  // To get URL hash that contains tokens info
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

  // To go to spotify authentication page
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPE}&response_type=token&state=123`
  }

  // To call Spotify Search API
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
          limit: 12
        },
      })
      .then((res) => {
        setTracksData(res.data.tracks.items)
      })
  }

  // To replace space with + in search query
  const handleKeywordSpace = (keyword) => {
    const keywordString = keyword.replace(" ", "+")
    return keywordString
  }

  // To set search keyword from search input text
  const handleSetSearchKeyword = (e) => {
    setSearchKeyword(handleKeywordSpace(e.target.value))
  }

  // To trigger call handleSearchPlaylist using enter from search input text
  const handleEnterSearchPlaylist = (e) => {
    if (e.keyCode === 13) {
      handleSearchPlaylist()
    }
  }

  // To show search tracks components
  const renderShowTracksPage = () => {
    if (accessToken) {
      let renderShowPage = (
        <div>
          <div className={styles.search_container}>
            <InputLarge
              onChange={handleSetSearchKeyword}
              onKeyDown={handleEnterSearchPlaylist}
              placeholder="Search tracks"
            />

            <div className={styles.search_button}>
              <IconButton onClick={handleSearchPlaylist}><i className="fas fa-search"></i></IconButton>
            </div>
          </div>

          {tracksData && <p className={styles.text_small}>Showing {tracksData.length} result</p>}

          <div className={styles.track_card_list_container}>
            {tracksData && tracksData.map((track, index) => {
              return (
                <TrackCard
                  key={track.uri}
                  albumImageUrl={track.album.images[1].url}
                  trackName={track.name}
                  artistName={track.artists[0].name}
                  buttonState={[isTrackSelected, setTracksState]}
                />
              )
            })}
          </div>
        </div>
      )
      return renderShowPage
    }
  }

  // To show authenticate button if not authenticated yet
  const renderAuthenticateButton = () => {
    if (accessToken) {
      return (
        <div className={styles.authentication_container}>
          <h2 className={styles.authentication_heading}>You are authenticated</h2>
        </div>
      )
    }
    else {
      return (
        <div className={styles.authentication_container}>
          <h2 className={styles.authentication_heading}>You are not authenticated yet</h2>
          <Button onClick={handleLogin}>Authenticate Spotify</Button>
        </div>
      )
    }

  }

  // 1. To set the access token from URL into accessToken state 
  // 2. To set the authenticated state to true if accessToken is given
  useEffect(() => {
    if (window.location.hash) {
      const { access_token } = getParamsFromUrl(window.location.hash)
      setAccessToken(access_token)
    }
  }, [accessToken])

  return (
    <div className={styles.app_container}>
      {renderAuthenticateButton()}
      {renderShowTracksPage()}
    </div>
  )
}

export default App;
