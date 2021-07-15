import React from 'react'
import CardInfo from './card-info'

const Card = ({trackDetails, albumImageUrl, buttonText}) => {
    return (
        <div className="flex justify-center mt-2 ">
            <div className="bg-white-100 w-1/4 px-4 py-4 rounded-lg shadow-lg">
                <img src={albumImageUrl} alt={trackDetails.albumName} className="w-full rounded-lg mb-4"/>

                <CardInfo 
                    cardInfoTitle="Track Title" 
                    cardInfoDetails={trackDetails.trackTitle}
                />
                <CardInfo 
                    cardInfoTitle="Artists" 
                    cardInfoDetails={trackDetails.artistName}
                />
                <CardInfo 
                    cardInfoTitle="Album" 
                    cardInfoDetails={trackDetails.albumName}
                />

                <button 
                    className="mt-4 bg-gray-800 text-white py-2 w-full text-sm font-semibold rounded-lg hover:bg-gray-900"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export default Card