import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

//* signup route works
router.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

//* login route works
router.post(
  '/login',
  userController.verifyUser,
  userController.assignJwt,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

//* verifying logged in <= for frontend use
router.get('/login', userController.verifyJwt, (req, res) => {
  res.status(200).json(res.locals.jwt);
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
