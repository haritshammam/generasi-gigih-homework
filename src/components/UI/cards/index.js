import React from 'react'
import styles from './trackCardStyle.module.css'

const TrackCard = ({ albumImageUrl, trackName, artistName, buttonState }) => {

    const [isTrackSelected, setTrackSelected] = buttonState
    
    const handleSelectTrack = () => {
        setTrackSelected(!isTrackSelected)
    }

    return (
        <div className={styles.track_card_container}>
            <img src={albumImageUrl} alt="Album" className={styles.track_image}/>
            <p className={styles.track_name}>
                {trackName}
            </p>
            <p className={styles.track_artist}>
                {artistName}
            </p>
            <button className={styles.track_button} onClick={handleSelectTrack}>{isTrackSelected ? "Deselect" : "Select"}</button>
        </div>
    )
}

export default TrackCard
