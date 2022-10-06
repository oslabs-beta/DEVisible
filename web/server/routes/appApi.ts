import express from 'express';
import appController from '../controllers/appController';

const router = express.Router();

// create post route that will receive build size, repo name, api token, commit date, commit hash, and dependency info from NPM package
router.post('/', appController.checkRepo, appController.addRepo, (req, res) => {
    // destructure out data from res.locals.repoData and req.body to send back to Client as confirmation that repo was added with repo name, etc.
  res.status(200).json(res.locals.repo);
});

router.post('/update', appController.updateRepo, (req, res) => {
  res.status(200).json('success');
});

export default router;
