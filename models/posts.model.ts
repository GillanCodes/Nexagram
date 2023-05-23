import { Document, Schema, model } from "mongoose";

export interface IPosts extends Document
{
    posterId:string,
    caption:string,
    media:string,
    likers:[string],
    comments:[object]
}

const postsSchema = new Schema<IPosts>({
    posterId: {type:String, required:true},
    caption: {type:String, maxlength:1024},
    media: {type:String, required:true},
    likers: {type:[String], default:[]},
    comments: {type: [
        {
            commenterId: {type: String, required:true},
            commenterUsername: {type: String, required: true},
            content: {type: String, required: true},
            timestamps: true
        }
    ]}
}, {timestamps: true});

const postsModel = model<IPosts>('post', postsSchema);
export default postsModel;