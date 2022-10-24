import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

//* signup route works
router.post(
  '/signup',
  userController.createUser,
  userController.assignJwt,
  (req, res) => {
    res.status(200).json({ username: res.locals.user, id: res.locals.userId });
  }
);

//* login route works
router.post(
  '/login',
  userController.verifyUser,
  userController.assignJwt,
  (req, res) => {
    res.status(200).json({ username: res.locals.user, id: res.locals.userId });
  }
);

//* verifying logged in <= for frontend use
router.get('/login', userController.verifyJwt, (req, res) => {
  res.status(200).json(res.locals.jwt);
});

router.delete('/login', (req, res) => {
  res.clearCookie('access_token');
  res.sendStatus(204);
});

//* get API Token
router.get(
  '/getToken',
  userController.verifyJwt,
  userController.getToken,
  (req, res) => {
    res.status(200).json(res.locals.API);
  }
);

export default router;
