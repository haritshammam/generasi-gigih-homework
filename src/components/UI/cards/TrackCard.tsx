import { useState } from "react";
import styles from "./trackCardStyle.module.css";

import add from "./src/add.svg";
import done from "./src/done.svg";

interface AlbumProps {
  images: {
    url: string;
  }[];
}

interface ArtistProps {
  name: string;
}

interface TrackDataProps {
  uri: string;
  name: string;
  album: AlbumProps;
  artists: ArtistProps[];
}

interface TrackCardProps {
  buttonState: boolean;
  trackData: TrackDataProps;
  pushToSelectedTracks: Function;
  deleteFromSelectedTracks: Function;
}

const TrackCard = ({
  buttonState,
  trackData,
  pushToSelectedTracks,
  deleteFromSelectedTracks,
}: TrackCardProps) => {
  const [isTrackSelected2, setTrackSelected] = useState(buttonState);

  const handleSelectTrack = () => {
    setTrackSelected(!isTrackSelected2);
    if (!isTrackSelected2) {
      pushToSelectedTracks(trackData.uri);
    } else {
      deleteFromSelectedTracks(trackData.uri);
    }
  };

  let SelectButton;
  if (!isTrackSelected2) {
    SelectButton = (
      <button
        type="button"
        className={styles.track_button}
        onClick={handleSelectTrack}
      >
        <img src={add} alt="select" />
      </button>
    );
  } else {
    SelectButton = (
      <button
        type="button"
        className={`${styles.track_button} ${styles.track_button_selected}`}
        onClick={handleSelectTrack}
      >
        <img src={done} alt="deselect" />
      </button>
    );
  }

  return (
    <div className={styles.track_card_container}>
      <img
        src={trackData.album.images[1].url}
        alt="Album"
        className={styles.track_image}
        data-testid="track-image"
      />
      <div className={styles.track_info}>
        <p className={styles.track_name} data-testid="track-title">
          {trackData.name}
        </p>
        <p className={styles.track_artist} data-testid="track-artist">
          {trackData.artists[0].name}
        </p>
      </div>
      {SelectButton}
    </div>
  );
};

export default TrackCard;
