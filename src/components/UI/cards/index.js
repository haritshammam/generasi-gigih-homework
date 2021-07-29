import React, {useState} from 'react'
import styles from './trackCardStyle.module.css'
import Button from '../buttons/index'

const TrackCard = ({  buttonState, trackData, pushToSelectedTracks, deleteFromSelectedTracks }) => {
    
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
    if (!isTrackSelected2){
        SelectButton = <Button className={styles.track_button} onClick={handleSelectTrack}>Select</Button>
    } else {
        SelectButton = <Button className={`${styles.track_button} ${styles.track_button_selected}`} onClick={handleSelectTrack}>Deselect</Button>
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
            {SelectButton}
        </div>
    )
}

export default TrackCard
