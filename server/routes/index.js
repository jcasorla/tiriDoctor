const express = require('express');
const router = express.Router();
const catchallRoute = require('./catchall.routes');
const apiRouter = express.Router();
const pacienteRoutes = require('./paciente.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
apiRouter.use('/pacientes', pacienteRoutes);
apiRouter.use('/auth',authRoutes);
apiRouter.use('/user',userRoutes);  

router.use('/api', apiRouter)
  .use(authRoutes)
  .use(catchallRoute);
  
module.exports = router;
