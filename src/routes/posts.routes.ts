import { Router } from "express";
let router:Router = Router();

import multer = require('multer');
const upload = multer();

import {
    createComment,
    createPost, 
    deleteComment, 
    deletePost, 
    getPosts, 
    likeComment, 
    likePost,
    unlikeComment,
    unlikePost
} from "../controllers/posts.controller";

/**
 * Posts
 */

router.get('/all', getPosts);

router.post('/', upload.array("files", 10), createPost);

router.patch('/:id/like', likePost);
router.patch('/:id/unlike', unlikePost);

router.delete('/:id', deletePost);

/**
 * Comments
 */

router.post('/:id/comment', createComment);

router.patch('/:postId/comment/:commentId/like', likeComment);
router.patch('/:postId/comment/:commentId/unlike', unlikeComment);

router.delete('/:postId/comment/:commentId', deleteComment);

export default router;