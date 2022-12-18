import React from 'react';
import './paginado.css';

const Paginado = ({paisesPorPagina, allcountries, paginado}) => {
    const pageNumber= [];

    for (let i = 0; i < Math.ceil(allcountries/paisesPorPagina); i++) {
        pageNumber.push(i)
    }
    
    return(
        <nav>
            <ul className='pagination'>
                {
                    pageNumber?.map(number=>(
                        <li className='number' key={number}>
                          <a onClick={()=>paginado(number)}>{number ===0? null: number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
 
export default Paginado;