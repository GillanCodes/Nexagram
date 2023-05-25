import { Schema, model } from "mongoose";

export interface INotification 
{
    target:string,
    type:string,
    content:string,
    
};

const notificationSchema = new Schema<INotification>({
    target: {type:String, required:true},
    type: {type:String},
    content: {type:String, maxLength: 255}
});

const notificationModel = model<INotification>("notification", notificationSchema);
export default notificationModel;