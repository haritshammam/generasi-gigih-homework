import React, {useState} from 'react'
import styles from './trackCardStyle.module.css'

const TrackCard = ({ albumImageUrl, trackName, artistName }) => {

    const [isTrackSelected, setTrackSelected] = useState(false)
    
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
            <button 
                className={
                    isTrackSelected ? `${styles.track_button} ${styles.track_button_selected}` : `${styles.track_button}`
                } 
                onClick={handleSelectTrack}
            >
                {isTrackSelected ? "Deselect" : "Select"}
            </button>
        </div>
    )
}

export default TrackCard
