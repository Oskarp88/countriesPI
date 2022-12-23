const { Router } = require("express");
const { getAllActivity, activityCreate } = require("../controllers/ActivityControllers");


const activityRouter = Router();

activityRouter.get('/',getAllActivity);
activityRouter.post('/',activityCreate);

module.exports = activityRouter;