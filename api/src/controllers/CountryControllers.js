const { Op } = require('sequelize');
const { Country, Activity } = require('../db');

const getAllCountries = async (req, res) => {
    const {name} = req.query;
    try {
        if(!name){

            const allCountries = await Country.findAll({include: Activity});

            return res.send(allCountries);
        }else{
            let pais = await Country.findAll({
                where:{
                   name:{
                    [Op.iLike]:'%'+name+'%'
                   }
                },
                include: Activity
            });
            if(!pais[0]){
                return res.status(404).json({error: 'No existe un pais con ese nombre: ', name});
            }
            return res.send(pais);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const getContinents = async(req,res)=>{
    const {filter} = req.params;

    if(filter){
        let continente = await Country.findAll({
            where: {
                continents:{
                    [Op.iLike]: '%'+filter+'%'
                },
            }
        });
        return res.send(continente);
    }
}


module.exports = {
    getAllCountries,
    getContinents
}