const express = require('express');
const router = express.Router();
const catchallRoute = require('./catchall.routes');
const apiRouter = express.Router();
const pacienteRoutes = require('./paciente.routes');
const authRoutes = require('./auth.routes');
apiRouter.use('/pacientes', pacienteRoutes);        

router.use('/api', apiRouter)
  .use(authRoutes)
  .use(catchallRoute);
  
module.exports = router;
