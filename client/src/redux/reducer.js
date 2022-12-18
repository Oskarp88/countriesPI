import { FILTER_CONTINENT, GET_ALL_COUNTRIES, GET_COUNTRY, ORDER_BY_NAME } from "./actions";

const initialState={
    countries: [],
    allCountries:[],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
            }
        case GET_COUNTRY:
            return{
                ...state,
                countries: action.payload,
            }
        case FILTER_CONTINENT:
            return{
                ...state,
                countries: action.payload,
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
        default: 
          return {...state};
    }
};

export default rootReducer;