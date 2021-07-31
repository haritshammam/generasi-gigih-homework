import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { CLIENT_ID, SPOTIFY_AUTHORIZE_ENDPOINT, REDIRECT_URL_AFTER_LOGIN, SCOPE } from './constants/spotifyAuthConst'
import { tokenActions } from './redux/slices/token-slice'

import styles from './App.module.css'
import Button from './components/UI/buttons'
import InputLarge from './components/UI/input-field-large'
import TrackCard from './components/UI/cards'
import IconButton from './components/UI/icon-buttons'
import NewPlaylistForm from './components/UI/forms'
import UserProfile from './components/UI/user-profile'

function App() {
  const accessToken = useSelector(state => state.token.token)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState()
  const [searchKeyword, setSearchKeyword] = useState()
  const [tracksData, setTracksData] = useState()
  const [selectedTracks, setSelectedTracks] = useState([])
  const [myPlaylistData, setMyPlaylistData] = useState()
  const [newPlaylistForm, setnewPlaylistForm] = useState({
    playlistTitle: '',
    playlistDescription: ''
  })

  // To go to spotify authentication page
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPE}&response_type=token&state=123`
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
  const handleSearchTracks = async () => {
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
      setTracksData(res.data.tracks.items)
    }
    catch (err) {
      console.error(err)
    }
  }

  // To call Spotify Get User Profile Data API
  const handleGetUserProfile = async () => {
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
      setUserData(res.data)
    }
    catch (err) {
      console.error(err)
    }
  }

  // To call Spotify Add tracks to the playlist API
  const handleAppendTracksToPlaylist = async (playlist_id) => {
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

  // To call Spotify Create New Playlist API
  const handleCreatePlaylist = async () => {
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
      setMyPlaylistData(response.data)
      // handleAppendTracksToPlaylist(myPlaylistData.id)
    }
    catch (error) {
      console.error(error)
    }
  }

  // To handle submit new playlist form
  const handleSubmitNewPlaylistForm = e => {
    e.preventDefault()
    handleCreatePlaylist()
  }

  // To handle input change of New Playlist form
  const handleChangeNewPlaylistInput = e => {
    setnewPlaylistForm({ ...newPlaylistForm, [e.target.name]: e.target.value })
  }

  // To trigger call handleSearchPlaylist using enter from search input text
  const handleEnterSearchPlaylist = e => {
    if (e.keyCode === 13) {
      handleSearchTracks()
    }
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
    if (myPlaylistData) {
      handleAppendTracksToPlaylist(myPlaylistData.id)
    }
  }, [accessToken, myPlaylistData])

  return (
    <div className={styles.app_container}>
      {accessToken &&
        <div>
          <div>
            {userData && <UserProfile userData={userData} />}
          </div>

          <NewPlaylistForm
            handleSubmitNewPlaylistForm={handleSubmitNewPlaylistForm}
            handleChangeNewPlaylistInput={handleChangeNewPlaylistInput}
            newPlaylistForm={newPlaylistForm}
          />

          <div className={styles.search_container}>
            <InputLarge
              onChange={(e) => setSearchKeyword(e.target.value.replace(" ", "+"))}
              onKeyDown={handleEnterSearchPlaylist}
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
      }

      {!accessToken &&
        <div className={styles.authentication_container}>
          <h2 className={styles.authentication_heading}>You are not authenticated yet</h2>
          <Button onClick={handleLogin}>Authenticate Spotify</Button>
        </div>
      }
    </div>
  )
}

export default App;
