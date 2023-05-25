import { Router } from "express";
let router:Router = Router();

import multer = require("multer");
const upload = multer();

import {
    getUser,
    getUsers,
    updateUser,
    changeUsername,
    changeUserPicture,
    changeUserSettings,
    userFollow,
    userUnfollow,
    privateFollowAccept
} from "../controllers/user.controller";

router.get('/all', getUsers);
router.get('/:id', getUser);

router.patch('/:id/', updateUser);
router.patch('/:id/username', changeUsername);
router.patch('/:id/avatar', upload.single('file'), changeUserPicture);
router.patch('/:id/settings', changeUserSettings);

router.post('/:followerId/follow/:followedId', userFollow);
router.post('/:followerId/unfollow/:followedId', userUnfollow);
router.post('/:followerId/acceptrequest/:followedId', privateFollowAccept);

export default router;