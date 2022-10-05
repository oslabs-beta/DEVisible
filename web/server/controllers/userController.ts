import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import crypto from 'crypto';

// environmental variables
dotenv.config();
const { JWT_SECRET } = process.env;
const { ALGORITHM } = process.env;

const prisma = new PrismaClient();
interface UserController {
  createUser: (req: Request, res: Response, next: NextFunction) => void;
  verifyUser: (req: Request, res: Response, next: NextFunction) => void;
  assignJwt: (req: Request, res: Response, next: NextFunction) => void;
  verifyJwt: (req: Request, res: Response, next: NextFunction) => void;
  getToken: (req: Request, res: Response, next: NextFunction) => void;
}

// TODO think about how we give our api token
const initVector = crypto.randomBytes(16);
const securityKey = crypto.randomBytes(32);

const encryptAPIToken = (): string => {
  const unencryptedToken = crypto.randomUUID();

  const cipher = crypto.createCipheriv(
    ALGORITHM as string,
    securityKey,
    initVector
  );

  let encryptedToken = cipher.update(unencryptedToken, 'utf-8', 'hex');
  encryptedToken += cipher.final('hex');
  return encryptedToken;
};

const decryptAPIToken = (encryptedToken: string): string => {
  const decipher = crypto.createDecipheriv(
    ALGORITHM as string,
    securityKey,
    initVector
  );
  decipher.setAutoPadding(false);
  let decryptedToken = decipher.update(encryptedToken, 'hex', 'utf-8');
  decryptedToken += decipher.final('utf-8');
  return decryptedToken;
};

const userController: UserController = {
  createUser: async (req, res, next) => {
    try {
      const { username, plainPassword, email } = req.body;

      if (!username || !plainPassword || !email) {
        return next({
          log: null,
          message: 'Enter a valid username, email, and/or password',
        });
      }
      const passwordHash = await bcrypt.hash(plainPassword, 10);

      const APIToken = encryptAPIToken();

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
        status: 400,
        message: `Error has occured in userController.createUser. ERROR: ${error}`,
      });
    }
  },
  verifyUser: async (req, res, next) => {
    try {
      const { username, plainPassword } = req.body;

      if (!username || !plainPassword) {
        return next({
          log: null,
          message: 'Please enter a username and/or password',
        });
      }

      const loggedInUser = await prisma.user.findFirstOrThrow({
        where: {
          username,
        },
      });

      const validPassword = await bcrypt.compare(
        plainPassword,
        loggedInUser.passwordHash
      );
      if (validPassword) {
        res.locals.user = loggedInUser?.username;
      } else {
        return next({
          log: 'null',
          status: 401,
          message: 'Invalid username and or password',
        });
      }

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
    const token = jwt.sign(
      {
        data: res.locals.user,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      JWT_SECRET as string
    );
    res.cookie('access_token', token, { httpOnly: true });
    return next();
  },
  verifyJwt: (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next({
        status: 403,
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
      const { data } = res.locals.jwt;

      const loggedInUser = await prisma.user.findFirstOrThrow({
        where: {
          username: data,
        },
      });
      const { APIToken } = loggedInUser;
      const decryptedToken = decryptAPIToken(APIToken);
      res.locals.API = decryptedToken;

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
