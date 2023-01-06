import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  getDetail } from '../redux/actions';
import { Link, useParams} from 'react-router-dom';
import  './details.css';
import styled from 'styled-components';

const Boton = styled.button`
    margin-left: 200px;
    margin-top: 10px;
    margin-right: 50rem;
    font-weight: bold;
    font-size: 20px;
    padding: 10px 20px;
    background-color: #36486b;
    border: none;
    width: auto;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #618685;
        cursor: pointer;
    }
`;
const H2 = styled.h2`
   font-family: 'Bebas Neue', cursive;
   color: #618685;
   text-align: left;
   font-weight: 700;
   font-size: 50px;
   margin-bottom: 50px;
   margin-top: 80px;
   margin-left: 12rem;

   &::after{
    content: '';
    width: 80%;
    height: 6px;
    background-color: #36486b;
    display:block;
   }
`;


const Details = () => {
    const dispatch = useDispatch();
    const country = useSelector((state)=>state.details);
    
   let {id} = useParams();
   useEffect(()=>{
        dispatch(getDetail(id))
    },[id]);
    
    
    return ( 
        <div className='detail'>
           <Link to='/countries'> <Boton>Regresar</Boton></Link>
           <H2 >Informacion del Pais {country.name}</H2>
           
         <div className='containedor'>
         
            <div >
            
                <img src = {country.flags} alt = 'image not found' width='300px' height='250px'/>
            </div> 
                <div className='column'>
                    <h3 className='card-subHeading'>Continente: <b>{country.continents}</b></h3>
                    <h5 className='card-subHeading'> Codigo: <b>{country.id}</b></h5>
                    <h5 className='card-subHeading'> Sub Region: <b>{country.subregion}</b></h5>
                    <h5 className='card-subHeading'> Area: <b>{country.area}</b></h5>
                    <h5 className='card-subHeading'> Poblacion: <b>{country.population}</b></h5>
                </div>
            
         </div>
         <div className='activitys'>
                {
                    country.activities?.map((e)=>(
                        <div className='container'>
                            <div className='card'>
                            <div className='box'>
                                <div className='content'>
                                        <h3>Actividad</h3>
                                        <h1>{e.name}</h1>
                                        <p><b>Dificultad:</b> Nivel {e.difficulty}</p>
                                        <p><b>Duration:</b> {e.duration} Horas</p>
                                        <p><b>Temporada:</b> {e.season}</p>
                                </div>
                            </div>
                            </div>            
                        </div>
                    ))
                }
            </div>
            
        </div>
      
     );
}
 
export default Details;