import express from 'express';
import webController from '../controllers/webController';

const router = express.Router();

//* get user repo and build information
router.get('/user/:userId', webController.getUserInfo, (req, res) => {
  res.status(200).json(res.locals.userRepoInfo);
});

export default router;
