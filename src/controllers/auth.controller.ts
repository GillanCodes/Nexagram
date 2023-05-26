import { Request, Response } from "express";
import { isEmpty } from "../utils/isEmpty";
import userModel from "../../models/users.model";
import { registerErrors } from "../errors/auth.errors";
import { sign } from "jsonwebtoken";
import sanitizedConfig from "../../config/config";

const maxAge:number = 3*21*60*60*1000;
const createToken = (id:string) => {
    return sign({id}, sanitizedConfig.JWT_TOKEN as string, {
        expiresIn: maxAge
    });
};

export const register = async(req:Request, res:Response) => {
    const { email, username, password, fullname } : { email:string, username:string, password:string, fullname:string } = req.body;
    try {
        //Error Handler
        if (isEmpty(email)) throw Error('register_empty_field_email');
        if (isEmpty(username)) throw Error('register_empty_field_username');
        if (isEmpty(password)) throw Error('register_empty_field_password');
        if (username.length > 32) throw Error('register_field_too_long_username');
        if (password.length > 255) throw Error('register_field_too_long_password');

        const user = await userModel.create({email, password, username, fullname});
        return res.status(201).json({user:user._id});
    } catch (error) {
        console.log(error);
        const errors = registerErrors(error);
        return res.status(400).send({errors});
    };
};

export const login = async (req:Request, res:Response) => {
    const {email, password} : {email:string, password:string} =  req.body;
    try {
        if (isEmpty(email)) throw Error('register_empty_field_email');
        if (isEmpty(password)) throw Error('register_empty_field_password');

        var user = await userModel.login(email, password);
        const token:string = createToken(user._id);
        res.cookie('auth', token, {httpOnly:true, maxAge});
        return res.status(200).json({user});
    } catch (error) {
        //TODO
    };
};

export const logout = (req:Request, res:Response) => {
    res.cookie("auth", null, {httpOnly: true, maxAge: 1});
    return res.status(200).send('logout');
}