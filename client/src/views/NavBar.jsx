import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import logo from '../image/logo.png'

const NavBar = () => {
    return ( 
     <div className={styles.nav}>
        <nav>
            <ul className={styles.list}>
                <li><img src={logo} className={styles.logo} alt="" /></li>
                <li className={styles.app}>App Countries</li>
                <li className={styles.li2}>
                    <Link to={"/countries"} >Home</Link>                    
                </li>
                <li className={styles.li2}>
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