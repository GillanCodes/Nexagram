import { Router } from "express";
let router:Router = Router();

import {
    register,
    login,
    logout
} from "../controllers/auth.controller";

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;