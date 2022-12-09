const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Country,Activity}=require('../db');
const { Op } = require('sequelize');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const api = async()=>{
    const consultaApi = await axios.get('https://restcountries.com/v3.1/all');
    const infoApi = await consultaApi.data.map(e=>{
        return{
          id: e.cca3,
          name: e.name.common,
          flags: e.flags.svg,
          continents: e.continents[0],
          capital: e.capital ? e.capital[0] : "No hay datos",
          subregion: e.subregion? e.subregion : "No hay datos",
          area: e.area,
          population: e.population,
        }
     });
     console.log(infoApi);
     return infoApi;
}

router.get('/countries',async(req,res)=>{
    const { name, filter, page, order} = req.query;

    const apiCountries = await api();

    try {
        let bd = await Country.findAll();
        if(!bd.length) {
            await Country.bulkCreate(apiCountries)
            }
    } catch (error) {
        console.log(error)
    }

    if(name){
        try {
           let pais = await Country.findAll({
            where:{
                name:{
                    [Op.iLike]: '%'+name+'%'
                }
            }
           });
           return res.json(pais);
        } catch (error) {
            console.log(error);
        }
    }else if(filter){
        try {
            let pais = await Country.findAll({
                where:{
                    continents: filter
                },
                limit: 10,
                offset: page,
                order: [["name", order]],
                include: { 
                    model: Activity,
                    attributes: ["name","difficulty","duration","season"],
                    through:{
                        attributes: [],
                    }
                }
            });
            return res.json(pais)
        } catch (error) {
            
        }
    }else{
        try {
           let pais = await Country.findAll({
            limit: 10,
            offset: page,
            order: [["name", order]],
            include: { 
                model: Activity,
                attributes: ['name','difficulty','duration','season'],
                through:{
                    attributes: [],
                }
            }
           });
           return res.json(pais);
        } catch (error) {
            console.log(error);
        }
    }
})
module.exports = router;
