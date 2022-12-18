import React from 'react';
import './country.css'

const Country = ({name,image,continent,poblacion,condicion}) => {
    return ( 
        <div className='cards'>
          <div className='card'>
            <div className='card_image-holder'> 
              <img src={image} alt='img not found' />
            </div>
            <div className='card-title'>
               <a href="#" className='toggle-info btn'>
                  <span class="left"></span>
                  <span class="right"></span>
               </a>
               <h2>
                 {name}
                  <small>Continente: {continent}</small>
                  {condicion? <small>Poblacion: {poblacion}</small>:null}
               </h2>
            </div>
          </div>
        </div>
     );
}
 
export default Country;