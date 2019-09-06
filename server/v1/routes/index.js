import express from 'express';
import routes from './route_signup';

const app1 = express.Router();

app1.use(routes);

export default app1;
