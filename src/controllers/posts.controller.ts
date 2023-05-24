import { Request, Response } from "express";
import postsModel from "../../models/posts.model";
import userModel from "../../models/users.model";
import { isEmpty } from "../utils/isEmpty";
import { isValidObjectId } from "mongoose";
import * as fs from "fs";
import sanitizedConfig from "../../config/config"
import genUId from "../utils/UId";

export const getPosts = async (req:Request, res:Response) => {

    var posts = await postsModel.find()
    const users = await userModel.find({"settings.isPrivate": true});

    await users.map(async (user) => {
        posts = await posts.filter((post) => post.posterId != user._id.toString());
    });

    res.send(posts)
}

export const createPost = async (req:any, res:Response) => {
    const { id, caption } : {id:string, caption:string} = req.body;
    const { files } = req.files;
    try {
        if (!isValidObjectId(id)) throw Error('post_create_invalid_format_id');
        if (isEmpty(caption)) throw Error('post_create_empty_caption');
        if (isEmpty(files)) throw Error('post_create_empty_file');

        var filesName:any = [];

        await files.map((file:any) => {
            if (file.mimetype !==  "image/jpg" && file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") throw Error('user_patch_invalid_type_file');
            if (file.size > 500000) throw Error('user_patch_file_max_size');

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
        }).then((data) => {
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
        }).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            throw Error(err);
        });
    } catch (error) {
        console.log(error);
    }
};