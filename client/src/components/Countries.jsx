import React from 'react';
import './Countries.css';
import { filterContinent, getAllCountries, getCountry, orderByName } from '../redux/actions';
import Country from './Country';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Paginado from './Paginado';
import Error from './Error';

const Countries = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector((state)=> state.countries);
    const [paginaActual, setPaginaActual]=useState(1);
    const [paisesPorPag, setPaisesPorPag]=useState(9);
    const [error, setError] = useState(false);
    const [orden, setOrden] = useState('');

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
    }
    const filterContinente = (e)=>{
        dispatch(filterContinent(e.target.value))
    }
    const orderName = (e)=>{
        e.preventDefault(e);
        dispatch(orderByName(e.target.value));
        setPaginaActual(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    const buscarPais = (e)=>{
        e.preventDefault();

        if(e.trim() === ''){
            setError(true);
            return;
        }
        setError(false);
        dispatch(getCountry(e));
    }
    return ( 
        <div>
            <h1>Oscar Countries</h1>
            <div >
            <input 
               name='pais'
               className='form-Buscador'
               type='text'
               placeholder='Buscar Pais'
               onChange={(e)=>buscarPais(e.target.value)}
               
             />
            
             <input 
                type='submit'
                className='btn'
                value='Buscar'
                onSubmit={buscarPais}
            />
            </div>
            {error? <Error error={'por favor debes de llenar el campo'}/>:null}
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
                  name='poblacion'
                >
                    <option >--Cantidad de poblacion--</option>
                    <option value="ascendente">Mayor</option>
                    <option value="descendente">Menor</option>
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
                            />
                        )
                    })
                }
            </div>
        </div>
     );
}
 
export default Countries;