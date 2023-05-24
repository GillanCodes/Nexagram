import { Router } from "express";
let router:Router = Router();

import {
    register
} from "../controllers/auth.controller";

router.post('/login');
router.post('/register', register);

export default router;