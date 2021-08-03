import React from 'react'
import { useDispatch } from 'react-redux'

import { tokenActions } from '../../../redux/slices/token-slice'

import styles from './userProfileStyle.module.css'

const UserProfile = ({ userData }) => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(tokenActions.emptyToken())
    }

    const accountUrl = "https://www.spotify.com/id/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account"

    return (
        <>
            <div className={styles.container}>
                <div className={styles.user_profile_container}>
                    <img src={userData.images[0].url} alt="User Profile" className={styles.display_picture} />
                    <p className={styles.display_name}>{userData.display_name}</p>
                </div>
                <div className={styles.dropdown_content}>
                    <div><a className={styles.drowdown_content_link} href={accountUrl} target='_blank' rel='noreferrer'>Account</a></div>
                    <div onClick={handleLogout}>
                        <span className={styles.dropdown_content_logout}>Logout</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile
