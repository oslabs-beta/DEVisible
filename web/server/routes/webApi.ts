import express from 'express';
import userController from '../controllers/userController';
import webController from '../controllers/webController';

const router = express.Router();

//* get user repo and build information
router.get('/user/:userId', webController.getUserInfo, (req, res) => {
  res.status(200).json(res.locals.userRepoInfo);
});

// create route that will handle delete requests for specific repo
router.delete(
  '/repo/:repoId',
  userController.verifyJwt,
  webController.deleteRepo,
  (req, res) => {
    const transaction = res.locals.deleteInfo;
    const numOfBuildsDeleted = transaction[0].count;
    const repoName = transaction[1].name;
    res
      .status(202)
      .json(
        `Repo ${repoName} was successfully deleted along with ${numOfBuildsDeleted} associated build entries`
      );
  }
);
export default router;
