import React from 'react';
import  './cardActivity.css';

const CardActivity = ({name,difficulty,duration,season,paises}) => {
    return (  
        <div className='container'>
            <div className='card'>
               <div className='box'>
                   <div className='content'>
                        <h3>Actividad</h3>
                        <h1>{name}</h1>
                        <p><b>Dificultad:</b> Nivel {difficulty}</p>
                        <p><b>Duration:</b> {duration} Horas</p>
                        <p><b>Temporada:</b> {season}</p>
                        <p><b>Paises:</b> {paises}</p>
                   </div>
               </div>
            </div>            
        </div>
    );
}
 
export default CardActivity;