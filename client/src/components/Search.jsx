import React, { useState } from 'react';
import {  getActivityByName, getCountry, getCountryActivity, getNameActivity } from '../redux/actions';
import Error from './Error';
import { useDispatch } from 'react-redux';
import styles from './Countries.module.css';
import styled from 'styled-components';

const Contenedor = styled.div`
   width: 60%;
   margin-left: 24%;
   margin-bottom: 5px;
`;
const Select = styled.select`
    width: auto;
    background-color: #36486b;
    padding: 10px 20px;   
   border-radius: 10px 0 0 10px;
   border: none;
   font-size: 1.2rem;
   color: #fff;
   
`;
const Input = styled.input`
    width: 50%;
    padding: 10px 20px;
    border: none;
    font-size: 1.2rem;
`;

const Search = ({mostrarPoblacion,setPaginaActual,setActivity}) => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [selec, setSelect] = useState("PorPais");

    const inputPais = (e)=>{
        e.preventDefault();
        setName(e.target.value);
    }
    const buscarPais = (e)=>{
        e.preventDefault();
        if(name.trim() === ''){
            setError(true);
            return;
        }
        setError(false);
        setPaginaActual(1);
        if(selec === 'PorActividad'){
            dispatch(getNameActivity(name))
        }else if(selec === 'PorPais'){
            dispatch(getCountry(name))
        }else{
            dispatch(getActivityByName(name));
        }
       
       
        mostrarPoblacion(false);
    }
    const handleSelect = (e)=>{
         setSelect(e.target.value);
         setActivity(e.target.value);
    }

    return ( 
        <Contenedor>
            <div className={styles.search}>
                <Select onChange={(e)=>handleSelect(e)} >
                    <option value="PorPais">Por Pais</option>
                    <option value="PorActividad">Por Actividad</option>
                    <option value="Actividad">Actividad</option>
                </Select>
                <Input
                className='form-Buscador'
                type='text'
                placeholder= 'Buscar...'
                onChange={(e)=>inputPais(e)}
                
                />
                
                <input 
                    type='submit'
                    className={styles.btn}
                    value='Buscar'
                    onClick={e=>buscarPais(e)}
                />
            </div>
            {error? <Error error={'por favor debes de llenar el campo'}/>:null}
        </Contenedor>
     );
}
 
export default Search;