import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../redux/actions';
import CardActivity from './CardActivity';


const Activity = () => {
   const dispatch = useDispatch();
   const allActivity = useSelector((state)=>state.activities);
 
   useEffect(()=>{
     dispatch(getActivities())
   },[dispatch]);
   
    return ( 
        <div>
            
            {
                allActivity?.map((a)=>(
                    <CardActivity 
                       key={a.id}
                       name={a.name}
                       difficulty={a.difficulty}
                       duration={a.duration}
                       season={a.season}
                       paises={a.countries.map((c)=>c.name+('  '))}
                    />
                ))
            }
            
        </div>
     );
}
 
export default Activity;
