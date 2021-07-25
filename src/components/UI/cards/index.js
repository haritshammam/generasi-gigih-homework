import React, {useState} from 'react'
import styles from './trackCardStyle.module.css'

const TrackCard = ({  trackData, selectTrackMethod }) => {
    const [isTrackSelected, setTrackSelected] = useState(false)
    
    const handleSelectTrack = () => {
        setTrackSelected(!isTrackSelected)
        selectTrackMethod(trackData.uri)
    }

    

    return (
        <div className={styles.track_card_container}>
            <img src={trackData.album.images[1].url} alt="Album" className={styles.track_image}/>
            <p className={styles.track_name}>
                {trackData.name}
            </p>
            <p className={styles.track_artist}>
                {trackData.artists[0].name}
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
