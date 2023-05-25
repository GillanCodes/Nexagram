export interface ISettings 
{
    isPrivate: boolean,
    theme: string,
    lang: string
};

export interface IUser extends Document
{
    _id: string
    username:string,
    password:string,
    email:string,
    fullname:string,
    follow:[string],
    followers:[string],
    bio:string,
    avatar:string,
    saved_posts: object,
    settings: ISettings
};