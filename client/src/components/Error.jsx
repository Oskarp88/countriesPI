import React from 'react';
import styles from './Error.module.css'

const Error = ({error}) => {
    return ( 
        <div className={styles.error}>{error}</div>
     );
}
 
export default Error;