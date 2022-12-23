import React from 'react';
import './Countries.css';
import { filterContinent, getAllCountries, orderByName, orderByPopulation } from '../redux/actions';
import Country from './Country';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Paginado from './Paginado';
import Search from './Search';
import { Link } from 'react-router-dom';
import Activity from './Activty';
import styled from 'styled-components';

const Select = styled.select`
    width: 100%;
   display: block;
   padding: 1rem;
   -webkit-appearance: none;
   border-radius: 10px;
   border: none;
   font-size: 1.2rem;
   margin: 5px;
`

const Countries = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector((state)=> state.countries);
    
    const [paginaActual, setPaginaActual]=useState(1);
    const [paisesPorPag, setPaisesPorPag]=useState(10);
    const [activity, setActivity]=useState("Pais");
    const [orden, setOrden] = useState('');
    const [poblacion, mostrarPoblacion] = useState(false);

    const indiceUltimoPais = paginaActual ===1? paginaActual * 9: paginaActual*paisesPorPag;
    const indicePrimerPais = paginaActual ===1? indiceUltimoPais - 9: (indiceUltimoPais-1)-paisesPorPag;
    
    const paisActual = allCountries.slice(indicePrimerPais,indiceUltimoPais);
    //                                         0                9
    //                                         9                19
    //                                         19                   29
    const paginado = (pageNumber) => {
        setPaginaActual(pageNumber)
    }

    useEffect(()=>{
        dispatch(getAllCountries())
    },[dispatch])


    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(getAllCountries()); 
        mostrarPoblacion(false)       
    }
    const filterContinente = (e)=>{
        dispatch(filterContinent(e.target.value))
        mostrarPoblacion(false)
    }
    const orderName = (e)=>{
        e.preventDefault(e);
        dispatch(orderByName(e.target.value));
        setPaginaActual(1);
        setOrden(`Ordenado ${e.target.value}`);
        mostrarPoblacion(false)
    }
    const orderPopulation = (e)=>{
        e.preventDefault(e);
        dispatch(orderByPopulation(e.target.value));
        setPaginaActual(1);
        setOrden(`Ordenado ${e.target.value}`)
        mostrarPoblacion(true)
    }

    
    return ( 
        <div className='contenedor'>
            <h1 className='titulo'>Oscar Countries</h1>
            <h3 className='titulo3'>Filtrar por:</h3>
            <div className='campo'>
                <Select
                  onChange={e=> filterContinente(e)}
                >
                    <option value=''>--Continente--</option>
                    <option value='North America'>NorteAmerica</option>
                    <option value="Antarctica">Antartida</option>
                    <option value="South America">surAmerica</option>
                    <option value="Europe">Europa</option>
                    <option value="Asia">Asia</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Africa">Africa</option>
                </Select>

                <Select
                  name='alfabeticamente'
                  onChange={e=>orderName(e)}
                >
                    <option value="">--Ordenar Alfabeticamente--</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </Select>
                <Select
                  onChange={e=>orderPopulation(e)}
                >
                    <option >--Cantidad de poblacion--</option>
                    <option value="asc">Mayor</option>
                    <option value="des">Menor</option>
                </Select>
            </div>
            <button className='boton' onClick={e=>{handleClick(e)}}>
                Cargar Paises
            </button>
            
                <Link  to='/activities'>
                    <button className='boton'>Crear Actividad</button>
                </Link>
            
            <Search 
            mostrarPoblacion={mostrarPoblacion}
            setActivity={setActivity}/>
            {activity === 'Pais'?                           
                <Paginado 
                setPaginaActual={setPaginaActual}
              paginaActual={paginaActual}
              paisesPorPagina={paisesPorPag}
              allcountries={allCountries.length}
              paginado={paginado}
              
            />:null}
            { activity === 'Actividad'? 
            <div>                  
                 <Activity />
            </div>
            :<div>
                {
                    paisActual?.map((c)=>{
                        return(
                            <Country 
                            key={c.id}
                            id={c.id}
                            image={c.flags}
                            name={c.name}
                            continent={c.continents}
                            poblacion={poblacion? c.population : null}
                            condicion={poblacion}
                            />
                        )
                    })
                }
            </div>}
        </div>
     );
}
 
export default Countries;