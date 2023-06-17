import { Document, Schema, model } from "mongoose";

export interface IMessage extends Document
{
    sender: string,
    content:string,
};

export interface IChat extends Document
{
    owner:string,
    users:[string],
    messages:[IMessage]
};

const chatSchema = new Schema<IChat>({
    owner: {type:String, required:true},
    users: {type:[String], required:true},
    messages: {type: [
        {
            sender: {type:String, required:true},
            content: {type: String, required: true, maxlength: 255}
        }
    ]}
});

const chatModel = model<IChat>('chat', chatSchema);
export default chatModel;