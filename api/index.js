//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country, Activity } = require('./src/db.js');
const axios = require('axios');

async function chargeCountries () {
  console.log(Country.model);
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

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await chargeCountries();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
