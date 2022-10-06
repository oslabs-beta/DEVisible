import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
interface WebController {
  getUserInfo: (req: Request, res: Response, next: NextFunction) => void;
}

const webController: WebController = {
  getUserInfo: async (req, res, next) => {
    const userId: number = (req.params.userId, 10);
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
};

export default webController;
