import React from 'react'
import { useSelector } from 'react-redux'

import Button from '../UI/buttons'
import UserProfile from '../UI/user-profile'
import styles from './navbarStyle.module.css'
import logo from './Logo.png'

import { CLIENT_ID, SPOTIFY_AUTHORIZE_ENDPOINT, REDIRECT_URL_AFTER_LOGIN, SCOPE } from '../../constants/spotifyAuthConst'

const Navbar = () => {
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPE}&response_type=token&state=123`
    }

    const accessToken = useSelector(state => state.token.token)
    const userData = useSelector(state => state.spotify.userData)

    return (
        <div className={styles.navbar_container}>
            <img src={logo} alt="Nav Logo" />

            <div className={styles.profile_container}>
                {(accessToken && userData) && <UserProfile userData={userData}/>}
            </div>

            {!accessToken && <Button onClick={handleLogin}>Login</Button>}
        </div>
    )
}

export default Navbar
