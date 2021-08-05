import React from 'react'

import styles from './CreatePlaylist.module.css'

import NewPlaylistForm from '../../components/UI/playlist-forms'

const CreatePlaylist = () => {
    return (
        <div className={styles.app_container}>
            <NewPlaylistForm />
        </div>
    )
}

export default CreatePlaylist
