import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

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

/**
 * @typeParam checkRepo - method to check if repository exists
 * @typeParam addOrUpdateRepo - method to add repository if it doesnt exist, or update it if it does
 */
interface AppController {
  checkRepo: (req: Request, res: Response, next: NextFunction) => void;
  addOrUpdateRepo: (req: Request, res: Response, next: NextFunction) => void;
}

const appController: AppController = {
  checkRepo: async (req, res, next) => {
    try {
      const { repoName, apiKey, commitHash } = req.body;
      if (!repoName || !apiKey || !commitHash) {
        return next({
          log: `Error caught in appController.handleBuild`,
          status: 400,
          message: `Malformed request body.`,
        });
      }
      // search for the repo to see if it already exists in the database
      let userInfo;
      try {
        userInfo = await prisma.user.findFirstOrThrow({
          where: {
            APIToken: apiKey,
          },
          include: {
            repos: {
              include: {
                builds: true,
              },
            },
          },
        });
      } catch {
        return next({
          log: null,
          status: 401,
          message: 'Invalid API key',
        });
      }
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
          // create a flag on res.locals that will inform next middleware function whether to update an existing repo vs. add a new repo
          if (repo.builds.find((build) => build.hash === commitHash)) {
            return next({
              log: null,
              status: 409,
              message:
                'A build with this commit hash has already been sent to DEVisible',
            });
          }
          res.locals.repoToUpdate = repo.id;
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
  addOrUpdateRepo: async (req, res, next) => {
    try {
      // destructure data from req.body
      const { buildSize, repoName, buildTime, commitHash, dependencies } =
        req.body;
      // create a new repo that corresponds to user with the API token that was passed into post route to '/app'
      // res.locals.uid contains user ID that was obtained from previous DB query in previous middleware function
      const userId = res.locals.uid;
      // if res.locals.repoToUpdate is truthy, that means we need to update a repo instead of add a new one
      if (res.locals.repoToUpdate) {
        const repoId = res.locals.repoToUpdate;
        const addBuildToRepo = await prisma.build.create({
          data: {
            repoId,
            createdAt: new Date(),
            buildSize: Number(buildSize),
            buildTime: Number(buildTime),
            deps: JSON.stringify(dependencies),
            hash: commitHash,
          },
        });
        res.locals.message = `Repo ${repoName} was updated with a new build (hash: ${commitHash})`;
        res.locals.dbRes = addBuildToRepo;
        return next();
      }
      // otherwise, if res.locals.repoToUpdate is not truthy, create a new repo with the info from the post request
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
                hash: commitHash,
              },
            ],
          },
        },
      });
      res.locals.message = `New repo ${repoName} was created in database`;
      res.locals.dbRes = createRepoResult;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in appController.addRepo ${error}`,
        status: 400,
        message: `Error has occured in appController.addRepo. ERROR: ${error}`,
      });
    }
  },
};

export default appController;
