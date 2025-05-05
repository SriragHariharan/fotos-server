const authRouter = require('express').Router();
import { changePasswordController, getProfileController, loginUserController, signupController } from '../controllers/authController';
import authMiddleware from '../helpers/authMiddleware';

//signup user
authRouter.post('/signup', signupController);

//login user
authRouter.post("/login", loginUserController)

//reset password
authRouter.put("/password", authMiddleware, changePasswordController)

//get profile
authRouter.get("/profile", authMiddleware, getProfileController)

export default authRouter;