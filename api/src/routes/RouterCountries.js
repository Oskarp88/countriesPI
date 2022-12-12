const { Router } = require("express");
const { getAllCountries, getContinents } = require("../controllers/CountryControllers");

const countriesRouter = Router();

countriesRouter.get('/', getAllCountries);
countriesRouter.get('/continents/:filter', getContinents);

module.exports = countriesRouter;