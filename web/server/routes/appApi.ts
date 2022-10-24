import express from 'express';
import cookieParser from 'cookie-parser';
import appController from '../controllers/appController';

const router = express.Router();
router.use(cookieParser());

// post route that receives info from NPM package
router.post(
  '/',
  appController.checkRepo,
  appController.addOrUpdateRepo,
  (req, res) => {
    res.status(201).json(res.locals.message);
  }
);

export default router;
