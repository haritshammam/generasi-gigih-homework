import React from 'react'
import styles from './iconButtonStyle.module.css'

const IconButton = ({ children, onClick }) => {
    return (
        <>
            <button
                className={styles.button}
                onClick={onClick}
            >
                {children}
            </button>
        </>
    )
}

export default IconButton
