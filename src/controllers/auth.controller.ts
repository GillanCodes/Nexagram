import { Request, Response } from "express";
import { isEmpty } from "../utils/isEmpty";
import userModel from "../../models/users.model";

export const register = async(req:Request, res:Response) => {
    const { email, username, password, fullname } : { email:string, username:string, password:string, fullname:string } = req.body;
    try {
        //Error Handler
        if (isEmpty(email)) throw Error('register_empty_field_email');
        if (isEmpty(username)) throw Error('register_empty_field_username');
        if (isEmpty(password)) throw Error('register_empty_field_password');
        if (username.length > 32) throw Error('register_field_too_long_username');
        if (password.length > 255) throw Error('register_field_too_long_password');

        const user = await userModel.create({email, password, username, full_name : fullname});
        return res.status(201).json({user:user._id});
    } catch (error) {
      //TODO  
    };
};