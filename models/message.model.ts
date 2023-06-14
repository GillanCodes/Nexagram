import mongoose, { Schema, model } from "mongoose";

export interface IMessage 
{
    message:string,
    users:Array<string>,
    sender:mongoose.Schema.Types.ObjectId,
};

const messageSchema = new Schema<IMessage>({
    message: {type:String, required: true},
    users: Array,
    sender:{ type: mongoose.Schema.Types.ObjectId, required: true}
});

const messageModel = model<IMessage>("notification", messageSchema);
export default messageModel;