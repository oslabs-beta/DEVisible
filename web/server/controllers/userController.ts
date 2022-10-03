// require model through prisma?
import { PrismaClient } from '@prisma/client';
import express, { Request, Response, NextFunction, Application } from 'express';

const prisma = new PrismaClient();
interface userController {
  createUser: (req: Request, res: Response, next: NextFunction) => void;
}

const userController: userController = {
  createUser: (req, res, next) => {
    console.log('hi');
  },
};

prisma.user.create({
  data: {
    APIToken: '',
    username: '',
    passwordHash: '',
  },
});

module.exports = userController;
