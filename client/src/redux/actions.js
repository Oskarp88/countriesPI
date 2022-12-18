import axios from 'axios';
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const GET_COUNTRY = 'GET_COUNTRY';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';

export const getAllCountries = ()=> async(dispatch)=>{
    const url = await axios.get('http://localhost:3001/countries');
    return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: url.data,
    })
   
}

export const getCountry = (name)=>async(dispatch)=>{
    const url = await axios.get(`http://localhost:3001/countries?name=${name}`);
    return dispatch({
        type: GET_COUNTRY,
        payload: url.data,
    })
}

export const filterContinent = (continent)=> async(dispatch)=>{
    const url = await axios.get(`http://localhost:3001/countries/continents/${continent}`);
    return dispatch({
        type: FILTER_CONTINENT,
        payload: url.data,
    })
   
}
export const orderByName = (payload)=>{
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderByPopulation = (payload)=>{
    return{
        type: ORDER_BY_POPULATION,
        payload
    }
}