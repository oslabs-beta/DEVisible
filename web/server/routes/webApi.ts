import express from 'express';
import userController from '../controllers/userController';
import webController from '../controllers/webController';

const router = express.Router();

// get user repository and build information route
router.get(
  '/user',
  userController.verifyJwt,
  webController.getUserInfo,
  (req, res) => {
    res.status(200).json(res.locals.userRepoInfo);
  }
);

// get user dependencies route
router.get(
  '/userDeps',
  userController.verifyJwt,
  webController.getUserDeps,
  (req, res) => {
    res.status(200).json([res.locals.depPrefs, res.locals.allDeps]);
  }
);

// post user dependencies to track
router.post(
  '/userDeps',
  userController.verifyJwt,
  webController.postUserDepPrefs,
  (req, res) => {
    res.status(200).json('Dependency preferences updated');
  }
);

// delete specific repository route
router.delete(
  '/repo/:repoId',
  userController.verifyJwt,
  webController.deleteRepo,
  (req, res) => {
    const transaction = res.locals.deleteInfo;
    const numOfBuildsDeleted = transaction[0].count;
    const repoName = transaction[1].name;
    res
      .status(204)
      .json(
        `Repo ${repoName} was successfully deleted along with ${numOfBuildsDeleted} associated build entries`
      );
  }
);

// delete account route
router.delete(
  '/account/:userId',
  userController.verifyJwt,
  webController.deleteAccount,
  (req, res) => {
    res.clearCookie('access_token');
    res.status(204).json('Success');
  }
);

export default router;
