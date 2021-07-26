import React from 'react'
import Button from '../buttons'
import styles from './formStyle.module.css'

const NewPlaylistForm = ({ handleSubmitNewPlaylistForm, handleChangeNewPlaylistInput, newPlaylistForm }) => {
    return (
        <div>
            <form onSubmit={handleSubmitNewPlaylistForm} className={styles.form}>
                <h2 className={styles.header}>Create new playlist</h2>
                <div className={styles.field_container}>
                    <label htmlFor="playlistTitle" className={styles.label}>Title</label>
                    <input 
                        className={styles.input}
                        id="playlistTitle"
                        name="playlistTitle"
                        type="text" 
                        placeholder="My Playlist #1" 
                        minLength="10"
                        value={newPlaylistForm.playlistTitle}
                        onChange={handleChangeNewPlaylistInput} />
                </div>
                <div className={styles.field_container}>
                    <label htmlFor="playlistDescription" className={styles.label}>Description</label>
                    <input 
                        className={styles.input}
                        id="playlistDescription"
                        name="playlistDescription"
                        type="text"
                        placeholder="My Playlist description"
                        minLength="20"
                        value={newPlaylistForm.playlistDescription}
                        onChange={handleChangeNewPlaylistInput} />
                </div>
                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default NewPlaylistForm
