import express, { json, Request, ErrorRequestHandler } from 'express';
import serverless from 'serverless-http';
import helmet from 'helmet';
import compression from 'compression';

import routes from './routes/Routes';
import { HttpException, InternalServerErrorException } from './exceptions';

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

// Error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    return res.status(err.getStatus()).json(err.getResponse());
  }
  // log internal server errors
  console.log(err, 'Internal Server Error');

  // send only error message not details
  const internalErr = new InternalServerErrorException('Internal Server Error');
  return res.status(internalErr.getStatus()).json(internalErr.getResponse());
};
app.use(errorHandler);

const serverlessHandler = serverless(app);

export { serverlessHandler, app };
