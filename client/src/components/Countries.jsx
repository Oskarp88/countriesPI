import React from 'react';
import styles from './Countries.module.css';
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
   
    const indiceUltimoPais = paginaActual * paisesPorPag
    const indicePrimerPais =  indiceUltimoPais - paisesPorPag;
    
    const paisActual = allCountries.slice(paginaActual===1?0:indicePrimerPais-1,indiceUltimoPais-1);
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
        setActivity('Pais');
        mostrarPoblacion(false)       
    }
    const filterContinente = (e)=>{
        dispatch(filterContinent(e.target.value))
        mostrarPoblacion(false);
        setPaginaActual(1);
    }
    const orderName = (e)=>{
        e.preventDefault(e);
        dispatch(orderByName(e.target.value));
        setPaginaActual(1);
        setOrden(`Ordenado ${e.target.value}`);
        mostrarPoblacion(false);
        setPaginaActual(1);
    }
    const orderPopulation = (e)=>{
        e.preventDefault(e);
        dispatch(orderByPopulation(e.target.value));
        setPaginaActual(1);
        setOrden(`Ordenado ${e.target.value}`)
        mostrarPoblacion(true);
        setPaginaActual(1);
    }

    
    return ( 
        <div className={styles.contenedor}>
            <h1 className={styles.titulo}>Oscar Countries</h1>
            <h3 className={styles.titulo3}>Filtrar por:</h3>
            <div className={styles.campo}>
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
            <div className={styles.botones}>
                <button className={styles.boton} onClick={e=>{handleClick(e)}}>
                    Cargar Paises
                </button>
                <button className={styles.boton}><Link  to='/activities'>
                    Crear Actividad
                </Link></button>
            </div>
            
            <Search 
            mostrarPoblacion={mostrarPoblacion}
            setActivity={setActivity}
            setPaginaActual={setPaginaActual}/>

            {activity === 'Pais'?                           
                <Paginado 
                setPaginaActual={setPaginaActual}
              paginaActual={paginaActual}
              paisesPorPagina={paisesPorPag}
              allcountries={allCountries.length}
              paginado={paginado}
              
            />:null}
            { activity === 'Actividad'? 
            <div className={styles.cardActivity}>                  
                 <Activity />
            </div>
            :<div className={styles.contry}>
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