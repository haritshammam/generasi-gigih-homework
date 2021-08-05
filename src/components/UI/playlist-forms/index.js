import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPlaylist, searchTrack } from '../../../redux/slices/spotify-slice'


import Button from '../buttons'
import TrackCard from '../cards'
import styles from './formStyle.module.css'

const NewPlaylistForm = () => {

    const [searchKeyword, setSearchKeyword] = useState()
    const [selectedTracks, setSelectedTracks] = useState([])
    const [newPlaylistForm, setnewPlaylistForm] = useState({
        playlistTitle: '',
        playlistDescription: ''
    })

    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.token.token)
    const tracksData = useSelector(state => state.spotify.tracksData)

    const handleSearchTracks = () => {
        dispatch(searchTrack(accessToken, searchKeyword))
    }

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        setnewPlaylistForm({});
        setSearchKeyword()
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

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


    // To handle submit new playlist form
    const handleSubmitNewPlaylistForm = e => {
        e.preventDefault()
        dispatch(createPlaylist(newPlaylistForm, accessToken, selectedTracks))
        handleReset()
        alert("Playlist Created")
    }

    // To handle input change of New Playlist form
    const handleChangeNewPlaylistInput = e => {
        setnewPlaylistForm({ ...newPlaylistForm, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmitNewPlaylistForm} className={styles.form}>
                <h2 className={styles.header}>Create new playlist</h2>
                <div className={styles.field_container}>
                    <label htmlFor="playlistTitle" className={styles.label}>Name</label>
                    <input
                        className={styles.input}
                        id="playlistTitle"
                        name="playlistTitle"
                        type="text"
                        placeholder="My Playlist #1"
                        minLength="10"
                        value={newPlaylistForm.playlistTitle}
                        onChange={handleChangeNewPlaylistInput}
                        required />
                </div>

                <div className={styles.field_container}>
                    <label htmlFor="playlistDescription" className={styles.label}>Short Description</label>
                    <input
                        className={styles.input}
                        id="playlistDescription"
                        name="playlistDescription"
                        type="text"
                        placeholder="My Playlist description"
                        minLength="20"
                        value={newPlaylistForm.playlistDescription}
                        onChange={handleChangeNewPlaylistInput}
                        required />
                </div>

                <div className={styles.field_container}>
                    <label htmlFor="songList" className={styles.label}>Songs</label>
                    <div className={styles.input_search_song}>
                        <input
                            className={styles.input}
                            id="songList"
                            name="songList"
                            type="text"
                            placeholder="Search your songs here"
                            onChange={(e) => setSearchKeyword(e.target.value.replace(" ", "+"))}
                            required />
                        <div
                            className={styles.search_song_button}
                            onClick={handleSearchTracks}>
                            <i className="fas fa-search"></i>
                        </div>
                    </div>
                </div>


                {tracksData && <p className={styles.text_small}>Results</p>}

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

                <Button type="submit">Create playlist</Button>

            </form>
        </div>
    )
}

export default NewPlaylistForm
