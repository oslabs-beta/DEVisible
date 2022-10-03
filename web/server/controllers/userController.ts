// require model through prisma?
import express, { Request, Response, NextFunction, Application } from 'express';
const userController: any = {};

userController.createUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('hi');
};

module.exports = userController;
