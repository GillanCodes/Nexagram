import { Router } from "express";
let router:Router = Router();

import {
    register,
    login
} from "../controllers/auth.controller";

router.post('/register', register);
router.post('/login', login);

export default router;