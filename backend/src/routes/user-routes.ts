import { Router } from 'express';
import { getAllUser, signupUser, loginUser, verifyUser, userLogout } from '../controllers/user-controllers.js'
import { validate, signupValidator, loginValidator } from '../utils/validators.js';
import { verifyToken } from '../utils/token-manager.js'

const userRoutes = Router();

userRoutes.get('/', getAllUser)
userRoutes.post('/signup', validate(signupValidator), signupUser)
userRoutes.post('/login', validate(loginValidator), loginUser)
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);

export default userRoutes;