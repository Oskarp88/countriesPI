import React from 'react';
import './Countries.css';
import { filterContinent, getAllCountries, orderByName, orderByPopulation } from '../redux/actions';
import Country from './Country';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Paginado from './Paginado';
import Search from './Search';

const Countries = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector((state)=> state.countries);
    const [paginaActual, setPaginaActual]=useState(1);
    const [paisesPorPag, setPaisesPorPag]=useState(9);
    const [orden, setOrden] = useState('');
    const [poblacion, mostrarPoblacion] = useState(false);

    const indiceUltimoPais = paginaActual * paisesPorPag;
    const indicePrimerPais = indiceUltimoPais - paisesPorPag;
    
    const paisActual = allCountries.slice(indicePrimerPais,indiceUltimoPais);

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
        <div>
            <h1>Oscar Countries</h1>
            <Search mostrarPoblacion={mostrarPoblacion}/>
            <div className='campo'>
                <label className='label'>Filtrar por Continente</label>
                <select
                  className='form-control'
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
                </select>
                <label className='label'>Por orden Alfabatico</label>

                <select
                  className='form-control'
                  name='alfabeticamente'
                  onChange={e=>orderName(e)}
                >
                    <option value="">--Ordenar Alfabeticamente--</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </select>
                <label className='label'>Por Cantidad de Poblacion</label>
                <select
                  className='form-control'
                  onChange={e=>orderPopulation(e)}
                >
                    <option >--Cantidad de poblacion--</option>
                    <option value="asc">Mayor</option>
                    <option value="des">Menor</option>
                </select>
            </div>
            <button onClick={e=>{handleClick(e)}}>
                Cargar todos los paises
            </button>
            <Paginado 
              paisesPorPagina={paisesPorPag}
              allcountries={allCountries.length}
              paginado={paginado}
            />
            <div>
                {
                    paisActual?.map((c)=>{
                        return(
                            <Country 
                            key={c.id}
                            image={c.flags}
                            name={c.name}
                            continent={c.continents}
                            poblacion={poblacion? c.population : null}
                            condicion={poblacion}
                            />
                        )
                    })
                }
            </div>
        </div>
     );
}
 
export default Countries;