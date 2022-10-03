import express, { Request, Response, NextFunction, Application } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// TODO require routers
const userApiRouter = require('./routes/userApi');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../frontend/dist/assets')));

// TODO route handlers
app.use('/userAPI', userApiRouter);

app.get('/', (req, res): void => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// TODO get requests for reactrouter routes

app.use('*', (req: Request, res: Response) => {
  return res.status(404).send('The page you are looking for does not exist.');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'GLOBAL ERROR HANDLER: caught unknown middleware error',
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
