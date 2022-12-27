import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import logo from '../image/AppCountries.png'

const NavBar = () => {
    return ( 
        <div className={styles.header}>
            <div className={styles.img}>
              <img src={logo} className={styles.logo} alt="" />
            </div>
           <nav className={styles.nav}>
           <ul className={styles.links}>
                <li >
                    <Link to={"/countries"} >Home</Link>                    
                </li>
                <li >
                <Link to={"/activities"} >Crear Actividad</Link>
                </li>
                <li>
                    <Link to={"/"}>Salir</Link>
                </li>
            </ul>
           </nav>
        </div>
);
}
export default NavBar;