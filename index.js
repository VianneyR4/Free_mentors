import express from 'express';
import app1 from './server/v1/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', app1);

// routes.routes;

const port = process.env.PORT || 9000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}...`));
