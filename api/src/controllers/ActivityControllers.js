
const { Country, Activity} = require('../db');


const getAllActivity = async(req,res)=>{
    const {name}=req.query;
    try {
       
        if(name){
            const actividad = await Activity.findAll({
                where: {
                    name: name
                }
            });
            return res.send(actividad);
        }else{
            const actividad = await Activity.findAll();
            return res.send(actividad);
        }
    } catch (error) {
        res.send(error.message);
    }
}

const activityCreate = async(req,res)=>{
    const {name,difficulty,duration,season,countryId}=req.body;
    
    
        try {
            if(name&&difficulty&&duration&&season&&countryId.length>0){
                // countryId.forEach((c) => {
                //     idPais(name,difficulty,duration,season,c)
                // });
                const newAct = await Activity.create({
                     name,
                     difficulty,
                     duration,
                     season
                    });
                    await newAct.addCountries(countryId);
                return res.send("Actividad creada");
            }else{
                res.send('faltan parametros')
            }
            
        } catch (error) {
            res.send(error.message);
        }
    
}
// const idPais = async(name,difficulty,duration,season,countryId)=>{
//     try {
//         const newAct = await Activity.create({
//             name,
//             difficulty,
//             duration,
//             season
//         });
//         await newAct.addCountries(countryId);
        
//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports={
    getAllActivity,
    activityCreate
}