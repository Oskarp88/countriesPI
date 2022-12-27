import React from 'react';
import styled from 'styled-components';
import styles from './Paginado.module.css';

const Boton = styled.button`
    margin-top: 20px;
    margin: 2px;
    font-weight: bold;
    font-size: 20px;
    padding: 8px 16px;
    background-color: #36486b;
    border: none;
    width: auto;
    color: #fff;
    transition: background-color .3s ease;
    margin-left: 10px;

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
            
            
                <div className={styles.page}>
                {paginaActual > 1 ?
                <a
                className={styles.anterior}
                onClick={paginaAnterior}
                >&laquo; </a> : null
                }
                {
                    pageNumber?.map(number=>(
                          number ===0? null:
                            <a  onClick={()=>paginado(number)} key={number}>{number}</a>
                          
                    ))
                }
                {
                    paginaActual< totalPagina? 
                    <a
                    className={styles.siguiente}
                    onClick={paginaSiguiente}
                    >&raquo;</a>: null
                    }
                </div>
            
            
        </nav>
    )
}
 
export default Paginado;