import express from 'express';
import cookieParser from 'cookie-parser';
import appController from '../controllers/appController';

const router = express.Router();
router.use(cookieParser());

// create post route that will receive build size, repo name, api token, commit date, commit hash, and dependency info from NPM package
router.post(
  '/',
  appController.checkRepo,
  appController.addOrUpdateRepo,
  (req, res) => {
    // destructure out data from res.locals.repoData and req.body to send back to Client as confirmation that repo was added with repo name, etc.
    res.status(201).json(res.locals.message);
  }
);

export default router;
