const authRouter = require('express').Router();
import { updatePasswordController, getProfileController, loginUserController, signupController } from '../controllers/authController';
import authMiddleware from '../helpers/authMiddleware';

//signup user
authRouter.post('/signup', signupController);

//login user
authRouter.post("/login", loginUserController)

//get profile
authRouter.get("/profile", authMiddleware, getProfileController)

//update password
authRouter.put("/password", authMiddleware, updatePasswordController)

export default authRouter;