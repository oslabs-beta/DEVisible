import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
interface WebController {
  getUserInfo: (req: Request, res: Response, next: NextFunction) => void;
  getUserDeps: (req: Request, res: Response, next: NextFunction) => void;
  deleteRepo: (req: Request, res: Response, next: NextFunction) => void;
}

const webController: WebController = {
  getUserInfo: async (req, res, next) => {
    const userId: number = res.locals.jwt.id;
    try {
      const userRepos = await prisma.repo.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          name: true,
          depPrefs: true,
          builds: {
            select: {
              id: true,
              repoId: true,
              createdAt: true,
              buildTime: true,
              buildSize: true,
              deps: true,
            },
          },
        },
      });
      res.locals.userRepoInfo = userRepos;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in webController.getUserInfo ${error}`,
        status: 400,
        message: `Error has occured in webController.getUserInfo ERROR: ${error}`,
      });
    }
  },
  getUserDeps: async (req, res, next) => {
    const userId: number = res.locals.jwt.id;
    try {
      const userDepPrefs = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          depPrefs: true,
        },
      });
      const userAllDeps = await prisma.repo.findMany({
        where: {
          userId,
        },
        select: {
          name: true,
          builds: {
            select: {
              repoId: true,
              deps: true,
            },
          },
        },
      });
      res.locals.depPrefs = userDepPrefs;
      res.locals.allDeps = userAllDeps;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in webController.getUserDeps ${error}`,
        status: 400,
        message: `Error has occured in webController.getUserDeps ERROR: ${error}`,
      });
    }
  },
  deleteRepo: async (req, res, next) => {
    const repoId: number = parseInt(req.params.repoId, 10);
    try {
      // delete all builds associated with repo that is passed in on req.params from the front end
      const deleteBuilds = prisma.build.deleteMany({
        where: {
          repoId,
        },
      });
      // delete the repo itself
      const deleteRepo = prisma.repo.delete({
        where: {
          id: repoId,
        },
      });
      // combine both queries into one transaction (all queries must succeed)
      const transaction = await prisma.$transaction([deleteBuilds, deleteRepo]);
      res.locals.deleteInfo = transaction;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in webController.getUserInfo ${error}`,
        status: 400,
        message: `Error has occured in webController.getUserInfo ERROR: ${error}`,
      });
    }
  },
};

export default webController;
