import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { CLIENT_ID, SPOTIFY_AUTHORIZE_ENDPOINT, REDIRECT_URL_AFTER_LOGIN, SCOPE } from './constants/spotifyAuthConst'
import { tokenActions } from './redux/slices/token-slice'
import { createPlaylist, searchTrack, getUserProfile } from './redux/slices/spotify-slice';

import styles from './App.module.css'
import Button from './components/UI/buttons'
import InputLarge from './components/UI/input-field-large'
import TrackCard from './components/UI/cards'
import IconButton from './components/UI/icon-buttons'
import NewPlaylistForm from './components/UI/forms'
import UserProfile from './components/UI/user-profile'

function App() {
  const dispatch = useDispatch()

  const accessToken = useSelector(state => state.token.token)
  const tracksData = useSelector(state => state.spotify.tracksData)
  const userData = useSelector(state => state.spotify.userData)

  const [searchKeyword, setSearchKeyword] = useState()
  const [selectedTracks, setSelectedTracks] = useState([])
  const [newPlaylistForm, setnewPlaylistForm] = useState({
    playlistTitle: '',
    playlistDescription: ''
  })

  // To go to spotify authentication page
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPE}&response_type=token&state=123`
  }

  const handleLogout = () => {
    dispatch(tokenActions.emptyToken())
  }

  // To get params from URL after login to Spotify
  const getParamsFromUrl = (hash) => {
    const paramsInUrl = hash.substring(1).split("&")
    const paramsSplitUp = paramsInUrl.reduce((acc, currentVal) => {
      const [key, value] = currentVal.split("=")
      acc[key] = value
      return acc
    }, {})

    return paramsSplitUp
  }

  // To call Spotify Search API
  const handleSearchTracks = () => {
    dispatch(searchTrack(accessToken, searchKeyword))
  }

  // To call Spotify Get User Profile Data API
  const handleGetUserProfile = () => {
    dispatch(getUserProfile(accessToken))
  }

  // To handle submit new playlist form
  const handleSubmitNewPlaylistForm = e => {
    e.preventDefault()
    dispatch(createPlaylist(newPlaylistForm, accessToken, selectedTracks))
  }

  // To handle input change of New Playlist form
  const handleChangeNewPlaylistInput = e => {
    setnewPlaylistForm({ ...newPlaylistForm, [e.target.name]: e.target.value })
  }

  // ==================================================
  // To get select track button state
  const getSelectTrackButtonState = (uri) => {
    let status = false;
    for (let i = 0; i < selectedTracks.length; i++) {
      if (selectedTracks[i] === uri) {
        status = true
      }
    }
    return status;
  }

  const pushToSelectedTracks = (uri) => {
    const currentList = selectedTracks;
    currentList.push(uri);
    setSelectedTracks(currentList);
  }

  const deleteFromSelectedTracks = (uri) => {
    const currentList = selectedTracks;
    for (var i = 0; i < selectedTracks.length; i++) {
      if (selectedTracks[i] === uri) {
        currentList.splice(i, 1);
      }
    }
    setSelectedTracks(currentList);
  }
  // ==================================================

  // 1. To set the access token from URL into accessToken state 
  // 2. To set the authenticated state to true if accessToken is given
  useEffect(() => {
    if (window.location.hash) {
      const { access_token } = getParamsFromUrl(window.location.hash)
      dispatch(tokenActions.getToken(access_token))
    }
    if (accessToken) {
      handleGetUserProfile()
    }
  }, [accessToken, dispatch])

  return (
    <Router>
      <div className={styles.app_container}>
        <Switch>
          <Route path="/" exact>
            {accessToken && (
              <Redirect to="/create-playlist" />
            )}

            <div className={styles.authentication_container}>
              <h2 className={styles.authentication_heading}>You are not authenticated yet</h2>
              <Button onClick={handleLogin}>Authenticate Spotify</Button>
            </div>
          </Route>

          <Route path="/create-playlist">
            <div>
              <div>
                {userData && (
                  <div>
                    <UserProfile userData={userData} />
                    <Button onClick={handleLogout}>Logout</Button>
                  </div>
                )}
              </div>

              <NewPlaylistForm
                handleSubmitNewPlaylistForm={handleSubmitNewPlaylistForm}
                handleChangeNewPlaylistInput={handleChangeNewPlaylistInput}
                newPlaylistForm={newPlaylistForm}
              />

              <div className={styles.search_container}>
                <InputLarge
                  onChange={(e) => setSearchKeyword(e.target.value.replace(" ", "+"))}
                  placeholder="Search tracks"
                />

                <div className={styles.search_button}>
                  <IconButton onClick={handleSearchTracks}><i className="fas fa-search"></i></IconButton>
                </div>
              </div>

              {tracksData && <p className={styles.text_small}>Showing {tracksData.length} result</p>}

              <div className={styles.track_card_list_container}>
                {tracksData && tracksData.map((track) => {
                  const buttonState = getSelectTrackButtonState(track.uri)
                  return (
                    <TrackCard
                      key={track.id}
                      trackData={track}
                      buttonState={buttonState}
                      pushToSelectedTracks={pushToSelectedTracks}
                      deleteFromSelectedTracks={deleteFromSelectedTracks}
                    />
                  )
                })}
              </div>
            </div>

            {!accessToken && (
              <Redirect to="/" exact />
            )}
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App;
