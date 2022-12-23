const { Router } = require("express");
const { getAllCountries, getDetail } = require("../controllers/CountryControllers");

const countriesRouter = Router();

countriesRouter.get('/', getAllCountries);
countriesRouter.get('/:id', getDetail);

module.exports = countriesRouter;