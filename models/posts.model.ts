import { Document, Schema, model } from "mongoose";

export interface IPosts extends Document
{
    posterId:string,
    caption:string,
    medias:[string],
    likers:[string],
    comments:[object]
}

const postsSchema = new Schema<IPosts>({
    posterId: {type:String},
    caption: {type:String, maxlength:1024},
    medias: {type:[String]},
    likers: {type:[String], default:[]},
    comments: {type: [
        {
            commenterId: {type: String, required:true},
            commenterUsername: {type: String, required: true},
            content: {type: String, required: true},
            timestamps: {type: String, default: Date.now()},
            likes: {type:[String], default: []}
        }
    ]}
}, {timestamps:true});

const postsModel = model<IPosts>('post', postsSchema);
export default postsModel;