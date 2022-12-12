const { Router } = require('express');
const activityRouter = require('./RouterActivity');
const countries = require('./RouterCountries');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countries);
router.use('/activities',activityRouter);


module.exports = router;

