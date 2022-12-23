import { FILTER_CONTINENT, GET_ACTIVITIES, GET_ALL_COUNTRIES, GET_COUNTRY,  GET_DETAIL, GET_NAME_ACTIVITY, ORDER_BY_NAME, ORDER_BY_POPULATION, POST_ACTIVITY } from "./actions";

const initialState={
    countries: [],
    allCountries:[],
    activities: [],
    activity: [],
    details:[],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case GET_COUNTRY:
            return{
                ...state,
                countries: action.payload,
            }
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload,
                activity: action.payload,
            }
        case POST_ACTIVITY:
            return{
                ...state,
            }
        case GET_NAME_ACTIVITY:
            const act = state.activity;
            const filtro = act.filter(e=> e.name=== action.payload);
            return{
                ...state,
                activities: filtro
            }
        case FILTER_CONTINENT:
            const country = state.allCountries;
            const filtered = action.payload === ''? country : country.filter(e=> e.continents === action.payload)
            return{
                ...state,
                countries: filtered,
            }
        case GET_DETAIL:
            return{
                ...state,
                details: action.payload
            }

        case ORDER_BY_NAME:
            let array = [];
           if (action.payload === 'asc') {
               array = state.countries.sort(function (a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                } 
                return 0;
               })
           }else if(action.payload === 'des'){
            array = state.countries.sort(function (a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                } 
                return 0;
               })
           } else {
             array = state.countries;
           }
           
           return{
               ...state,
               countries: array
            }
        case ORDER_BY_POPULATION:
            let populationArr = [];
           if (action.payload === 'asc') {
               populationArr= state.countries.sort(function (a,b){
                if(a.population > b.population){
                    return -1;
                }
                if(b.population > a.population){
                    return 1;
                } 
                return 0;
               })
           }else if(action.payload === 'des'){
            populationArr = state.countries.sort(function (a,b){
                if(a.population > b.population){
                    return 1;
                }
                if(b.population > a.population){
                    return -1;
                } 
                return 0;
               })
           } else {
             populationArr = state.countries;
           }
           
           return{
               ...state,
               countries: populationArr
           }
            
        default: 
          return {...state};
    }
};

export default rootReducer;