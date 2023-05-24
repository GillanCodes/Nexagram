import { Document, Model, Schema, model } from "mongoose"
import isEmail from "validator/lib/isEmail";
import { compare, genSalt, hash } from "bcrypt";

export interface ISettings 
{
    isPrivate: boolean,
    theme: string,
    lang: string
};

export interface IUser extends Document
{
    username:string,
    password:string,
    email:string,
    fullname:string,
    follow:[string],
    followers:[string],
    bio:string,
    saved_posts: object,
    settings: ISettings
};

export interface UserModel extends Model<IUser>
{
    login(log:string, password:string): Promise<Document>
}

const userSchema = new Schema<IUser>({
    username: {type:String, required:true, maxlength:32, minlength:4},
    password: {type:String, required:true, maxlength: 255, minlength: 8},
    email: {type:String, required:true, validate:isEmail},
    fullname: {type: String, maxlength:32},
    follow: {type: [String], default: []},
    followers: {type: [String], default: []},
    bio: {type: String, maxlength: 1024},
    settings: {type: {
        isPrivate: {type: Boolean, default: false},
        theme: {type: String, default: "light_default"},
        lang: {type: String, default: "en_US"}
    }}
}, {timestamps: true});

userSchema.pre<IUser>('save', async function(this: IUser, next) {
    const salt:string = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (log:string, password:string)
{
    var user;

    if(isEmail(log))
    {
        user = await userModel.findOne({email: log});
    }
    else 
    {
        user = await userModel.findOne({username: log});
    }

    if (user) 
    {
        const auth = await compare(password, user.password);
        if (auth)
        {
            return user
        }
        else
        {
            throw new Error("Incorrect logs");
        }
    }
}

const userModel = model<IUser, UserModel>('user', userSchema);
export default userModel;