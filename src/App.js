import React from 'react'
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

  return (
    <div className="flex justify-center mt-2 ">
      <div className="bg-white-100 w-1/4 px-4 py-4 rounded-lg shadow-lg">
        <img src={albumImageUrl} alt="Album" className="w-full rounded-lg"/>

        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-500">Track Title</p>
          <p className="font-semibold text-gray-900">{trackTitle}</p>
        </div>

        <div className="mt-3">
          <p className="text-xs font-semibold text-gray-500">Artist</p>
          <p className="font-semibold text-gray-900">{artistName}</p>
        </div>

        <div className="mt-3">
          <p className="text-xs font-semibold text-gray-500">Album</p>
          <p className="font-semibold text-gray-900">{albumName}</p>
        </div>

        <button className="mt-4 bg-gray-800 text-white py-2 w-full text-sm font-semibold rounded-lg hover:bg-gray-900">
          Select
        </button>
      </div>
    </div>
  )
}

export default App;
