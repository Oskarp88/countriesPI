import React, { useState } from 'react';
import {  getCountry, getNameActivity } from '../redux/actions';
import Error from './Error';
import { useDispatch } from 'react-redux';
import './Countries.css';
import styled from 'styled-components';

const Select = styled.select`
    width: auto;
    background-color: #36486b;
    padding: 10px 20px;
   -webkit-appearance: none;
   border-radius: 10px 0 0 10px;
   border: none;
   font-size: 1.2rem;
   color: #fff;
`;
const Input = styled.input`
    width: 30%;
    padding: 10px 20px;
   border: none;
   font-size: 1.2rem;
`;

const Search = ({mostrarPoblacion,setActivity}) => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [selec, setSelect] = useState("pais");

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
        if(selec === 'Pais'){
        dispatch(getCountry(name));
       }else{
        dispatch(getNameActivity(name));
       }
        mostrarPoblacion(false);
    }
    const handleSelect = (e)=>{
         setSelect(e.target.value);
         setActivity(e.target.value);
    }

    return ( 
        <div>
            <div >
                <Select onChange={(e)=>handleSelect(e)} >
                    <option value="Pais">Pais</option>
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
                    className='btn'
                    value='Buscar'
                    onClick={e=>buscarPais(e)}
                />
                </div>
            {error? <Error error={'por favor debes de llenar el campo'}/>:null}
        </div>
     );
}
 
export default Search;