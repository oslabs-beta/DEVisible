// require model through prisma?
import { PrismaClient } from '@prisma/client';
import express, { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();
interface userController {
  createUser: (req: Request, res: Response, next: NextFunction) => void;
  verifyUser: (req: Request, res: Response, next: NextFunction) => void;
  assignJwt: (req: Request, res: Response, next: NextFunction) => void;
  verifyJwt: (req: Request, res: Response, next: NextFunction) => void;
}

// TODO think about how we give our api token

const userController: userController = {
  createUser: async (req, res, next) => {
    //? create logic for hashing the password later
    try {
      const { APIToken, username, passwordHash, email } = req.body;

      if (!username || !passwordHash || email) {
        return next({
          log: null,
          message: 'Enter a valid username, email, and/or password',
        });
      }

      const newUser = await prisma.user.create({
        data: {
          username: '',
          passwordHash: '',
          email: '',
          APIToken: '',
        },
      });

      res.locals.user = newUser;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in userController.createUser ${error}`,
        status: 400,
        message: `Error has occured in userController.createUser. ERROR: ${error}`,
      });
    }
  },
  verifyUser: async (req, res, next) => {
    try {
      const { username, passwordHash } = req.body;

      if (!username || !passwordHash) {
        return next({
          log: null,
          message: 'Please enter a username and/or password',
        });
      }

      const loggedInUser = await prisma.user.findFirst({
        where: {
          username: username,
          passwordHash: passwordHash,
        },
      });

      res.locals.user = loggedInUser;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in userController.verifyUser ${error}`,
        status: 400,
        message: `Error has occured in userController.verifyUser. ERROR: invalid username and/or password ${error}`,
      });
    }
  },
  assignJwt: (req, res, next) => {
    console.log('what');
  },
  verifyJwt: (req, res, next) => {
    console.log('yeah');
  },
};

module.exports = userController;
