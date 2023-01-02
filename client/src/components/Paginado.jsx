import React from 'react';
import styles from './Paginado.module.css';




const Paginado = ({paisesPorPagina, allcountries,paginado,paginaActual,setPaginaActual,paisActual}) => {
    const pageNumber= [];

    const totalPagina = Math.ceil(allcountries/paisesPorPagina);
    for (let i = 1; i < totalPagina+1; i++) {
        pageNumber.push(i)
    }
    let page = ()=>{
        const mitad = Math.round(4/2);
        let hasta = 4;
        if(paginaActual + mitad >= totalPagina){
            hasta = totalPagina;
        }else if(paginaActual>mitad){
            hasta = paginaActual + mitad;
        }
        let desde = hasta-4;
        if(desde < 0){
          desde=0;
        }
        return pageNumber.slice(desde,hasta);
    };
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
        <nav className={styles.page}>                        
                {paisActual < 9 && paginaActual===1?null:<div >
                {paginaActual > 1 ?
                <a
                className={styles.anterior}
                onClick={paginaAnterior}
                >&laquo; </a> : null
                }
                   {
                    page().map(number=>
                        <a  onClick={()=>paginado(number)} className={number===paginaActual? styles.active:null}  key={number}>{number}</a> 
                        )
                   }
                   
                {
                    paginaActual< totalPagina? 
                    <a
                    className={styles.siguiente}
                    onClick={paginaSiguiente}
                    >&raquo;</a>: null
                    }
                </div>}
            
            
        </nav>
    )
}
 
export default Paginado;