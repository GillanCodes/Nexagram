import { Schema, model } from "mongoose"
import isEmail from "validator/lib/isEmail";

export interface IUser extends Document
{
    username:string,
    password:string,
    email:string,
    full_name:string,
    follow:[string],
    followers:[string],
    bio:string,
    saved_posts: object,
    settings: object
};

export interface ISettings 
{
    isPrivate: boolean,
    theme: string,
    lang: string
};

const settingsSchema = new Schema<ISettings>({
    isPrivate: {type:Boolean, default:false},
    theme: {type:String, default: "light_default"},
    lang: {type:String, default:"en_US"}
});

const userSchema = new Schema<IUser>({
    username: {type:String, required:true, maxlength:32, minlength:4},
    password: {type:String, required:true, maxlength: 255, minlength: 8},
    email: {type:String, required:true, validate:isEmail},
    full_name: {type: String, maxlength:32},
    follow: {type: [String], default: []},
    followers: {type: [String], default: []},
    bio: {type: String, maxlength: 1024},
    settings: {type: settingsSchema, default:{}}
});

const userModel = model<IUser>('user', userSchema);
export default userModel;