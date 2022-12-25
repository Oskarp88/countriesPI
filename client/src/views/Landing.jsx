import React from 'react'
import { Link } from 'react-router-dom';
import tierra from '../image/tierra.png';
import styles from './Landing.module.css'

const Leading = () => {
    return ( 
        <div className={styles.bg_animate}>
            <div className={styles.header_nav}>
                <div className={styles.contenedor1}>
                  <h1>BIENVENIDOS A COUNTRIES</h1>
                  <nav>
                    <a >Conoce a todos los paises del mundo y sus actividades turisticas</a>
                  </nav>
                </div>
            </div>
            <section className={`${styles.banner} ${styles.contenedor1}`}>
                <section className={styles.banner_title}>
                    <h2>Tambien puedes crear actividades turisticas</h2>
                    <a href="" className={styles.comenzar}><Link to='/countries'>Comenzar</Link></a>
                </section>
                <div className={styles.banner_img}>
                   <img src={tierra} alt="image not found" />
                </div>
            </section>
        </div>
     );
}
 
export default Leading;