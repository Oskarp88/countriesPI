import React from 'react';
import './country.css';
import { Link } from 'react-router-dom';

const Country = ({name,image,continent,poblacion,condicion,id}) => {
    return ( 
        <div className='wrapper'>
          <div className='card'>
            <div>
            <Link to={`/countries/${id}`}><img src={image} alt='img not found' /></Link>
            <div id='container'>
               <p id='name'><b>{name}</b></p>
               <p id='exp'>Continente: {continent}</p>
                  {condicion? <p>Poblacion: {poblacion}</p>:null}
               
               <Link to={`/countries/${id}`}><a id='button'>Ver mas</a></Link>
            </div>
            </div>
            
          </div>
        </div>
     );
}
 
export default Country;