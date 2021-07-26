import React from 'react'
import styles from './userProfileStyle.module.css'

const UserProfile = ({userData}) => {
    return (
        <>
            <div className={styles.container}>
                <img src={userData.images[0].url} alt="User Profile" className={styles.display_picture}/>
                <p className={styles.display_name}>{userData.display_name}</p>
            </div>
        </>
    )
}

export default UserProfile
