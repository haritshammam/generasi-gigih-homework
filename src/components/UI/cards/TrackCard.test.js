import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import TrackCard from "./TrackCard";

const trackData = {
    name: "trackName",
    album: {
        images: [{},
        {
            url: "trackImageUrl"
        }]
    },
    artists: [{
        name: "artistName"
    }]
}

let getByTestId;

beforeEach(() => {
    const component = render(<TrackCard trackData={trackData}/>)
    getByTestId = component.getByTestId
}

)

test('image of track card rendered', () => {
    const imgEl = getByTestId("track-image")
    expect(imgEl).toBeInTheDocument()
})

test('title name of track card rendered', () => {
    const titleEl = getByTestId("track-title")
    expect(titleEl).toBeInTheDocument()
})

test('artist name of track card rendered', () => {
    const artistEl = getByTestId("track-artist")
    expect(artistEl).toBeInTheDocument()
})
