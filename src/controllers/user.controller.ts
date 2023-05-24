import { Request, Response } from "express";
import userModel, { IUser } from "../../models/users.model";
import { isValidObjectId } from "mongoose";
import { isEmpty } from "../utils/isEmpty";
import * as fs from "fs";
import sanitizedConfig from "../../config/config";

/**
 * @method GET
 * @param req 
 * @param res 
 * @returns All user
 */

export const getUsers = async (req:Request, res:Response) => {
    const users = await userModel.find({}, {password:0, email:0});
    return res.status(200).send(users);
};

/**
 * @method GET
 * @param req 
 * @param res 
 * @returns one user
 */

export const getUser = async(req:Request, res:Response) => {
    const { id } = req.params;
    
    try {
        if (res.locals.user._id !== id) throw Error('not_an_author_request');
        if (!isValidObjectId(id)) throw Error('user_get_invalid_format_id');

        const user = await userModel.findById(id);
        return res.status(200).json(user);

    } catch (error) {
        //TODO
        console.log(error);

    };
};

/**
 * @method PATCH
 * @param req 
 * @param res 
 * @returns updated user
 */

export const updateUser = (req:Request, res:Response) => {
    const { id } = req.params;
    const {fullname, bio} = req.body;
    try {
        if (res.locals.user._id !== id) throw Error('not_an_author_request');
        if (!isValidObjectId(id)) throw Error('user_patch_invalid_format_id');
        if (isEmpty(fullname)) throw Error('user_patch_empty_field_fullname');
        if (isEmpty(bio)) throw Error('user_patch_empty_field_bio');

        userModel.findByIdAndUpdate(id, {
            $set: {
                fullname,
                bio
            }
        }, {upsert:true, new:true}).then((data) => {
            return res.status(200).send(data);
        }).catch((err) => {
            throw Error(err); //Send error to the try catch
        });
    } catch (error) {
        //TODO
        console.log(error);
    };
};

/**
 * @method PATCH
 * @param req 
 * @param res 
 */

export const changeUsername = async (req:Request, res:Response) => {
    const { id } = req.params;
    const { username } : {username:string} = req.body
    try {
        if (res.locals.user._id !== id) throw Error('not_an_author_request');
        if (!isValidObjectId(id)) throw Error('user_patch_invalid_format_id');
        if (isEmpty(username)) throw Error('user_patch_empty_field_username');
        
        const usernamed = await userModel.findOne({username});
        if (usernamed) throw Error('user_username_patch_already_used');
        userModel.findByIdAndUpdate(id, {
            $set: {
                username
            }
        }, {upsert: true, new:true}).then((data) => {
            return res.status(201).send(data);  
        }).catch((err) => {
            throw Error (err); //send error to try catch
        });
    } catch (error) {
        //TODO   
        console.log(error);
    }
}

/**
 * @method PATCH
 * @param req 
 * @param res 
 */

export const changeUserPicture = (req:any, res:Response) => {
    const { id } = req.params;
    const file = req.file;
    try {
        if (res.locals.user._id !== id) throw Error('not_an_author_request');
        if (!isValidObjectId(id)) throw Error('user_patch_invalid_format_id');
        if (isEmpty(file)) throw Error('user_patch_empty_filed_file');
        if (req.file.mimetype !==  "image/jpg" && req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg") throw Error('user_patch_invalid_type_file');
        if (req.file.size > 500000) throw Error('user_patch_file_max_size');

        const filename = id + ".png";
        fs.writeFile(`${sanitizedConfig.CDN_PATH}/profile/${filename}`, req.file.buffer, (err:any) => {
            if (err) throw Error(err) //Send error to the try catch
        });

        userModel.findByIdAndUpdate(id, {
            $set: {
                avatar: filename
            }
        }, {upsert:true, new:true}).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            throw Error(err); //Send error to try catch
        })
    } catch (error) {
        //TODO
        console.log(error);
    } 
};

/**
 * @method PATCH
 * @param req 
 * @param res 
 */

export const changeUserSettings = (req:any, res:Response) => {
    const { id } = req.params;
    const {settings} : {settings:object} = req.body;
    try {
        if (res.locals.user._id !== id) throw Error('not_an_author_request');
        if (!isValidObjectId(id)) throw Error('user_settings_patch_invalid_format_id');
        if (isEmpty(settings)) throw Error('user_setting_patch_empty_field_settings');

        userModel.findByIdAndUpdate(id, {
            $set: {
                settings,
            }
        }, {upsert:true, new:true}).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            throw Error(err);
        })
    } catch (error) {
        //TODO
        console.log(error);
    };
};

export const userFollow = async (req:Request, res:Response) => {
    const { followerId, followedId } = req.params;
    try {
        if (res.locals.user._id !== followerId) throw Error('not_an_author_request');
        if (!isValidObjectId(followerId)) throw Error('user_follow_invalid_format_followerId');
        if (!isValidObjectId(followedId)) throw Error('user_follow_invalid_format_followedId');

        const followed:any = await userModel.findOne({_id: followedId});
        if (isEmpty(followed)) throw Error('user_follow_user_not_found_followed')
        if (followed.followers.includes(followerId)) throw Error('user_follow_already_follow');

        if (followed.settings.isPrivate)
        {
            //TODO
        }
        else
        {
            userModel.findByIdAndUpdate(followerId, {
                $push:{
                    follow: followedId
                }
            }, {upsert:true, new:true}).then((data) => {
                userModel.findByIdAndUpdate(followedId, {
                    $push: {
                        followers: followerId
                    }
                }).then(() => {
                    return res.status(200).send(data);
                }).catch((err) => {throw Error(err)}) //send err to try catch
            }).catch((err) => {throw Error(err)}) //send err to try catch

            //TODO : Add notification display
        };
    } catch (error) {
        //TODO
        console.log(error);
    };
};

export const userUnfollow = async (req:Request, res:Response) => {
    const { followerId, followedId } = req.params;
    try {
        if (res.locals.user._id !== followerId) throw Error('not_an_author_request');
        if (!isValidObjectId(followerId)) throw Error('user_follow_invalid_format_followerId');
        if (!isValidObjectId(followedId)) throw Error('user_follow_invalid_format_followedId');

        const followed:any = await userModel.findOne({_id: followedId});
        if (isEmpty(followed)) throw Error('user_follow_user_not_found_followed');

        if (followed.settings.isPrivate)
        {
            //TODO
        }
        else
        {
            userModel.findByIdAndUpdate(followerId, {
                $pull:{
                    follow: followedId
                }
            }, {new:true, upsert:true}).then((data) => {
                userModel.findByIdAndUpdate(followedId, {
                    $pull: {
                        followers: followerId
                    }
                }).then(() => {
                    return res.status(200).send(data);
                }).catch((err) => {throw Error(err)}) //send err to try catch
            }).catch((err) => {throw Error(err)}) //send err to try catch

            //TODO : Add notification display
        };
    } catch (error) {
        console.log(error);
    };
};