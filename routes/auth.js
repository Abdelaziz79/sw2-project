import { Router } from "express";
import { registerForm, register, logForm, log } from "../controller/user.js";

const router = new Router();

router.get('/register', registerForm);

router.post('/register', register);

router.get('/login', logForm);

router.post('/login', log);


export default router;