import React from 'react'
import { Link } from 'react-router-dom';

const Leading = () => {
    return ( 
        <>
            <h1>BIENVENIDOS A COUNTRIES</h1>
            <button ><Link to='/countries'>Comenzar</Link></button>
        </>
     );
}
 
export default Leading;