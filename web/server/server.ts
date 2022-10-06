/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import cookieParser from 'cookie-parser';
import userApiRouter from './routes/userApi';
import appRouter from './routes/appApi';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// TODO require routers

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.resolve('./frontend/dist/assets')));

// TODO route handlers
app.use('/userAPI', userApiRouter);
app.use('/app', appRouter);

app.get('/', (req, res): void => {
  res.status(200).sendFile(path.resolve('./frontend/dist/index.html'));
});

// TODO get requests for reactrouter routes

app.use('*', (req, res) => {
  return res.status(404).send('The page you are looking for does not exist.');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: `GLOBAL ERROR HANDLER: caught unknown middleware error${err.toString()}`,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  if (errorObj.log) console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (O_O)`);
});

module.exports = app;
