import React, { useState } from 'react';
import { getCountry } from '../redux/actions';
import Error from './Error';
import { useDispatch } from 'react-redux';

const Search = ({mostrarPoblacion}) => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [error, setError] = useState(false);

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
        dispatch(getCountry(name));
        mostrarPoblacion(false);
    }

    return ( 
        <div>
            <div >
                <input
                className='form-Buscador'
                type='text'
                placeholder='Buscar Pais'
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