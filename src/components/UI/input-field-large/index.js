import styles from './inputLargeStyle.module.css'

import React from 'react'

const InputLarge = ({placeholder, onChange, onKeyDown}) => {
    return (
        <>
            <input type="text" 
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={styles.input_large}
            />
        </>
    )
}

export default InputLarge
