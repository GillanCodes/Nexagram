import { Router } from "express";
let router:Router = Router();

import multer = require('multer');
const upload = multer();

import {
    createPost, 
    deletePost, 
    getPosts, 
    likePost,
    unlikePost
} from "../controllers/posts.controller";

router.get('/all', getPosts);

router.post('/', upload.array("files", 10), createPost);

router.patch('/:id/like', likePost);
router.patch('/:id/unlike', unlikePost);

router.delete('/:id', deletePost);

export default router;