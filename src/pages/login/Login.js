import React from 'react'

import styles from './Login.module.css'

const Login = () => {
    return (
        <div className={styles.app_container}>
            <h1 className={styles.authentication_heading}>Please login first to use this app</h1>
        </div>
    )
}

export default Login
