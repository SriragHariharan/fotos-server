const authRouter = require('express').Router();
import { changePasswordController, loginUserController, signupController } from '../controllers/authController';
import authMiddleware from '../helpers/authMiddleware';

//signup user
authRouter.post('/signup', signupController);

//login user
authRouter.post("/login", loginUserController)

//reset password
authRouter.put("/password", authMiddleware, changePasswordController)

export default authRouter;