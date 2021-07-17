import React from 'react'
import Card from './components/cards'
// import data from './single-sample'
import datas from './datas/tracksData' 

function App() {
  const valueAssignment = (dataParam) => {
    let {name: trackTitle} = dataParam
    let {
      name: albumName,
      artists: [
        {
          name: artistName
        }
      ],
      images: [
        ,
        {
          url: albumImageUrl
        }
      ]
    } = dataParam.album
    let trackDetails = {trackTitle, albumName, artistName}

    return {
      albumImageUrl,
      trackDetails
    }
  }

  const renderOneCard = () => {
    datas.forEach((data, index) => {
      let { albumImageUrl, trackDetails } = valueAssignment(data)
      console.log(`${index+1}.`)
      console.log(albumImageUrl)
      console.log(trackDetails.trackTitle)
      console.log(trackDetails.albumName)
      console.log(trackDetails.artistName)
      return (
        <Card
          trackDetails={trackDetails}
          albumImageUrl={albumImageUrl}
          buttonText="Select"
        />
      )
    })
  }

  return (
    <div className="grid grid-cols-3 place-items-center gap-10 px-40">
      {renderOneCard()}
    </div>
  )
}

export default App;
