import React from 'react'

import styles from './Login.module.css'
import Button from '../../components/UI/buttons/index'
import { CLIENT_ID, SPOTIFY_AUTHORIZE_ENDPOINT, REDIRECT_URL_AFTER_LOGIN, SCOPE } from '../../constants/spotifyAuthConst'

const Login = () => {
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPE}&response_type=token&state=123`
    }

    return (
        <div className={styles.app_container}>
            <div className={styles.authentication_container}>
                <h2 className={styles.authentication_heading}>You are not authenticated yet</h2>
                <Button onClick={handleLogin}>Authenticate Spotify</Button>
            </div>
        </div>
    )
}

export default Login
