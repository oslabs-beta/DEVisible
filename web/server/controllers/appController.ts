import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

interface AppController {
  checkRepo: (req: Request, res: Response, next: NextFunction) => void;
  addRepo: (req: Request, res: Response, next: NextFunction) => void;
  updateRepo: (req: Request, res: Response, next: NextFunction) => void;
}

const appController: AppController = {
  checkRepo: async (req, res, next) => {
    try {
      // destructure data from req.body
      const { repoName, apiToken } = req.body;
      // search for the repo to see if it already exists in the database
      const userInfo = await prisma.user.findFirst({
        where: {
          APIToken: apiToken,
        },
        include: {
          repos: true,
        },
      });
      // if userInfo is not truthy, that means the API key that was entered is not valid (there is no user that matches that key)
      if (!userInfo) {
        console.log('That repo does not exist');
        return next({
          log: `Error caught in appController.handleBuild`,
          status: 400,
          message: `Please enter a valid API key`,
        });
      }
      // otherwise, if API key is valid, check whether repo name passed in on post request from npm package already exists
      const userRepos = userInfo.repos;
      // userRepos is now an array of all of the repo objects that match the API key passed in on the post request
      // if userRepos contains a repo that matches repoName, that means that repo already exists, so redirect to update route
      // eslint-disable-next-line no-restricted-syntax
      for (const repo of userRepos) {
        if (repo.name === repoName) {
          // create a cookie that will be passed through route redirect and used to get the repoId without having to re-query the database
          res.cookie('repo', repo, { httpOnly: true });
          return res.redirect(307, '/app/update');
        }
      }
      // if request was not redirected, that means this is a new repo that needs to be added -> invoke add middleware function which is next in the route
      res.locals.uid = userInfo.id;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in appController.checkRepo ${error}`,
        status: 400,
        message: `Error has occured in appController.checkRepo. ERROR: ${error}`,
      });
    }
  },
  addRepo: async (req, res, next) => {
    console.log(req.body);
    try {
      // destructure data from req.body
      const { buildSize, repoName, buildTime, commitHash, dependencies } =
        req.body;
      // create a new repo that corresponds to user with the API token that was passed into post route to '/app'
      // res.locals.uid contains user ID that was obtained from previous DB query in previous middleware function
      const userId = res.locals.uid;
      const createRepoResult = await prisma.repo.create({
        data: {
          userId,
          name: repoName,
          builds: {
            create: [
              {
                // hard coded, need to wipe database to be able to count properly and avoid conflicts
                createdAt: new Date(),
                deps: JSON.stringify(dependencies),
                buildTime: Number(buildTime),
                buildSize: Number(buildSize),
              },
            ],
          },
        },
      });
      res.locals.repoData = createRepoResult;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in appController.addRepo ${error}`,
        status: 400,
        message: `Error has occured in appController.addRepo. ERROR: ${error}`,
      });
    }
  },
  updateRepo: async (req, res, next) => {
    const { repo } = req.cookies;
    const repoId = repo.id;
    try {
      // destructure data from req.body
      const { buildSize, buildTime, commitHash, dependencies } = req.body;
      // create a new build that corresponds to repoId
      const addBuildToRepo = await prisma.build.create({
        data: {
          repoId,
          createdAt: new Date(),
          buildSize: Number(buildSize),
          buildTime: Number(buildTime),
          deps: dependencies,
        },
      });
      res.locals.build = addBuildToRepo;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in appController.handleBuild ${error}`,
        status: 400,
        message: `Error has occured in appController.handleBuild. ERROR: ${error}`,
      });
    }
  },
};

export default appController;
