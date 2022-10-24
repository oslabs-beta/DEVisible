import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import crypto from 'crypto';

// environmental variables
dotenv.config();
const { JWT_SECRET } = process.env;

const url =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url,
    },
  },
});
interface UserController {
  createUser: (req: Request, res: Response, next: NextFunction) => void;
  verifyUser: (req: Request, res: Response, next: NextFunction) => void;
  assignJwt: (req: Request, res: Response, next: NextFunction) => void;
  verifyJwt: (req: Request, res: Response, next: NextFunction) => void;
  getToken: (req: Request, res: Response, next: NextFunction) => void;
}

const userController: UserController = {
  createUser: async (req, res, next) => {
    try {
      const { username, plainPassword, email } = req.body;

      if (!username || !plainPassword || !email) {
        return next({
          log: null,
          status: 400,
          message: 'Enter a valid username, email, and/or password',
        });
      }
      const passwordHash = await bcrypt.hash(plainPassword, 10);

      const APIToken = crypto.randomUUID();

      const newUser = await prisma.user.create({
        data: {
          username,
          passwordHash,
          email,
          APIToken,
        },
      });

      res.locals.user = newUser;

      return next();
    } catch (error) {
      return next({
        log: `Error caught in userController.createUser ${error}`,
        status: 409,
        message: 'User already exists!',
      });
    }
  },
  verifyUser: async (req, res, next) => {
    try {
      const { email, plainPassword } = req.body;

      if (!email || !plainPassword) {
        return next({
          log: null,
          message: 'Please enter your email and/or password',
        });
      }
      let loggedInUser;
      try {
        loggedInUser = await prisma.user.findFirstOrThrow({
          where: {
            email,
          },
        });
      } catch {
        return next({
          log: null,
          status: 401,
          message: 'Invalid email or password',
        });
      }

      const validPassword = await bcrypt.compare(
        plainPassword,
        loggedInUser.passwordHash
      );
      if (validPassword) {
        res.locals.user = loggedInUser.username;
        res.locals.userId = loggedInUser.id;
        res.locals.depPrefs = loggedInUser.depPrefs;
      } else {
        return next({
          log: 'null',
          status: 401,
          message: 'Invalid email and or password',
        });
      }

      return next();
    } catch (error) {
      return next({
        log: `Error caught in userController.verifyUser ${error}`,
        status: 400,
        message: `Error has occured in userController.verifyUser. ERROR: invalid email address and/or password ${error}`,
      });
    }
  },
  assignJwt: (req, res, next) => {
    const token = jwt.sign(
      {
        username: res.locals.user,
        id: res.locals.userId,
        depPrefs: res.locals.depPrefs,
      },
      JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.cookie('access_token', token, { httpOnly: true });
    return next();
  },
  verifyJwt: (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
      return next({
        status: 401,
        message: 'Unauthorized request',
      });
    }

    const verified = jwt.verify(token, JWT_SECRET as string);
    res.locals.jwt = verified;

    return verified
      ? next()
      : next({ status: 403, message: 'Unauthorized request' });
  },
  getToken: async (req, res, next) => {
    try {
      let username: string;
      if (res.locals.jwt.username.username) {
        username = res.locals.jwt.username.username;
      } else {
        username = res.locals.jwt.username;
      }
      const loggedInUser = await prisma.user.findFirstOrThrow({
        where: {
          username,
        },
      });
      const { APIToken } = loggedInUser;
      res.locals.API = APIToken;

      return next();
    } catch (error) {
      return next({
        log: `Error caught in userController.getToken ${error}`,
        status: 401,
        message: `Error has occured in userController.getToken. ERROR: You're not logged in ${error}`,
      });
    }
  },
};

export default userController;
