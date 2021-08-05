import React, { useState } from 'react'
import styles from './trackCardStyle.module.css'

import add from './src/add.svg'
import done from './src/done.svg'

const TrackCard = ({ buttonState, trackData, pushToSelectedTracks, deleteFromSelectedTracks }) => {

    const [isTrackSelected2, setTrackSelected] = useState(buttonState)

    const handleSelectTrack = () => {
        setTrackSelected(!isTrackSelected2)
        if (!isTrackSelected2) {
            pushToSelectedTracks(trackData.uri)
        }
        else {
            deleteFromSelectedTracks(trackData.uri)
        }
    }

    let SelectButton
    if (!isTrackSelected2) {
        SelectButton = <button type="button" className={styles.track_button} onClick={handleSelectTrack}><img src={add} alt="select"/></button>
    } else {
        SelectButton = <button type="button" className={`${styles.track_button} ${styles.track_button_selected}`} onClick={handleSelectTrack}><img src={done} alt="deselect"/></button>
    }

    return (
        <div className={styles.track_card_container}>
            <img src={trackData.album.images[1].url} alt="Album" className={styles.track_image} />
            <div className={styles.track_info}>
                <p className={styles.track_name}>
                    {trackData.name}
                </p>
                <p className={styles.track_artist}>
                    {trackData.artists[0].name}
                </p>
            </div>
            {SelectButton}
        </div>
    )
}

export default TrackCard
