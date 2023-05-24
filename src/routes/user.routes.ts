import { Router } from "express";
let router:Router = Router();

import {
    getUser,
    getUsers,
    updateUser,
    changeUsername,
    changeUserPicture,
    changeUserSettings
} from "../controllers/user.controller";

router.get('/:id', getUser);
router.get('/all', getUsers);

router.patch('/:id/', updateUser);
router.patch('/:id/username', changeUsername);
router.patch('/:id/avatar', changeUserPicture);
router.patch('/:id/settings', changeUserSettings);

export default router;