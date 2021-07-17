import React from 'react'
import CardInfo from './card-info'
import './style.css'

const Card = ({trackDetails, albumImageUrl, buttonText}) => {
    return (
            <div className="transition-shadow duration-500 bg-white px-4 py-4 rounded-lg hover:shadow-xl flex flex-col w-56 mr-10">
                <img src={albumImageUrl} alt={trackDetails.albumName} className="width-small rounded-lg mb-4"/>

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
                    className="mt-4 bg-white hover:bg-gray-900 text-gray-900 hover:text-white py-2 w-full text-sm font-semibold rounded-lg border hover:border-0 border-gray-300 hover:bg-gray-900"
                >
                    {buttonText}
                </button>
            </div>
    )
}

export default Card
