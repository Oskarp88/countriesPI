import axios from 'axios';
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const GET_COUNTRY = 'GET_COUNTRY';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const POST_ACTIVITY = 'POST_ACTIVTY';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_NAME_ACTIVITY = 'GET_NAME_ACTIVITY';
export const GET_ACTYVITY_BY_NAME = 'GET_ACTIVITY_BY_NAME';


export const getAllCountries = ()=> async(dispatch)=>{
    const url = await axios.get('/countries');
    return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: url.data,
    })
   
}

export const getCountry = (name)=> async(dispatch)=>{
    const url = await axios.get(`/countries?name=${name}`);
    return dispatch({
        type: GET_COUNTRY,
        payload: url.data,
    })
}

export const getDetail = (id)=> async(dispatch)=>{
    const url = await axios.get(`/countries/${id}`);
    return dispatch({
        type: GET_DETAIL,
        payload: url.data,
    })
   
}
export const PostActivity = (activity)=>async(dispatch)=>{
    const url = await axios.post('/activities',activity);
    return url;
}
export const getActivities = ()=>async(dispatch)=>{
    const url = await axios.get('/activities');
    return dispatch({
        type: GET_ACTIVITIES,
        payload: url.data,
    })
}
export const getNameActivity = (name)=>{
    return ({
        type: GET_NAME_ACTIVITY,
        payload: name
    })
}
export const getActivityByName = (name)=>{
    return ({
        type: GET_ACTYVITY_BY_NAME,
        payload: name
    })
}

export const filterContinent = (id) =>{
    return{
        type: FILTER_CONTINENT,
        payload: id
    }
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