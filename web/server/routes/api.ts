import express, { Request, Response, NextFunction, Application } from 'express';
import { userController } from '../controllers/userController';
const router = express.Router();

// TODO import controllers

//* signup
router.post('/signup', (req, res) => {
  res.sendStatus(200);
});

//* login
router.post('/signup', (req, res) => {
  res.sendStatus(200);
});
