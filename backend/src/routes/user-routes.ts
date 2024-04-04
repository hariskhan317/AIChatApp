import { Router } from 'express';
import { getAllUser, signupUser, loginUser } from '../controllers/user-controllers.js'
import { validate, signupValidator, loginValidator } from '../utils/validators.js';

const userRoutes = Router();

userRoutes.get('/', getAllUser)
userRoutes.post('/signup', validate(signupValidator), signupUser)
userRoutes.post('/login',validate(loginValidator) ,loginUser)

export default userRoutes;