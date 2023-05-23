import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import sanitizedConfig from "../config/config";
import userModel from "../models/users.model";

module.exports.checkUser =async (req:Request, res:Response, next: () => void) => {
    let token = req.cookies.auth;
    if (token)
    {
        verify(token, sanitizedConfig.JWT_TOKEN, async(err: any, decodedToken:any) => {
            if(err)
            {
                res.locals.user = null;
                next();
            }
            else
            {
                let user = await userModel.findById(decodedToken.id).select('-password');
                res.locals.user = user;
                next();
            }
        });
    }
    else
    {
        res.locals.user = null;
        next();
    }
}

module.exports.requireAuth = (req:Request, res:Response, next : () => void) => {
    const token = req.cookies.auth;
    if (token)
    {
        verify(token, sanitizedConfig.JWT_TOKEN, async (err: any, decodedToken: any) => {
            if (err)
            {
                console.log(err);
            }
            else
            {
                next();
            }
        });
    }
    else
    {
        return res.status(200);
    }
}