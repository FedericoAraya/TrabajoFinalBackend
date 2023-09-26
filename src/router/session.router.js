import { Router } from "express";
import dotenv from 'dotenv'
import { failureRegister, githubCallback, githubCallbackJWT, githubLogin, loginUser, loginUserSucces, logoutUser, redirectToLogin, registerUser, showLoginPage, showRegisterPage } from "../controller/session.controller.js";
import { getCurrentUser } from "../controller/user.controller.js";

dotenv.config()


const router = Router()

router.get('/register', showRegisterPage)
router.get('/login', showLoginPage)
router.get('/github/login', githubLogin)
router.get('/githubcallback', githubCallback, githubCallbackJWT)
router.post('/register', registerUser,redirectToLogin, failureRegister)
router.post('/login', loginUser, loginUserSucces)
router.get('/logout', logoutUser);
router.get('/current',getCurrentUser)


export default router