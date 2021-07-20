import React from 'react'
import Card from './components/cards'
import datas from './datas/tracksData' 

function App() {
  const valueAssignment = (dataParam) => {
    let {
      name: trackTitle,
      id
    } = dataParam

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
      id,
      albumImageUrl,
      trackDetails
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="text-center pt-10">
        <h1
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Select music to add to your playlist
        </h1>

        <h2
          className="text-md text-gray-400"
        >
          Showing {datas.length} result
        </h2>
      </div>

      <div className="grid grid-cols-4 mt-8 px-10 gap-y-10 place-items-center">
        {datas.map((data) => {
          let { id, albumImageUrl, trackDetails } = valueAssignment(data)
          return (
            <Card
              key = {id}
              trackDetails={trackDetails}
              albumImageUrl={albumImageUrl}
              buttonText="Select"
            />
          )
        })}
      </div>
    </div>
  )
}

export default App;
