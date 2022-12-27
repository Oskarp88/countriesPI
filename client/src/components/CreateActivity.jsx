import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {  getActivities, getAllCountries,  getNameActivity,  PostActivity } from '../redux/actions';
import Error from './Error';
import styled from 'styled-components';

const Card = styled.div`
    margin-top: 5px;
    margin: 2px;
    display: inline-flex;
    font-weight: bold;
    padding: 2px;
    background-color: #36486b;
    border: none;
    width: 20%;
    border-radius: 5px;
    color: #fff;
    transition: background-color .3s ease;
    &:hover{
    background-color: #618685;
    cursor: pointer;
}
`;

const Select = styled.select`
   width: 100%;
   display: block;
   padding: 1rem;
   -webkit-appearance: none;
   border-radius: 10px;
   border: none;
   font-size: 1.2rem;
   text-align: center;
`;
const Input = styled.input`
    width: 100%;
   display: block;
   padding: 1rem;
   text-align: center;
   border-radius: 10px;
   border: none;
   font-size: 1.2rem;
`;
const Label = styled.label`
   font-family: 'Bebas Neue', cursive;
   color: #1b3252;
   text-transform: uppercase;
   font-weight: bold;
   font-size: 2.4rem;
   margin-top: 2rem;
   display: block;
`;
const Heading = styled.h1`
   font-family: 'Bebas Neue', cursive;
   color: #1b3252;
   text-align: center;
   font-weight: 700;
   font-size: 50px;
   margin-bottom: 50px;
   margin-top: 80px;

   &::after{
    content: '';
    width: 100%;
    height: 6px;
    background-color: #36486b;
    display:block;
   }
`;
const Boton = styled.button`
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px 20px;
    background-color: #36486b;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #618685;
        cursor: pointer;
    }
`;
const Btn = styled.button`
    margin-top: 20px;
    margin: 5px;
    margin-left: 15px;
    font-weight: bold;
    font-size: 10px;
    padding: 0 5px;
    background-color: #5e0404;
    border: none;
    width: auto;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #030f0f;
        cursor: pointer;
    }
`
const P = styled.p`
    margin: 5px;
    margin-left: 10px;
`;
const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media (min-width:992px){
      display: grid;
      grid-template-columns: repeat(2,1fr);
      column-gap: 2rem;
    }
`;
const Regresar = styled.button`
    margin-top: 100px;
    margin-right: 90%;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #36486b;
    border: none;
    width: 50%;
    color: #fff;
    border-radius: 10px;
    
    transition: background-color .3s ease;

    &:hover{
        background-color: #618685;
        cursor: pointer;
    }
`;


const CreateActivity = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const activity = useSelector((state)=>state.activities);
    const countries = useSelector((state)=>state.countries);


    const [input, setInput] = useState({
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        countryId: []
    });
    const [error, setError] = useState(false);
    

    const selectOrden  = countries.sort(function (a,b){
        if(a.name > b.name){
            return 1;
        }
        if(b.name > a.name){
            return -1;
        } 
        return 0;
       })
    
    
    const handleChange = (e)=>{
        
        setInput({
            ...input,
            [e.target.name]:e.target.value
        });
    }
    
    const agregarPais =  (e)=>{
        
        if(e.target.value==='') return;
        if(input.countryId.includes(e.target.value)){
            return alert(`El pais ${e.target.value} ya esta añadido`);
        }
            setInput({
                ...input,
                countryId: [...input.countryId, e.target.value]
            })
        
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        let nameAct =activity.find(act=>act.name === input.name);
        if(nameAct!== undefined){
            return alert("El nombre de la actividad ya existe, por Favor escriba otro nombre");
        }
        if(input.name.trim()===''||input.difficulty === 0 || input.duration === 0 
        || input.season.trim() === '' || input.countryId.length === 0){
            setError(true);
            return;
        }
        setError(false);
        
        

        dispatch(PostActivity(input));
        alert("Actividad Creada!!");
        setInput({
            name: "",
            difficulty: 0,
            duration: 0,
            season: "",
            countryId: []
        });
        history.push('/countries');
    }
    const handleDelete = (e)=>{
        setInput({
            ...input,
            countryId: input.countryId.filter((pais)=> pais !== e)
        })
    }

    useEffect(()=>{
       dispatch(getAllCountries());
       dispatch(getActivities());
    },[dispatch]);

    return(
      <Contenedor>
        <div>
            
              <Link to='/countries'>
                <Regresar>{'<<'} Regresar</Regresar>
              </Link>
            
        </div>
        <div>            
            <Heading>Crea tu Actividad</Heading>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    {error? <Error error='Por favor debes de llenar todos los campos'/> : null}
                    <div>
                        <Label>Nombre: </Label>
                        <Input
                        type='text'
                        value={input.name}
                        name= 'name'
                        placeholder='Nombre De La Actividad'
                        onChange={e=>handleChange(e)}
                        />
                    </div>
                    <div>
                        <Label>Dificultad</Label>
                        <Select 
                        className='selec'
                        value={input.difficulty}
                        name='difficulty'
                        onChange={e=>handleChange(e)}
                        >
                            <option value={0}>--dificultad--</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Select>
                    </div>
                    <div>
                        <Label>Duration</Label>
                        <Input 
                        type='number'
                        value={input.duration}
                        name='duration'
                        placeholder='Duracion en Horas'
                        onChange={e=>handleChange(e)}
                        />
                    </div>
                    <div>
                        <Label>Temporada</Label>
                        <Select
                        className='selec'
                        value={input.season}
                        name='season'
                        onChange={e=>handleChange(e)}
                        >
                            <option value="">--Temporada--</option>
                            <option value="Verano">Verano</option>
                            <option value="Otoño">Otoño</option>
                            <option value="Invierno">Invierno</option>
                            <option value="Primavera">Primavera</option>
                        </Select>
                    </div>
                    <div>
                    <Label>Pais </Label>
                    <Select
                        className='selec'
                        onChange={e=>agregarPais(e)}
                        value={input.countryId}
                        name='paises'
                    >
                        <option value="">-- Seleccione --</option>
                        { selectOrden.map(pais=>(
                            <option key={pais.id} value={pais.id}>{pais.name}</option>
                        ))}
                    </Select>
                        
                            {
                            input.countryId.map((e)=>(
                                    <Card>
                                        <P>{e}</P>
                                        <Btn onClick={()=>handleDelete(e)}>x</Btn>
                                    </Card>
                                ))
                            }
                    
                    </div>
                    <Boton type='submit'>Crear Actividad</Boton>
                </form>
        </div>
        
      </Contenedor>
    )
}
 
export default CreateActivity;