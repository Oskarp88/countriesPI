import React from 'react';
import styles from './Country.module.css';
import { Link } from 'react-router-dom';

const Country = ({name,image,continent,poblacion,condicion,id}) => {
    return ( 
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div>
            <Link to={`/countries/${id}`}><img src={image} alt='img not found' /></Link>
            <div id={styles.container}>
               <p id={styles.name}><b>{name}</b></p>
               <p id={styles.exp}>Continente: {continent}</p>
                  {condicion? <p id={styles.pop}>Poblacion: {poblacion}</p>:null}
               
               <Link to={`/countries/${id}`}><a id={styles.button}>Ver mas</a></Link>
            </div>
            </div>
            
          </div>
        </div>
     );
}
 
export default Country;