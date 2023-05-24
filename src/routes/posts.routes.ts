import { Router } from "express";
let router:Router = Router();

import multer = require('multer');
const upload = multer();

import {
    createPost, 
    getPosts, 
    likePost,
    unlikePost
} from "../controllers/posts.controller";

router.get('/all', getPosts);

router.post('/', upload.fields([{name: "files", maxCount: 10}]), createPost);

router.patch('/:id/like', likePost);
router.patch('/:id/unlike', unlikePost);

export default router;