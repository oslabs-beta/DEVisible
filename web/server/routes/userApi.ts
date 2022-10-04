import express, { Request, Response, NextFunction, Application } from 'express';
// import userController from '../controllers/userController';
const router = express.Router();

// TODO import controllers

//* signup
router.post('/signup', (req, res) => {
  res.status(200).json(res.locals.user);
});

//* login
router.post('/login', (req, res) => {
  res.status(200).json(res.locals.user);
});
