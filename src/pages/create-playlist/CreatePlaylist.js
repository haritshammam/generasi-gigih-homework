import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createPlaylist, searchTrack } from '../../redux/slices/spotify-slice';

import styles from './CreatePlaylist.module.css'

import InputLarge from '../../components/UI/input-field-large'
import TrackCard from '../../components/UI/cards'
import IconButton from '../../components/UI/icon-buttons'
import NewPlaylistForm from '../../components/UI/forms'

const CreatePlaylist = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.token.token)
    const tracksData = useSelector(state => state.spotify.tracksData)

    const [searchKeyword, setSearchKeyword] = useState()
    const [selectedTracks, setSelectedTracks] = useState([])
    const [newPlaylistForm, setnewPlaylistForm] = useState({
        playlistTitle: '',
        playlistDescription: ''
    })

    // To call Spotify Search API
    const handleSearchTracks = () => {
        dispatch(searchTrack(accessToken, searchKeyword))
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

    return (
        <div className={styles.app_container}>
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
    )
}

export default CreatePlaylist
