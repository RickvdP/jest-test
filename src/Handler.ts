import express, { json, Request } from 'express';
import serverless from 'serverless-http';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes/Routes';

const app = express();
app.use(json());
app.use(helmet());
app.use(compression());

// Setting base url
app.use('/administrations', routes);

app.use((req: Request, res) => res.status(404).json({
  error: 'Not Found',
  message: 'This page doesn\'t exist',
}));

const serverlessHandler = serverless(app);

export { serverlessHandler, app };
