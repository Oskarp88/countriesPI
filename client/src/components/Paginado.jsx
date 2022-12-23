import React from 'react';
import styled from 'styled-components';
import './paginado.css';

const Boton = styled.button`
    margin-top: 20px;
    margin: 2px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px 20px;
    background-color: #36486b;
    border: none;
    width: auto;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #618685;
        cursor: pointer;
    }
`;


const Paginado = ({paisesPorPagina, allcountries, paginado,paginaActual,setPaginaActual}) => {
    const pageNumber= [];

    const totalPagina = Math.ceil(allcountries/paisesPorPagina);
    for (let i = 0; i < totalPagina; i++) {
        pageNumber.push(i)
    }
    //definir pagina anterior
  const paginaAnterior = ()=>{
    const nuevaPaginaActual = paginaActual - 1;
    if(nuevaPaginaActual===0) return;
    setPaginaActual(nuevaPaginaActual);
 }
 //definir pagina siguiente
 const paginaSiguiente = () => {
   const pagCurrent = paginaActual + 1;
   if(pagCurrent === totalPagina +1)return;
   setPaginaActual(pagCurrent);
 }
    
    return(
        <nav>
            {paginaActual > 1 ?
            <button
            type='button'
            className="anterior"
            onClick={paginaAnterior}
            >{"<<"} Anterior </button> : null
            }
            
                {
                    pageNumber?.map(number=>(
                          number ===0? null:
                            <Boton  onClick={()=>paginado(number)} key={number}>{number}</Boton>
                          
                    ))
                }
            
            {
          paginaActual< totalPagina? 
          <button
           type='button'
           className="siguiente"
           onClick={paginaSiguiente}
           >Siguiente {">>"}</button>: null
          }
        </nav>
    )
}
 
export default Paginado;