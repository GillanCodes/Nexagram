import { Router } from "express";
let router:Router = Router();

import {
    getUser,
    getUsers,
    updateUser,
    changeUsername,
    changeUserPicture,
    changeUserSettings,
    userFollow,
    userUnfollow
} from "../controllers/user.controller";

router.get('/all', getUsers);
router.get('/:id', getUser);

router.patch('/:id/', updateUser);
router.patch('/:id/username', changeUsername);
router.patch('/:id/avatar', changeUserPicture);
router.patch('/:id/settings', changeUserSettings);

router.post('/:followerId/follow/:followedId', userFollow);
router.post('/:followerId/unfollow/:followedId', userUnfollow);

export default router;