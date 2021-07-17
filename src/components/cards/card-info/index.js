import React from 'react'

const CardInfo = ({cardInfoTitle, cardInfoDetails}) => {
    return (
        <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500">{cardInfoTitle}</p>
            <p className="font-semibold text-gray-900 w-full truncate">{cardInfoDetails}</p>
        </div>
    )
}

export default CardInfo
