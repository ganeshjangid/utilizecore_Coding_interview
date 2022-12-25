import express from 'express';
import website from './website';
import swaggerUI from 'swagger-ui-express';
const version = '1.0.0';
const swaggerRouter = express.Router();

swaggerRouter.use(`/${version}/website`, swaggerUI.serve, (...args) => swaggerUI.setup(website)(...args));

export default swaggerRouter;
