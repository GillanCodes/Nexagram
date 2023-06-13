import { Request, Response } from "express";
import postsModel from "../../models/posts.model";
import userModel from "../../models/users.model";
import { isEmpty } from "../utils/isEmpty";
import { isValidObjectId } from "mongoose";
import * as fs from "fs";
import sanitizedConfig from "../../config/config"
import genUId from "../utils/UId";
import {createPostErrors, postCommentErrors} from "../errors/post.errors";

/**
 * -------------------------
 *        Posts Part
 * -------------------------
 */

export const getPosts = async (req:Request, res:Response) => {

    var posts = await postsModel.find()
    // const users = await userModel.find({"settings.isPrivate": true});
    const users = await userModel.find({ 
        $and: [ 
            {_id : {$ne : res.locals.user._id}}, 
            {"settings.isPrivate": true} 
        ]
    });

    await users.map(async (user) => {
        posts = await posts.filter((post) => post.posterId != user._id.toString());
    });
    
    res.send(posts)
}

export const createPost = async (req:any, res:Response) => {
    const { id, caption } : {id:string, caption:string} = req.body;
    const files = req.files;

    try {
        if (!isValidObjectId(id)) throw Error('post_create_invalid_format_id');
        if (isEmpty(caption)) throw Error('post_create_empty_caption');
        if (isEmpty(files)) throw Error('post_create_empty_file');

        var filesName:any = [];

        await files.map((file:any) => {
            if (file.mimetype !==  "image/jpg" && file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") throw Error('user_patch_invalid_type_file');
            if (file.size > 5000000) throw Error('user_patch_file_max_size');

            var filename = `${genUId()}.png`;
            fs.writeFile(`${sanitizedConfig.CDN_PATH}/posts/${filename}`, file.buffer, (err:any) => {
                if (err) throw Error(err);
            });
            filesName.push(filename);
        });

        postsModel.create({
            posterId: id,
            caption,
            medias: filesName
        }).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            throw Error(err);
        });
    } catch (error) {
        const errors = createPostErrors(error);
        res.status(200).send(errors);
    }
};

export const deletePost = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
        if(!isValidObjectId(id)) throw Error('post_delete_invalid_format_id');
        
        const post = await postsModel.findById(id);
        if(isEmpty(post)) throw Error('post_delete_not_found');

        await post?.medias.map( async (media) => {
            await fs.rm(`${sanitizedConfig.CDN_PATH}/posts/${media}`, (err:any) => {
                if (err) throw Error(err);
            });
        });

        await postsModel.findByIdAndDelete(id);
        return res.status(201).send({id});

    } catch (error) {
        console.log(error);
    }
};

export const likePost = async (req:Request, res:Response) => {
    const {id} = req.params;
    try {
        if (!isValidObjectId(id)) throw Error('like_add_invalid_format_id');

        const post = await postsModel.findById(id);
        if (isEmpty(post)) throw Error('post_like_invalid_id');
        if (post?.likers.includes(res.locals.user._id.toString())) throw Error("already_liked");
        postsModel.findByIdAndUpdate(id, {
            $push: {
                likers: res.locals.user._id.toString()
            }
        }, {new: true, upsert: true}).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            throw Error(err);
        });
    } catch (error) {
        console.log(error);
    }
};

export const unlikePost = async (req:Request, res:Response) => {
    const {id} = req.params;
    try {
        if (!isValidObjectId(id)) throw Error('like_add_invalid_format_id');

        const post = await postsModel.findById(id);
        if (isEmpty(post)) throw Error('post_like_invalid_id');
        postsModel.findByIdAndUpdate(id, {
            $pull: {
                likers: res.locals.user._id.toString()
            }
        }, {new: true, upsert:true}).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            throw Error(err);
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * ---------------------------------
 *          Comments Part
 * ---------------------------------
 */ 

export const createComment = (req:Request, res:Response) => {
    const { id } = req.params;
    const {content}:{content:string} = req.body;

    try {
        if(!isValidObjectId(id)) throw Error("comment_post_create_invalid_format_id");
        if(isEmpty(content)) throw Error('comment_post_create_field_content_empty');

        postsModel.findByIdAndUpdate(id, {
            $push: {
                comments: {
                    commenterId: res.locals.user._id.toString(),
                    commenterUsername: res.locals.user.username,
                    content,
                    timestamps: Date.now()
                }
            }
        },{new: true, upsert: true}).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            throw Error(err);
        })

    } catch (error) {
        const errors = postCommentErrors(error);
        res.status(200).send(errors);
    }
}

export const likeComment = async (req:Request, res:Response) => {
    const { postId, commentId } = req.params;

    try {
        if(!isValidObjectId(commentId)) throw Error("comment_post_create_invalid_format_postid");
        if(!isValidObjectId(postId)) throw Error("comment_post_create_invalid_format_commentid");

        var post:any = await postsModel.findById(postId) 

       const target = await post.comments.find((comment:any) => {
            if (comment._id.toString() === commentId) return(comment);
        });

        if (isEmpty(target)) throw Error('comment_post_like_empty');
        if (target.likes.includes(res.locals.user._id.toString())) throw Error('comment_like_already_liked');

        target.likes.push(res.locals.user._id.toString());

        const end = await target.save({suppressWarning: true});
        return res.status(201).send(end);


    } catch (error) {
        console.log(error);
    }
}

export const unlikeComment = async (req:Request, res:Response) => {
    const { postId, commentId } = req.params;

    try {
        if(!isValidObjectId(commentId)) throw Error("comment_post_create_invalid_format_postid");
        if(!isValidObjectId(postId)) throw Error("comment_post_create_invalid_format_commentid");

        var post:any = await postsModel.findById(postId) 

       const target = await post.comments.find((comment:any) => {
            if (comment._id.toString() === commentId) return(comment);
        });

        if (isEmpty(target)) throw Error('comment_post_like_empty');

        target.likes.pull(res.locals.user._id.toString());

        const end = await target.save({suppressWarning: true});
        return res.status(201).send(end);


    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = async (req:Request, res:Response) => {
    const { postId, commentId } = req.params;

    try {
        if(!isValidObjectId(commentId)) throw Error("comment_post_create_invalid_format_postid");
        if(!isValidObjectId(postId)) throw Error("comment_post_create_invalid_format_commentid");

        var post:any = await postsModel.findById(postId) 

        post.comments.id(commentId).deleteOne();

        const end = await post.save();
        return res.status(201).send(end);


    } catch (error) {
        console.log(error);
    }
}