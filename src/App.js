import React from 'react'
import Card from './components/cards'
import data from './single-sample'

function App() {
  // Single's Data
  const {name: trackTitle} = data
  const {
    name: albumName,
    artists: [
      {
        name: artistName
      }
    ],
    images: [
      {
        url: albumImageUrl
      }
    ]
  } = data.album
  const trackDetails = {trackTitle, albumName, artistName}

  return (
    <>
      <Card 
        trackDetails={trackDetails}
        albumImageUrl={albumImageUrl}
        buttonText="Select"
      />
    </>
  )
}

export default App;
