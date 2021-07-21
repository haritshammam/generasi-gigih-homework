import React from 'react'
import styles from './buttonStyle.module.css'

const Button = ({children, onClick, className = styles.button}) => {
    return (
        <>
            <button 
                className={className}
                onClick={onClick}
            >
                {children}
            </button>  
        </>
    )
}

export default Button
