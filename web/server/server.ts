import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import userApiRouter from './routes/userApi';
import webApiRouter from './routes/webApi';
import appRouter from './routes/appApi';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.resolve('./frontend/dist/assets')));

// TODO route handlers
app.use('/userAPI', userApiRouter);
app.use('/webAPI', webApiRouter);
app.use('/app', appRouter);

app.get('/', (req, res): void => {
  res.status(200).sendFile(path.resolve('./frontend/dist/index.html'));
});

app.use('*', (req, res) => {
  return res.status(404).send('The page you are looking for does not exist.');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const defaultErr = {
    log: `GLOBAL ERROR HANDLER: caught unknown middleware error${err.toString()}`,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  if (errorObj.log) console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (O_O)`);
});

// module.exports = app;
