const axios = require('axios');
const { Country } = require('../db');

const cargarBDCountry = async () => {
  
  try {
      const verifyDB = await Country.findAll();
      if (!verifyDB.length > 0) {
          const apiURL = await axios.get('https://restcountries.com/v3/all');
          const apiInfo = await apiURL.data.map(c => {
              return {
              id: c.cca3,
              name: c.name.common,
              flags: c.flags[0],
              continents: c.continents[0],
              capital: c.capital != null ? c.capital[0] : "No data",
              subregion: c.subregion? c.subregion : "No hay datos",
              area: c.area,
              population: c.population,
              }
          })      
          await Country.bulkCreate(apiInfo, {validate: true })
      }
  } catch (e) {
      console.log(e)
  }
}
module.exports = cargarBDCountry;