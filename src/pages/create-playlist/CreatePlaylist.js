import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createPlaylist } from '../../redux/slices/spotify-slice';

import styles from './CreatePlaylist.module.css'

import NewPlaylistForm from '../../components/UI/playlist-forms'

const CreatePlaylist = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.token.token)

    const [selectedTracks,] = useState([])

    const [newPlaylistForm, setnewPlaylistForm] = useState({
        playlistTitle: '',
        playlistDescription: ''
    })

    // To handle submit new playlist form
    const handleSubmitNewPlaylistForm = e => {
        e.preventDefault()
        dispatch(createPlaylist(newPlaylistForm, accessToken, selectedTracks))
    }

    // To handle input change of New Playlist form
    const handleChangeNewPlaylistInput = e => {
        setnewPlaylistForm({ ...newPlaylistForm, [e.target.name]: e.target.value })
    }

    return (
        <div className={styles.app_container}>
            <NewPlaylistForm
                handleSubmitNewPlaylistForm={handleSubmitNewPlaylistForm}
                handleChangeNewPlaylistInput={handleChangeNewPlaylistInput}
                newPlaylistForm={newPlaylistForm}
            />
        </div>
    )
}

export default CreatePlaylist
