import express from 'express';
import cookieParser from 'cookie-parser';
import appController from '../controllers/appController';

const router = express.Router();
router.use(cookieParser());

// create post route that will receive build size, repo name, api token, commit date, commit hash, and dependency info from NPM package
router.post('/', appController.checkRepo, appController.addRepo, (req, res) => {
  const { buildSize, buildTime } = req.body;
  // destructure out data from res.locals.repoData and req.body to send back to Client as confirmation that repo was added with repo name, etc.
  const { name } = res.locals.repoData;
  res
    .status(201)
    .json(
      `New repo ${name} was created with build size: ${buildSize}mb and build time: ${buildTime}s`
    );
});

router.post('/update', appController.updateRepo, (req, res) => {
  const { buildSize, repoName, buildTime, commitHash } = req.body;
  res
    .status(201)
    .json(
      `Repo ${repoName} was updated with a new build (hash: ${commitHash}) with size ${buildSize}mb and time ${buildTime}s`
    );
});

export default router;
